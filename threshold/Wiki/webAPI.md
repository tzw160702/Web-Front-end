# 常用的webAPI

## 1. location

* 接口表示其链接到的对象的位置（URL）。所做的修改反映在与之相关的对象上。
* Document 和 Window 接口都有这样一个链接的 Location，分别通过 `Document.location`和`Window.location`访问。
* 通过`window.location`和`document.location`属性，可以拿到这个对象。
* `location` 是 built-in 函数 Location 的实例化对象

```javascript
// 1.当设置了`location.href`后，页面会随之改变，页面会进行跳转
location.href = 'http://match.yuanrenxue.com/'

// 2.location隐式转换
location + ''    // 'https://match.yuanrenxue.cn/'
location是一个对象，对象加原始值读取到了toString()方法返回整个 URL 字符串，相当于读取Location.href属性。
// 直接改写location，相当于写入href属性。
```

【参考链接：】https://wangdoc.com/javascript/bom/location#location-%E5%AF%B9%E8%B1%A1

## 2. navigator

* `Navigator` 接口表示用户代理的状态和标识。它允许脚本查询它和注册自己进行一些活动。
* `window.navigator`属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。

* `navigator` 是 built-in 函数 Navigator 的实例化对象

```javascript
// 可以使用只读的window.navigator属性检索navigator对象。
```

【参考链接：】https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator

## 3. document

* `document`节点对象代表整个文档，每张网页都有自己的`document`对象。
* `window.document`属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。
* `document`对象继承了`EventTarget`接口和`Node`接口，并且混入（mixin）了`ParentNode`接口。这意味着，这些接口的方法都可以在`document`对象上调用

```javascript
// 接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是 DOM 树 (en-US)。
// 在js中，dom节点也是通过对象实现的。可以通过console.dir查看dom节点对象细节

// document中的元素选择器方法
document.getElementById()   // 返回一个匹配特定ID的元素
document.getElementsByClassName()  // 返回一个包含了所有指定类名的子元素的类数组对象
document.getElementsByTagName()  // 返回一个包括所有给定标签名称的元素的 HTML 集合HTMLCollection。

// 创建dom节点
document.createElement  // (传入tagName)

// 每一个节点都有每一个dom节点的特性

// dom节点的对象属性的大体思路是这样的
// 首先,所有的dom节点一定会继承 HTMLElement 和 其他特殊类
// 比如 audio 标签 继承了 HTMLAudioElement 和 HTMLElement. 具体的继承关系可以通过原型链的方式查看
console.dir(document.createElement('audio'))
document.createElement('audio').__proto__
document.createElement('audio').__proto__.__proto__
document.createElement('a').__proto__
document.createElement('div').__proto__
document.createElement('img').__proto__
// 比如
a = document.createElement('a')
console.log(a.host)
a.href = 'https://www.yuanrenxue.com';
console.log(a.host)
```

【参考链接：】https://developer.mozilla.org/zh-CN/docs/Web/API/Document

**查文档技巧：**

> 如何利用文档查询某个或者某些元素里边的功能有哪些？
>
> 1. console.dir()  ，找到根源
> 2. 通过查找原型(__proto__)，一直向下找到原型对象

## 4. jquery

* 由于原生的关于dom节点的操作过于繁琐和复杂,所以开发者们想到了开发一个舒适的框架去快速批量的操作DOM节点

```javascript
// 给当前页面注入jquery
script = document.createElement('script')
script.src = 'https://code.jquery.com/jquery-3.6.1.min.js'
// jquery操作官方文档：https://api.jquery.com/
```



