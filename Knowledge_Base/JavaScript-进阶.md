## JavaScript 进阶

### 1.原型链入门

#### 1) 构造函数

* 当我们自定义一个函数时(箭头函数与生成器函数除外)，这个函数就默认为一个构造函数【虽然它可以当做普通函数来使用】。
* 约定：

  1. 构造函数通常约定首字母大写；函数对象约定首字母小写；
2. 构造函数调用的时候需要在前面加个 new 操作符；函数对象不需要。

​			==*new 一个函数的时候函数会被调用，不会return；如果构造函数没有形参，不需要加()和不加括号的调用过程一样的==

* 并不是所有的内置函数都是构造函数; 也并不是所有的自定义函数都是构造函数。
* 在Javascript中，当使用`new`操作符创建一个对象时，以下步骤将被执行：

  * 创建一个新的空对象。
  * 将新对象的原型`__proto__`链接到构造函数的原型对象`Constructor.prototype`上，以实现继承。
  * 将构造函数的作用域赋值给新对象(即，将`this`关键字绑定到新对象上)
  * 执行构造函数，将新对象作为构造函数的上下文(即`this`)传递。
  * 如果构造函数没有显式返回一个对象，则返回新对象。


#### 2) prototype、__ proto __、constructor

* prototype 被称为显式原型【通常是我们自己写，自己设置的，主要针对构造函数】

* __ proto __ 被称为隐式原型【自己生成的, 一般不会去更改，**但是可以改**，主要针对实例化对象】

* constructor 被称为构造器【通常是prototype的反方向，主要针对构造函数的显式原型】

==`constructor`方法在创建对象实例时被自动调用，它的主要作用是初始化对象的属性和执行任何其他的准备工作。
可以将`constructor`方法看作是类的构造函数，它定义了创建对象时需要执行的代码。==

* ==为显示原型里面设置的元素会在new后以隐式原型的形式出现。==

![image-20230622171142948](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202306221711235.png?raw=true)

![image-20230622171730233](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202306221717436.png?raw=true)

![image-20230622172034512](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202306221720715.png?raw=true)

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
Function.prototype               
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

#### 3) instanceof

* 用于检测构造函数的prototype 属性是否出现在某个实例对象的原型链上
* 语法：``object instanceof constructor `
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

### 2.this

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

#### 1) 默认绑定

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

****

#### 2) 隐式绑定

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

#### 3) 显式绑定

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

##### (1) call()

* `call(对象, arg1, arg2...)` 第一个参数是新的this指向，从`arg1`参数开始之后是传递给参数的实参，可以是数字、字符串和数组等类型的数据类型都可以。

```javascript
debugger;const obj = { a: 100 };
function sum(x, y) {
    console.log(this.a + x + y);
}
sum(1, 2)   // underfined+1+2=NaN this指向window，window下面没有a属性，所以window.a是undefined
sum.call(obj, 1, 2)   // 100+1+2=103 通过call改变this，让其指向obj，obj下面具有a属性，所以obj.a是100
```

##### (2) apply() 

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

##### (3) bind()

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
        }
        .call(obj1), 0)
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

#### 4) new绑定

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

#### 5) 箭头函数绑定

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
```

**原型链中的this**: this这个值在一个继承机制中，仍然是指向它原本属于的对象，而不是从原型链上找到它时，它 所属于的对象。 

<center><h3>总结</h2></center>

> **1.函数外面的this，即全局作用域的this指向window。 **
>
> **2.函数里面的this总是指向直接调用者；如果没有直接调用者，隐含的调用者是window。 **
>
> **3.用new调用一个函数，这个函数即为构造函数。构造函数里面的this是和实例对象沟通 的桥梁，它指向实例对象。 **
>
> **4.事件回调里面，this指向绑定事件的对象，而不是触发事件的对象。当然这两个可以是一样的。 **
>
> **5.箭头函数内的this由外层作用域决定**
>
> 简单来说 this 的指向跟函数的调用位置紧密相关，要想知道函数调用时 this 到底引用了什么，就应该明确函数的调用位置。
