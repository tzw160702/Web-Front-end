## JavaScript 进阶

## 1.原型链入门

### 1) 构造函数

* 当我们自定义一个函数时(箭头函数与生成器函数除外)，这个函数就默认为一个构造函数【虽然它可以当做普通函数来使用】。
* 约定：

  1. 构造函数通常约定首字母大写；函数对象约定首字母小写；
2. 构造函数调用的时候需要在前面加个 new 操作符；函数对象不需要。

​			==*new 一个函数的时候函数会被调用，不会return；如果构造函数没有形参，不需要加()和不加括号的调用过程一样的==

* 并不是所有的内置函数都是构造函数; 也并不是所有的自定义函数都是构造函数。
* 使用`new`命令时，它后面的函数依次执行下面的步骤。
  1. 创建一个空对象，作为将要返回的对象实例。
  2. 将这个空对象的原型，指向构造函数的`prototype`属性。
  3. 将这个空对象赋值给函数内部的`this`关键字。
  4. 开始执行构造函数内部的代码。

### 2) prototype、__ proto __、constructor

* prototype 被称为显式原型【通常是我们自己写，自己设置的，主要针对构造函数】

* __ proto __ 被称为隐式原型【自己生成的, 一般不会去更改，**但是可以改**，主要针对实例化对象】

* constructor 被称为构造器【通常是prototype的反方向，主要针对构造函数的显式原型】

==`constructor`方法在创建对象实例时被自动调用，它的主要作用是初始化对象的属性和执行任何其他的准备工作。
可以将`constructor`方法看作是类的构造函数，它定义了创建对象时需要执行的代码。==

* ==为显示原型里面设置的元素会在new后以隐式原型的形式出现。==

![image-20230622171142948](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202306221711235.png)

![image-20230622171730233](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202306221717436.png)

![image-20230622172034512](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202306221720715.png)

**规则：**

> 1. 每个构造函数都有 prototype 和 __ proto __

```javascript
function Fun() {}
// undefined
Fun.prototype       
// {constructor: ƒ}
Fun.__proto__
// f () { [native code] }
```

> 2. 每一个对象/构造函数实例(这个也是对象)都有 __ proto_ __ ，没有prototype

```javascript
function Fun() {}
// undefined
fun = new Fun();
// Fun {}
fun.__proto__;
// {constructor: ƒ}
fun.prototype
// undefined    可以看出fun没有prototype
```

> 3. 对象的 __ proto __  指向它本身构造函数的prototype，这个称为构造函数的原型对象

```javascript
function Fun() {}
// undefined
fun = new Fun();
// Fun {}
fun.__proto__ == Fun.prototype
// true    对象的__proto__ 指向了构造函数的prototype
```

> 4. 调用对象/函数属性的时候，js引擎会沿着 __ proto __ 的顺序一直往上方查找，找到window.Object.prototype 为止，Object 为原生底层对象，到这里就停止了查找， 如果没有找到，就会报错或者返回 undefined

```javascript
function Fun(){}
// undefined
var fun = new Fun();
// undefined
fun.xxx
// undefined   因为xxx不存在所以返回undefined, 如果没有找到它会跟着原型链进行查找
fun.__proto__
// {constructor: ƒ}       没有xxx继续向下一个__proto__查找
fun.__proto__.__proto__
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// fun.__proto__.__proto__.__proto__      没有xxx继续再向下一个__proto__查找
// null    因为继承的关系, 所有对象都继承自Object, 如果还是没有xxx就返回null
```

> 5. 构造函数(也就是函数)的 __ proto __ 指向 **Function.prototype**，它返回" ƒ () { [native code] } " (**空函数**，我习惯把它叫构造器函数)；当然 Function也是一个函数，所以Function.__ proto __也指向空函数

```javascript
function Fun(){}
// undefined       
Fun.__proto__        
// ƒ () { [native code] }     Fun构造函数的prototype返回一个空函数
Function.prototy pe               
// ƒ () { [native code] }     Function构造函数的prototype返回一个空函数          
Function 
// ƒ Function() { [native code] }          Function本身是一个函数
Function.__proto__ == Function.prototype
// true        所以Function的隐式原型等于Function的显示原型 
```

> 6. 空函数的 __ proto __ 指向 Object.prototype, 即空函数" ƒ() { [native code] } " 的隐式原型指向Object的显示原型

```javascript
function Fun(){}
// undefined       
Fun.__proto__        
// ƒ () { [native code] }   空函数
Function.prototype               
// ƒ () { [native code] }   空函数
Object
// ƒ Object() { [native code] }   可以看出Object也是一个函数
Object.prototype
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
Fun.__proto__.__proto__
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
Fun.__proto__.__proto__ == Object.prototype
// true     空函数的隐式原型指向Object显示原型 
```

> 7. __ proto __是浏览器厂商实现的，W3C规范中并没有这个东西【所以不同浏览器的表现可能不同】

> 8. constructor(构造器)是 prototype 的反向。

```javascript
function Fun(){};
// undefined
Fun.prototype.constructor  
// ƒ Fun(){}
Fun.prototype.constructor == Fun
// true  可以看出构造函数Fun的显示原型的构造器等于构造函数本身
```

> 9. 任何函数的构造器都是Function，Function也不列外

```javascript
function Fun(){};
// undefined
Fun.constructor
// ƒ Function() { [native code] }   函数的构造器数是Function
Function
// ƒ Function() { [native code] }   Function本身是一个函数
Function.constructor
// ƒ Function() { [native code] }   Function的构造器是Function
Function.constructor == Function 
// true     可以看出Function函数的构造器就是它本身
Fun.constructor == Function
// true     得出Fun函数的构造器也是Function
```

> 10. 实例化对象的构造器返回的本对象的构造函数

```javascript
function Fun(){}    // 定义Fun函数
// undefined
fun = new Fun();    // 实例化一个fun对象
// Fun {}
fun.constructor    // 等同于 fun.__proto__.constructor
// ƒ Fun(){}     
fun.constructor == Fun
// true
// 原理是构造函数的显示原型里边有一个构造器, 当创建对象之后, 对象就会去找隐式原型里边的构造器返回构造函数本身
```

> 11. 对于很多原生构造函数(实例化对象)以 Number为例：
>
>     (1).__ proto __ 指向 Number.prototype
>
>     但是 Number.prototype 也是一种 Number的实例化对象
>
>     所以 (1).__ proto __.constructor == Number.prototype.constructor
>
>     但是注意： (1).__ proto __.__ proto __ 指向的是 Object.prototype

```javascript
(1).__proto__ == Number.prototype   
// true   可以近似看成 (1) ~= new Number(1) 这样 
Number.prototype
// Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}   看上去也是一个对象
(1).__proto__.constructor ==  Number.prototype.constructor
// true
(1).__proto__.__proto__ ==  Number.prototype.__proto__
// true
(1).__proto__.__proto__ ==  Object.prototype
// true  是因为继承关系
// 可以理解为原生的构造函数在浏览器上已经已经实例化为我们封装好了一些常用的方法, 所以Number.prototype看上去也是一个对象
```

### 3) instanceof

* 用于检测构造函数的prototype 属性是否出现在某个实例对象的原型链上
* 语法：`object instanceof constructor `
  * object：某个实例对象
  * constructor：某个构造函数

```javascript
function Fun() {}
// undefined
fun = new Fun()
// Fun {}
fun instanceof Fun
// true
```

## 2.this

* `this`是一个关键字，在浏览器中，全局的this指向的是window；而node.js中this指向的是global。
* `this`的五种绑定方式 ：
  * 默认绑定(非严格模式下this指向全局对象，严格模式下this会绑定到undefined)
  * 隐式绑定(当函数引用有上下文对象时，如 obj.foo()的调用方式，foo内的this指向obj)
  * 显式绑定(通过call()或者apply()方法直接指定this的绑定对象，如foo.call(obj))
  * new绑定(针对new关键词的绑定，当构造函数被实例化后的绑定形式)
  * 箭头函数绑定(this的指向由外层作用域决定的)

* 严格模式：严格模式是在 ECMAScript5(ES5)中引入的，在严格模式下，JavaScript 对语法的要求会更加严格，一些在正常模式下能够运行的代码，在严格模式下将不能运行。
  * JavaScript 脚本的开头添加`"use strict";`或`'use strict';`指令即可开启js严格模式代码。
  * 严格模式的特征：
    1. 不允许使用未声明的变量
    2. 不允许删除变量或函数
    3. 函数中不允许有同名的参数
    4. eval 语句的作用域是独立的
    5. 不允许使用 with 语句 
    6. 不允许写入只读属性 
    7. 不允许使用八进制数(只禁用了 0，没有禁用 0o)
    8. 不能在 if 语句中声明函数
    9. 禁止使用 this 表示全局对象(但是全局this不受影响，只影响函数内部的this)

### 1) 默认绑定

```javascript
// 1.非严格模式
(function f() { console.log(this) }())
// Window {window: Window, self: Window, document: document, name: 'window', location: Location, …}
// 严格模式
'use strict';
(function f() { console.log(this) }())
// undefined
// 【总结:】当函数没有所属对象直接调用时，this指向的是全局对象。

// ================================================================================================================
// 2.典例
// eg1:
debugger ;
var a = 1;
function foo() {
    var a = 2;
    console.log(this);
    console.log(this.a);
}
foo()   // 因为foo函数调用时处于全局环境下(全局window)
// Window {window: Window, self: Window, document: document, name: 'window', location: Location, …}
// 1

// eg2:
debugger ;var a = 1;
function foo() {
    var a = 2;
    function inner() {
        console.log(this.a)
    }
    inner()
}
foo()   // 因为foo函数调用时处于全局环境下(全局window)
// 1 
//【总结:】环境对象的this: 谁调用我，我就指向谁
```

### 2) 隐式绑定

```javascript
// 1.将函数放到对象中
debugger ;function foo() {
    console.log(this.a)
}
var obj = {
    a: 1,
    fun: foo
};
var a = 2;
obj.foo();  
// 1   obj的fun属性值指向foo函数，而fun的调用体是obj对象，此时的this就指向obj对象。
// 等同于
var obj = {
    a: 1,
    foo: function() { console.log(this.a) }
};
var a = 2;
obj.foo()
// js引擎会将函数单独保存在内存中，然后再将函数地址赋值给foo属性的value属性;
// {
//     foo: {
//         [[value]]: 函数的地址
//         ...
//     }
// }
// 由于函数是一个单独的值，所以它可以在不同的环境(上下文)执行。

// ================================================================================================================
// 2.隐式丢失
// 隐式丢失其实就是被隐式绑定的函数在特定的情况下会丢失绑定对象。
// 当使用另一个变量来给函数取别名或者将函数作为参数传递时会被隐式赋值，回调函数丢失this绑定
// 隐式丢失案例
var obj = {
  name: '金誉',
  info: function () {
    return '姓名：'+ this.name;
  }
};
var name = 'tzw';
var f = obj.info;      // 只要函数被赋给另一个变量，this的指向就会变
f()   // "姓名：tzw"  obj.info被赋值给变量f，内部的this就会指向f运行时所在的对象

// ================================================================================================================
// 典例
// eg1:
var val = 10;
obj = {
    val: 1,
    fun: function() {
        console.log(this)              // {val: 1, fun: ƒ} this指向调用对象
        var foo = function(){
            console.log(this);  // Window {window: Window, self: Window, document: document, name: 'window', location: Location, …} this指向window，匿名函数赋值给了变量foo，回调函数丢失this绑定就指向了全局window
            console.log(this.val);    // 10 取得是全局window对象的val属性值
        }
        foo();
        return this.val        // 1 fun是通过obj对象去调用的, 所以返回的this.val指向obj对象的val
    }
}
obj.fun(); 

// ================================================================================================================
// eg2:
debugger ;function foo() {
    console.log(this.a);      // 2 在函数deFOO调用时, obj对象的foo属性作为实参, foo本身是一个函数, 将函数作为参数传递时this会丢失，所以this.a就指向了全局的变量a
}
function doFoo(fn) {
    console.log(this);    // {a: 3, doFoo: f} 因为是obj2对象调用的，所以this指向obj2对象
    fn()                
}
var obj = {
    a: 1,
    foo
};
var a = 2;
var obj2 = {
    a: 3,
    doFoo
};
obj2.doFoo(obj.foo)
//【总结:】函数的定义位置不影响其this指向，this指向只和调用函数的对象有关；
// 多层嵌套的对象，内部方法的this指向离被调用函数最近的对象。
```

### 3) 显式绑定

==在逆向中**极其极其极其常用，补环境，抠代码读代码都常用**==

* 可以强行使用某些方法，改变函数内this的指向

* 通过call()、apply()或者bind()方法直接指定this的绑定对象

  * 使用.call()或者.apply()的函数是会直接执行的

  * bind()是创建一个新的函数，需要手动调用才会执行

  * 如果call、apply、bind接收到的第一个参数是空或者null、undefined的话，则会忽略这个参数。

    ```javascript
    debugger ;function foo() {
        console.log(this.a)
    }
    var a = 2;
    foo.call();           // 2    
    foo.call(null);       // 2
    foo.call(undefined)   // 2
    ```

#### (1) call()

* `call(对象, arg1, arg2...)` 第一个参数是新的this指向，从`arg1`参数开始之后是传递给参数的实参，可以是数字、字符串和数组等类型的数据类型都可以。

```javascript
debugger;const obj = { a: 100 };
function sum(x, y) {
    console.log(this.a + x + y);
}
sum(1, 2)   // underfined+1+2=NaN this指向window，window下面没有a属性，所以window.a是undefined
sum.call(obj, 1, 2)   // 100+1+2=103 通过call改变this，让其指向obj，obj下面具有a属性，所以obj.a是100
```

#### (2) apply() 

* `apply(对象, [arg1, arg2...])`第一个参数就是新的this指向， 第二个参数是一个数组或者类数组，里面的值依然是函数自身的参数。

```javascript
debugger ;var obj = {
    name: 'tzw'
};
window.name = 'window';
var getName = function(age) {
    alert(this.name);
    console.log('姓名：' + this.name + '\n' +'年龄：' + age)
};
getName();      // 姓名：window 年龄：undefined     this指向window，没有传参所以age是undefined
getName.apply(obj, [26])  // 姓名：tzw 年龄：26     通过apply改变this，让其指向obj下面的name属性，所以name是tzw
// 注意中括号是apply的第二个参数必须是数组或者类数组。
```

#### (3) bind()

* `bind(对象, arg1, arg2...)` 语法和`call()`一模一样，区别在于立即执行还是等待执行，bind不兼容IE6~8
* bind 返回的是一个函数体(新的函数)，并不会执行函数

```javascript
debugger; 
window.name = 'tzw';
const obj = {
    name: 'qdd'
}
function fun() {
    console.log(this.name);
}
fun.bind(obj)      // fun() { console.log(this.name); }  函数没有调用返回一个新函数
fun.bind(obj)()    // 'qdd'
```

```javascript
// 典例
// eg1:
debugger ;
var obj2 = {
    a: 2,
    foo1: function() {
        console.log(this.a)
    },
    foo2: function() {
        setTimeout(function() {
            console.log(this);
            console.log(this.a)
        }, 0)
    }
};
var a = 3;
obj2.foo1();      // 2          
obj2.foo2();      // setTimeout 是浏览器自带对象方法，所以this指向了window对象
// Window {window: Window, self: Window, document: document, name: 'tzw', location: Location, …}
// 3 

// ===============================================================================================================
// eg2:
debugger ;var obj1 = {
    a: 1
};
var obj2 = {
    a: 2,
    foo1: function() {
        console.log(this.a)
    },
    foo2: function() {
        setTimeout(function() {
            console.log(this);
            console.log(this.a)
        }.call(obj1), 0)
    }
};
var a = 3;
obj2.foo1();    // 2
obj2.foo2();    
// {a:1}            
// 1

// ===============================================================================================================
// eg3:
debugger ;var obj1 = {
    a: 1
};
var obj2 = {
    a: 2,
    foo1: function() {
        console.log(this.a)
    },
    foo2: function() {
        function inner() {
            console.log(this);
            console.log(this.a)
        }
        inner()         
    }
};
var a = 3;
obj2.foo1();     // 2   
obj2.foo2();
// Window {window: Window, self: Window, document: document, name: 'tzw', location: Location, …}
// 3

// ===============================================================================================================
// eg4:
debugger ;var obj1 = {
    a: 1
};
var obj2 = {
    a: 2,
    foo1: function() {
        console.log(this.a)
    },
    foo2: function() {
        function inner() {
            console.log(this);
            console.log(this.a)
        }
        inner.call(obj1)
    }
};
var a = 3;
obj2.foo1();   // 2
obj2.foo2()  
// {a: 1}
// 1

// ===============================================================================================================
// eg5:
debugger ;function foo() {
    console.log(this.a);
    return function() {
        console.log(this.a)
    }
}
;var obj = {
    a: 1
};
var a = 2;
foo();           // 2
foo.bind(obj);     // 不会打印在控制台上，中间被吞了的原因是因为控制台只会返回最后一个
foo().bind(obj)  
// 2
// (){console.log(this.a)} 
```

### 4) new绑定

* 当使用 new 关键字调用函数时，函数中的 this 一定是js创建的新对象

* 使用new调用函数时，会执行如下步骤：

  * 创建(或者构造)一个全新的对象
  * 这个新对象会被执行`[[prototype]]`连接
  * 这个新对象会绑定到函数调用的this
  * 如果函数没有返回其它对象，那么表达式中的函数调用会自动返回这个新对象。

  一句话概括就是：当用 new 运算符调用函数时，该函数总会返回一个对象，通常情况下，构造函数里的this就指向返回的这个对象。

```javascript
debugger; let Myclass = function() {
    this.name = 'tzw';
};
let obj = new Myclass();   // 构造函数里的this就指向返回的这个对象
obj.name;    // 'tzw'
// *如果构造函数显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前的this。
let Info = function(){ 
     this.name = 'qdd'; 
     return { //显式地返回一个对象
        name: 'tzw' 
     } 
}; 
let obj = new Info(); 
obj.name;    // 'tzw'
// *如果构造函数不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述问题，主要是new关键字调用函数，函数内部隐式返回this造成的。
```

```javascript
// 典例
// eg1:
debugger ;function Person(name) {
    this.name = name;
    this.foo1 = function() {
        console.log(this.name)
    }
    ;
    this.foo2 = function() {
        return function() {
            console.log(this.name)
        }
    }
}
;var person1 = new Person('person1');
person1.foo1();      // 1
person1.foo2()();    // ''
// *wind.name 不会被回收，刷新页面依然还在，有些网站会设置这个属性并检测

// ===============================================================================================================
// eg2:
debugger ;var name = 'window';
function Person(name) {
    this.name = name;
    this.foo = function() {
        console.log(this.name);
        return function() {
            console.log(this.name)
        }
    }
}
;var person1 = new Person('person1');
var person2 = new Person('person2');
person1.foo.call(person2)(); 
// person2  
// window
person1.foo().call(person2);
// person1
// person2   
```

### 5) 箭头函数绑定

* 创建箭头函数时，就已经确定了它的 this 指向。
* **箭头函数没有自己的this指向，它会捕获自己定义所处的外层执行环境，并且继承这个this值，指向当前定义时所在的对象。**箭头函数的this指向在被定义的时候就确定了，之后永远都不会改变。即使使用 call()、 apply() 、 bind()等方法改变this指向也不可以。 
* 箭头函数的重要特征：箭头函数中没有this和arguments。

```javascript
debugger ;var obj = {
    name: 'obj',
    foo1: ()=>{
        console.log(this.name)
    }
    ,
    foo2: function() {   
        console.log(this.name);
        return ()=>{       // 指向外层作用域
            console.log(this.name)
        }
    }
};
var name = 'window';
obj.foo1();
// window   foo1的对象是obj, obj是全局下定义的对象
obj.foo2()();
// obj
// obj  // 因为返回的是箭头函数，而它又是foo2属性的匿名函数的返回值，所以指向了foo2属性当前作用域下的name属性
obj2 = {
    name: 'obj2'
};
obj.foo1.call(obj2);
// window  因为call对箭头函数没有影响
//【总结:】箭头函数内的this是由外层作用域决定的

// 补充，如果箭头函数被赋给了一个变量
// function Fun() {
    this.name = () => { console.log(this); }   // 等同于 this.name = function() {console.log(this);}
}
fun = new Fun();
fun.name()     // Fun {name: ƒ}  这个this指向构造函数本身
```

**原型链中的this**: this这个值在一个继承机制中，仍然是指向它原本属于的对象，而不是从原型链上找到它时，它 所属于的对象。 

<center><h3>总结</h2></center>

> **1.函数外面的this，即全局作用域的this指向window**
>
> **2.函数里面的this总是指向直接调用者；如果没有直接调用者，隐含的调用者是window **
>
> **3.用new调用一个函数，这个函数即为构造函数。构造函数里面的this是和实例对象沟通 的桥梁，它指向实例对象 **
>
> **4.事件回调里面，this指向绑定事件的对象，而不是触发事件的对象。当然这两个可以是一样的 **
>
> **5.箭头函数内的this由外层作用域决定**
>
> 简单来说 this 的指向跟函数的调用位置紧密相关，要想知道函数调用时 this 到底引用了什么，就应该明确函数的调用位置。

## 3. 面向对象

### 1) 封装

* 封装就是将变量和方法包装在一个单元中，其唯一目的是从外部类中隐藏数据。这使得程序结构更易于管理，因为每个对象的实现和状态都隐藏在明确定义的边界之后。
* 封装，在ES6之前的使用的是构造函数，ES6之后用的是class【写前端常用但是逆向少见】

> ES6的class实际就是一个语法糖，在ES6之前，是没有类这个概念的，因此是借助于原型对象和构造函数来实现。
>
> 1. 私有属性和方法：只能在构造函数内访问不能被外部所访问(在构造函数内使用var等声明的属性)
> 2. 公有属性和方法(或实例方法)：对象外可以访问到对象内的属性和方法(在构造函数内使用this设置，或者设置在构造函数原型对象上比如Cat.prototype.xxx)
> 3. 静态属性和方法：定义在构造函数上的方法(比如Foo.xxx)，不需要实例就可以调用

```javascript
// 1.静态属性方法和公有属性方法
debugger ;function Foo(arg1, arg2) {
    var private1 = 'pri1';         // *在函数内用var等定义的就是私有的
    var private2 = 'pri2';
    var private3 = function() {
        console.log(private1 + private2)
    };
    this.pub1 = arg1;             //*在函数内用this承接的就是公有的
    this.pub2 = arg2;
    this.pub3 = function() {
        private3();
        console.log('finish')
    }
}
Foo.descript = '1这是一段讲述静态属性方法的代码1';
Foo.descript2 = function() {
    console.log('2这是一段讲述静态属性方法的代码2')
}
;
Foo.prototype.descript3 = function() {
    console.log('1这是一段讲述公有属性方法的代码1')
}
;
var foo = new Foo('arg1','arg2');
console.log(Foo.descript);       // 1这是一段讲述静态属性方法的代码1
Foo.descript2();                 // 2这是一段讲述静态属性方法的代码2
console.log(foo.descript);       // undefined
foo.descript3();                 // 1这是一段讲述静态属性方法的代码1 
// 在构造函数上也就是使用Foo.xxx定义的是静态属性和方法，静态属性指的是Class本身的属性，而不是定义在实例对象(this)上的属性。
// 在构造函数内使用this设置，或者设置在构造函数原型对象上比如Foo.prototype.xxx，就是公有属性和方法(实例方法)

// ===============================================================================================================
// 2.定义在构造函数原型对象上的属性和方法不能直接表现在实例对象上，但是实例对象可以访问或者调用它们

// ===============================================================================================================
// 3. 在ES6之后，新增了class 这个关键字。它可以用来代替构造函数，达到创建“一类实例”的效果；
// 并且类的数据类型就是函数，所以用法上和构造函数很像，直接用new命令来配合它创建一个实例：
// 类的所有方法都定义在类的prototype属性上面。
debugger ;class Foo {
    constructor() {       
        // constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法;
        // 一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加;
        // constructor()方法默认返回实例对象(即this)，完全可以指定返回另外一个对象。
        var p1 = 'luck';
        this.p2 = 'foo';
        this.p3 = function() {}
    };
    p4 = 'white';
    p5 = function() {
        console.log('我追你如果我追到你')
    };
    p6() {       // *这个方法定义当前类的原型上
        console.log('我就把你嘿嘿嘿')
    }
}
var foo = new Foo();
console.log(foo);   // { p4: 'white', p2: 'foo', p3: f, p5: f}
foo.p5();       // '我追你如果我追到你'
foo.p6();       // '我就把你嘿嘿嘿'

// ===============================================================================================================
// 4.可以使用static标识符表示它是一个静态的属性或者方法，
// 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

// ===============================================================================================================
// 5.class的变量不会提升

// ===============================================================================================================
// 6.作用域
debugger ;class Cat {
    constructor() {
        this.name = 'guaiguai';
        var type = 'constructor'
    }
    type = 'class';    
    // *这里的type是新写法，等同于this.type, 新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面；
    // 不带this的写法的优先级比带this的优先级高
    getType = function() {
        console.log(this.type);
        console.log(type)      // 这里的type只的是全局下的
    }
}
var type = 'window';
var guaiguai = new Cat();
guaiguai.getType();
// 'class'
// 'window'    去全局里边的取得type, class的type属性是cat的原型对象里边的

// ===============================================================================================================
// 7.闭包加深
debugger ;class Cat { 
    constructor() {          
        this.name = 'guaiguai';
        var type = 'constructor';
        this.getType = ()=>{
            console.log(this.type);
            console.log(type)
        }
    }
    type = 'class';
    getType = ()=>{
        console.log(this.type);
        console.log(type)
    }
}
var type = 'window';
var guaiguai = new Cat();
guaiguai.getType();      // constructor this.getType()取得是闭包里边携带的type变量
console.log(guaiguai);   // Cat {type: 'class', name: 'guaiguai', getType: ƒ}
```

### 2) 继承

* 继承是指从多种实现类中抽象出一个基类，使其具备多种实现类的共同特性。比如从猫类、狗类、虎类中可以抽象出一个动物类，具有猫、狗、虎类的共同特性（吃、跑、叫等）。

#### (1) 原型链继承

```javascript
function Parent () {
  this.name = 'Parent'
  this.sex = 'boy'
}
Parent.prototype.getName = function () {
  console.log(this.name)
  console.log(this.sex)
}
function Child () {
  this.name = 'child'
}
Child.prototype = new Parent()      // 将Child.prototype 指向Parent的实例
child1 = new Child()                // 创建了一个Child对象child1
//  Child {name: 'child'}
child1.__proto__.__proto__ == Parent.prototype
// true  child1对象的原型(__proto__)指向了Child.prototype, 而Child.prototype的原型(__proto__)指向了Parent.prototype
child1.getName()
// child       // 这个this.name 是从child1对象获取的
// boy         // child1对象没有sex属性，
console.log(child1)
// Child {name: 'child'} [[Prototype]]: { Parent name: "Parent" sex: "boy" } [[Prototype]]: Object
child1.sex = 'girl'   // 直接修改对象上的属性，是给本对象上添加一个新属性，不会修改原型引用上的sex
console.log(Child.prototype.__proto__ == Parent.prototype)
// true        // 这种方式就叫做原型链继承，将子类的原型对象指向父类的实例

// ===============================================================================================================
// 缺陷
function A () {}
function B () {
  this.name = 'anlan'
}
function C () {}
B.prototype = new C()
A.prototype = new B()
a = new A()
A.prototype.__proto__ == B.prototype    // true
a.__proto__     // C {name: 'anlan'}    // 这是一个显示问题，正常来讲a.__proto__ 指向的应该是B的原型 

// ===============================================================================================================
function Parent (name) {
  this.name = name
  this.sex = 'boy'
  this.colors = ['white', 'black']   // 引用类型，取得是内存地址
}
function Child (name) {
  this.name = name
  this.feature = ['cute']
}
var parent = new Parent('parent')
Child.prototype = parent
var child1 = new Child('child1')
child1.sex = 'girl'              // 是给本对象上添加一个新属性，不会修改原型引用上的sex
child1                           // {"name": "child1", "feature": ["cute"],"sex": "girl"}
child1.colors.push('yellow')     // Parent原型的colors属性新增了一个yellow 
parent                           // {"name": "parent", "sex": "boy", "colors": ["white", "black", "yellow"]}
child1.feature.push('sunshine')  // child1对象本身有feature，所以是在本对象的属性上添加了一个sunshine
child1                           // {"name": "child1", "feature": ["cute", "sunshine"],"sex": "girl"}
var child2 = new Child('child2')
child2                           // Child {name: 'child2', feature: Array(1)}feature : ['cute']name : "child2" [[Prototype]]:Parent colors : (3) ['white', 'black', 'yellow']name : "parent"sex : "boy" [[Prototype]]:Object  可以看出原型对象的所有属性都被共享了
// isPrototypeOf() 方法用于检查一个对象是否存在于另一个对象的原型链中。
// isPrototypeOf 实际上是instanceof 的反向。它是用来判断指定对象object1是否存在于另一个对象object2的原型链中，是则返回true，否则返回false。
Child.prototype.isPrototypeOf(child1)        // true
Parent.prototype.isPrototypeOf(child1)       // true
Object.prototype.isPrototypeOf(child1)       // true
// 原型链继承优缺点
// 优点：继承了父类的模板，又继承了父类的原型对象
// 缺点：1. 如果要给子类的原型上新增属性和方法，就必须放在Child.prototype = new Parent()这样的语句后面
//      2. 无法实现多继承, 多个原型指向同一个实例，当有多个实例化子对象时，修改一个会影响其他对象
//      3. 来自原型对象的所有属性都被共享了【浅拷贝】
//      4. 创建子类时，无法向父类构造函数传参数
```

#### (2) 构造继承

```javascript
function Parent (name) {
  this.name = name
}
function Child () {
  this.sex = 'boy'
  Parent.call(this, 'child')      // 这一步操作相当于把Parent里边的this.name作为Child的属性并赋值， this.name = 'child'
  // 这里的call换成apply和bind也可以，同样的效果  
}
var child1 = new Child()
console.log(child1)               // {"sex": "boy", "name": "child"}

// ===============================================================================================================
// 变种
function Parent (name) {
  this.name = name
}
function Child () {
  this.sex = 'boy'
  Parent.call(this, 'good boy')   // 等同于 this.name = 'good boy'
  this.name = 'bad boy'           // 相当于给this.name进行重新赋值 
}
var child1 = new Child()
console.log(child1)              // {sex: 'boy', name: 'bad boy'}

// ===============================================================================================================
// 涉及引用类型
function Parent (name, sex) {
  this.name = name
  this.sex = sex
  this.colors = ['white', 'black']
}
function Child (name, sex) {
  Parent.call(this, name, sex)
}
var child1 = new Child('child1', 'boy')
child1.colors.push('yellow')
child1        // {"name": "child1", "sex": "boy", "colors": ["white", "black", "yellow"]}
var child2 = new Child('child2', 'girl')
child2        // {"name": "child2", "sex": "girl", "colors": ["white", "black"]}  
// child1和child2可以看出，是一个类似深拷贝的过程

// ===============================================================================================================
function Parent (name) {
  this.name = name
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child () {
  this.sex = 'boy'
  Parent.call(this, 'good boy')
}
Child.prototype.getSex = function () {
  console.log(this.sex)
}
var child1 = new Child()
console.log(child1)          // {sex: 'boy', name: 'good boy'}
child1.getSex()              // 'boy'    
child1.getName()             // TypeError: child1.getName is not a function 
// 缺点1：构造继承只能继承父类的实例属性和方法，不能继承父类原型的属性和方法
child1 instanceof Parent     // fasle   
// 缺点2：实例并不是父类的实例，只是子类的实例
```

#### (3) 组合继承(原型链继承 + 构造继承)

```javascript
// 使用原型链继承来保证子类能继承到父类原型中的属性和方法;
// 使用构造继承来保证子类能继承到父类的实例属性和方法
function Parent (name) {                // call()和new的时候会被调用两次产生无意义的内存开销, new后的实例中name值为undefined
  this.name = name                      
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name) {
  this.sex = 'boy'
  Parent.call(this, name)                // 等同于this.name = name，使用call() 调用父类的属性(显式调用)
}
Child.prototype = new Parent()           // 将Child.prototype 指向Parent的实例, 等同于Child.prototype.__proto__ == Parent.prototype
Child.prototype.getSex = function () {   
  console.log(this.sex)
}
var child1 = new Child('child1')        
child1                  // {sex: 'boy', name: 'child1'}
// child1原型链：Child {sex: 'boy', name: 'child1'}name : "child1"sex : "boy" [[Prototype]]:Parent getSex : ƒ ()name : undefined [[Prototype]]:Object getName : ƒ ()constructor : ƒ Parent(name) [[Prototype]]:Object   
child1.getName()        // child1 取的是Parent原型对象上的方法, 因为child1的原型对象指向了Parent实例
child1.getSex()         // boy 取的是Child对象的原型对象Child的getSex方法
child1.constructor      // f Parent (name) {this.name = name}
// 正常来将child1.constructor指向构造函数Child本身，由于Child.prototype的继承Parent实例，导致Child.prototype.constructor被切断，沿着原型链找，最终指向了Parent.prototype的constructor, 也就是Parent (name) {this.name = name} 
// constructor 其实只是个标识作用，再实际的代码中并没有实际意义，所以是否在组合继承中修复这个地方取决于自己
Child.prototype.constrcutor = Child       // 认亲爹

// ===============================================================================================================
// 如何修改隐式原型(可以修改，但是在任何时候都不建议去人工修改隐式原型)
// 经典调用案例
var a;
(function () {
  function A () {
    this.a = 1
    this.b = 2
  }
  A.prototype.logA = function () {       
    console.log(this.a)
  }
  a = new A()   // 实例化A, 赋值给全局window的a
})()
a.logA()        // 1
// 如何在匿名函数外给A这个构造函数的原型对象中添加一个方法logB用以打印出this.b
a.constructor.prototype.logB = function() { console.log(this.b) }    
a.logB()        // 2  a.constructor指向A构造函数本身
// 用隐式原型也可以, a的__proto__指向A.prototype
a.__proto__.logB = function() { console.log(this.b) }

// ===============================================================================================================
function Parent (name, colors) {
  this.name = name
  this.colors = colors
}
Parent.prototype.features = ['cute']
function Child (name, colors) {
  Parent.apply(this, [name, colors])
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
var child1 = new Child('child1', ['white'])
child1.colors.push('yellow')
child1.features.push('sunshine')
var child2 = new Child('child2', ['black'])
child1.colors         // ['cute', 'sunshine']
child2.colors         // ['white', 'yellow']
child1.features       // ['cute', 'sunshine']
child2.features       // ['cute', 'sunshine']
// features是定义在父类构造函数原型对象中的，是比new Parent()还要更深一层的对象;
// 它只能解决原型(匿名实例)中引用属性共享的问题。features是Parent.prototype上的属性，相当于是爷爷那一级
// 组合继承的优点
// 优点：
//		1.可以继承父类实例属性和方法，也能够继承父类原型属性和方法
//      2.弥补了原型链继承中引用属性共享的问题(注意原型的原型的属性依旧会共享给实例)
//      3.可传参，可复用
// 缺点：原型链继承和构造继承的时候都会调用一次
// 		1.使用组合继承时，父类构造函数会被调用两次
// 		2.并且生成了两个实例，子类实例中的属性和方法会覆盖子类原型(父类实例)上的属性和方法，所以增加了不必要的内存。
```

#### (4) 寄生组合继承

* 核心：解决多次调用父类构造函数问题

```javascript
// 1.Object.create(proto, propertiesObject) 创建一个新对象，新对象的原型链将指向指定的原型对象的方法。
// 参数一：需要指定的新对象的原型对象，即新对象通过原型链继承了原型对象的属性和方法
// 参数二：可选参数，给新对象自身添加新属性以及描述器
// 2.Object.setPrototypeOf(obj, prototype) 用于设置一个对象的原型的方法
// 参数一：要设置原型的对象
// 参数二：该对象的新原型 
// 标准的寄生组合继承
// 使用 Object.create()
function Parent (name) {
  this.name = name
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name) {
  this.sex = 'boy'
  Parent.call(this, name)
}
// 与组合继承的区别
Child.prototype = Object.create(Parent.prototype)   // 创建了一个空对象，并且这个对象的__proto__属性是指向Parent.prototype
var child1 = new Child('child1')
child1                  // Child {sex: 'boy', name: 'child1'} 
child1.getName()        // child1 
child1.constructor      // Parent (name) this.name = name  指向继承的Parent
console.log(child1.__proto__)    
// 原型链：Parent {}[[Prototype]]:Object getName : ƒ ()constructor : ƒ Parent(name) [[Prototype]]:Object

// ===============================================================================================================
// 使用 Object.setPrototypeOf()
function Parent (name) {
  this.name = name
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name) {
  this.sex = 'boy'
  Parent.call(this, name)
}
// 与组合继承的区别
Object.setPrototypeOf(Child.prototype, Parent.prototype) // 将Child的原型设置为Parent的对象
var child2 = new Child('child2')
child2                 // Child {sex: 'boy', name: 'child1'}
child2.getName()       // child2
child2.constructor     // Child (name) {this.sex = 'boy'Parent.call(this, name)}
child2.__proto__      
// 原型链：Parent {constructor: ƒ}constructor : ƒ Child(name) [[Prototype]]:Object getName : ƒ ()constructor : ƒ Parent(name) [[Prototype]]:Object
// 可以得出Object.setPrototypeOf()方法设置对象的原型更加完美一些，它修复了子类原型中constructor的指向问题

// ===============================================================================================================
// function Parent(name){
  this.name = name
  this.face = 'cry'
  this.colors = ['white', 'black']
}
Parent.prototype.features = ['cute']
Parent.prototype.getFeatures = function (){
  console.log(this.features)
}
function Child(name){
  Parent.call(this, name)
  this.sex = 'boy'
  this.face = 'smile'
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
var child1 = new Child('child1')
child1.colors.push('yellow')
var child2 = new Child('child2')
child2.features = ['sunshine']
console.log(child1)
// 原型链：Child {name: 'child1', face: 'smile', colors: Array(3), sex: 'boy'}colors : (3) ['white', 'black', 'yellow']face : "smile"name : "child1"sex : "boy" [[Prototype]]:Parent constructor : ƒ Child(name) [[Prototype]]:Object features : ['cute']getFeatures : ƒ ()constructor : ƒ Parent(name) [[Prototype]]:Object
console.log(child2)
// 原型链：Child {name: 'child2', face: 'smile', colors: Array(2), sex: 'boy', features: Array(1)}colors : (2) ['white', 'black']face : "smile"features : ['sunshine']name : "child2"sex : "boy" [[Prototype]]:Parent constructor : ƒ Child(name) [[Prototype]]:Object features : ['cute']getFeatures : ƒ ()constructor : ƒ Parent(name) [[Prototype]]:Object
// 寄生组合继承算是ES6之前一种比较完美的继承方式。
// 它避免了组合继承中调用两次父类构造函数，初始化两次实例属性的缺点
// 它拥有了原型链继承、构造继承和组合继承的所有继承方式的优点
// 只调用了一次父类构造函数，只创建了一份父类属性
// 子类可以用到父类原型链上的属性和方法
// 能够正常的使用instanceOf和isPrototypeOf方法
// Object.setPrototypeOf()方法会在运行时动态地改变对象的原型，这可能会对性能产生一些影响;
// 在创建对象时就应该使用Object.create()来设置原型链，而不是后期动态地改变原型链。
```

#### (5) 原型式继承

```javascript
// 原理是创建一个构造函数，构造函数的原型指向对象，然后调用new 操作符创建实例，并返回这个实例，本质是一个浅拷贝
var cat = {
  heart: '❤️',
  colors: ['white', 'black']
}
var guaiguai = Object.create(cat)
var huaihuai = Object.create(cat)
console.log(guaiguai)    
// 原型链：{}[[Prototype]]:Object colors : (2) ['white', 'black']heart : "❤️" [[Prototype]]:Object
console.log(huaihuai)
// 原型链：{}[[Prototype]]:Object colors : (2) ['white', 'black']heart : "❤️" [[Prototype]]:Object
cat.colors.push('blue')     // 在原对象上个修改colors属性
guaiguai.colors             // ['white', 'black', 'blue'] 浅拷贝
// 同样的,对于 setPrototypeOf而言也是
var cat = {
  heart: '❤️',
  colors: ['white', 'black']
}
res1 = {}        // 因为Object.setPrototypeOf()没有返回值，所以先定义好一个对象
Object.setPrototypeOf(res1, cat);       // res1的原型指向cat对象
```

#### (6) 寄生式继承  

```javascript
// 在原型式继承的基础之上进行了一下优化
var cat = {
  heart: '❤️',
  colors: ['white', 'black']
}
function createAnother (original) {         // 在原型式继承的基础上再封装一层，来增强对象，之后将这个对象返回。
    var clone = Object.create(original);
    clone.actingCute = function () {
      console.log('我是一只会卖萌的猫咪')
    }
    return clone;
}
var guaiguai = createAnother(cat)
var huaihuai = Object.create(cat)
huaihuai.heart             // '❤️'
guaiguai.actingCute()      // 我是一只会卖萌的猫咪
```

#### (7) 混入式继承(多继承)

```javascript
// 我们一直都是以一个子类继承一个父类，而混入方式继承就是教我们如何一个子类继承多个父类的。
// 需要用到ES6中的方法Object.assign()
// 它的作用就是可以把多个对象的属性和方法拷贝到目标对象中，若是存在同名属性的话，后面的属性会把前面的覆盖掉
// Object.assign(target, ...sources) 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象
// 参数一：需要应用源对象属性的目标对象，修改后将作为返回值
// 参数二：一个或多个包含要应用的属性的源对象
function Parent (sex) {
  this.sex = sex
}
Parent.prototype.getSex = function () {
  console.log(this.sex)
}
function OtherParent (colors) {
  this.colors = colors
}
OtherParent.prototype.getColors = function () {
  console.log(this.colors)
}
function Child (sex, colors) {
  Parent.call(this, sex)               
  OtherParent.call(this, colors)       // 新增的父类
  this.name = 'child'
}
Child.prototype = Object.create(Parent.prototype)
Object.assign(Child.prototype, OtherParent.prototype) // 新增的父类原型对象
Child.prototype.constructor = Child
var child1 = new Child('boy', ['white'])
console.log(child1) 
// 原型链：Child {sex: 'boy', colors: Array(1), name: 'child'}colors: ['white']name: "child"sex: "boy"[[Prototype]]: Parentconstructor: ƒ Child(sex, colors)getColors: ƒ ()arguments: nullcaller: nulllength: 0name: ""prototype: {constructor: ƒ}[[FunctionLocation]]: VM23262:10[[Prototype]]: ƒ ()[[Scopes]]: Scopes[1][[Prototype]]: ObjectgetSex: ƒ ()constructor: ƒ Parent(sex)[[Prototype]]: Object
child1.__proto__               // Parent {getColors: ƒ, constructor: ƒ}
child1.__proto__.__proto__     // {getSex: ƒ, constructor: ƒ}
// 可以看出Parent.prototype.getSex()和OtherParent.prototype.getColors(),他们不在同一个原型上, 正常来讲是在同一个原型上

// ===============================================================================================================
function Parent (sex) {
  this.sex = sex
}
Parent.prototype.getSex = function () {
  console.log(this.sex)
}
function OtherParent (colors) {
  this.colors = colors
}
OtherParent.prototype.getColors = function () {
  console.log(this.colors)
}
function Child (sex, colors) {
  Parent.call(this, sex)
  OtherParent.call(this, colors) // 新增的父类
  this.name = 'child'
}
Object.assign(Parent.prototype, OtherParent.prototype) // 新增的父类原型对象，其它原型上的属性添加的目标原型上
Child.prototype = Object.create(Parent.prototype)      // 创建一个Parent的新对象，新对象指向Child的原型
// Object.setPrototypeOf(Child.prototype, Parent.prototype)
Child.prototype.constructor = Child          // 认亲爹
var child1 = new Child('boy', ['white'])
console.log(child1)                     
// 原型链：Child {sex: 'boy', colors: Array(1), name: 'child'}colors : ['white']name : "child"sex : "boy" [[Prototype]]:Parent constructor : ƒ Child(sex, colors) [[Prototype]]:Object getColors : ƒ ()getSex : ƒ ()constructor : ƒ Parent(sex) [[Prototype]]:Object
child1.__proto__.__proto__           
// {getSex: ƒ, getColors: ƒ, constructor: ƒ}  getSex和getColors现在已经在同一个原型上了
console.log(Child.prototype.__proto__ === Parent.prototype)           // true
console.log(Child.prototype.__proto__ === OtherParent.prototype)      // false
console.log(child1 instanceof Parent)                                 // true
console.log(child1 instanceof OtherParent)                            // false
// 混入式继承的缺点：对于两个或者多个父类，只能维持一个instanceof正常。
```

#### (8) Class 继承

* 主要是依靠两个关键字：`extend`、`super`

```javascript
class Parent {
  constructor (name) {
    this.name = name
  }
  getName () {
    console.log(this.name)
  }
}
class Child extends Parent {        // class通过extends关键字实现继承，让子类继承父类的属性和方法
  constructor (name) {
    super(name)                     // super在这里表示父类的构造函数，用来新建一个父类的实例对象
    this.sex = 'boy'
  }
}
var child1 = new Child('child1')
console.log(child1)    
// 原型链：Child {name: 'child1', sex: 'boy'}name : "child1"sex : "boy" [[Prototype]]:Parent constructor : class Child[[Prototype]]:Object constructor : class Parent getName:ƒ getName() [[Prototype]]:Object
// 从完整的原型链可以看出class的继承方式完全满足于寄生组合继承

// ===============================================================================================================
class Parent {
  constructor () {
    this.name = 'parent'
  }
}
class Child extends Parent {
  constructor () {
    // super(name) // super注释掉   
  }
}
var child1 = new Child()    // Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor 
/* 
【重点】
	1.ES6规定，子类必须在constructor()方法中调用super()，否则就会报错。
	  这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，
   	  然后再对其进行加工，添加子类自己的实例属性和方法。如果不先调用super()方法，子类就得不到自己的this对象。
    2.如果使用了extends实现继承的子类内部没有constructor方法，则会被默认添加constructor和super；
      若子类中有constructor方法，必须得在constructor中调用一下super函数，否则会报错。
    4.需要注意的地方是，在子类的constructor方法中，只有调用super()之后，才可以使用this关键字，否则会报错。
      这是因为子类实例的构建，必须先完成父类的继承，只有super()方法才能让子类实例继承父类。
      可以理解为，新建子类实例时，父类的构造函数必定会先运行一次
*/

// ===============================================================================================================
// super关键字，既可以当作做函数使用，也可以当做对象使用。
// 1.super当成函数调用时，代表父类的构造函数，且返回的是子类的实例，也就是此时super内部的this指向子类
class Parent {
  constructor () {
    console.log(new.target.name)     // 在构造函数内部使用new关键字创建对象时，返回该构造函数的名称。
  }
}
class Child extends Parent {
  constructor () {
    var instance = super()          // 在子类的constructor中super()就相当于是Parent.prototype.constructor.call(this)
    /* 调用super()的作用是形成子类的this对象，把父类的实例属性和方法放到这个this对象上面；
       子类在调用super()之前，是没有this对象的，任何对this的操作都要放在super()的后面。*/
    console.log(instance)
    console.log(instance === this)
  }
}
var child = new Child()   
// Child         
// Child {}  super当做函数来使用时，虽然它代表着父类的构造函数，但是返回的却是子类的实例，也就是说super内部的this指向的是Child。  
// true
/*
super当做函数使用时的限制：	 
	1.子类constructor中如果要使用this的话就必须放到super()之后
	2.super当成函数调用时只能在子类的construtor中使用
*/

// super()在子类构造方法中执行时，子类的属性和方法还没有绑定到this，如果存在同名属性，此时拿到的是父类的属性。
class A {
  name = 'A';
  constructor() {
    console.log(this.name);
  }
}
class B extends A {
  name = 'B';
}
new B();  // A  原因在于super()执行时，B的name属性还没有绑定到this，所以this.name拿到的是A的name属性

// super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
// 在普通方法中：
class A {
  p() {
    console.log('tzw');
  }
}
class B extends A {
  constructor() {
    super();
    super.p();         // 2 就是将super当作一个对象使用, super.p()就相当于A.prototype.p()
    // 需要注意的是由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
    // 或者说定义在父类原型对象上的属性和方法，super就可以取到
  }
}
new B();
// ES6规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
class A {
  constructor() {
    this.x = 1;
    this.y = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();         
    this.x = 2;
    console.log(this.y)      // 1
    super.y = 2;    // 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
    console.log(super.y)     // undefined
    // super.x赋值2，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined
	console.log(this.y)      // 2
  }
  m() {
    super.print();           // 2 调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类B的实例，导致输出的是2，而不是1。也就是说，实际上执行的是super.print.call(this)
  }
}
let b = new B();
b.m()     // 2

// ===============================================================================================================
// 2.super作为对象时用在静态方法之中，这时super将指向父类；在普通方法之中指向父类的原型对象。
class Parent {
  constructor (name) {
    this.name = name
  }
  getName () {
    console.log(this.name)
  }
}
Parent.prototype.getSex = function () {
	console.log('boy')              // child1
}
Parent.getColors = function () {
  console.log(['white'])
}
class Child extends Parent {
  constructor (name) {
    super(name)
    super.getName()
    // console.log(super);         // 报错 要能清晰地表明super的数据类型(作为函数还是对象使用)才不会报错
  }
  instanceFn () {
    super.getSex()                 // super在普通方法之中指向父类的原型对象
  }
  static staticFn () {
    super.getColors()   // 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。  
  }
}
var child1 = new Child('child1') 
child1.instanceFn()  // boy 在普通方法child1.instanceFn里面，super.getSex指向父类的原型对象
Child.staticFn()     // ['white'] 静态方法Child.staticFn里面，super.staticFn指向父类的静态方法。这个方法里面的this指向的是Child，而不是Child的实例。
//由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字
// extends后面接着的继承目标不一定要是个class，只要父类是一个有prototype属性的函数就能被子类继承
```

### 3) 多态性

* 多态性是指具体多种形态或者实现方式，Java中的多态性允许类的子类定义它们自己的唯一行为，并且还共享父类的一些相同功能。

```javascript
// 多态最根本的作用就是通过把过程化的条件语句转化为对象的多态性，从而消除这些条件分支语句。
// 实际上是一种编程的思想
// 对于JS是具有与生俱来的多态性它的变量类型在运行期是可变的，程序并没有要求我指定它的类型，也就是它并不存在这种类型之间的耦合关系。
```

### 4) 代理与反射 

在JavaScript中通过代理和反射，开发人员可以更加灵活地操作和控制对象的行为，从而实现更高级的功能和自定义行为。
* 先了解什么是属性描述符？
> JavaScript中的属性描述符("Property Descriptor"本质上是一个JavaScript 普通对象)是用于描述一个属性的相关信息。每个属性都有一个相关联的属性描述符，它由以下几个属性组成：
>
> ​		1.`value`：属性的值。可以是任何有效的JavaScript值。默认为`undefined`。
>
> ​        2.`writable`：该属性是否可以被重新赋值存取器属性。如果设置为`true`，则属性的值可以被修改。默认为`true`。
>
> ​			注意：属性描述符中如果配置了 get 和 set 中的任何一个，则该属性不再是一个普通属性，而变成了存取器属性。
>
> ​					get()读值函数：如果一个属性是存取器属性，则读取该属性时，会运行 get 方法，并将 get 方法得到的返回值作为属性值；
>
> ​					set(newVal)存值函数：如果给该属性赋值，则会运行 set 方法，newVal 参数为赋值的值。
>
> ​                   * value 和 writable 属性不能与 get 和 set 属性共存，二者只能选其一
>
> ​                  存取器属性最大的意义，在于可以控制属性的读取和赋值，在函数里可以进行各种操作。
>
> ​        3.`enumerable`：表示属性是否可枚举。如果设置为`true`，则属性可以在`for..in`循环中被枚举。默认为`true`。
>
> ​        4.`configurable`：表示属性是否可配置。如果设置为`true`，则允许修改属性的描述符和删除属性。默认为`true`。

```javascript
/*
1.获取对象属性描述符
   	Object.getOwnPropertyDescriptor(对象, 属性名)   获取一个对象的某个属性的属性描述符
   	Object.getOwnPropertyDescriptors(对象)         获取某个对象的所有属性描述符
2.为某个对象添加属性时 或 修改属性时，配置其属性描述符，使用以下这两种方法
	Object.defineProperty(对象, 属性名, 描述符)      设置一个对象的某个属性
	Object.defineProperties(对象, 多个属性的描述符);  设置一个对象的多个属性
需要注意的是，如果尝试修改不可配置的属性描述符，或者通过`Object.defineProperty()`方法定义已经存在的属性，严格模式下会抛出错误，非严格模式下会被忽略。
*/
// 主要介绍下设置多个属性的描述符
var obj = {
    property1: false,
    property2: false,
};
Object.defineProperties(obj, {
  'property1': {
    value: true,
  },
  'property2': {
    value: 'Hello',
    enumerable: false,      // 设置为不可枚举
  }
});
for (let i in obj) { console.log(i) }     // property1 property2不会被遍历，因为for...in遍历的是对象所有可遍历(enumerable)的属性 


// ===============================================================================================================
// 描述符修改的几种情况
// 1.
let person1 = {};
Object.defineProperty(person1, "name", {
    configurable: true,                                       // 允许修改属性的描述符和删除属性
    writable: true,                                           // 属性的值可以被修改
    value: "abc",
})
Object.defineProperty(person1, "name", {writable: false})     // 第二次将writeable修改为第一次设置的相反值
console.log(person1.name);      // abc
// 2.
let person2 = {};
Object.defineProperty(person2, "name", {
    configurable: true,                                       // 允许修改属性的描述符和删除属性
    writable: false,                                          // 属性的值不可以被修改
    value: "def",
})
Object.defineProperty(person2, "name", {writable: true})     // 第二次将writeable修改为第一次设置的相反值
console.log(person2.name);      // abc
// 3.
let person3 = {};
Object.defineProperty(person3, "name", {
    configurable: false,                                    // 不允许修改属性的描述符和删除属性
    writable: true,                                         // 属性的值可以被修改
    value: "123",
})
Object.defineProperty(person3, "name", {writable: false})   // 第二次将writeable修改为第一次设置的相反值
console.log(person3.name);     // 123     
// 4.
let person4 = {};
Object.defineProperty(person4, "name", {
    configurable: false,
    writable: false,
    value: "456",
})
Object.defineProperty(person4, "name", {writable: true})   // 报错 TypeError: Cannot redefine property:
/*
	1.当configurable为true 时，一切都是可以修改的
	2.当configurable为false时，第二次修改为原值时不报错，如果第二次修改为相反值时存在一种特殊情况
	  configurable 与 writable 有一个值为true时value的值可修改 writable--->false
    3.当configurable 为 false 时, 除了第2种情况之外，其它的修改都会报错。
    ----------------------------------------------------------------------------------------
    enumerable 看 configurable 
      (configurable和enumerable：这两个选项之间没有直接的互斥关系，但它们与其他属性描述符选项存在相互关系)
	value 看 configurable和writable
	writable 看 configurable和writable
	value和writable 与 get与set 互斥
	get和set：如果同时设置了get和set选项，则不能再设置value或writable选项；
	  get和set方法提供了属性的自定义读取和写入行为，因此value和writable选项变得无意义。
*/
```

ES6 新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。具体地说，**可以给目标对象(target)定义一个关联的代理对象，而这个代理对象可当作一个抽象的目标对象来使用。**因此在对目标对象的各种操作影响到目标对象之前，我们可以在代理对象中对这些操作加以控制，并且最终也可能会改变操作返回的结果。

####  (1) 代理

* 代理（Proxy）是一种机制，允许你创建一个代理对象来包装目标对象，并拦截该对象的操作。通过使用代理，你可以在目标对象上定义自定义的行为，例如拦截属性读取、属性设置、函数调用等操作。这使得你可以对对象的访问和修改进行更精细的控制。
* 代理(Proxy)能使我们开发者拥有一种间接修改底层方法的能力，从而控制用户的操作【在逆向中多用来进行hook】。
* 语法：
	let target = { /*目标对象的属性*/ };                     //目标对象
	let handler = { /*用来定制拦截操作*/ };            //拦截层对象
	let proxy = new Proxy(target, handler);      //实例化

```javascript
const target = {                  // 目标对象
  name: 'John'
};
const handler = {                 // 处理器对象
  // 捕获器在处理程序对象中以方法名为键
  get(target, property, receiver) {
    console.log(`Reading property '${property}'`);
    return target[property];      // 返回目标对象的属性值
  },
  set(target, property, value, receiver) {
    console.log(`Setting property '${property}' to '${value}'`);
    target[property] = value;     // 设置目标对象的属性值
    return true;                  // 设置成功返回true
  }
};
const proxy = new Proxy(target, handler);     // 创建代理对象，代理对象使用Proxy构造函数将目标对象和处理程序对象handler结合起来
proxy.name               // 查看代理对象的属性
// Reading property 'name'  
// john                  // get捕获器返回值
proxy.age = 26           // 修改代理对象设置属性
// Setting property 'age' to '26'  
// 26                    // set捕获器返回值

/*
常见的代理捕获方法：
	1.get(target, property, receiver)：捕获属性的读取操作。
	2.set(target, property, value, receiver)：捕获属性的赋值操作。
	3.has(target, property)：捕获in运算符的操作。
	4.deleteProperty(target, property)：捕获delete运算符的操作。
	5.apply(target, thisArg, argumentsList)：捕获函数调用的操作
*/
```

#### (2) 反射

* 反射（Reflection）是指通过内置的`Reflect`对象，提供一组方法来操作和查询对象的行为。Reflect 它提供了一系列方法，可以让开发者通过调用这些方法，访问一些 JS 底层功能；由于它类似于其他语言的反射，因此取名为 Reflect
* 使用 Reflect 可以实现诸如：属性的赋值与取值、调用普通函数、调用构造函数、判断属性是否存在与对象中 等等功能。

```javascript
const obj = {
  name: 'tzw',
  greeting() {
    return `Hello, ${this.name}!`;
  }
};
console.log(Reflect.get(obj, 'name'));    // tzw 获取obj对象的name属性
Reflect.set(obj, 'age', 26);              // true 设置obj对象的age属性
console.log(Reflect.has(obj, 'age'));     // true 查看obj对象是否有age属性
Reflect.deleteProperty(obj, 'age');       // true 删除obj对象的age属性
console.log(obj.age)                      // undefined
const result = Reflect.apply(obj.greeting, { name: 'qdd' }, []);    // 改变obj对象的greeting方法的this指向
console.log(result)                       // qdd 
/*
常见的代理捕获方法
	1.Reflect.get(target, property, receiver)：获取对象的属性值。
	2.Reflect.set(target, property, value, receiver)：设置对象的属性值。
	3.Reflect.has(target, property)：检查对象是否具有指定属性。
	4.Reflect.deleteProperty(target, property)：删除对象的属性。
	5.Reflect.apply(func, thisArg, args)：调用函数并传递参数。
*/
```

```javascript
// 典例
// eg1:(hook)
test6 = {a: 10}
var test6 = new Proxy(test6, {
        defineProperty: function(target, property, descriptor) {
        debugger;
        console.log(arguments)
        return Reflect.defineProperty(...argume   nts)
    }
});
attributes = {
    configurable: false,
    enumerable: false,
    writable: false,
    value: 1000,
}
Object.defineProperty(test6, 'a', attributes)

// eg2:
var proxy = {};
var target = proxy
var handler = {
    getPrototypeOf: function (){console.log(arguments);return Reflect.getPrototypeOf(this)}
}
proxy1 = new Proxy(target, handler)
```

## 4. 异步

### 1) 单线程模型
单线程模型指的是，JavaScript 只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。
注意，JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。事实上，JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。

### 2) 同步任务和异步任务
程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）。
**同步任务**是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。
**异步任务**是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。
###  3) 任务队列和事件循环
JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。
**首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。**
JavaScript 引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。
### 4) Event Loop 事件循环机制
浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

> event loop 执行顺序：
> 	1.一开始整个脚本作为一个宏任务执行(可以是一个js脚本，或者script标签)
> 	2.执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
> 	3.当前宏任务执行完出队，检查微任务列表，有则依次执行，直到全部执行完
> 	4.执行浏览器UI线程的渲染工作
> 	5.检查是否有Web Worker任务，有则执行
> 	6.执行完本轮的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

**什么是宏任务队列、微任务队列？**
		宏任务队列，也叫宏队列：script 、setTimeout、setInterval 、setImmediate 、I/O 、UI rendering
		微任务队列，也叫微队列：MutationObserver、Promise.then()或catch()、Promise为基础开发的其它技术，比如fetch API、V8的垃圾回收过程、 async 、Node独有的process.nextTick等。
		需要重点关注的是：setTimeout、setInterval 、Promise.then、 async
**在所有任务开始的时候，由于宏任务中包括了script，所以浏览器会先执行一个宏任务，在这个过程中你看到的延迟任务(例如setTimeout)将被放到下一轮宏任务中来执行。**

### 5)  Promise对象

* Promise(是一个对象，也是一个构造函数)是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。
* Promise 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
* Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。
* Promise 实例有一个then方法，用来指定下一步的回调函数。

#### (1) Promis的用法

```javascript
// 创建一个异步对象
var promise = new Promise((resolve, reject) => {    // 回调函数写成更简介的箭头函数，是一个标准的promise
  // ...
  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
});
/*
  1.Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己实现。
  2.resolve函数的作用是，将Promise实例的状态从“未完成”变为“成功”（即从pending变为fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
  3. reject函数的作用是，将Promise实例的状态从“未完成”变为“失败”（即从pending变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
*/
```

>Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态：
>
>* 异步操作未完成(pending)
>
>* 异步操作成功(fulfilled)
>
>* 异步操作失败(rejected) 
>
>这三种状态里边，fulfilled 和rejected 合在一起称为resolved(已定型)。
>这三种的状态的变化途径只有两种：
>
>    * 从“未完成”到“成功 ”
>    * 从“未完成”到“失败”
>
>一旦状态发生变化，就凝固了，不会再有新的状态变化。这也是 Promise 这个名字的由来，它的英语意思是“承诺”，一旦承诺成效，就不得再改变了。这也意味着，**Promise 实例的状态变化只可能发生一次。**
>
>所以，Promise 的最终结果只有两种：
>
>- 异步操作成功，Promise 实例传回一个值（value），状态变为`fulfilled`。
>- 异步操作失败，Promise 实例抛出一个错误（error），状态变为`rejected`。

   ```javascript
   // 初始态
   var callback = function(resolve, reject){}
   const promise1 = new Promise(callback)
   console.log(promise1)
   // Promise {<pending>}
   
   // 成功态
   var callback = function(resolve, reject){resolve()}
   const promise1 = new Promise(callback)
   console.log(promise1)
   // Promise {<fulfilled>: undefined}
   
   // 失败态
   var callback = function(resolve, reject){reject()}
   const promise1 = new Promise(callback)
   console.log(promise1)
   // Promise {<rejected>: undefined}
   // 以上就是promise1的三种状态
   
   // 打印顺序是什么？
   const promise1 = new Promise((resolve, reject) => {    // Promise 不是一个异步操作
     console.log('promise1')
   })
   console.log('1', promise1);
   // promise1
   // 1 Promise {<pending>}
   /*
   	创建promis对象的时候，此时，它是一个同步操作，promise1.then()才是一个异步操作；
   	所以，执行顺序从上至下，先遇到new Promise，执行该构造函数中的代码，打印promise1；
   	然后执行同步代码打印1，此时promise1没有被resolve或者reject，因此状态还是pending。
   */
   /*
   promise1 原型：Promise.prototype
   	constructor: ƒ Promise()   这玩意没啥说的
   	then: ƒ then()         	   主要看这个
   	catch: ƒ catch()           看名字就应该知道它应该是错误回收
   	finally: ƒ finally()       看名字就应该知道它是最后执行的
   */
   ```

#### (2) Promise.then

* Promise 实例的`then`方法，用来添加回调函数。

```javascript
// 1. promise是成功态时
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve('success')
  console.log(2);
});
promise.then(() => {    
  console.log(3);
});
console.log(4);
console.log(promise);
// 1
// 2
// 4
// Promise {<fulfilled>: 'success'}
// 3
/* 
执行步骤：
	1.从上至下，先遇到new Promise，执行其中的同步代码打印1
	2.再遇到resolve('success')， 将promise的状态改为了fulfilled(成功态)并且将值保存下来
	3.继续执行同步代码打印2
	4.跳出promise对象，往下执行，碰到promise.then这个微任务，将其加入微任务队列【注意，这里实际上发生的过程】
	5.执行同步代码打印4
	6.执行同步代码promise,打印promise的状态
	7.本轮宏任务队列全部执行完毕，检查微任务队列，发现promise.then这个微任务且状态为fulfilled，执行它。
*注意：
	在看到promise.then()还会创建一个promis对象，它的状态为pending(初始态)；
	当then发方法里边的函数执行完且没有报错的情况下，它的状态变为fulfilled(成功态)；
	如果报错，就会变成rejected(失败态)。
*/

// 2. promise是失败态时
const promise = new Promise((resolve, reject) => {
  console.log(1);
  reject('failed')
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
// 1
// 2
// 4
/* 
执行步骤：
	1.从上至下，先遇到new Promise，执行其中的同步代码打印1
	2.再遇到reject('failed')， 将promise的状态改为了rejected(失败态)并且将值保存下来
	3.继续执行同步代码打印2
	4.跳出promise对象，往下执行，碰到promise.then，只有promise是成功态的时候，promise.then里面的内容才会被放到微任务队列里边，
	5.执行同步代码打印4
	6.执行同步代码promise,打印promise的状态
	7.本轮宏任务队列全部执行完毕，检查微任务队列，没有任务。
*注意：
	promise.then(), 只有promise是fulfilled(成功态)的时候，promise.then里边的内容才会被放到微任务队列
*/
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});
promise.then(() => {     // 此时的promise的状态是pending，不会放到微任务队列
  console.log(3);
});
console.log(4);
// 1
// 2
// 4
```

* `then`方法可以接受两个回调函数，第一个是异步操作成功时（变为`fulfilled`状态）的回调函数，第二个是异步操作失败（变为`rejected`）时的回调函数（该参数可以省略）。一旦状态改变，就调用相应的回调函数。

```javascript
const then_callback = function(){console.log(arguments)}
const promise = new Promise((resolve, reject) => {
  resolve('success')         // 这个成功态的值会被promise.then的回调函数所接收到，它的第一个参数就是这个值
});
const result = promise.then(then_callback);      
console.log(result);              
// Promise {<pending>}  当一个已完成的“F”状态的Promise遇到then方法，一定瞬间产生一个新的Promise，状态为P 
// { "0": "success" } 

const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {     //promise1调用then的时候，不管后面跟的什么，一瞬间创建一个新的Promise对象
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);
// promise1
// 1 Promise {<fulfilled>: 'resolve1'}
// 2 Promise {<pending>}
// resolve1
/*
执行步骤：
    1.从上至下，先遇到new Promise，执行该构造函数中的代码打印promise1
    2.碰到resolve函数, 将promise1的状态改变为fullfiled，并将结果保存下来
    3.碰到promise1.then这个微任务，将它放入微任务队列【只要遇到then方法，一定产生一个新的Promise】
    4.promise2是一个新的状态为pending的Promise
    5.执行同步代码打印1， 同时打印出promise1的状态是fulfilled
    6.执行同步代码打印2，同时打印出promise2的状态是pending
    8.宏任务执行完毕，查找微任务队列，发现promise1.then这个微任务且状态为fulfilled，执行它。
*/
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
console.log("start");
fn().then(res => {
  console.log(res);
});
// start
// 1
// success
```

* 对于 Promise这个构造函数，如果不去new 它的话 

```javascript
const promise1 = Promise.resolve('success')  // 产生了一个已完成的 Promise
const promise2 = promise1.then((res) => {console.log(res)})
console.log(promise2)
// Promise {<pending>}
// success
// 在控制台再次打印
console.log(promise2)
// Promise {<fulfilled>: undefined}
/*
可以得出结论：promise1.then的返回值是promise实例化对象【已完成】，当.then的一瞬间，创造一个状态为Pending的promise，如果之前的promise已完成，就一瞬间把回调函数放入微队列；这个promise返回值的状态是 pending，但是一旦微队列里面的内容执行完毕了，那么，这个值就变成了fulfilled状态
*/


// ===============================================================================================================
// 采用链式的then，可以指定一组按照次序调用的回调函数；
// 前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），
// 这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
// 经典案列：
Promise.resolve()
    .then(() => {
        console.log(0);
        return Promise.resolve(4);      
    }).then(
    (res) => {
        console.log(res)
    }
)
Promise.resolve()
    .then(
    () => {
        console.log(1);
    }).then(
    () => {
        console.log(2);
    }).then(
    () => {
        console.log(3);
    }).then(
    () => {
        console.log(5);
    }).then(
    () => {
        console.log(6);
    })
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 解析参考：https://www.zhihu.com/question/453677175?rf=512445784
```

### 6) Promise结合setTimeout

* 根据Event Loop 事件机制，setTimeout 会生成一个宏任务队列

```javascript
console.log('start')
setTimeout(() => {
  console.log('time')
})
//.then方法接收两个回调函数，当Promise是成功态时把第一个回调函数放到微任务队列里边去，失败态时将第二个回调函数放到微任务队列里边去。
Promise.resolve().then(() => {  
  console.log('resolve')
})
console.log('end')
// start
// end
// resolve
// time
/*
执行步骤：
	1.刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈进行执行，因此先打印出start和end。
    2.setTimout作为一个宏任务被放入宏任务队列(下一个宏任务队列，并不是当前宏任务队列)
    3.Promise.then作为一个微任务，因为是成功态，所以被放入微任务队列
    4.本次宏任务执行完，检查微任务，发现Promise.then，执行它
    5.接下来进入下一个宏任务，发现setTimeout，执行。
*/

// 当我们new一个Promise的时候它是一个同步执行的任务，
// 只有调用.then方法的时候才会把then里边的回调函数放到微任务队列里边去
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
// 1
// 2
// 4
// timerStart
// timerEnd
// success
/*
执行步骤：
    1.从上至下，先遇到new Promise，执行该构造函数中的代码1
    2.然后碰到了定时器，将这个定时器中的函数放到下一个宏任务的延迟队列中等待执行
    3.执行同步代码2
    4.跳出promise函数，遇到promise.then，但其状态还是为pending，这里理解为先不执行
    5.执行同步代码4
    6.一轮循环过后，进入第二次宏任务，发现延迟队列中有setTimeout定时器，执行它
    7.首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列
    8.继续执行同步代码timerEnd
    9.宏任务全部执行完毕，查找微任务队列，发现promise.then这个微任务，执行它。
*/


// ===============================================================================================================
// *宏任务队列中产生的微任务会在当前宏任务完成后立即执行
setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')
// start
// timer1
// promise
// timer2
// 当宏任务执行过程中产生微任务的时候，会直接轮询微任务；
// 也可以理解为setTimeout会独立启用一个宏任务队列，而不是去排队。

Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');
// start 
// promise1
// timer1
// promise2
// timer2
/*
执行过程：
    1.刚开始整个脚本作为第一次宏任务来执行，我们将它标记为宏1，从上至下执行
    2.遇到Promise.resolve().then这个微任务，将then中的内容加入第一次的微任务队列标记为微1
    3.遇到定时器timer1，将它加入下一次宏任务的延迟列表，标记为宏2，等待执行(先不管里面是什么内容)
    4.执行宏1中的同步代码打印start
    5.第一次宏任务(宏1)执行完毕，检查第一次的微任务队列(微1)，发现有一个promise.then这个微任务需要执行
    6.执行打印出微1中同步代码promise1，然后发现定时器timer2，将它加入宏任务队列宏2的后面，标记为宏3
    7.第一次微任务队列(微1)执行完毕，执行第二次宏任务(宏2)，首先执行同步代码打印timer1
    8.然后又遇到了Promise.resolve().then这个微任务假定它是promise2，将它加入此次循环的微任务队列，标记为微2
    9.宏2中没有同步代码可执行了，查找本次循环的微任务队列(微2)，发现了promise2，执行它
    10.第二轮执行完毕，执行宏3，打印出timer2
    *注意：setTimeout 会独立启动一个宏任务队列，而不是去当前宏任务队列去排队。
*/

// Promise.resolve().then 产生的微任务会进入本轮微任务队列, 而不会进入下一轮 
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(() => {
  console.log('promise3');
  const timer3 = setTimeout(() => {
    console.log('timer3')
    Promise.resolve().then(() => {console.log('promise4')})
  }, 0);
    const timer4 = setTimeout(() => {
    console.log('timer4')
  }, 0);
});
console.log('start');
// start
// promise1 
// promise3 
// timer1 
// promise2 
// timer2  
// timer3 
// promise4 
// timer4


// ===============================================================================================================
// setTimeout加上延时
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000) // 注意这个延时
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')     // thrw抛出报错，new Error不会报错，只是生成一个错位的对象
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 0)
// promise1 Promise {<pending>}
// promise2 Promise {<pending>}
// Uncaught (in promise) Error: error!!!
// promise1 {<fulfilled>: 'success'}
// promise2 Promise {<rejected>: Error: error!!!}
/*
	throw 语句用来抛出一个用户自定义的异常。
	当前函数的执行将被停止（throw之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个catch块。
	如果调用者函数中没有catch块，程序将会终止。
*/

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
    console.log("timer1");
  }, 1000);          // 注意这个时间
  console.log("promise1里的内容");
});
const promise2 = promise1.then(() => {
  throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
  console.log("timer2");
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 0);               // 注意这个时间
// promise1里的内容
// promise1 {<pending>}
// promise2 {<pending>}
// timer2
// promise1 {<pending>}    
// promise2 {<pending>}
// timer1           // timer2比timer1先打印，原因在于setTimeout执行的定时器时间
// Uncaught (in promise) Error: error!!!  输出的时候，报错的优先级要小于日志的优先级
/*
setTimeout解释：
	当第一个 setTimeout() 被调用时，它会将回调函数推入异步执行队列中，并设定一个定时器，经过指定的时间后将该回调函数移出队列并执行。
	如果在定时器到期之前有其他的代码被执行，则该定时器会被暂时挂起，待其他的代码执行完毕后再继续执行这个定时器。
	当当前的执行栈为空时，JavaScript 引擎会检查异步执行队列，并按照队列的先后顺序执行其中的回调函数;
	对于多个 setTimeout() 的情况，引擎会按照设定的时间间隔依次执行它们的回调函数。
	需要注意的是，具体的执行时间可能会受到一些因素的影响，如系统负载、浏览器的事件循环机制等。【当某个定时器的时间到期时，如果当前的执行栈仍然有其他任务在执行，JavaScript 引擎会等待执行栈为空后才会处理定时器回调函数。】因此，设置多个定时器时，它们会按照设定的时间间隔依次添加到异步执行队列中，但具体的执行时间会受到其他因素的影响。并不能保证它们会严格按照设定的时间间隔依次执行，而是在当前执行栈为空时，尽可能快速地按照先后顺序执行。
*/
```

### 7) Promise A+ 规范

* https://www.ituring.com.cn/article/66566

```javascript
// 1
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");           // 没有任何作用，因为Promise的状态一旦改变，就永久保持该状态，不会再变了
  resolve("success2");       // 没有任何作用，因为Promise的状态一旦改变，就永久保持该状态，不会再变了
});
promise.then(res => {
    console.log("then: ", res);
  }).catch(err => {          // promise抛出一个错误，就被catch()方法指定的回调函数捕获。
    console.log("catch: ", err);
})
// then:  success1
// 总结：promise只要状态从P转变成 F/R，状态就不会再次被改变

// 2
let P1 = Promise.reject().then(()=>{})
console.log(P1)
// Promise {<pending>}	Promise.then状态为pending 
// Uncaught (in promise) undefined  这个报错是Promise.reject()产生的，输出时日志的优先级高于报错的优先级
console.log(P1)         // 再次打印
// Promise {<rejected>: undefined} then方法的第二个参数是rejected状态的回调函数，由于没有第二个回调函数所以是undefined
// 总结：rejected状态的Promis.then方法没有第二个参数，就会返回rejected状态, 如果有第二个参数会返回fulfilled状态
// 3
let P2 = Promise.resolve().then(undefined,()=>{console.log(1)})
console.log(P2)
// Promise {<pending>}  // Promise.then状态为pending
console.log(P2)         // 再次打印
// 总结：fulfilled状态的Promis.then方法没有第一个参数，就会返回fulfilled状态
// 4
let P3 = Promise.reject().then(()=>{}, ()=>{})
console.log(P3)
// Promise {<pending>}
console.log(P3)         // 再次打印
// Promise {<fulfilled>: undefined}
/*
说一下为什么第二次打印状态变为fulfiled或者rejected:
	1. 是因为 Promise 的状态改变和回调函数的执行是异步的；
	2. 当调用 Promise 的方法（比如 resolve()、reject()）时，Promise 对象的状态并不会立即改变，而是在 JavaScript 的事件循环机制中等待下一个微任务阶段执行。
	3. 如果在调用 Promise 方法后立即打印 Promise 对象的状态，那么很可能此时 Promise 对象的状态尚未改变，仍然是 "pending"。
    4. 只有在后续的微任务阶段中，JavaScript 引擎会检查微任务队列中是否有待处理的回调函数，并依次执行这些函数。这时才会执行 Promise 对象的回调函数，并且状态可能被改变为 "fulfilled" 或 "rejected"。
    小tip: 想要准确获取 Promise 对象的最新状态，可以在 then() 方法注册的回调函数中进行状态的打印，这样可以确保你在 Promise 状态变为 "fulfilled" 或 "rejected" 之后再打印对应的状态。
*/

// 5
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch()
// 报错
// 总结：.then不能返回其本身，否则报错。 这两句话都报错，但是promise的返回值还是可以接收到的。
// 再次印证了观点：promise.then出现的一瞬间，就会出现一个新的promise而不会去管.then的回调函数的内容。
```

### 8) Prmise.catch

* `Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。
* `then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。

```javascript
const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");      // 没有任何作用，因为Promise的状态一旦改变，就永久保持该状态，不会再变了
});
promise.then(res => {
    console.log("then1: ", res);
  }).then(res => {
    console.log("then2: ", res);
  }).catch(err => {        // catch可以捕捉到任何时候上层还没有捕捉的错误
    console.log("catch: ", err);
  }).then(res => {
    console.log("then3: ", res);
  })
// catch:  error
// then3:  undefined
/*
执行步骤：
	1.由于new的Promise对象，暂定为P0的状态是一个rejected(拒绝态)，拒因是 error；
	2.调用第一个then方法，由于P0的状态已经确定为rejected，then方法没有第二参数，所以当前Promise.then状态为rejected 记为P1；
	3.调用第二个then方法，then方法还是没有第二参数，所以当前Promise.then状态为rejected 记为P2；
	4.之后遇到catch方法，此时Promise.catch的状态是pending，由于P2是rejected，所以就捕获到了错误，并接收到拒因，控制台打印拒因，此时状态就会变为fulfilled 记为C1;
	5.调用最后一个then方法时，由于C1的状态为fulfilled, 所以执行then方法的第一个参数，由于C1没有传值，所以控制台打印是undefined
*/
// 根据以上的案列是否可以理解为，then方法实际上是包含错误捕捉功能的，then方法的第二个参数实际上就是 catch

Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  });
// 1
// 2
// 即使catch没有捕捉到错误，它也会正常返回一个fulfilled状态的Promise对象，并且会将上一个promise对象的参数正常传递给下一个then方法
// 如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。
 Promise.reject(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {           // 捕获到失败态的Promise对象，并且拿到拒因，
    console.log(err);
    return 3                // 向下传递了一个参数
  })
  .then(res => {
    console.log(res);
  });
// 1
// 3

Promise.resolve().then(() => {
  new Error('error!!!')          // 只是生成了一个Error对象，并没有抛出错误，如果使用throw，后面的catch将捕获到并打印错误
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
// then:  undefined
// throw抛出异常
Promise.resolve().then(() => {
  throw new Error('error!!!')   
}).then(res => {
  console.log("then: ", res)
}).catch(err => {              // catch捕获到错误
  console.log("catch: ", err)
})
// catch:  Error: error!!!
// 建议总是使用catch()方法，而不使用then()方法的第二个参数。


// ===============================================================================================================
// resolve传递丢失的情况
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('timer')
    resolve('success')
  }, 1000)
})
const start = Date.now();
r = promise.then(undefined, res => {   // 参数为undefined，表示不处理fulfilled的情况     
  console.log(res, Date.now() - start)
})
r1 = r.then(res => {
  console.log('r:', r);  
  console.log(res, Date.now() - start)
})
r2 = r1.then(res => {
  console.log('r1:', r1);  
  console.log(res, Date.now() - start)
})
console.log(r2)
// timer
// success 1013
// undefined 1013
/*
	1.当原始的Promise对象promiser的状态变为"fulfilled"时，promise.then的状态和值会受到影响。因为在promiser.then(onFulfilled, onRejected)中，我们传入了undefined作为第一个参数（即onFulfilled），表示不处理fulfilled的情况，所以promiser.then的状态将直接继承自原始Promise对象的状态。
	2.当原始Promise对象的状态已经是"fulfilled"时，promiser.then的状态也将变为"fulfilled"，并且其值将与原始Promise对象保持一致。
*/
Promise.resolve('success').then().then().then((res)=>{console.log(res)}).then((res)=>{console.log(res)})
// success
// undefined 因为前第一个回调函数已经接收到了参数，所以没有拿到值
/*	
	1.当.then()方法没有传入任何参数时，它返回一个新的Promise对象。新的Promise对象与前一个Promise对象的状态和值是相互关联的。
	2.前一个Promise对象的状态为"fulfilled"，新的Promise对象的状态也会是"fulfilled"，并且它的值将和前一个Promise对象保持一致。
*/
Promise.resolve('success').then(()=>{}).then().then((res)=>{console.log(res)}).then((res)=>{console.log(res)})
// undefined
// undefined
/*
	即时回调函数没有取值，但是参数已经传递进去了，导致后面的then方法拿不到
*/

Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
.then(console.log)
// 1
/*
扩充知识点：
    这里的参数console.log是一个函数，它会作为then()方法的回调函数来执行。
    console.log方法可以接收任意数量的参数，并将它们打印到控制台。
    当传递一个Promise对象作为参数时，console.log方法会按照以下步骤来打印Promise对象的值：
		1.console.log方法被调用，并接收Promise对象作为参数。
		2.console.log方法内部会检查传入的参数是否是一个Promise对象。如果是Promise对象，
			它会等待Promise对象的状态变为resolved（已完成）或rejected（已拒绝）。
        3.一旦Promise对象的状态变为resolved或rejected，console.log方法会获取Promise对象的值，并将其打印到控制台。
    所以，then(console.log) 会正常打印Promise对象的值，而then(console.log())会打印console.log函数执行的结果（通常是 undefined）作为回调函数的参数。	通常我们使用then(console.log)的方式来打印Promise对象的值。
*/
```

### 9) Promise.finally

* `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

* `finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`；

    说明`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

* 它最终默认返回的会是一个上一次的Promise对象的值，如果抛出的是一个异常则返回状态`rejected`的Promise对象。

* 它也是创建的一瞬间就会产生一个promise对象，也需要代码执行完毕之后确定状态。虽然状态有一部分取决于之前的对象。

```javascript
test = Promise.resolve().finally(()=>{console.log('1111111')})
console.log(test)
// Promise {<fulfilled>: undefined}

test = Promise.reject().finally(()=>{console.log('1111111')})
// Uncaught (in promise) undefined  Promise.reject报错
console.log(test)
// Promise {<rejected>: undefined}

test = Promise.resolve().finally(()=>{console.log('1111111');throw 111})
// 1111111
// Uncaught (in promise) 111   throw主动抛出的异常
console.log(test)
// Promise {<rejected>: 111} 这个状态是Promise.finally对象的的状态，
// 因为最终要确定finally的回调函数有没有报错或异常，有异常则返回状态rejected的Promise对象，状态的值为抛出的异常 

function promise1 () {                        // fulfilled
  let p = new Promise((resolve) => {
    console.log('promise1');
    resolve('1')
  })
  return p;
}
function promise2 () {
  return new Promise((resolve, reject) => {  // rejected
    reject('error')
  })
}
promise1()
  .then(res => console.log(res))            // fulfilled 
  .catch(err => console.log(err))           // fulfilled catch没有捕获到异常，它会正常返回一个fulfilled状态的Promise对象
  .finally(() => console.log('finally1'))   // fulfilled 回调函数执行后的状态

promise2()
  // 由于then方法没有第二个参数，直接继承自原始Promise对象的状态, 或者说它把设置当前then对象状态的函数放到微任务队列中去执行了
  .then(res => console.log(res))            // rejected 
  .catch(err => console.log(err))           // fulfilled catch捕捉到异常，返回一个成功态的状态
  .finally(() => console.log('finally2'))   // fulfilled 回调函数执行后的状态
// promise1 
// 1  
// error 
// finally1 
// finally2
```

### 10) Promise.all、Promise.race

* all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
* race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。

```javascript
// 小tip：大多数情况下为了控制它什么时候执行，我们可以用一个函数包裹着它，在需要它执行的时候，调用这个函数就可以了
// 比如这样：
function runP1 () {
    const p1 = new Promise(r => console.log('立即打印'))
    return p1
}
runP1()

// ================================================================================================================
// all()
function runAsync (x) {
    console.log('ready', x)
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), x*1000))
    return p
}
Promise.all([runAsync(3), runAsync(2), runAsync(1)])
  .then(res => console.log(res))
console.log('start')
// ready 3
// ready 2
// ready 1
// start
// 1
// 2
// 3
// [3, 2, 1]
/*
	1.Promise.all 接收的必须是一个可迭代的对象，且返回的每个成员都是 Promise 实例
	2.then()方法里的回调函数接收的参数就是所有异步操作的结果，是一个数组类型对象
	3.结果中的数组的顺序和Promise.all()接收到的数组顺序一致
    4.all后面的then()方法的状态取决于all的全部状态
    	all方法里边的数组的每个Promise对象都变成fulfilled，Promise.all的状态才会变成fulfilled
    	数组里边的promise对象只要有一个被rejected，Promise.all的状态就会变成fulfilled，而第一个被reject的Promise对象的返回值，会传递给promise.all对象的回调函数。
*/


// ================================================================================================================
// race()
function runAsync (x) {
    console.log('ready', x)
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), x*1000))
    return p
}
Promise.race([runAsync(3), runAsync(2), runAsync(1)])
  .then(res => console.log(res))
console.log('start')
// ready 3
// ready 2
// ready 1
// start
// 1  最先执行完的Promise对象的值
// 1
// 2
// 3
/*
	1.使用.race()方法，它只会获取最先执行完成的那个结果，其它的异步任务任然会继续执行
	2.那个率先改变的Promise对象状态的返回值，就传递给Promise.race的回调函数
*/
```

* `Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是Promise对象，就会先调用`Promise.resolve()`方法，将参数转为Promise对象，再进一步处理。

### 11) Promise.resolve

* 有时需要将现有对象转为 Promise 对象，`Promise.resolve()`方法就起到这个作用。

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

* `Promise.resolve()`方法的参数分成四种情况：

​		  参考：https://es6.ruanyifeng.com/#docs/promise#Promise-resolve

小tip：如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。

### 12) async 关键字

> `async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

* `async`函数返回一个 Promise 对象。

* `async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

* `async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

* `async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数

* 正常情况下，`await`命令后面是一个`Promise`对象，返回该对象的结果。如果函数返回的是一个Promise对象，则表明函数涉及到异步操作，`await`下面的语句将被放到微任务队列(前提是await语句没有报错，并且返回一个成功态的Promise对象)；如果不是`Promise`对象，就直接返回对应的值

    		    * `await`命令后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`代码块中

    ```javascript
    async function myFunction() {
      try {
        await somethingThatReturnsAPromise();
      } catch (err) {
        console.log(err);
      }
    }
    
    // 另一种写法
    async function myFunction() {
      await somethingThatReturnsAPromise()
      .catch(function (err) {
        console.log(err);
      });
    }
    
    
    // 多个await命令后面的异步操作，如果不存在继发关系(不相互依赖，不按照一定顺序执行)，最好让它们同时触发。
    // 写法一
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
    // 写法二
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
    // 上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。
    ```

       * 如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`。
       * 任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')
// async1 start
// async2
// end
// async1 end
/*
执行步骤：
	1.首先一进来是创建了两个函数的，我们先不看函数的创建位置，而是看它的调用位置
    2.发现async1函数被调用了，然后去看看调用的内容
    3.执行函数中的同步代码打印async1 start，之后碰到了await，它会阻塞async1后面代码的执行，因此会先去执行async2中的同步代码打印	async2，然后跳出async1
    4.跳出async1函数后，执行同步代码start
    5.在一轮宏任务全部执行完之后，再来执行刚刚await后面的内容打印async1 end。
*/

 
// 经典案列：
// eg1
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  setTimeout(() => {
    console.log('timer')
  }, 0)
  console.log("async2");
}
async1();
console.log("start")
// async1 start
// async2
// start 
// async1 end
// timer

// eg2
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")
// async1 start
// async2
// start
// async1 end
// timer2
// timer3
// timer1


// async 本质上是一个Promise对象
// 1.正常情况下，async中的await命令是一个Promise对象，返回该对象的结果。
// 2.如果不是Promise对象的话，就会直接返回对应的值，相当于Promise.resolve()
async function fn () {
  // return await 123
  // 等同于
  return 123
}
fn().then(res => console.log(res))
// 123  
// 由于fn同步执行的时候，直接返回的是await命令，而await命令返回的是一个原始值，不是一个Promise对象;
// 所以会返回一个新的Promise对象，状态为resolved，值为原始值。原始值的参数会同时传给回调函数。

// eg3
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {         // pending 状态的Promise对象
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
// srcipt start
// async1 start
// promise1
// srcipt end
/*
执行步骤：
	同步执行代码遇到await命令，遇到一个pending状态的Promise对象，await命令下面的代码不能放到微任务队列中；
	async1异步函数执行完毕是一个pending状态的promise对象，所以async1().then回调函数不会执行。
*/

// eg4
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')              // 成功态的promise对象
  }).then(res => console.log(res))           // 加入微任务队列
  console.log('async1 success');             // 加入微任务队列
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
// srcipt start
// async1 start
// promise1
// srcipt end
// promise1 resolve
// async1 success
// async1 end

//eg5
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise resolve')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => {
  console.log(res)
})
new Promise(resolve => {
  console.log('promise2')
  setTimeout(() => {
    console.log('timer')
  })
})
// srcipt start
// async1 start
// promise1
// promise2
// async1 success
// async1 end
// timer

// eg6(面试题)
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log('script end')
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// eg7
async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}
async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}
async function test() {
  console.log("test start...");
  const v1 = await testSometing();
  console.log(v1);
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}
test();
var promise = new Promise(resolve => {
  console.log("promise start...");
  resolve("promise");
});
promise.then(val => console.log(val));
console.log("test end...");
// test start...
// 执行testSometing
// promise start...
// test end...
// testSometing
// 执行testAsync
// promise
// hello async
// testSometing hello async
// 得出结论Promise.resolve("hello async")；和return "testSometing" 效果是一样的


// eg8
// 在async中，如果 await后面的内容是一个异常或者错误的话，简单看一下
// 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。
async function async1 () {
  await async2();                 // 任何一个await语句后面的Promise对象变为reject状态，那么整个async函数都会中断执行。
  console.log('async1');          // 不会执行
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))      
// async2
// Uncaught (in promise) error

// eg9
// 如果想要使得错误的地方不影响async函数后续的执行的话，就要使用try...catch了
async function async1 () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('async1');
  return Promise.resolve('async1 success')
} 
async1().then(res => console.log(res))
console.log('script start')
// script start
// error!!!
// async1
// script start

// eg10
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
}));
first().then((arg) => {
    console.log(arg);
});
console.log(4);
// 3
// 7
// 4
// 1
// 2
// 5
// Promise {<fulfilled>: 1}

// eg11
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
}
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
// script start
// async1
// promise1
// script end
// 1
// timer2
// timer1

// eg12
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})
// resovle1
// finally undefined finally不接收参数
// timer1 
// Promise {<fulfilled>: undefined} 当setTimeout宏任务执行的时候，打印的p1应该是“Promise对象.then().finally()”整个同步完成的Promise对象的状态，由于then回调函数接收了初始的Promise对象状态的值，所以最终的p1状态为undefined。
```

