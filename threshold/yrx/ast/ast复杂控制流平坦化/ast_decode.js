let fs = require('fs')
let types = require("@babel/types")
let parse = require("@babel/parser").parse
let traverse = require("@babel/traverse").default
let generate = require("@babel/generator").default

let path = 'source.js';

// 代码读取到内存
function readFile(path) {
    jsCode = fs.readFileSync(path, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    return jsCode
}

// 写入文件
function writFile(data) {
    fs.writeFileSync('control_flow_source.js', data)
}

// 准备工作, 代码标准处理  for循环加 {}
console.log('for循环预处理。。。')
~function codePreprocessing(){
    jsCode = readFile(path);
    ast = parse(jsCode);
    traverse(ast, {
        ForStatement: function (path){
            path.node.body = types.blockStatement([path.node.body])
        }
    })
    let jsDecode = generate(ast, {minified: false}).code;
    writFile(jsDecode);
}();

// ------------------------------------- 正式开始 -------------------------------
// 还原简易的 else, 即 else里面没有直接承接 else{if(f.....)}
let _jsCode = readFile('./control_flow_source.js');
ast = parse(_jsCode);
// 一、还原简易的else
traverse(ast, {
    IfStatement: {
        // 1.从内往外开始遍历
        exit: function (path) {
            if (path.get('alternate').node && path.get('alternate.body').length && !path.get('alternate.body.0').isIfStatement()){
                // 2.取表达式用于重写控制流
                let name = path.get('test.left').node.name;
                let value = path.get('test.right').node.value;

                // 3.构建 if(f===1){...}形式存放
                let test = types.BinaryExpression('===', types.Identifier(name), types.NumericLiteral(value));
                let alternate = path.get('alternate').node;

                // 4.需要把处理好的控制流放到for循环下面，通过作用域找到它的位置
                path.scope.getBinding(name).path.parentPath.container[1].body.body.unshift(types.IfStatement(test, alternate))

                // 4. 顺带删掉 else分支
                path.get('alternate').remove()
            }
        }
    }
})


// 二、还原简易的 if, 即 if里面没有承接的情况
traverse(ast, {
    IfStatement: {
        // 1.从内往外开始遍历
        exit: function (path) {
            if (path.get('consequent').node && path.get('consequent.body').length && !path.get('consequent.body.0').isIfStatement()){
                // 目的是防止多余计算, 剔除第一步处理的if里的 `===`
                if (path.get('test').node.operator === '<'){
                    // 2.取表达式用于重写控制流
                    let name, value;
                    if (path.get('test.right').node.value === 1){
                        name = path.get('test.left').node.name;
                        value= value = 0
                    }else{
                        // 向上找第一次出现else对应的if
                        let _path = path;
                        while (1){
                            if (_path.parentPath.key === 'alternate'){
                                name = _path.parentPath.parentPath.get('test.left').node.name;
                                value = _path.parentPath.parentPath.get('test.right').node.value;
                                break
                            }
                            _path = _path.parentPath;
                        }
                    }
                    // 3.构建 if(f===1){...}形式存放
                    let test = types.BinaryExpression('===', types.Identifier(name), types.NumericLiteral(value));

                    // 4.需要把处理好的控制流放到for循环下面，通过作用域找到它的位置
                    let consequent = path.get('consequent').node;
                    path.scope.getBinding(name).path.parentPath.container[1].body.body.unshift(types.IfStatement(test, consequent))

                    // 4. 顺带删掉 else分支
                    path.get('consequent').remove();
                }
            }
        }
    }
})

// 5. 删除无效代码
traverse(ast, {
    IfStatement: {
        exit: function (path) {
            if (path.get('consequent.body') && path.get('consequent.body').length === 0){
                if (!path.get('alternate').node || path.get('alternate.body').length === 0){
                    path.remove()
                }
            }
        }
    }
})

/*
1. 课后请将代码完全还原完毕
2. 尝试自动化插桩（尽管它不是必要的）
3. 尝试不利用插桩还原代码（盯住 var i = e || 0（类似这种），之后从入口找下去即可，最后通过控制器修改代码来判断执行顺序即可）【本题中此需求非常简单】
4. 尝试清空其余还原后的无用代码（包括控制器，无效引用等等）
*/



let jsDecode = generate(ast, {minified: false}).code
console.log('开始写入文件。。。')
writFile(jsDecode)


