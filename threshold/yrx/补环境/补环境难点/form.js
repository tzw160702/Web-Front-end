window  = global;
// console.log(global.__proto__)   // {}是一个空对象
var document = {};
let formTag  = {
    tagName: 'FORM'
};
document.createElement = function (){
    if (arguments[0] === 'form'){
        return formTag
    }
};
document.body =  {};
document.body.appendChild = function (tag){
    if (tag.tagName ===  'FORM'){
        window.__proto__[tag.id] = tag    // 这么补不地道，但是有效，先这样处理
    }
};


// ////////////////////////////////////////////////////////////////////////////////
//                              执行的代码段
form = document.createElement("form");
form.id = "__yrxform__";
form.action = "https://yuanrenxue.com";
document.body.appendChild(form);
if (window["__yrxform__"] !== form){console.log("你被检测了1")}
if (!("__yrxform__" in window) || window.hasOwnProperty("__yrxform__")){console.log("你被检测了2")}
// console.log(window.hasOwnProperty("__yrxform__"))   // true  浏览器环境是false
// process.exit()

if (!(delete window["__yrxform__"])){console.log("你被检测了3")}
if (window["__yrxform__"] !== form){console.log("你被检测了4")}
if (Object.getOwnPropertyDescriptor(window, "__yrxform__")){console.log("你被检测了5")}
window["__yrxform__"] = 1;
if (window["__yrxform__"] === form){console.log("你被检测了6")}
if (!Object.getOwnPropertyDescriptor(window, "__yrxform__")){console.log("你被检测了7")}
delete window["__yrxform__"];
if (window["__yrxform__"] !== form){console.log("你被检测了8")}
// ////////////////////////////////////////////////////////////////////////////////
// 环境补完，打印日志
console.log('success!')



