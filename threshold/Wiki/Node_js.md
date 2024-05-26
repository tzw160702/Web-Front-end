## 1. node.js调试模块：inspect

```javascript
// 安装
npm install -g node-inspect

// 使用
在控制台使用命令 > node --inspect-brk ***.js 进行更方便的js调试
```

### 1) 在命令行输入命令：

![image-20230814215306364](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202308142153518.png)

### 2) 在谷歌浏览器调试工具的界面会出现这个图标，点击这个图标就会跳转到nodejs的调试工具

![image-20230814213901498](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202308142143674.png)

## 2. NODE-js与浏览器的区别

```javascript
// Node.js模块解决了模块化私有作用域的问题，每一个模块都有一个私有的作用域，外部不可以直接访问模块内部作用域，只有通过exports导出的对象才能被访问。

// 1.node 没有window和document对象

// 2.这个全局的命名空间被称为global，它是一个对象。在global上挂载了很多属性、方法和类。
```

## 3. node-js 哈希算法或者AES加密

```javascript
// 1.node-js 哈希算法或者是 AES DES 加密
// 常用的 crypto-js 库
// 安装：npm install -g crypto-js
/*
	【WordArray对象】
	WordArray 是 CryptoJs 中最核心的一个类,所有主要算法的实际操作对象都是 WordArray 对象。理解 WordArray 是理解 CryptoJs 各算法的基础
	基本上可以断言，只要在前端看到 WordArray  99.9683% 是 CryptoJs。
	我们不用去关注WordArray 的实现细节，因为它是一个投入产出比较低的事情。在逆向的时候，涉及到计算方面的内容，99.9665%基本上可以直接拿下来用。
*/

// 2.打包
// 很多情况下，前端开发会使用 node js库实现某些逻辑（主要还是计算逻辑，因为webapi在nodejs上支持不好），但是这些代码没有办法在浏览器上使用，所以就需要转换
// browserify 可以让你使用类似于 node 的 require() 的方式来组织浏览器端的 Javascript 代码
// 安装：npm install -g browserify
// 使用：browserify input.js -o out.js

// webpack 打包
// webpack 一般很少单独使用，需要搭配一些主流框架用。但是我们还是要强行搞一下
// 目前位置 webpack 已经升级到了 5版本。5版本是2020-10-10日发布的，针对4改了非常多的东西，但是现在很多主流框架/已经上线的项目还在使用webpack4打包的结果
// 安装：npm install -g webpac;npm install -g webpack-cli 
// 使用：
// 		建立一个标准的目录：
// 		webpack ./src/app.js
// 		就会在 dist 文件夹下，输出main.js
// 		建配置文件webpack.config.js【高版本有默认设置，不建也可】
// 我们无须关注webpack的配置流程和实现细节
// webpack的好处：
// 	 1.模块化处理，模块与模块之间完全独立，可以独立调用
// 	 2.开发便捷，能替代部分打包、压缩混淆、图片转base64等
// 	 3.扩展性强，插件机制完善
// 	 4.方便旧项目进行代码迁移
//	 5.css也可以被模块化
// webpack降版本:(降到4)
// npm uninstall webpack -g
// npm install -g  webpack@4.22.0
// npm install -g webpack-cli@3.0.8
// webpack降版本:(降到3)
// npm uninstall webpack -g
// npm install -g webpack@3.6.0  【4以下不用装webpack-cli】
```

