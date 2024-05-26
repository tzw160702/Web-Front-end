// HTMLAnchorElement = function (){};
// HTMLAnchorElement 浏览器直接执行、new都会报错， 上面的方式被检测直接就嘎了
// 要确定一点，怎么判断是通过new方式调用的，还是直接调用的（只需要判断传进去的this指向谁，直接调用的话当前例子中this指向window, new的话this就会指向它的实例化对象）
HTMLAnchorElement = function(val){
	if(val){
		if(val === 'biubiubiu'){}      // new的时候传个值什么都不做。。。
	}
	else if(this instanceof HTMLAnchorElement){
		throw TypeError('Illegal constructor');
	}
	else{
		throw TypeError(`Failed to construct 'HTMLAnchorElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function`)
	}
};
HTMLAnchorElement.prototype.href = '';
HTMLAnchorElement.prototype.host = '';
HTMLAnchorElement.prototype._HTMLAnchorElement_href = '';          // 中间值，方便返回

// 非箭头函数 和 new 的过程中， 谁调用this才指向谁
Object.defineProperty(HTMLAnchorElement.prototype, 'href', {      // 步骤三，通过描述符设置
    set: function (){
        this.host = arguments[0].split('/').at(-1);   // 当前例子中this指向'a'
        this._HTMLAnchorElement_href = arguments[0]
        // return arguments[0]   // 这里不用return  等号表达式在解析的时候会自动向前赋值的
    },
    get: function (){
        return this._HTMLAnchorElement_href;
    }
})

document = {
   createElement: function (val){
        if (val === 'a'){
            // return new HTMLAnchorElement();      // 也就是步骤1，因为浏览器下new会报错，所以
			return new HTMLAnchorElement('biubiubiu');
        }
   }
}

// 处理空函数的toString方法
_toString = Function.prototype.toString
Function.prototype.toString = function(){
	debugger;
	if (this.name === 'createElement'){
		return 'function createElement() { [native code] }'
	}
	else if(this.name === ''){
		return 'function () { [native code] }'
	}
	else if(this.name === 'HTMLAnchorElement'){
		return 'function HTMLAnchorElement() { [native code] }'
	}
	else{
		_toString.apply(this, arguments)
	}
}

a = document.createElement('a')
a.href = 'https://www.yuanrenxue.com'
console.log(a.host)

// 补环境思路：
// 1.确定href和host的位置, 属于HTMLAnchorElement对象，a.__proto__ 是 HTMLAnchorElement, 相当于a.__proto__ == HTMLAnchorElement.prototype
/*
**在确定这点之前先讲点别的：**
    我们在控制台打印一个对象的时候，大家应该发现了，对象里两种不同的颜色（深色，浅色）
    其中， 深色指**可枚举属性**（即 可以用for in方式查找出来），浅色指不可枚举属性
    <font color=red>加粗标识该属性在当前的对象中，不加粗标识属性在当前对象的原型链中</font>
但是这个规律在document上有些是不适用的。
*/
// console.dir(a)              // 没有找到
// console.dir(a.__proto__)    // 在原型链HTMLAnchorElement中存在

// 2.确定了 href和host是HTMLAnchorElement对象的属性， 为了继承关系合理，必须去 a --> new HTMLAnchorElement

// 3.设置描述符，set的同时也要get, 不能在对象里面直接写死

// 4.因为重写了很多函数，还需要要处理重写的函数(重写的函数会不会成为检测点？)
// 浏览器中： document.createElement.toString() 是 'function createElement() { [native code] }'
//      document.createElement.toString()  这个常规的检测，那么 这个检测点的根源在哪里？
//      document.createElement.__proto__  它本身有toString方法, 就不会向上再去找了
//      而 document.createElement.__proto__ 是 'ƒ () { [native code] }'; 空函数本质是什么？ Function.prototype
//      document.createElement.__proto__.toString === Function.prototype.toString 是 true; 所以我们直接改写大Function的toString方法

// 5.(善后)那么写了这么多我们是不是就高枕无忧了呢？ 不是
// 为什么？ 因为：HTMLAnchorElement()  直接执行会报错。所以我们还得让这个函数报错

// 补环境中难点在于，主要检测了什么以及在哪里检测了
// 特殊细节的处理， 怎么找一段js里面调用了哪些API