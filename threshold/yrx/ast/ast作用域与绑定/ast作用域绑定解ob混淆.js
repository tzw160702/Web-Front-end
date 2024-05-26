let fs = require('fs')
let types = require("@babel/types")
let parse = require("@babel/parser").parse
let traverse = require("@babel/traverse").default
let generate = require("@babel/generator").default

let inputFilePath = './obSource.js'
let jsCode = fs.readFileSync(inputFilePath,'utf8')

// 生成ast树
ast = parse(jsCode)

// 格式化检测，所以单拎出来
let init_ast = parse(jsCode)
// 1. 将大数组、数组移位和解密函数放进内存
traverse(init_ast, {
    Program: function (path){
        // 正常来说，eval(path.toString()), 有格式化检测会卡死
        path.stop();        // 只遍历一次就停止
        path.get("body")[3].remove()     // body的前3个扔进内存
    }
})
eval(generate(init_ast, {minified: true}).code)
// console.log($b('\x30\x78\x36\x30', '\x62\x79\x2a\x33'))


// 2.利用解密函数将字符串还原成明文
traverse(ast, {
    CallExpression: function (path){
        if (path.node.callee.name === '$b'){
            // console.log(path.toString())
            path.replaceWith(types.valueToNode(eval(path.toString())))
        }
    }
})


// 3.字符串相加，拼接
traverse(ast, {
    BinaryExpression: {
        exit: function (path){                 // exit 考虑字符串相加，从里到外遍历
            let left = path.node.left.value;
            let right = path.node.right.value;
            if (path.get('left').isStringLiteral() && path.get('right').isStringLiteral()){       // 判断path的类型:使用path.isXXX方法
                path.replaceWith(types.valueToNode(left + right))
            }

        }
    }
})


// 4. 还原花指令
// 函数还原
traverse(ast, {
    CallExpression: {
        exit: function (path){
            if (path.get('callee.object').node && ['A'].includes(path.get('callee.object.name').node)){
                let property = path.get('callee.property.value').node;
                let argumentPathArray = path.node.arguments;
                // console.log('property:', property, 'args:', args)
                // scope.getBinding() 在作用域中获取A的 Binding对象, 如果在 当前作用域 找不到指定的 绑定, 那么就会递归在父级作用域中寻找
                // console.log(path.scope.getBinding(path.get('callee.object.name').node).path.toString())
                // 这里有个技巧，拿到A的binding对象， 然后再取它绑定对象向所在的作用域
                path.scope.getBinding(path.get('callee.object.name').node).scope.path.traverse({      // scope.path 就是拿到当前作用域块儿的path
                    AssignmentExpression: function (_path){                // 形参 _path 会自动传进去，就是当前的作用域下所有赋值表达式内容
                        if (_path.get('left').isMemberExpression()){
                            if(_path.get("left.property").node && _path.get("left.property.value").node === property){
                                // -----------------------------还原函数-------------------------
                                let BlockStatementPath = _path.get("right.body.body.0.argument");
                                // 函数返回的节点类型是BinaryExpression的情况：
                                if(BlockStatementPath.isBinaryExpression()){
                                    let operator = BlockStatementPath.node.operator;
                                    let left = argumentPathArray[0];
                                    let right = argumentPathArray[1];
                                    path.replaceWith(types.BinaryExpression(operator, left, right))
                                }
                                // 函数返回的节点类型是CallExpression的情况：
                                else if(BlockStatementPath.isCallExpression()){
                                    let func = argumentPathArray[0];
                                    let arguments = argumentPathArray.slice(1);
                                    // console.log('-------------------:', arguments.length)
                                    path.replaceWith(types.CallExpression(func, arguments));
                                }
                            }
                        }
                    }
                })
            }
        }
    }
})
// 字符串还原
traverse(ast, {
    MemberExpression: function (path){
        if (['A'].includes(path.get('object.name').node) && path.get('property').isStringLiteral()){
            let objectKey = path.get('property.value').node;
            // console.log('objectKey:', objectKey)
            path.scope.getBinding(path.get('object.name').node).scope.path.traverse({
                AssignmentExpression: function (_path){
                    // console.log('==============', _path.get("left.property.value").node)
                    if (_path.get('right').isStringLiteral() && _path.get("left.property.value").node === objectKey){
                        path.replaceWith(types.valueToNode(_path.get('right.value').node))
                    }
                }
            })
        }
    }
})


// 5. switch控制流平坦化处理
// 思路:
// 直接取 switch() 里面数组的变量名，然后使用 scope.getBinding() 方法获取到它绑定的节点，然后再取这个节点的值进行后续处理。
// // 版本1
// traverse(ast, {
//     SwitchStatement: function (path){
//         // 控制流数组变量名
//         let arr_name = path.get('discriminant.object.name').node;
//         // 控制流自增变量名
//         let increase_name = path.get('discriminant.property.argument.name').node;
//         // console.log('控制流数组变量名:', arr_name, '控制流自增：', increase_name)
//         // 存放处理后的控制流数组
//         let control_array = [];
//         let arr_;     // 控制流的切割后的数组
//         path.scope.getBinding(arr_name).scope.path.traverse({
//             VariableDeclarator: function (_path){
//                 // 控制流
//                 if (_path.get('id.name').node === arr_name){
//                     // 取表达式的对象、分割方法、分隔符  `"1|0|2|3|5|4"["split"]('\x7c')`
//                     let obj = _path.get('init.callee.object.value').node;
//                     let method = _path.get('init.callee.property.value').node;
//                     let arg = _path.get('init.arguments.0.value').node;
//                     // console.log('obj:', obj, 'property:', property, 'arg:', arg)
//                     arr_ = obj[method](arg);
//                 }
//                 else if (_path.get('id.name').node === increase_name){
//                     // 自增变量的初始值
//                     let increaseValue = _path.get('init.value').node
//                     // 处理控制流
//                     arr_.forEach((index) => {
//                         for (case_ of path.node.cases){
//                             if (case_.test.value === index){
//                                 case_index = path.node.cases.indexOf(case_);          // 取 cases列表中符合条件case_的索引位置
//                                 let consequent = path.node.cases[case_index].consequent;    // 取符合条件的位置
//                                 // 删除case语句中的continue
//                                 if (types.isContinueStatement(consequent[consequent.length - 1])){
//                                     consequent.pop();
//                                 }
//                                 // 合并到新数组，即正确的case内容
//                                 control_array = control_array.concat(consequent);
//                                 increaseValue++;
//                             }
//                         }
//                     })
//                 }
//             }
//         })
//         // 替换整个while 节点
//         // console.log(control_array.length)
//         path.replaceInline(control_array);
//     }
// })

// 版本2
traverse(ast, {
    WhileStatement: function (path){
        if (!types.isSwitchStatement(path.get('body.body.0'))) return;
        // 控制流数组变量名
        let arr_name = path.get('body.body.0.discriminant.object.name').node
        // 控制流自增变量名
        let increase_name = path.get('body.body.0.discriminant.property.argument.name').node;
        // console.log('控制流数组变量名:', arr_name, '控制流自增：', increase_name)
        // 存放处理后的控制流数组
        let control_array = [];
        let arr_;     // 控制流的切割后的数组
        path.scope.getBinding(arr_name).scope.path.traverse({
            VariableDeclarator: function (_path){
                // 控制流
                if (_path.get('id.name').node === arr_name){
                    // 取表达式的对象、分割方法、分隔符  `"1|0|2|3|5|4"["split"]('\x7c')`
                    let obj = _path.get('init.callee.object.value').node;
                    let method = _path.get('init.callee.property.value').node;
                    let arg = _path.get('init.arguments.0.value').node;
                    // console.log('obj:', obj, 'property:', property, 'arg:', arg)
                    arr_ = obj[method](arg);
                    _path.remove()     // 删除控制流数组节点
                }
                else if (_path.get('id.name').node === increase_name){
                    // 自增变量的初始值
                    let increaseValue = _path.get('init.value').node
                    // 处理控制流
                    arr_.forEach((index) => {
                        for (case_ of path.get('body.body.0').node.cases){
                            if (case_.test.value === index){
                                case_index = path.get('body.body.0').node.cases.indexOf(case_);          // 取 cases列表中符合条件case_的索引位置
                                let consequent = path.get('body.body.0').node.cases[case_index].consequent;    // 取符合条件的位置
                                // 删除case语句中的continue
                                if (types.isContinueStatement(consequent[consequent.length - 1])){
                                    consequent.pop();
                                }
                                // 合并到新数组，即正确的case内容
                                control_array = control_array.concat(consequent);
                                increaseValue++;
                            }
                        }
                    })
                    _path.remove()     // 删除自增变量节点
                }
            }
        })
        // 替换整个while 节点
        // console.log(control_array.length)
        path.replaceInline(control_array);
    }
})

let jsDecode = generate(ast, {minified: false}).code
let outputPath = './ast_detach_ob.js'
fs.writeFileSync(outputPath, jsDecode)
