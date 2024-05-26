let fs = require('fs')
let types = require("@babel/types")             // 判断、验证节点的类型、构建新 AST 节点等
let parse = require("@babel/parser").parse
let traverse = require("@babel/traverse").default
let generate = require("@babel/generator").default

let inputFilePath = './astDetachob1.js'
let jsCode = fs.readFileSync(inputFilePath,'utf-8')

let ast = parse(jsCode)
let tmpMemery =  {}     // 中间对象方便后续统一处理
// 【步骤1.分析混淆代码，发现a对象是常用的哈希表，就需要将对象 a 放到内存里面，后续有其它的哈希表再继续加进来】
traverse(ast, {
    VariableDeclarator: function (path) {
        // console.log('name: ', path.get('id.name').node)      // 获取所有的VariableDeclarator节点类型, 【注意：path.get获取的是path，需要.node获取节点】
        if (['a', 'b', 'd'].indexOf(path.get('id.name').node) !== -1) {
            // 将对象加载到内存
            eval(path.toString())
        }
    }
});
// console.log('查看内存中是否存在a对象:', a);

/*
遍历时:
	如果没有对ast节点进行操作，只是放进内存可以继续进行操作
	如果有复杂性操作，特别是删除性操作，分开处理，重新写一个traverse
*/

// 【步骤2.把调用对象 a 容易还原的部分还原，即调用结果为'字符串'】
traverse(ast, {
    MemberExpression: function (path){
        if (['a', 'b', 'd'].indexOf(path.node.object.name) !== -1 && path.node.property.type === 'StringLiteral'){
            // console.log(path.toString())     // 查看符合条件的所有调用点
            let value = eval(path.toString())
            // value && console.log('结果：', value)    // 查看执行结果
            if (typeof value === 'string'){
                path.replaceWith(types.valueToNode(value));
            }
        }
    },
    // 将解混淆后的对象全部集中到一个对象
    ObjectExpression: function (path){
        let objectName = path.parent.id.name;
        // 对象名称
        tmpMemery[objectName] = {};
        path.traverse({
            ObjectProperty: function (path){
                if (path.get('value.type').node === 'FunctionExpression'){
                    // console.log(objectName)
                    // console.log(path.get('key.value').node)
                    // console.log(path.get('value'))
                    tmpMemery[objectName][path.get('key.value').node] = path.get('value')
                }else if(path.get('value.type').node === 'StringLiteral'){
                    // console.log(path.get('value.value').node)
                    tmpMemery[objectName][path.get('key.value').node] = path.get('value.value').node
                }
            }
        })
    }
});
// console.log('tmpMemery:', tmpMemery);

/*
OB提供的控制流平坦化至少有两种。第一种是语句级别的，基于switch语句，用于打乱语序。第二种是表达式级别的，用于替换双目运算符、逻辑运算符和常量等。
*/

// 【步骤3.当前的ob混淆代没有switch语句的控制流，是表达式级别的控制流】
/*
观察a控制流平坦化的哈希表，观察看哈希表的值的几种表现形式：
    function (d, e){return d(e)} -->   对应节点类型CallExpression
    function (d, e){return d !== e;} -->  对应BinaryExpression
    function(f, ...args){return f(...args)}  -->  对应CallExpression
    function(x){return x} -->  还有这种情况，这里提一嘴
    非函数  -->  这个混淆代码中，只有StringLiteral
    对于函数的情况，调用必定形如tbl['xxx'](...args); 对于非函数的情况，调用则形如tbl['xxx']
*/
// 处理方法(分两种情况处理):
//     1)哈希表的值是函数的情况，把函数体的ReturnStatement抠出来，再拿到函数体的参数，最后才进行替换。
//             如果函数的返回类型是CallExpression:
//             如果函数的返回类型是BinaryExpression:
//     2)哈希表的值不是函数的情况，进行一般意义的替换(即步骤2的操作)
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            if (path.get('callee.object').node && ['a', 'b', 'd'].indexOf(path.get("callee.object.name").node) !== -1) {
                // console.log(path.toString())
                // console.log(path.get('callee.object.name').node)    // 函数调用的对象名称
                let callName = path.get('callee.object.name').node
                // console.log(tmpMemery[callName])
                for (let i in tmpMemery[callName]) {
                    if (path.get("callee").node && path.get("callee.property").node && i === path.get("callee.property.value").node){
                        // 处理 BinaryExpression 类型
                        // console.log('函数返回类型', tmpMemery[callName][i].get('body.body.0.argument.type').node)
                        if (tmpMemery[callName][i].get('body.body.0.argument.type').node === 'BinaryExpression'){
                            // 操作符
                            let operator = tmpMemery[callName][i].get('body.body.0.argument.operator').node
                            // 参数
                            let left = path.get('arguments.0').node
                            let right = path.get('arguments.1').node
                            // types.binaryExpression() 代表了一个二元表达式，用于表示程序中的二元运算操作。二元表达式是指一个运算符同时作用于两个操作数的表达式，比如加法、减法、乘法、除法等。
                            path.replaceWith(types.binaryExpression(operator, left, right))
                        }
                        // 函数
                        if (tmpMemery[callName][i].get('body.body.0.argument.type').node === 'CallExpression'){
                            // 函数调用
                            // console.log(path.get('arguments.0').node)
                            let funPath= path.get('arguments.0').node;
                            // 函数调用参数
                            // console.log(path.node.arguments.slice(1))
                            let funArguments = path.node.arguments.slice(1);
                            path.replaceWith(types.callExpression(funPath, funArguments))    // types.callExpression 表示函数调用表达式
                        }
                }
            }
        }
    }
}})
/*
* 思路：
* 1.拿到所有调用函数，从内到外遍历(exit)，然后取或判断函数调用(例：`a['RIaGj'](c, 0x3e8)`)的对象a
* 2.循环对象tmpMemory[a]，如果key对应的值与 tmpMemory对象a中key的值相等，取 tmpMemory对象a中key的值的节点类型(分两种情况：BinaryExpression、CallExpression)
*   处理二进制表达式(BinaryExpression)： 【(调用函数) 先获取操作符 ——> 分开取参数临时保存 ——> 然后使用types的二进制表达式操作 ——> 替换节点】
*   处理调用表达式(CallExpression)：【(调用函数) 取第一个参数 ——> 切片取后面的参数 ——> 然后使用types的调用表达式操作 ——> 替换节点】
*   这两种方法接收的参数是node类型
*/

// 修巴修巴
traverse(ast, {
    // a['xxx'] 转 a.xxx 格式
    MemberExpression: function (path){
        path.node.computed = false
        path.node.property.type = "Identifier"
        path.node.property.name = path.node.property.value
    },
    // 字符串拼接
    BinaryExpression: function (path){
        let left = path.node.left.value
        let right = path.node.right.value
        if (path.get("left").isStringLiteral() && path.get("right").isStringLiteral()){
            path.replaceWith(types.valueToNode(left + right))
        }
    }
})


// 删除废代码（作用域学后效果更佳）
traverse(ast, {
    FunctionDeclaration: function(path){
        if(path.node.id.name === "_$oc"){
            path.remove()
        }
    }
})


let astToJs = generate(ast, {retainLines:false}).code
let outputFilePath = './astDetachob2.js'
fs.writeFileSync(outputFilePath, astToJs)

