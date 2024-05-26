location = {
    href: 'chrome://newtab/'
}
// 假设不是location调用的href，当取a对象下的属性时设置一个描述符
Object.defineProperty(location, 'href', {
    get: function (){
        if (this !== location){
            throw TypeError('Illegal invocation')
        }
    }
})

try{
    let a = {a: 1000}
    a.__proto__ = location;  // 将对象a的原型链指向location对象

    console.log('href:' + a.href)
    // 浏览器环境下，a.href 会报 Uncaught TypeError: Illegal invocation 错误
    // 只要 location.href 不是全局调用的[window.location.href]，就认为它是非法调用
}catch (e){
    console.log(e.stack)
}

