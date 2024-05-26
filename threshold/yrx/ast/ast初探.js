parse = require("@babel/parser").parse
let generate = require("@babel/generator").default

_jscode = 'var a=1;'

// 转为 ast 语法树
let ast = parse(_jscode)
// console.log('ast语法树：', ast)

// 通过ast语法树修改原js代码, 结合工具
ast.program.body[0].kind = 'let';       // 修改标识符
ast.program.body[0].declarations[0].id.name = 'b';  //  修改变量名
ast.program.body[0].declarations[0].init.value = 2;    // 修改变量值

// ast语法树转js代码
generateJs = generate(ast,{minified:true}, _jscode).code
console.log('ast语法树转js代码: ', generateJs)



// 总结：AST实际上就是通过一定的逻辑，操作语法树，让代码最终变成我们想要的样子。