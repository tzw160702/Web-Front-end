## 1. 使用new来创建对象时发生了什么

* 创建(或者说构造了)一个新对象
* 这个新对象进行[[prototype]]连接, 将新对象的原型指向构造函数，这样新对象就可以访问到构造函数原型中的属性
* 改变构造函数this 的指向为新建的对象，这样新对象就可以访问到构造函数中的属性

```javascript
function Fun() {}
new Fun       // Fun {}  会创建一个新的空对象
(new Fun).__proto__ == Fun.prototype   // true 
```

*  new 一个 promise的时候，内容是会同步执行的

## 2. 构造函数的`prototype`和`constructor`之间的关系

* 在JavaScript中，每个函数都有一个特殊的属性叫做`prototype`(原型)，它是一个对象。构造函数的`prototype`属性指向了一个对象，这个对象包含了通过构造函数创建的所有实例对象所共享的属性和方法。

* 另一方面，每个对象(包括函数对象)都有一个`constructor`属性，指向创建该对象的构造函数。当我们使用构造函数创建一个对象时，JavaScript会自动设置新对象的`constructor`属性为创建该对象的构造函数。这样可以方便地追溯一个实例对象的构造函数，从而保持对象与其构造函数之间的关联。

* 总结来说，构造函数的`prototype`属性指向包含共享属性和方法的原型对象，而原型对象的`constructor`属性指向构造函数本身，用于将实例对象与构造函数关联起来。当实例对象需要访问一个属性时，如果实例对象本身没有这个属性，它会从原型链上的构造函数的原型对象中查找。

* `prototype`对象有一个`constructor`属性，默认指向`prototype`对象所在的构造函数。由于`constructor`属性定义在`prototype`对象上面，意味着可以被所有实例对象继承。`constructor`属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

## 3. void 0

```javascript
void 0    // undefined 开发中使用`void 0`代替undefined
// undefined 是一个关键字, 全局window下给undefined赋值没有作用；
// 但是在函数内部，可以把undefined当成一个变量，并且可以给它赋值
```

## 4. 属性读取

```javascrip
// 读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。
// 如果直到最顶层的Object.prototype还是找不到，则返回undefined。
// 如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。
```

## 5. new.target

```javascript
// new.target 属性允许你检测函数或构造方法是否是通过new运算符被调用的。
// 在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。
// 在普通的函数调用中，new.target 的值是undefined。
function Foo() {
  if (!new.target) throw "Foo() must be called with new";
  console.log("Foo instantiated with new");
}

Foo();          // throws "Foo() must be called with new"
new Foo();      // "Foo instantiated with new"

// 在类的构造方法中，new.target指向直接被new执行的构造函数。并且当一个父类构造方法在子类构造方法中被调用时，情况与之相同。
class A {
  constructor() {
    console.log(new.target.name);
  }
}

class B extends A {
  constructor() {
    super();
  }
}
var a = new A();   // A
var b = new B();   // B
```

## 6. 谷歌调试工具 

```javascript
// 1.对象的方法
/* 
	细的深紫色， 不是对象本身的属性和方法
	浅紫色对象
*/

// 2. 断点
/*
	1.在鼠标悬停在函数上获取返回值时，内部的原理调用了函数；
	所以调试js代码在不确定函数功能的时候【不要轻易将鼠标悬停(确切的说是鼠标选中函数，然后悬停)在函数上获取其返回值（禁忌）】
	2.异步跟值的时候跟同步一样进行跟值
*/
```

MD5 32 位  加密长度固定32位
