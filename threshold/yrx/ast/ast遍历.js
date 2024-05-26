let parse = require("@babel/parser").parse
let generate = require("@babel/generator").default

// _jscode = `function hi(){console['\x6c\x6f\x67']('\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64\x21');}hi();`

/*
这段代码中的字符串，已经变成了：----> '\x6c\x6f\x67' , 尝试把这个字符串还原一下并且把代码格式化
首先，观察代码：console["\u006c\u006f\u0067"] 在AST解析中是什么内容
可以清晰的看到它的type为：StringLiteral的块儿，并且value才是它真实的内容，而extra中的raw是显示出来的编码，所以，上手操作
思路：遍历所有节点，找到 type为StringLiteral的内容，然后直接把 extra 里面的 raw 替换成 value就行了。那么我们开始吧
*/

// astJs = parse(_jscode)

// function ergodic(ast){
//     for (let i in ast){
//         if (ast.type === 'StringLiteral'){
//             // console.log(ast.type)
//             // console.log(ast.value)
//             ast.extra.raw = ast.value
//             return void 0
//         }
//         if(typeof ast[i] === 'object'){       // 这个方法值得借鉴
//             ergodic(ast[i]);
//         }
//     }
// }
// ergodic(astJs)

// let outJS = generate(astJs, {minified:true}).code;
// console.log('修改后的js代码：', outJS)
//
// 这里就面临一个问题，在非常复杂的体系里面再去用人肉去进行遍历和递归操作会很难受。
// babel提供了一个非常完善的遍历组件：traverse
let traverse = require("@babel/traverse").default
// traverse(astJs, {
//     StringLiteral: function (path){
//         console.log('path:', path)
//     }
// })

// traverse(astJs, {
//     FunctionDeclaration: function(path){
//         // path.node.extra.raw = path.node.value
//         path.replaceWith({
//             type: 'StringLiteral',            // 当前节点类型替换新类型
//             value: 'Aprilbloon'               // 替换值
//         })
//     }
// })
// let out_code = generate(astJs).code
// console.log(out_code)



// enter 和 exit 用法
let types = require("@babel/types")
jsStr =  "var a = 'a' + 'b' + 'c' + d + 'e' + 'f';";
ast = parse(jsStr)
traverse(ast, {
   BinaryExpression: {          // 节点类型的值还是一个对象
        exit: function (path){
            console.log(path.toString())
            // console.log('节点类型', path.type)        // path.type 获取当前path的节点类型
            // console.log('执行操作', path.evaluate())              //  path.evaluate() 方法会对 path 对象进行执行操作，自动计算出结果，返回一个对象，其中的 confident 属性表示置信度，value 表示计算结果
            const {confident, value} = path.evaluate();
            confident && path.replaceWith(types.valueToNode(value))   // types.valueToNode(value):把值转换为节点
        }
    }
})
/*
大致分析如下:
left : 'a'; right:'b'                   --->   结果合并为'ab'。
left : 'ab'; right:'c'                  --->   结果合并为'abc'。
left : 'abc'; right:d                 --->   结果没法合并，但他们已经成为一个整体 'acb' + d
left : 'abc'+d; right:'e'           --->   结果没法合并，但他们已经成为一个整体 'acb' + d + 'e';
left : 'abc'+d + 'e'; right:'f'   --->   结果没法合并，但他们已经成为一个整体 'acb' + d + 'e'  + 'f';
不再是BinaryExpression 类型，停止遍历。
上面的left和right表示BinaryExpression 类型的左右子节点
可以理解为: enter 是从上往下依次处理，eixt 是从下往上依次处理。
*/

/*
*遍历时:
*	没有对ast节点进行操作，只是放进内存可以继续进行操作
*	分开处理：有复杂性操作，特别是删除性操作，重新写一个traverse
*/
