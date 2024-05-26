// 代理检测
window = global;
window = new Proxy(window, {})
top = window;
self = window;
parent = window;
frames = window;


// ////////////////////////////////////////////////////////////////////////////////
//                              执行的代码段
!function (){
    console.log(top == window)
    console.log(top == parent)
    console.log(window == this)
    console.log(top.self.window == parent.self.parent)
    console.log(top.self == window)
    console.log(top.self.window == window.top.self)
    console.log(self.window.top.frames == top.window.self);
    console.log(self.window.top.self.frames.parent.top == top.window.self);
    console.log(self.window.top.self.top == top.window.self.window);
}.call(window)     // 标准做法是用一个自执行函数，把所有代码包裹进去，然后改变一下this的指向
// ////////////////////////////////////////////////////////////////////////////////