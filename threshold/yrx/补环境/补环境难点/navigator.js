// 代理拦截器和描述符的应用
function Mimetype(_this){
    this['enabledPlugin'] = _this;
}
function Plugin(){
    this['0'] = new Mimetype(this);   // this 指向 new Plugin()
    this['1'] = new Mimetype(this);
}

Plugin = new Proxy(Plugin, {  // 代理Plugin,目的是new Plugin之后取属性的时候进行new操作
    construct: function (){   // handler.construct() 方法用于拦截 new 操作符。为了使 new 操作符在生成的 Proxy 对象上生效，用于初始化代理的目标对象自身必须具有 [[Construct]] 内部方法（即 new target 必须是有效的）
        let mimetype = {};
        Object.defineProperty(mimetype, '0', {
            get: function (){
                return new Mimetype(this)
            }
        })
        Object.defineProperty(mimetype, '1', {
            get: function (){
                return new Mimetype(this)
            }
        })
        return mimetype
    }
})
function PluginArray(){
    this['0'] = new Plugin();
}
navigator = {};
navigator.plugins =  new PluginArray()
// ////////////////////////////////////////////////////////////////////////////////
//                              执行的代码段
//                                                                         // 浏览器环境下的结果
var dd=navigator.plugins[0]
// 每次取的时候都要new一下，需要在new完Plugin生成对象后每取一次值就要new一下Mimetype
console.log(dd[0]==dd[0])                                                  // false
console.log(navigator.plugins[0][0]==navigator.plugins[0][0])              // false
console.log(dd[0].enabledPlugin[0]==dd[0])                                 // false
console.log(navigator.plugins[0][0].enabledPlugin==dd)                     // true
console.log(navigator.plugins[0][0].enabledPlugin==dd[1].enabledPlugin)    // true

// 分析：
// 1. navigator。plugins 是一个类数组对象， 是PluginArray 的实例
// 2. navigator.plugins[0] 是一个类数组对象，是Plugin的实例
// 3。取Plugin下的属性的时候，每次取到的属性都是新的(也就是 new 了一下)
// 4. MimeType的实例下面有一个enabledPligin属性，指向了它的祖宗`Plugin`

// 知识点补充:
// 类数组对象【array-like object】是指拥有类似于数组的特性和行为，但不是真正的数组。
// 它们具有数字索引和length属性，可以通过索引访问元素，但不具备数组原型上的方法（如push()、pop()等）。
// 常见的类数组对象包括函数的arguments对象、DOM 元素集合（如document.getElementsByTagName()返回的结果）、字符串等


