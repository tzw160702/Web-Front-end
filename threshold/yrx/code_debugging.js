// console.log(typeof 'sign=')
// _Function = Function
// Function.prototype.constructor = function(){
//     if (arguments[0].indexOf('debugger') != -1){
//             return _Function('')
//         }
//     return _Function(arguments[0])
// }

// console["log"]("\u6B64\u7F51\u9875\u53D7\u3010\u7231\u952D\u4E91\u76FE V1.0 \u52A8\u6001\u7248\u3011\u4FDD\u62A4")

// const fs = require('fs');
// const TNT = require("@babel/types");
// const types = require("@babel/types");
// const parser = require("@babel/parser");
// const traverse = require("@babel/traverse").default;
// const generator = require("@babel/generator").default;
//
//
// let jsCode = `
// function QQOo(e) {
//             var t = 54;
//             while (t) {
//                 switch (t) {
//                     case 54:
//                         var o = document["createElement"]("script");
//                         t = 55;
//                         break;
//                     case 56:
//                         for (var a in e || {}) { r["push"](a + "=" + encodeURIComponent(e[a])); } t = 57;
//                         break;
//                     case 55:
//                         var r = [];
//                         t = 56;
//                         break;
//                     case 57:
//                         var i = r["join"]("&");
//                         var s = m["fpHost"] + "/fp3/r.json?" + i;
//                         o["onload"] = function QQOO() {
//                             o["onload"] = null;
//                             o["onerror"] = null;
//                             o["parentNode"]["removeChild"](o);
//                         };
//                         o["onerror"] = function oooQ() {
//                             o["onload"] = null;
//                             o["onerror"] = null;
//                             o["parentNode"]["removeChild"](o);
//                         };
//                         o["src"] = s;
//                         setTimeout(function() { O["insertBefore"](o, O["firstChild"]); }, 0);
//                         t = 0;
//                         break;
//                 }
//             }
//         }
// `;
//
// let ast = parser.parse(jsCode);
// traverse(ast, {
//     WhileStatement(path) {
//         let { test, body } = path.node;
//         // 1、判断 var t = 54; -> while (t) -> switch (t)
//         const _PrevSibling = path.getPrevSibling()
//         if (!TNT.isIdentifier(test) || !_PrevSibling.isVariableDeclaration()) return;
//         let { id, init } = _PrevSibling.get("declarations")[0].node;
//         let init_name = id.name,
//             init_value = init.value;
//         if (id.name != test.name || !TNT.isSwitchStatement(body.body[0])) return;
//         let { discriminant, cases } = body.body[0]
//
//         // 2、取出每个case下的每个不明谓动词和全部节点
//         let cases_map = {}
//         for (let _case of cases) {
//             let case_test_value = 'default_case';
//             let { consequent, test } = _case;
//             if (test) case_test_value = test.value;
//             cases_map[case_test_value] = { 'new_init_value': null, 'statement_array': [] };
//             for (let item of consequent) {
//                 if (types.isBreakStatement(item)) continue;
//                 // 1、存储不明谓动词
//                 if (types.isExpressionStatement(item) && types.isAssignmentExpression(item.expression)) {
//                     if (item.expression.left.name !== init_name) continue;
//                     cases_map[case_test_value]['new_init_value'] = item.expression.right.value;
//                     continue;
//                 }
//                 // 2、存储要排序的全部节点
//                 cases_map[case_test_value]['statement_array'].push(item);
//             }
//         }
//         // 3、根据不明谓动词，获取准确的语法顺序
//         let elements = []
//         while (true) {
//             if(!cases_map[init_value]) break;
//             elements = elements.concat(cases_map[init_value]['statement_array'])
//             init_value = cases_map[init_value]['new_init_value']
//
//         }
//         path.replaceWithMultiple(elements);
//         _PrevSibling.remove();
//     }
// });
//
// jsCode = generator(ast, opts = {
//     // "concise": true, // 简洁的,tab会删除 【https://zhuanlan.zhihu.com/p/91948992】
//     // "compact": true, // 代码压缩，变量赋值等号空格消失【https://blog.51cto.com/u_15072904/2579604】
//     // "retainLines": true, // 删除空行
//     // "comments": false, // 删除所有注释【https://blog.51cto.com/u_15072904/2579604】
//     jsescOption: {
//         "minimal": true, // Unicode转中文或者其他非ASCII码字符。【https://blog.51cto.com/u_15072904/2579604】
//     },
// }, jsCode).code;
// console.log(jsCode)


let fruits = ['apple', 'banana', {'1': 6}];
let index = fruits.indexOf({'1': 6});
console.log(index)