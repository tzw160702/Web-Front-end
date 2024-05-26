// 使用代理的方式进行处理
window = global;
document = {}
document.createElement = function (){
    if (arguments[0] === 'form'){
        return {
            tagName: arguments[0].toUpperCase()
        }
    }
}
document.body =  {};
document.body.appendChild = function (tag){
    if (tag.tagName ===  'FORM'){
        window.__proto__[tag.id] = tag    // 这么补不地道，但是有效，先这样处理
    }
}
window = new Proxy(window, {
    deleteProperty: function(target, p){
        if (p === '__yrxform__'){
            return true
        }
        // 正常删除
        Reflect.deleteProperty(target, p)
    }
})

// ////////////////////////////////////////////////////////////////////////////////
//                              执行的代码段
form = document.createElement("form");
form.id = "__yrxform__";
form.action = "https://yuanrenxue.com";
document.body.appendChild(form);
if (!(delete window["__yrxform__"])){console.log("你被检测了3")}   // 设置一个假的删除，delete window["__yrxform__"] --> 实际上没有删
if (window["__yrxform__"] !== form){console.log("你被检测了8")}
// ////////////////////////////////////////////////////////////////////////////////
