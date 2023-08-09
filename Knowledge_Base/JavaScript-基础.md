##  JavaScript 基础

* **JavaScript** 运行在客户端的脚本语言，不需要编译，由js解释器(js引擎)逐行解释执行。Node.js也可以用于服务器端编程。     
* **JavaScript组成:** ECMAScript(JavaScript语法)、DOM(文档对象模型)访问HTML文档的所有元素、BOM(浏览器对象模型)它使JavaScript有能力与浏览器进行对话
* **JavaScript的作用: **
  - 表单动态校验(密码强度检测)
  - 网页特效
  - 服务端开发(Node.js)
  - 桌面程序(Electron)、App(Cordova)、控制硬件-物联网(Ruff)、游戏开发(cocos2d-js) 

## 1.javascript几种形式

* JS有三种书写方式, 分别为行内、内嵌和外部。

**行内式**

```javascript
<input type="button" value="请点击我" onclick="alert('Hello World')" />
```

**内嵌式**

```javascript
<script>alert('你好, JavaScript')</script>
```

**外部式**

```javascript
<script src="./js1.js" ></script>
```

## 2. 基础语法

### 2.1 结束符

* JavaScript 程序的执行单位为行(line)，也就是一行一行地执行。一般情况下，每一行就是一个语句。
* 语句以分号`;`结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。
* `;`分号前面可以没有任何内容，JavaScript 引擎将其视为空语句。
* 换行也标志着结束

### 2.2 注释

单行注释: `//`

多行注释: `/* `

​					`...... `

​					`*/`

### 2.3 打印(输出内容)
**输出到控制台:**  `console.log()`
**输出到页面:** `document.write()`
**弹出:** `alert()`(警告框)

```javascript
// 几种弹框
alert()       //警告框, 没有返回值
confirm()     //确认框, 返回布尔值
prompt()      //输入框, 点确定:返回用户输入的内容, 点取消:返回null
```

### 2.4 获取页面中的元素作为js对象

 ```javascript
 document.getElementById()    # 返回对象(通常会称作元素对象)
 
 /*
 元素对象与HTML元素存在映射关系, 元素对象用来描述某个HTML元素
 HTML元素的属性, 会映射成元素对象的属性
 举个例子：
 <script>
     document.write('<p id="demo">段落,独占一行</p>');  
 	p = document.getElementById('demo');  
 	p.innerHTML='行内标签';
 </script>
 */
 ```

```javascript
// 一个简单地计算器案例
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>简易计算器</title>
    <style>
        input {
            width: 300px;
            font-size: 16px;
            line-height: 18px;
            padding:10px;
            border: 1px solid #ccc;
        }
        
        button {
            padding: 10px 20px;
            border: 1px solid #ccc;
            background: #f5f5f5;
        }
        .res {
            width: 300px;
            height: 100px;
            padding: 10px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <h1>计算器</h1>
    <hr>
    
    <table>
        <tr>
            <td>加数1：</td>
            <td>
                <input type="text" id="num1">
            </td>
        </tr>

        <tr>
            <td>加数2：</td>
            <td>
                <input type="number" id="num2">
            </td>
        </tr>

        <tr>
            <td></td>
            <td>
                <button onclick="add()">+</button>
            </td>
        </tr>

        <tr>
            <td></td>
            <td>
                <div class="res" id="box"></div>
            </td>
        </tr>
    </table>
    <script>        
        //定义函数
        function add() {
            // 获取 用户在 input 中输入的内容
            // 获取元素对象 返回对象 对象描述 id是num1的元素 
            var inputEle1 = document.getElementById('num1');
            var inputEle2 = document.getElementById('num2');

            //获取用户在input中输入的值
            var v1 = inputEle1.value;
            var v2 = inputEle2.value;

            //判断用户输入是否是纯数字
            if (isNaN(v1)) {
                alert('加数1必须是纯数字');
                return; 
            }
            if (isNaN(v2)) {
                alert('加数2必须是纯数字');
                return;
            }
            //把字符串转换为数字
            v1 = Number(v1);
            v2 = Number(v2);

            //两个数相加
            var sum = v1 + v2;

            //获取放结果的div元素 innerHTML 获取或者设置 双标签内的内容
            var boxEle = document.getElementById('box');
            boxEle.innerHTML = sum;
        }
    </script>    
</body>
</html>
```

### 2.5 变量

* Javascript 使用关键字var、let、const来定义变量
#### 1) var 定义变量
```javascript
var 变量名 = 值;
// var:关键字
// 变量名(标识符): 变量名由字母、数字、下划线和$组成且不能以*数字*开头,变量名不能使用关键字。中文是合法的标识符, 可以用作变量名。
// 声明变量而没给赋值, 默认是undefined, undefined 是一个特殊的值, 表示‘无意义’。
// 如果变量赋值的时候忘了写var 关键字, 这条语句也是有效的; 
// 但是不写var 不利于表达意图, 而且容易不知不觉的创建全局变量, 所以建议使用var声明变量。
// 如果一个变量没有声明就直接使用, JavaScript 会报错, 告诉你变量未定义: ReferenceError: x is not defined。

var a, b;
// var 关键字还可以同时声明多个变量

var a = 1;
a = "js";
// JavaScript 是一种动态类型语言, 也就是说, 变量的类型没有限制，变量可以随时更改类型。
// 变量a 先被赋值了一个数值, 后又被重新赋值为一盒字符串。第二次赋值的时候因为变量a 已经存在, 所以不需要使用var 关键字。
var a;
// 如果同一个变量被声明了两次, 第二次声明是无效的。
var a = 2;
// 但是如果第二次声明的时候还进行了赋值, 则会覆盖掉前面的值。
```
==**var 变量提升*: ** 使用`var`关键字声明的变量会自动提升到函数作用域的顶部; 也就是把所有变量声明都拉到函数作用域的顶部==

```javascript
// Javascript 引擎的工作方式是, 先解析代码, 获取所有被声明的变量, 然后再一行一行地运行。这就会造成所有的变量的声明语句都会被提升到代码的头部, 这就叫做变量提升（hoisting）
console.log(a);
var a = 1;
// undefined
// undefined
// 上面代码首先使用console.log方法在控制台打印变量a的值, 这时变量a还没有声明和赋值，所以这是一种错误的做法，但是实际上不会报错。因为存在变量提升，所以真正运行的是下面的代码
var a;
sonsole.log(a);
a = 1;
// 最后的结果是显示undefined，表示变量a已声明，但还未赋值
```

**标识符:** 开发人员为变量属性函数参数名取的名字, 标识符不能是关键字或保留字
**关键字:** JS 本身已经用了的名字，不能再用这些充当变量名、方法名。
**保留字:** 就是预留的关键字, 还不是关键字未来可能会成为关键字, 同样不能使用它们当变量名或方法名。
**关键字和保留字:**

```javascript
break case catch class const continue debugger default delete do else export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield arguments await boolean byte char double enum eval float goto implements int interface let long native package private protected public short static synchronized throws transient volatile
// 注意: 如果将保留字用作变量名或函数名, 那么除非将来的浏览器实现了该保留字, 否则很可能收不到任何错误消息。当浏览器将其实现后, 该单词将被看做关键字, 如此将出现关键字错误。
```

#### 2) let 定义变量

* let 跟var 的作用差不多, 但是有着非常重要的区别。最明显的区别是, ==let 声明的范围是块作用域, 而var 声明的范围是函数作用域==。
```javascript
if (true) {
    var name = "zy";
    console.log(name);      // zy    
}
console.log(name);          // zy
// 换成let 定义变量
if (true) {
    let age = 18;
    console.log(age);      // 18    
}
console.log(age);          // arn_js.js:5 Uncaught ReferenceError: age is not defined
// 可以看到age 变量不能再if 块外部被引用, 以为它的作用域仅限于该块内部。
// 块作用域是函数作用域的子集, 所以使用域var 的作用域限制同样也适用于let。

var name;
var name;

var age;
let age;     // ntaxError: Identifier 'age' has already been declared
// let 也不允许同一个作用域中出现出现冗余声明, 会导致报错;
// Javascript 引擎会记录用于变量声明的标识符及其所在的块作用域, 所以嵌套使用相同的标识符不会报错, 因为在同一个块中没有重复声明。
// 对声明冗余报错不会因混用let 和var 而受影响; 这两个关键字声明的并不是不同类型的变量, 他们只是指出变量在相关作用域如何存在。
```
==**let变量提升*:**let 与var 的另一个区别就越是let 声明的变量不会在作用域中被提升==。

```javascript
console.log(name);     // undefined
var name = "zhou";
// age 不会被提升
console.log(age);     // ReferenceError: age is not defined
let age = 26;
// Javascript 引擎会注意出现在块后面的let声明, 只不过再此之前不能以任何方式来引用未声明的变量;
// 在let 声明之前的执行瞬间被称为“暂时性死区”, 在此阶段引用任何后面声明的变量都会抛出ReferenceError。
// 使用let 在全局作用域中声明的变量不会成为window对象的属性, var声明的变量则会。
```
#### 3) const定义常量
* conset 与let 基本相同, 唯一一个重要的区别是用它声明变量时必须同时初始化变量, 且尝试修改const 声明的变量会导致运行时错误。

```javascript
const name = "dada";
name = "da";        // typeError: Assignment to constant variable
// const也不允许重复声明, 声明的作用域也是块。
// const声明的限制只适用于它指向的变量的引用;    换句话说, 如果const变量引用的是一个对象, 那么修改这个对象内部的属性并不违反const的限制。
```
### 2.6 区块
* Javascript 使用大括号, 将多个相关的语句组合在一起,  称为“区块”(block)。
* 对于 var 关键字来说, Javascript 的区块不构成单独的作用域(scope)。
```javascript
// 语法:
{
    var a = 1;
}
console.log(a);  // 1
// 注意: 在区块中var 声明并赋值了变量a, 然后在区块外部变量a 依然有效, 区块对于var 不构成单独的作用域, 与不使用区块的情况没有任何区别。
// 在Javascript 语言中, 单独使用区块并不常见, 区块往往用来构成其他更复杂的语法结构, 比如for、if、while、function 等。
```

### 2.7 条件语句

* Javascript 提供`if`结构和`switch`结构, 完成条件判断, 即只有满足预设的条件才会执行相应的语句。

#### 1) if 结构

* `if`结构先判断一个表达式的布尔值, 然后根据布尔值的真伪, 执行不同的语句。布尔值: true、false
```javascript
// 语法:
if (布尔值)
	语句;
	
// 或者
if (布尔值) 语句;
// “布尔值”往往由一个条件表达式产生的, 必须放在圆括号中, 表示对表达式求值。
// 如果表达式的求值结果为true, 就执行紧跟在后面的语句；如果结果为false, 则跳过紧跟在后面的语句
// 注意: if 后面的表达式之中, 不要混淆赋值表达式"=",严格相等运算符"==="和相等运算符"=="", 尤其是赋值表达式不具有比较作用。

// 上面这种写法要求条件表达式后面只能有一个语句。
// 如果想执行多个语句, 必须在if的条件判断之后, 加上大括号, 表示代码块(多个语句合并成一个语句)。
if (布尔值) {
	语句1;
	语句2;
}
```
#### 2) if...else 结构

*  `if`代码块后面，还可以跟一个`else`代码块, 表示不满足条件时, 所要执行的代码。

```javascript
// 语法:
if (a === 3) {
  // 满足条件时, 执行的语句
} else {
  // 不满足条件时, 执行的语句
}
// 对同一个变量进行多次判断时, 多个if...else 语句可以连写在一起
if (a === 0) {
  // ...
} else if (a === 1) {
  // ...
} else if (a === 2) {
  // ...
} else {
  // ...
}
```

#### 3) switch 结构

* 多个`if...else`连在一起使用的时候,  可以转为更方便的 `switch`结构。

```javascript
// 语法:
switch (fruit) {
  case "banana":
    // ...
    break;
  case "apple":
    // ...
    break;
  default:
    // ...
}
// 上边的结构根据变量fruit 的值, 选择执行相应的case。如果所有case 都不符合, 则执行最后的default 部分。
// 需要注意的是, 每个case 代码块内部的break 语句不能少, 否则会接下去执行下一个case 代码块, 而不是跳出switch 结构。
// switch 语句部分和case 语句部分, 都可以使用表达式; 需要注意的是switch 语句后面的表达式与case语句后面的表示式比较运行结果时, 
// 采用的是严格相等运算符"===",而不是相等运算符"==", 这意味着比较时不会发生类型转换。
```

#### 4) 三元运算符[ ?: ]

* Javascript 还有一个三元运算符(即该运算符需要三个运算子)`?:`, 也可以用于逻辑判断。
`(条件) ? 表达式1 : 表达式2`

```javascript
var even = (n % 2 === 0) ? true : false;
// 如果n可以被2整除, 则even 等于true, 否则等于false。
// 等同于:
var even;
if (n % 2 === 0) {
  even = true;
} else {
  even = false;
}
// 可以被视为if...else...的简写形式，因此可以用于多种场合。
```

### 2.8 循环语句

* 循环语句用于重复执行某个操作, 它有多种形式。

#### 1) while 循环

* `while`语句包括一个循环条件和一段代码块, 只要条件为真, 就不断循环执行代码块。

```javascript
// 语法:
while (条件)
  语句;
// 或者
while (条件) 语句;
// while 语句的循环条件是一个表达式, 必须放在圆括号中; 代码块部分, 如果只有一条语句, 可以省略大括号, 否则就必须加上大括号。
while (条件) {
  语句;
}
```

#### 2) for 循环

* `for`语句是循环命令的另一种形式, 可以指定循环的起点、终点和终止条件。

```javascript
// 语法:
for (初始化表达式; 条件表达式; 递增表达式)
  语句
// 或者
for (初始化表达式; 条件表达式; 递增表达式) {
  语句
}
// 初始化表达式（initialize）: 确定循环变量的初始值, 只在循环开始时执行一次。
// 条件表达式（test）: 每轮循环开始时, 都要执行这个条件表达式, 只有值为真才继续进行循环。
// 递增表达式（increment）: 每轮循环的最后一个操作, 通常用来递增循环变量。

// for语句的三个部分(initialize、test、increment), 可以省略任何一个, 也可以全部省略。
for ( ; ; ){
  console.log('Hello World');
}
// 省略for语句表达式的三个部分，结果就导致了一个无限循环。
```

#### 3) do...while 循环

* `do...while`循环与`while`循环类似，唯一的区别就是先运行一次循环体，然后判断循环条件。

```javascript
// 语法:
do
  语句
while (条件);
// 或者
do {
  语句
} while (条件);
// 不管条件是否为真, do...while循环至少运行一次, 这是这种结构最大的特点, while语句后面的分号注意不要省略。
```

#### 4) break、continue 语句

* `break`语句和`continue`语句都具有跳转作用，可以让代码不按既有的顺序执行。

* `break`语句用于跳出代码块或循环。

  ```javascript
  var i = 0;
  
  while(i < 100) {
    console.log('i 当前为：' + i);
    i++;
    if (i === 10) break;
  }
  // 上面代码只会执行10次循环, 一旦i等于10, 就会跳出循环
  // for循环也可以使用break语句跳出循环。
  for (var i = 0; i < 5; i++) {
    console.log(i);
    if (i === 3)
      break;
  }
  ```

* `continue`语句用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环。

  ```javascript
  var i = 0;
  
  while (i < 100){
    i++;
    if (i % 2 === 0) continue;
    console.log('i 当前为：' + i);
  }
  // 上面代码只有在i为奇数时, 才会输出i的值。如果i为偶数, 则直接进入下一轮循环。
  ```

* 如果存在多重循环，不带参数的`break` 语句和`continue`语句都只针对最内层循环。

### 2.9 代码规范:

#### 1) 标识符命名规范

- 变量、函数的命名必须要有意义
- 变量的名称一般用名词
- 函数的名称一般用动词

#### 2) 单行注释规范

* // 单行注释前面注意有个空格

#### 3) 其它规范

* 关键词 操作符空格

## 3. 数据类型

* JavaScript 语言的每一个值, 都属于某一种数据类型。Javascript 有以下几种数据类型:
 * undefined(未定义): 表示"未定义" 或不存在, 由于没有定义, 所以此处暂时没有任何值; 默认值 "undefined"
 * boolean(布尔): 表示真(`true`)和假()的两个特殊的值; 默认值 false
 * string(字符串): 文本; 默认值 " "
 * number(数字): 整数和小数; 默认值 0
 * object(对象): 各种值组成的集合
 * array(数组):  数组
 * function(函数):  函数
 * symbol(符号):  符号类型
 * null(空值): 即此处的值为空, 默认值 null】
其中Null 和undefined 都是被动产生

### 3.1 typeof 运算符

* `typeof`运算符可以返回一个值的数据类型。

```javascript
// 通过以下字面量判断
typeof 'biubiubiu';            // string
typeof 123;                    // number
typeof false;                  // boolean
typeof undefined;              // undefined
typeof Symbol(1);              // symbol
typeof window;                 // object
typeof [];                     // object
//instanceof运算符可以区分数组和对象
var o = {};
var a = [];
o instanceof Array             // false
a instanceof Array             // true

typeof {};                     // object
typeof (function f() {});      // function 

typeof null;                   // object
// null的类型是object，这是由于历史原因造成的。\
// 1995年的 JavaScript 语言第一版, 只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值）, 没考虑null, 只把它当作object的一种特殊值。
// 后来null独立出来, 作为一种单独的数据类型, 为了兼容以前的代码, typeof null返回object就没法改变了
```

### 3.2 null 、undefined 和 NaN

* `null`与`undefined`都可以表示“没有”, 含义非常相似; 将一个变量赋值为`undefined`或`null`, 语法效果几乎没区别。

* `null`表示空值, 即该处的值现在为空。调用函数时, 某个参数未设置任何值, 这时就可以传入`null`, 表示该参数为空。

* `if`语句中，它们都会被自动转为`false`, 相等运算符（`==`）甚至直接报告两者相等。

  ```javascript
  var a = undefined;
  // 或者
  var a = null;
  
  undefined == null            // true  
  
  // 函数没有返回值时, 默认返回 undefined
  function f() {}
  f()                         // undefined
  ```

* NaN是 JavaScript 的特殊值, 表示“非数字”(Not a Number)

* 一般被动产生(数据类型转为Number, 不能转为正常的数字, 就是NaN); 函数 `isNaN()` 判断是不是NaN或者能不能转换为NaN

  ```javascript
  // javascript 设计之初, 只设置了null表示无。根据C语言的传统, null可以自动转为0。
  NUmber(null)       // 0
  // Javascript 的设计者Brendan Eich, 觉得这样做还不够。首先, 第一版的JavaScript 里面, null就像在Java 里一样, 被当成一个对象。
  // Brendan Eich 觉得表示“无”的值最好不是对象。其次, 那时的Javascript 不包括错误处理机制, Brendan Eich觉得如果null自动转为0, 很不容易发现错误。
  // 他又设计了一个undefined, null是一个表示“空”的对象, 转为数值时为0; undefined是一个表示"此处无定义"的原始值, 转为数值时为NaN。
  NUmber(undefined)  // NaN
  
  // NaN在布尔运算时被当作false。
  Boolean(NaN)       // false
  
  // NaN跟任何值进行任何运算, 结果仍然NaN 跟谁都不相等, 包括自己
  NaN + 1            // NaN
  NaN + '1'          // NaN
  NaN === NaN        // false
  
  0除以0也会得到NaN。
  0 / 0              // NaN
  
  // 在判断是否为NaN 时,可以使用isNaN() 函数或者Object.is() 方法来检查。 
  // isNaN() 函数会在参数无法转换为数字时返回true;
  // Object.is() 方法严格检查两个参数是否是相同的值,包括NaN 与 NaN。
  ```

### 3.3 Boolean 布尔值

* 布尔值代表“真”和“假”两个状态。“真”用关键字`true`表示, “假”用关键字`false`表示。

  ```javascript
  // 下列运算符会返回布尔值:
  前置逻辑运算符： !
  相等运算符：===, !==, ==, !=
  比较运算符：>, >=, <, <=
      
  // 如果Javascript 预期某个位置应该是布尔值, 会将该位置上现有的值自动转为布尔值。
  // 转换规则是除了下面六个值被转为false, 其他值都视为true。
  undefined
  null
  false
  0
  NaN
  ""或'' (空字符串)
  ```

* 布尔值往往用于程序流程的控制

  ```javascript
  // 注意, 空数组([])和空对象({})对应的布尔值, 都是true
  if ([]) {
    console.log('true');  // true
  }
  
  if ({}) {
    console.log('true');  // true
  }
  ```

### 3.4 Number 数字

#### 1) 整数和浮点数

* Javascript 内部所有数字都是以64为浮点数形式存储, 即使整数也是如此。

  ```javascript
  // 1 与 1.0 是相同的, 是同一个数
  1 === 1.0    // true
  
  // Javascript 语言的底层根本没有整数, 所有数字都是小数（64位浮点数）。
  // 容易造成混淆的是, 某些运算只有整数才能完成, 此时Javascript 会自动把64位浮点数, 转成32位整数然后再进行运算。
  
  // 注意浮点数不是精确的值, 所以涉及小数的比较和运算要特别小心。
  0.1 + 0.2 === 0.3;    // false
  0.3 / 0.1;    // 2.9999999999999996
  (0.3 - 0.2) === (0.2 - 0.1)   // flase
  ```

#### 2) 数值精度

* 根据国际标准 IEEE 754, JavaScript 浮点数的64个二进制位, 从最左边开始, 是这样组成的。

  - 第1位：符号位, `0`表示正数, `1`表示负数
  
  - 第2位到第12位（共11位）：指数部分

  - 第13位到第64位（共52位）：小数部分（即有效数字）
  
     ==符号位决定了一个数的正负, 指数部分决定了数值的大小, 小数部分决定了数值的精度。==
  
* 指数部分一共有11个二进制位, 因此大小范围就是0到2047。

* IEEE 754 规定, 如果指数部分的值在0到2047之间（不含两个端点）, 那么有效数字的第一位默认总是1, 不保存在64位浮点数之中。

* 也就是说, 有效数字这时总是`1.xx...xx`的形式，其中`xx..xx`的部分保存在64位浮点数之中, 最长可能为52位。因此, JavaScript 提供的有效数字最长为53个二进制位。

```javascript
(-1)^符号位 * 1.xx...xx * 2^指数部分   
// 上面公式是正常情况下（指数部分在0到2047之间）,一个数在 Javascript 内部实际的表示形式。
// 精度最多只能到53个二进制位, 这意味着, 绝对值小于2的53次方的整数, 即-253到253, 都可以精确表示。
// 由于2的53次方是一个16位的十进制数值, 所以简单的法则就是, Javascript 对15位的十进制数都可以精确处理
```

#### 3) 数值范围

* 64位浮点数的指数部分的长度是11个二进制位, 意味着指数部分的最大值是2047（2的11次方减1）。

* 也就是说, 64位浮点数的指数部分的值最大为2047, 分出一半表示负数, 则 JavaScript 能够表示的数值范围为21024到2-1023（开区间）, 超出这个范围的数无法表。

  ```javascript
  // 如果一个数大于等于2的1024次方, 那么就会发生“正向溢出”，即 JavaScript 无法表示这么大的数, 这时就会返回`Infinity`
  Math.pow(2, 1024);    // Infinity
  
  // 如果一个数小于等于2的-1075次方（指数部分最小值-1023,再加上小数部分的52位）, 那么就会发生为“负向溢出”, 即Javascript 无法表示这么小的数, 这时会直接返回0。
  Math.pow(2, -1076);   // 0 
  
  // 例子:
  var x = 0.5;
  
  for(var i = 0; i < 25; i++) {
    x = x * x;      // 0.5连续做25次平方, 由于最后结果太接近0, 超出了可表示的范围Javascript 就直接将其转为 0。
  }
  ```

* Javascript 提供`Number`对象的`MAX_VALUE`和`MIN_VALUE`属性, 返回可以表示的具体的最大值和最小值。 

  ```javascript
  Number.MAX_VALUE // 1.7976931348623157e+308
  Number.MIN_VALUE // 5e-324
  ```

#### 5) 数值表示法

* 数值也可以采用科学计数法表示, 科学计数法允许字母`e`或`E`的后面跟着一个整数, 表示这个数值的指数部分。

* 下面两种情况，JavaScript 会自动将数值转为科学计数法表示, 其它情况采用字面形式直接表示:

  * 小数点前的数字多于21位

    ```javascript
    1234567890123456789012      // 1.2345678901234568e+21
    
    123456789012345678901       // 123456789012345680000
    ```

  * 小数点后的零多于5个

    ```javascript
    // 小数点后紧跟5个以上的零, 就自动转为科学计数法
    0.0000003 // 3e-7
    
    // 否则, 就保持原来的字面形式
    0.000003 // 0.000003
    ```

#### 6) 数值的进制

* 使用字面量直接表示一个数值时, Javascript 对整数提供四种进制的表示方法: 十进制、二进制、八进制和十六进制。

  * 十进制：没有前缀`0`的数值。
  * 八进制：有前缀`0o`或`0O`的数值, 或者有前导0、且只用到0-7的八个阿拉伯数字的数值。
  * 十六进制：有前缀`0x`或`0X`的数值。
  * 二进制：有前缀`0b`或`0B`的数值。

  ```javascript
  // Javascript 内部会自动将八进制、十六进制、二进制转为十进制。
  0xff   // 255
  0o377  // 255
  0b11   // 3
  
  // 如果八进制、十六进制、二进制的数值里面, 出现不属于该进制的数字就会报错
  0xzz   // 报错
  0o88   // 报错
  0b22   // 报错
  // 十六进制出现了字母z、八进制出现数字8、二进制出现数字2, 因此报错。
  // 有前导0的数值会被视为八进制, 但是如果前导0后面有数字8和9, 则该数值被视为十进制。
  0888   // 888
  0777   // 511
  // 处理时很容易造成混乱。ES5 的严格模式和ES6已经废除了这种表示法, 但是浏览器为了兼容以前的代码, 目前还继续支持这种表示法。
  ```

#### 7) 正零和负零

* Javascript 的64位浮点数之中, 有一个二进制位是符号位。这意味着, 任何一个数都有一个对应的负值, 就连`0`也不例外。

  ```javascript
  // Javascript 内部实际上存在2个0:一个是+0, 一个是-0, 区别就是64位浮点数表示法的符号位不同。它们是等价的。
  -0 === +0    // true
  0 === -0     // true
  0 === +0     // true
  
  // 几乎所有场合, 正零和负零都会被当作正常的0
  +0                  // 0
  -0                  // 0
  (-0).toString()     // '0'
  (+0).toString()     // '0'
  
  // 唯一有区别的场合是, +0或-0当作分母, 返回的值是不相等的。
  (1 / +0) === (1 / -0)   // 结果是false 是因为除以正零得到+Infinity, 除以负零得到-Infinity, 这两者是不相等的。
  ```

#### 8) Infinity 无穷

* `Infinity`表示“无穷”, 用来表示两种场景。一种是一个正的数值太大或一个负的数值太小无法表示；另一种是非0数值除以0得到`Infinity`。

  ```javascript
  // 场景1
  Math.pow(2, 1024)     // Infinity
  
  // 场景2
  0 / 0 				  // NaN
  1 / 0 				  // Infinity 0除以0会得到NaN，而非0数值除以0，会返回Infinity。
  ```

* `Infinity`有正负之分, `Infinity`表示正的无穷, `-Infinity`表示负的无穷。

  ```javascript
  Infinity === -Infinity          // false
  
  1 / -0 							// -Infinity
  -1 / -0 					    // Infinity
  // 非零正数除以-0，会得到-Infinity, 负数除以-0，会得到Infinity
  ```

* 由于数值正向溢出（overflow）、负向溢出（underflow）和被`0`除, JavaScript 都不报错, 所以单纯的数学运算几乎没有可能抛出错误。

  ```javascript
  // Infinity大于一切数值（除了NaN）, -Infinity小于一切数值（除了NaN）
  Infinity > 1000 				// true
  -Infinity < -1000 			    // true
  
  // Infinity与NaN比较, 总是返回false。
  Infinity > NaN                  // false
  -Infinity > NaN                 // false
  Infinity < NaN                  // false
  -Infinity < NaN                 // false
  ```

* Infinity 运算

  * `Infinity`的四则运算, 符合无穷的数学计算规则
  * 0乘以`Infinity`返回`NaN`；0除以`Infinity`返回`0`；`Infinity`除以0返回`Infinity`
  * `Infinity`加上或乘以`Infinity` 返回的还是`Infinity`。
  * `Infinity`减去或除以`Infinity`得到`NaN`。
  * `Infinity`与`null`计算时`null`会转成0，等同于与`0`的计算。
  * `Infinity`与`undefined`计算, 返回的都是`NaN`。

#### 9) 数值相关的全局方法

* `parseInt()`方法用于将字符串转为整数。

  ```javascript
  parseInt('3.14');            // 3
  parseInt('    3');           // 3 字符串头部和尾部有空格, 空格会被自动去除 
  
  // 如果parseInt的参数不是字符串, 则会先转为字符串再转换。
  // 字符串转为整数的时候, 是一个个字符依次转换, 如果遇到不能转为数字的字符就不再进行下去, 返回已经转好的部分。
  // parseInt的参数都是字符串, 结果只返回字符串头部可以转为数字的部分。
  // 如果字符串的第一个字符不能转化为数字(后面跟着数字的正负号除外),返回NaN。
  parseInt('abc')             // NaN
  parseInt('.3')              // NaN
  parseInt('')                // NaN
  parseInt('+')               // NaN
  parseInt('+1')              // 1
  // parseInt的返回值只有两种可能, 要么是一个十进制整数, 要么是NaN。
  // 如果字符串以0x或0X开头, parseInt会将其按照十六进制数解析; 同理如果字符串以0开头, 将其按照10进制解析。
  // 自动转为科学计数法的数字, parseInt会将科学计数法的表示方法视为字符串, 因此导致一些奇怪的结果。
  parseInt(1000000000000000000000.5)    // 1
  // 等同于
  parseInt('1e+21')                     // 1
  parseInt(0.0000008)                   // 8
  // 等同于
  parseInt('8e-7')                      // 8
  
  // parseInt方法还可以接受第二个参数（2到36之间）,表示被解析的值的进制返回该值对应的十进制数;
  // 默认情况下parseInt 的第二个参数为10, 即默认是十进制转十进制。
  // 如果第二个参数不是数值会被自动转为一个整数; 这个整数只有在2到36之间才能得到有意义的结果,超出这个范围则返回NaN;
  // 如果第二个参数是0、undefined和null 则直接忽略。
  // 如果字符串包含对于指定进制无意义的字符,则从最高位开始只返回可以转换的数值,如果最高位无法转换则直接返回NaN。
  parseInt('1546', 2)                   // 1
  parseInt('546', 2)                    // NaN
  
  // 如果parseInt的第一个参数不是字符串, 会被先转为字符串。这会导致意外的结果:
  parseInt(0x11, 36)                    // 43
  parseInt(0x11, 2)                     // 1
  // 等同于
  parseInt(String(0x11), 36)
  parseInt(String(0x11), 2)
  // 等同于
  parseInt('17', 36)
  parseInt('17', 2)
  // 十六进制的0x11会被先转为十进制的17,再转为字符串。然后再用36进制或二进制解读字符串17,最后返回结果43和1。
  // 但是对于八进制的前缀0, 需要注意:
  parseInt(011, 2)                     // NaN
  // 等同于
  parseInt(String(011), 2)
  // 等同于
  parseInt(String(9), 2)
  // 011会被先转为字符串9, 因为9不是二进制的有效字符所以返回NaN。如果直接计算parseInt('011', 2),011则是会被当作二进制处理返回3。
  // JavaScript 不再允许将带有前缀0的数字视为八进制数,而是要求忽略这个0
  ```
  
* `parseFloat()`方法用于将一个字符串转为浮点数。

  ```javascript
  parseFloat('3.14')                     // 3.14
  
  // 如果字符串符合科学计数法,则会进行相应的转换。
  parseFloat('314e-2')                   // 3.14
  parseFloat('0.0314E+2')                // 3.14
  
  // 如果字符串包含不能转为浮点数的字符,则不再进行往后转换,返回已经转好的部分。
  parseFloat('3.14biubiubiu')            // 3.14
  
  // parseFloat方法会自动过滤字符串前导的空格。
  parseFloat('\t\v\r12\n ')              // 12
  
  // 如果参数不是字符串,则会先转为字符串再转换。
  parseFloat([1.23])             // 1.23
  // 等同于
  parseFloat(String([1.23]))     // 1.23
  
  // 如果字符串的第一个字符不能转化为浮点数,则返回NaN
  parseFloat([])                 // NaN
  parseFloat('biubiubiu3')       // NaN
  parseFloat('')                 // NaN parseFloat会将空字符串转为NaN
  
  // parseFloat 的转换结果与Number 函数对比:
  parseFloat(true)               // NaN
  Number(true)                   // 1
  
  parseFloat(null) 			   // NaN
  Number(null)                   // 0
  
  parseFloat('')                 // NaN
  Number('')                     // 0
  
  parseFloat('123.45#')          // 123.45
  Number('123.45#')              // NaN
  ```

* `isNaN()`方法可以用来判断一个值是否为`NaN`。

  ```javascript
  // isNaN只对数值有效, 如果传入其他值会被先转成数值。
  isNaN(NaN)              // true  
  isNaN(123)              // false
  
  // 传入字符串的时候, 字符串会被先转成NaN, 所以最后返回true。isNaN为true的值,有可能不是NaN,而是一个字符串。
  isNaN('Hello')          // true
  // 等同于
  isNaN(Number('Hello'))  // true
  
  // 对于对象和数组,sNaN也返回true。
  isNaN({})                   // true
  // 等同于
  isNaN(Number({}))           // true
  isNaN(['tz'])               // true
  // // 等同于
  isNaN(Number(['tz']))       // true
  
  // 对于空数组和只有一个数值成员的数组, isNaN返回false。
  isNaN([])              // false
  isNaN([123])           // false
  isNaN(['123'])         // false
  //原因是这些数组能被Number函数转成数值。
  ```

* `isFinite()`方法返回一个布尔值, 表示某个值是否为正常的数值。

  ```javascript
  // 除了Infinity、-Infinity、NaN和undefined这几个值会返回false, isFinite对于其他的数值都会返回true
  isFinite(Infinity)                     // false
  isFinite(-Infinity)                    // false
  isFinite(NaN)                          // false
  isFinite(undefined)                    // false
  isFinite(null)                         // true
  isFinite(-1)                           // true
  ```

### 3.5 String 字符串

* 字符串就是零个或多个排在一起的字符, 放在单引号`'`或双引号`"`之中。

* 单引号字符串的内部可以使用双引号。双引号字符串的内部可以使用单引号。

* 如果要在单引号字符串的内部使用单引号，就必须在内部的单引号前面加上反斜杠`\`用来转义,双引号字符串内部使用双引号也是如此。

* 字符串默认只能写在一行内, 分成多行将会报错; 如果长字符串必须分成多行,可以在每一行的尾部使用反斜杠。

  ```javascript
  var info = " name \
      age \
      sex \
      ";
  // 加了反斜杠以后,原来写在一行的字符串,可以分成多行书写。但是输出的时候还是单行,效果与写在同一行完全一样。
  // 注意:反斜杠的后面必须是换行符,而不能有其他字符(比如空格),否则会报错。
  // 连接运算符"+"可以连接多个单行字符串,将长字符串拆成多行书写,输出的时候也是单行。
  ```

#### 1) 转义

* 反斜杠`\`在字符串内有特殊含义用来表示一些特殊字符, 所以又称为转义符
  
* 主要的反斜杠转义字符主要有以下这些:
  
  | 转义符号 |    含义    | unicode编码 |
  | :------: | :--------: | :---------: |
  |   `\0`   |    null    |   \u0000    |
  |   `\b`   |   后退键   |   \u0008    |
  |   `\f`   |   换页符   |   \u000C    |
  |   `\n`   |   换行符   |   \u000A    |
  |   `\r`   |   回车键   |   \u000D    |
  |   `\t`   |   制表符   |   \u0009    |
  |   `\v`   | 垂直制表符 |   \u000B    |
  |   `\'`   |   单引号   |   \u0027    |
  |   `\"`   |   双引号   |   \u0022    |
  |   `\\`   |   反斜杠   |   \u005C    |

#### 2) 字符串与数组

* 字符串可以被视为字符数组, 可以使用数组的方括号`[]`运算符用来返回某个位置的字符(位置索引从0开始)

* 如果方括号中的数字超过字符串的长度, 或者方括号中根本不是数字, 则返回`undefined`。

  ```javascript
  var name = 'Tang zhengwei';
  name['x'];      // undefined
  // 字符串与数组的相似性仅此而已, 无法改变字符串之中的单个字符。
  ```

#### 3) length 长度

* `length`属性返回字符串的长度，该属性也是无法改变的。

  ```javascript
  var name = 'Tang zhengwei';
  name.length;    // 13
  ```

#### 4) 字符集

* Javascript 使用 `Unicode` 字符集。JavaScript 引擎内部所有字符都用 Unicode 表示。

* Javascript 不仅以 Unicode 储存字符, 还允许直接在程序中使用 Unicode 码点表示字符, 即将字符写成`\uxxxx`的形式, 其中`xxxx`代表该字符的 Unicode 码点。

  ```javascript
  var s = '\u00A9';
  s               // '©'
  
  // 解析代码的时候Javascript 会自动识别一个字符是字面形式表示还是Unicode 形式表示。输出给用户的时候, 所有字符都会转成字面形式。
  var f\u006F\u006F = 'abc';
  foo             // "abc"
  ```

* 每个字符在Javascript 内部都是以16位（即2个字节）的UTF-16 格式储存。Javascript 的单位字符长度固定为16位长度, 即2个字节。

  码点在`U+10000`到`U+10FFFF`之间的字符，Javascript 总是认为它们是两个字符（`length`属性为2）

#### 5) Base64 转码

* 有时文本里面包含一些不可打印的符号, 比如ASCII 码0到31的符号都无法打印出来, 这时可以使用Base64 编码, 将它们转成可以打印的字符;

  另一个场景是, 有时需要以文本格式传递二进制数据, 那么也可以使用 Base64 编码。

* Base64 就是一种编码方法可以将任意值转成 0～9、A～Z、a-z、`+`和`/`这64个字符组成的可打印字符。使用它的主要目的不是为了加密, 而是为了不出现特殊字符, 简化程序的处理。

* JavaScript 原生提供两个Base64 相关的方法:

  - `btoa()`：从二进制数据“字符串”创建一个 Base-64 编码的 ASCII 字符串（“btoa”应读作“binary to ASCII”）
  - `atob()`：解码通过 Base-64 编码的字符串数据（“atob”应读作“ASCII to binary”）

```javascript
var info = "Hello World! Javascript!";
// btoa(info)         // SGVsbG8gV29ybGQhIEphdmFzY3JpcHQh 
atob('SGVsbG8gV29ybGQhIEphdmFzY3JpcHQh')

// 注意: 这两个方法不适合非ASCII码的字符, 会报错。
// btoa('你好');     // DoMException 
// 需要将非ASCII 码字符转为Base64 编码, 必须中间插入一个转码环节, 再使用这两个方法:
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}
// Usage:
utf8_to_b64("开场散场");                // '5byA5Zy65pWj5Zy6'
b64_to_utf8("5byA5Zy65pWj5Zy6");       // '开场散场'
```

### 3.6 object 对象

* 对象（object）是 JavaScript 语言的核心概念。也是最重要的数据类型

* 什么是对象？简单说, 对象就是一组“键值对”（key-value）的集合, 是一种无序的复合数据集合。

  ```javascript
  var obj = {
      foo: 'Hello',
      bar: 'Js'
  }
  typeof obj;      // obj
  // 大括号就定义了一个对象，它被赋值给变量obj, 所以变量obj就指向一个对象;
  // 该对象内部包含两个键值对（又称为两个“成员”）,第一个键值对是foo: 'Hello',其中foo是“键名”（成员的名称）,字符串Hello是“键值”（成员的值）;
  // 键名与键值之间用冒号分隔。第二个键值对是bar: 'World'，bar是键名，World是键值。两个键值对之间用逗号分隔。
  ```
#### 1) 键名
  * 对象的所有键名都是字符串（ES6 又引入了 Symbol 值也可以作为键名）, 所以加不加引号都可以。

  * 如果键名是数值, 会被自动转为字符串。

    ```javascript
    // 对象obj的所有键名虽然看上去像数值,实际上都被自动转成了字符串。
    var obj = {
        1: 'Hello',
        2: 'Js'
    };
    obj[1]        // Hello
    // 如果键名不符合标识名的条件（比如第一个字符为数字,或者含有空格或运算符）,且也不是数字,则必须加上引号,否则会报错。
    ```

  * 对象的每一个键名又称为“属性”（property）, 它的“键值”可以是任何数据类型; 如果一个属性的值为函数, 通常把这个属性称为“方法”, 它可以像函数那样调用。

    ```javascript
    var obj = {
      p: function (x) {    // 对象obj 的属性p 就指向一个函数
        return 2 * x;
      }
    };
    
    obj.p(1)      // 2
    ```

  * 如果属性的值还是一个对象, 就形成了链式引用。

    ```javascript
    var obj1 = {};
    var obj2 = {
        'name': 'flin',
        'age': 18
    }
    obj1.info = obj2;
    console.log(obj1);  
    /*{
        "info": {
            "name": "flin",
            "age": 18
        }
    }*/
    obj1.info.name        // flin  对象obj1的属性info指向对象obj2, 就可以链式引用obj2的属性。
    ```

  * 对象的属性之间用逗号分隔, 最后一个属性后面可以加逗号, 也可以不加。

  * 属性可以动态创建，不必在对象声明时就指定。

#### 2) 对象的引用

* 如果不同的变量名指向同一个对象, 那么它们都是这个对象的引用, 也就是说指向同一个内存地址; 修改其中一个变量, 会影响到其他所有变量。

  ```javascript
  var obj1 = {};
  var obj2 = obj1;
  
  obj1.name = "flin";
  obj2.name           // flin
  obj2.age = 18;
  obj1.age            // 18
  // obj1和obj2指向同一个对象, 其中任何一个变量添加属性,另一个变量都可以读写该属性。
  
  // 若新对象的属性所指向的对象的属性被修改, 所指向的对象的属性也会被修改
  var obj1 = {};
  var obj2 = {
      'name': 'flin',
      'age': 18
  }
  obj1.info = obj2;
  obj1.info.name = "tzw";    // 修改引用对象
  obj2.name;       // 'tzw'
  obj2.age = 28;             // 修改原对象
  obj1.info.age    // 28
  ```

* 如果取消某一个变量对于原对象的引用, 不会影响到另一个变量

  ```javascript
  var obj1 = {};
  var obj2 = obj1;
  
  obj1 = 1;
  obj2              // {}  obj1和obj2指向同一个对象，然后obj1的值变为1, 这时不会对obj2产生影响, obj2还是指向原来的那个对象。
  
  // 这种引用只局限于对象, 如果两个变量指向同一个原始类型的值, 此时变量都是值的拷贝。
  var x = 1;
  var y = x;
  
  x = 0;
  y;               // 1 当x的值发生变化之后, y的值不变, 这就表示x和y并不是指向的同一个内存地址。
  ```

* 表达式还是语句(对象采用大括号表示, 这导致了一个问题：如果行首是一个大括号, 它到底是表达式还是语句？)

  ```javascript
  // Javascript 引擎读到上面这行代码会发现可能有两种含义。
  // 第一种可能是;这是一个表达式,表示一个包含foo属性的对象; 第二种可能是, 这是一个语句, 表示一个代码区块。
  // 为了避免这种歧义,Javascript 引擎的做法是,如果遇到这种情况无法确定是对象还是代码块,一律解释为代码块。
  { console.log(123) }         // 只有解释为代码块才能执行。
  
  // 如果要解释为对象, 最好在大括号前加上圆括号。因为圆括号的里面,只能是表达式,所以确保大括号只能解释为对象。
  ({ foo: 123 })             // 正确
  ({ console.log(123) })     // 报错
  
  // 在eval语句（作用是对字符串求值）中反映得最明显。
  eval('{ foo: 123 }')             // 123
  eval('({ foo: "obj" })')         // {foo: 'obj'}
  // 如果没有圆括号,eval将其理解为一个代码块;加上圆括号以后,就理解成一个对象。
  ```

#### 3) 属性的操作

**属性的读取:**

* 读取对象的属性有两种方法: 一种是使用点`.`运算符，还有一种是使用方括号`[]`运算符。

  ```javascript
  var obj = {
      name: 'flin',
      1: 1.23
  }
  
  obj.name;            // 'flin'
  obj['name'];         // 'flin'  注意:如果使用方括号运算符, 键名必须放在引号里面, 否则会被当作变量处理。
  obj[1];              // 1.23    数字键可以不加引号, 因为会自动转成字符串。
  obj.1;               // 报错     注意:数值键名不能使用点运算符（因为会被当成小数点）, 只能使用方括号运算符。
  obj[2+3];            // undefined 方括号运算符内部还可以使用表达式
  ```

**属性的赋值:**

* 点运算符和方括号运算符, 不仅可以用来读取值, 还可以用来赋值。

  ```javascript
  var obj = { name: 'flin', age: 18 };
  // 等同于
  var obj = {}      
  obj.name = "flin";
  obj['age'] = 18;
  obj;               // {name: 'flin'}
  // Javascript 允许属性的“后绑定”, 可以在任意时刻新增属性, 没必要在定义对象的时候就定义好属性。
  ```

**属性的查看:**

* 查看一个对象本身的所有属性, `可以使用object.key()` 方法。

  ```javascript
  var obj = { 
      name: 'flin', 
      age: 18
  };
  Object.keys(obj);      // ['name', 'age'] 
  ```

**属性的删除:**

* `delete`命令用于删除对象的属性, 删除成功后返回 true。

  ```javascript
  var obj = { 
      name: 'flin', 
      age: 18
  };
  
  delete obj.name;       // true 注意: 对象中没有name属性, delete 命令照样返回true; 所有不能根据delete命令的结果，认定某个属性是存在的。
  obj.name;              // undefined
  Object.keys(obj);      // ['age']
  
  // 只有一种情况, delete命令会返回false, 那就是该属性存在,且不得删除。
  var obj = Object.defineProperty({}, 'name', {
    value: 'flin',
    configurable: false
  });
  obj.name               // 123
  delete obj.name        // false 默认情况下,使用 Object.defineProperty() 添加的属性是不可写、不可枚举和不可配置的。
  
  // delete命令只能删除对象本身的属性, 无法删除继承的属性。
  var obj = {};
  delete obj.toString;   // true
  obj.toString;          // function toString() { [native code] }
  // toString是对象obj继承的属性,虽然delete命令返回true; 但该属性并没有被删除, 依然存在, 依然可能读取到值。
  ```

**属性是否存在:**

* `in`运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值）, 如果包含就返回`true`否则返回`false`;

* 左边是一个字符串, 表示属性名, 右边是一个对象。

  ```javascript
  var obj = { 
      name: 'flin', 
      age: 18
  };
  'name' in obj;          // true
  'toString' in obj;      // true
  'i' in obj;             // false
  
  // in运算符不能识别哪些属性是对象自身的, 哪些属性是继承的。
  // 上面代码中对象obj本身并没有toString属性, 但是in运算符会返回true, 因为这个属性是继承的。
  // 对象的hasOwnProperty方法可以判断是否为对象自身的属性。
  var obj = { 
      name: 'flin', 
      age: 18
  };
  if ('toString' in obj) {
      obj.hasOwnProperty('toString');     // false
  }; 
  ```

**属性的遍历:**

* `for...in`循环用来遍历一个对象的全部属性。

  ```javascript
  var obj = { 
      name: 'flin', 
      age: 18,
      sex: 'man'
  };
  for (let i in obj) {
      console.log(i + ','+ obj[i]);
  }
  // name,flin
  // age,18
  // sex,ma
  ```

* `for...in` 循环需要注意两点:

  * 它遍历的是对象所有可遍历（enumerable）的属性, 会跳过不可遍历的属性;
  * 它不仅遍历对象自身的属性，还遍历继承的属性。

  ```javascript
  var obj = {};
  console.log(obj.toString);        // function toString() { [native code] }
  for (let i in obj) {
      console.log(i);
  }; // 没有任何输出
  // 对象都继承了toString属性, 但是for...in循环不会遍历到这个属性。
  // 对象obj继承了toString属性, 该属性不会被for...in循环遍历到, 因为它默认是“不可遍历”的。
  // 如果继承的属性是可遍历的, 那么就会被for...in循环遍历到;
  // 只想遍历对象自身的属性, 所以使用for...in的时候应该结合使用hasOwnProperty方法, 在循环内部判断一下,某个属性是否为对象自身的属性。
  var obj = { 
      name: 'flin', 
      age: 18
  };
  
  for (let i in obj) {
      if (obj.hasOwnProperty(i)){
          console.log(i);
      };
  };
  // name
  // age
  ```

**with语句:**

* 它的作用是操作同一个对象的多个属性时, 提供一些书写的方便。语法：`with (对象) { 语句; }`

```javascript
var obj = { 
    name: 'flin', 
    age: 18
};
with (obj) {
    name = 'biubiubiu';
    age = 26
};
console.log(obj)      // { "name": "biubiubiu", "age": 26 }
// 等同于
obj.name = "biubiubiu";
obj.age = 26;

with (document.links[0]){
  console.log(href);
  console.log(title);
  console.log(style);
}
// 等同于
console.log(document.links[0].href);
console.log(document.links[0].title);
console.log(document.links[0].style);
```

* 注意: 如果`with`区块内部有变量的赋值操作, 必须是当前对象已经存在的属性, 否则会创造一个当前作用域的全局变量。

  ```javascript
  var obj = {};
  with (obj) {
      name = "flin";
  };
  console.log(obj.name)    // undefined  对象obj并没有name属性，对name赋值等于创造了一个全局变量name
  name                     // flin  
  // with区块没有改变作用域，它的内部依然是当前作用域。这造成了with语句的一个很大的弊病，就是绑定对象不明确;
  // 建议不要使用with语句, 可以考虑用一个临时变量代替with。
  ```

### 3.7 函数

* 在 Javascript 中, 函数是**头等 (\**first-class\**)\**对象，因为它们可以像任何其它\**对象**一样具有属性和方法, 它们与其他对象的区别在于函数可以被调用。
* 在 Javascript 中, 每个函数其实都是一个`Function`对象; 
* 如果一个函数中没有使用 return 语句, 则它默认返回`undefined`; 要想返回一个特定的值, 则函数必须使用 [`return`] 语句来指定一个要返回的值。

#### 1) 函数的声明(创建)

```javascript
// 方式1: function 命令
// function命令声明的代码区块就是一个函数。
function 函数名(参数1, 参数2, ....) {
    函数体;
}


// 方式2: 函数表达式(匿名函数)
// 采用函数表达式声明函数时, function 命令后面不带有函数名;
// 这种方式将一个匿名函数赋值给变量, 这个匿名函数又称函数表达式, 因为赋值语句的等号右侧只能放表达式。
var fun = function(参数1, 参数2, ....) {
    函数体; 
};
// *如果加上函数名, 该函数名只在函数内部有效, 在函数体外部无效。
var fun = function x() {
    console.log(typeof x);
};
x();           // ReferenceError: x is not defined
fun();         // function
// 上面代码在函数表达式种加入了函数名x, 这个x只在函数体内部可用, 指代函数表达式本身, 其他地方都不可用。
// 这种写法的用处有两个: 一是可以在函数体内部调用自身, 二是方便除错(除错工具显示函数调用栈时, 将显示函数名, 而不再显示这里是一个匿名函数)。
var f = function f() {};
// 所以上面这种形式声明函数也非常常见。
// 注意: 函数的表达式需要在语句的结尾加上分号,表示语句结束; 而函数的声明在结尾的大括号后面不用加分号。

// 使用箭头函数创建匿名函数, ES6引入的箭头函数提供了一种简洁的方式来创建匿名函数:
let multiply = (a, b) => {
  return a * b;
};
console.log(multiply(2, 3));            // 6
// 这个箭头函数表达式创建了一个名为multiply 的匿名函数，它接受两个参数并返回它们的乘积。
// 箭头函数的基本结构是：(参数) => { 函数体 }
// 	  参数(可选): 箭头函数可以接受多个参数, 用括号括起来; 如果只有一个参数, 括号可以省略; 如果没有参数, 或者有多个参数时, 括号是必须的。
//    函数体: 箭头函数的函数体可以是一个表达式或一个代码块。如果函数体只有一条语句, 可以省略大括号和return关键字, 直接写出表达式, 并将其值作为返回值;
//           如果函数体有多条语句, 则需要使用大括号括起来, 并且需要使用return关键字来返回值。


// 方式3: Function 构造函数
var add = new Function(
	'x',
    'y',
    'return x + y'
);
// 等同于
function add(x, y) {
    return x + y; 
}
// Function 构造函数接受三个参数, 除了最后一个参数是add函数的“函数体”, 其他参数都是add函数的参数; 这三个参数都需要包裹在单双引号内。
// 这种声明函数方式非常不直观【反爬常用】
// 如果同一个函数被多次声明, 后面的声明就会覆盖前面的声明
```

#### 2) 圆括号运算符, return 语句和递归

* 调用函数时, 要使用圆括号运算符; 圆括号之中可以加入函数的参数。

  ```javascript
  function add(a, b) {
    return a + b;
  }
  
  add(1, 2)     // 3  函数名后面紧跟一对圆括号就会调用函数。
  
  // 函数体内部的return语句, 表示返回。Javascript 引擎遇到return语句,就直接返回return后面的那个表达式的值, 后面即使还有语句也不会得到执行。
  // 也就是说return语句所带的那个表达式, 就是函数的返回值。
  // return语句不是必需的,如果没有的话该函数就不返回任何值,或者说返回undefined。
  ```

* 函数可以调用自身, 这就是递归（recursion)。

  ```javascript
  // 斐波那契数列
  debugger
  function fib(num) {
    if (num === 0) return 0;
    if (num === 1) return 1;
    res = fib(num - 2) + fib(num - 1);
    return  res;
  }
  fib(4);
  // 等同于
  var fib = function(n) {
      if(n<=2) {
          return 1
      }
      let sum = 0
      let prev = 1
      let next = 1
      for(let i=3;i<=n;i++) {
          sum = prev + next
          prev = next
          next = sum
      }
      return sum
  }
  ```

#### 3) 第一等公民

* Javascript 语言将函数看作一种值, 与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方就能使用函数。

* 比如, 可以把函数赋值给变量和对象的属性, 也可以当作参数传入其他函数, 或者作为函数的结果返回;

* 函数只是一个可以执行的值, 此外并无特殊之处。

  ```javascript
  // 由于函数与其它数据类型地位平等, 所以在Javascript 语言中又称函数为第一等公民。
  function add(x, y) {
    return x + y;
  }
  
  // 将函数赋值给一个变量
  var operator = add;
  
  // 将函数作为参数和返回值
  function a(op){
    return op;
  }
  
  a(add)(1, 1)    // 调用
  // 2
  ```

#### 4) 函数名的提升

* Javascript 引擎将函数名视同变量名, 所以采用`function`命令声明函数时, 整个函数会像变量声明一样被提升到代码头部。

  ```javascript
  a('op')(1, 1)    // 调用
  
  // 将函数作为参数和返回值
  function a(op){
    function op(x, y) {
      return x + y;
    }
    return op;
  }
  
  // 由于“变量提升”, 函数a被提升到了代码头部, 也就是在调用之前就已经声明
  ```

* 如果采用赋值语句定义函数, Javascript 就会报错。

  ```javascript
  // 需要注意的是, 只有函数声明式才会被提升, 而函数表达式不会被提升。
  f();
  var f = function() {};       // TypeError: f is not a function
  // 等同于
  var f;
  f();
  f = function() {};
  // 调用f的时候, f只是被声明了, 还没有被赋值, 等于undefined 所以会报错。
  ```

* 注意: 如果像下面例子那样, 采用function 命令和var 赋值语句声明同一个函数, 由于存在函数提升, 最后会采用var赋值语句的定义。

  ```javascript
  // 在Javascript 中函数提升优先于变量提升
  var f = function () {
    console.log('1');
  };
  function f() {
    console.log('2');
  }
  f()       // 1
  // 表面上后面声明的函数f, 应该覆盖前面的var赋值语句, 但是由于存在函数提升, 实际上正好反过来。
  ```

#### 5) 函数的属性和方法

* `name`**属性:** 函数的`name`属性返回函数的名字。

  ```javascript
  function f() {};
  f.name         // 'f'
  
  
  // 如果是通过变量赋值定义的函数(无函数名), name属性返回变量名 
  var f1 = function()  {};
  f1.name       // 'f1'
  // 如果加上函数名, name属性返回function关键字之后的那个函数名
  var fun = function f2() {};
  fun.name      // 'f2'   注意:真正的函数名还是fun, 而f2这个名字只在函数体内部可用
  
  
  // name 属性的一个用处就是获取参数的名字
  var fun = function() {};
  function myFun(f) {
    console.log(f.name);     // 'fun'
  }
  myFun(fun)
  ```

* `length`**属性:** 函数的`length`属性返回函数预期传入的参数个数, 即函数定义之中的参数个数。

  ```javascript
  function fun(a, b, c) {
    console.log(fun.length);     // 3
  }
  fun(1, 2)
  // fun的length属性就是定义时的参数个数, 不管调用时输入多少个参数, length属性始终等于2
  // length属性提供了一种机制, 判断定义时和调用时参数的差异, 以便实现面向对象编程的“方法重载”（overload）。
  ```

* `toString()`**方法:** 返回一个字符串, 内容是函数的源码。

  ```javascript
  function fun() {
    console.log('123');
    console.log('456');
  }
  fun.toString()     
  // "function fun() {\n  console.log('123');\n  console.log('456');\n}" 
  // 函数fun的toString()方法返回了fun的源码, 包含换行符在内。
  
  
  // 对于原生的函数, toString()方法返回'function abs() { [native code] }'
  Math.abs.toString()   // Math.abs 是JS引擎提供的原生函数, toSting()方法返回原生代码的提示。
  
  
  // 函数内部注释也可以返回, 利用这一点可以变相实现多行字符串。
  var multiline = function (fn) {
    var arr = fn.toString().split('\n');
    return arr.slice(1, arr.length - 1).join('\n');
  };
  function f() {/*
    这是一个
    多行注释
  */}
  multiline(f);
  // '  这是一个\n  多行注释'    
  // 函数f内部有一个多行注释, toString()方法拿到f的源码后, 去掉首尾两行就得到了一个多行字符串。
  ```

#### 6) 函数作用域

* 作用域（scope）指的是变量存在的范围。

* 在 ES5 的规范中, Javascript 只有两种作用域：

  * 一种是全局作用域, 变量在整个程序中一直存在, 所有地方都可以读取；

  * 另一种是函数作用域, 变量只在函数内部存在。ES6 又新增了块级作用域。

* 对于顶层函数来说，函数外部声明的变量就是全局变量（global variable），它可以在函数内部读取。

  ```javascript
  var var = 1;
  function fun() {
    console.log(v);
  }
  fun();      // 1
  
  
  // 在函数内部定义的变量,  外部无法读取, 称为“局部变量”（local variable）
  function fun() {
    var v = 1;  
  }
  console.log(v);     // ReferenceError: v is not defined
  ```

* 函数内部定义的变量, 会在该作用域内覆盖同名全局变量。

  ```javascript
  var v = 1;
  
  function f(){
    var v = 2;
    console.log(v);
  }
  
  f();                 // 2 变量v同时在函数的外部和内部有定义, 在函数内部定义的局部变量v覆盖了全局变量v。
  console.log(v)       // 1
  
  // 注意: 对于var命令来说局部变量只能在函数内部声明, 在其他区块中声明, 一律都是全局变量。
  if (true) {
    var v1 = 5;
  }
  console.log(x);     // 5 变量v1在条件判断区块之中声明, 结果就是一个全局变量, 可以在区块之外读取。
  
  ```

#### 7) 函数内部的变量提升

* 与全局作用域一样,  函数作用域内部也会产生“变量提升”现象。var命令声明的变量不管在什么位置,  变量声明都会被提升到函数体的头部。

  ```javascript
  function foo(x) {
    if (x > 100) {
      var tmp = x - 100;
    };
    console.log(tmp);   
  }
  // 等同于
  function foo(x) {
    var tmp;
    if (x > 100) {
      tmp = x - 100;
    };
    console.log(tmp);
  }
  foo(101);      // 1
  ```

#### 8) 函数本身作用域

* 函数本身也是一个值, 也有自己的作用域。它的作用域与变量一样, 就是其声明时所在的作用域, ==与其运行(或者说调用)时所在的作用域无关==。

  ```javascript
  var a = 1;
  var x = function () {
    console.log(a);
  };
  function f() {
    var a = 2;
    x();
  }
  
  f();        // 1
  // 函数x是在函数f的外部声明的, 所以它的作用域绑定外层, 内部变量a不会到函数f体内取值, 所以输出1, 而不是2。
  // 总结: 函数执行时所在的作用域, 是定义时的作用域, 而不是调用时所在的作用域。
  var x = function () {
    console.log(a);      //  ReferenceError: a is not defined
  };
  function y(f) {
    var a = 2;
    f();
  }
  y(x);
  // 将函数x作为参数, 传入函数y。函数x是在函数y体外声明的, 作用域绑定外层, 所以找不到函数y的内部变量a, 导致报错。
  // 同样函数体内部声明的函数, 作用域绑定函数体内部。
  function foo() {
    var x = 1;
    function bar() {
      console.log(x);    // 1
    }
    return bar;
  }
  var x = 2;
  var f = foo();
  
  f(); 
  // 函数foo内部声明了一个函数bar, bar的作用域绑定foo。在foo外部取出bar执行时变量x指向的是foo内部的x, 而不是foo外部的x。
  ```

#### 9) 函数参数

* 函数运行的时候, 有时需要提供外部数据，不同的外部数据会得到不通的结果, 这种外部数据就叫参数。

* 函数的参数不是必须的, Javascript 允许省略参数。

  ```javascript
  function f(a, b) {
    return a;
  }
  // 函数f定义了两个参数, 但是运行时无论提供多少个参数（或者不提供参数）,Javascript 都不会报错
  f(1, 2, 3)       // 1
  f(1)             // 1
  // 省略的参数的值就变为undefined
  f()              // undefined
  // 函数的length属性与实际传入的参数个数无关，只反映函数预期传入的参数个数。
  f.length         // 2 
  ```

* 没有办法只省略靠前的参数, 而保留靠后的参数。如果一定要省略靠前的参数, 只有显式传入`undefined`。

  ```javascript
  function f(a, b) {
    return a;
  }
  f( , 1 )             // SyntaxError: Unexpected token ',' 
  f(undefined, 1)      // 1
  ```

* **【函数传递方式】** 函数参数如果是原始类型的值(数值、字符串、布尔值), 传递方式是==传值传递==。这就意味着函数体内修改参数值, 不会影响到函数外部。

  ```javascript
  var p = 1;
  
  function f(p) {
    p = 2;
  }
  f()
  p      // 1  
  // 变量p是一个原始类型的值,传入函数f的方式是传值传递。所以在函数内部p的值是原始值的拷贝, 无论怎么修改都不会影响到原始值。 
  ```

* **【函数传递方式】**函数参数如果是复合类型的值(数组、对象、其他函数), 传递方式是==传址传递==。也就是说传入函数的的是原始值的地址, **所以在函数内部修改参数将会影响到原始值**。

  ```javascript
  var obj = { a:1 }
  
  function fun(obj) {
    obj.a = 2;
  }
  fun(obj)
  obj;      // {a: 2}
  // 传入fun函数的参数是obj对象的地址, 在函数内部修改obj的属性a, 会影响到原始值。
  // 注意: 如果函数内部修改的不是参数对象的某个属性, 而是替换掉整个参数, 这时不会影响到原始值。
  var obj = { a:1, b:2 }
  
  function fun(obj) {
    obj = {a:2};
  }
  fun(obj)
  obj;      // {a: 1, b: 2}
  // 在函数fun()内部, 参数对象obj被整个替换成另一个值。这时不会影响到原始值。
  // 这是因为形式参数p的值实际是参数obj的地址,重新对obj赋值导致obj指向另一个地址, 保存在原地址上的值当然不受影响。
  ```

* 如果有同名的参数, 则取最后出现的那个值。

  ```javascript
  function fun(p, p) {
    console.log(p);
  }
  fun(1, 2)         // 2
  // 函数fun有两个参数, 且参数名都是p, 取值的时候以后面的a为准, 即使后面的a没有值或被省略, 也是以其为准。
  function fun(p, p) {
    console.log(p);
  }
  fun(1)         // undefined
  // 调用函数fun的时候, 没有提供第二个参数, a的取值就变成了undefined。
  // 如果要获得第一个a的值可以使用arguments对象。
  ```

* `arguments`对象

  * 由于Javascript 允许函数有不定数目的参数, 所以需要一种机制, 可以在函数体内部读取所有参数。这就是`arguments`对象的由来。
  * `arguments`对象包含了函数运行(调用)时的所有参数, `arguments[0]`就是第一个参数, `arguments[1]`就是第二个参数，以此类推。
  * ==`arguments`对象只有在函数体内部, 才可以使用。==

  ```javascript
  function fun(p) {  
    console.log(arguments[0]);          // 1
    console.log(arguments[1]);          // 2
    console.log(arguments[2]);          // 3
  }
  fun(1, 2, 3)
  ```

  * 正常模式下,  `arguments` 对象可以在运行时修改。

  ```javascript
  function fun(p, p1) {
    arguments[0] = 3;
    arguments[1] = 4;
    return p + p1;     // 7 函数fun调用时传入的参数, 在函数内部被修改成3和4
  }
  fun(1, 2, 3)
  ```

  * 严格模式下,  `arguments`对象与函数参数不具有连动关系。也就是修改`arguments`对象不会影响到实际的函数参数。 

  ```javascript
  function fun(p, p1) {
    'use strict'
    arguments[0] = 3;
    arguments[1] = 4;
    return p + p1;     // 7 函数fun调用时传入的参数, 在函数内部被修改成3和4
  }
  fun(1, 2)    // 3 函数体内是严格模式, 修改arguments对象不会影响到真实参数p和p1。
  ```

  * `arguments`对象的`length`属性, 可以判断函数调用时到底带几个参数。

  ```javascript
  function fun(p) {
    console.log(arguments.length);
  }
  fun(1, 2, 3)    // 3
  fun()           // 0
  ```

  * **【`arguments`与数组的关系】** `arguments` 很像数组, 但它是一个对象。数组专有的方法(slice、forEach), 不能在`arguments`对象上直接使用;  如果要让`arguments`对象使用数组的方法, 解决方法是将`arguments`转为真正的数组。 

  ```javascript
  // slice 方法
  function fun(p) {
    var args = Array.prototype.slice.call(arguments);
    console.log(typeof args, args);     // objct [1, 2, 3]
  }
  fun(1, 2, 3)
  
  
  // 循环放入新的数组
  function fun(p) {
    var args = [];
    for (let i=0; i < arguments.length; i++) {
      args.push(arguments[i]);     
    }
    console.log(args);     
  }
  fun(1, 3, 5)
  ```
  
  * `arguments`对象的`callee`属性返回它所对应的原函数。

  ```javascript
  function fun() {
    console.log(arguments.callee);     
  }
  fun()
  // 可以通过arguments.callee达到调用函数自身的目的。这个属性在严格模式里面是禁用的, 因此不建议使用。
  ```
#### 10) 函数的闭包

* 闭包（closure）是Javascript 语言的一个难点, 也是它的特色。很多高级应用都要依靠闭包实现。
* 理解闭包, 首先必须理解变量作用域。前面提到Javascript 有两种作用域：全局作用域和函数作用域。

```javascript
// 函数内部可以直接读取全局变量; 正常情况下, 函数外部无法读取函数内部声明的变量。
// 如果出于种种原因, 需要得到函数内的局部变量。正常情况下这是办不到的, 只有通过变通方法才能实现。那就是在函数的内部, 再定义一个函数。
function fun() {
  var parm = 1;
  function inner() {
    console.log(parm);
  }
}
// 上面代码中, 函数inner就在函数fun内部, 这时fun的所有局部变量对inner都是可见的;
// 但是反过来就不行, inner内部的局部变量, 对fun就是不可见的。
// 这就是Javascript 语言特有的"链式作用域"结构(chain scope), 子对象会一级一级地向上寻找所有父对象的变量;
// 所以, 父对象的所有变量, 对子对象都是可见的, 反之则不成立。

// 既然inner可以读取fun的局部变量, 那么只要把inner作为返回值, 就可以在f1外部读取它的内部变量了
function fun() {
  var parm = 1;
  function inner() {
    console.log(parm);      
  }
  return inner;
}
var newFun = fun();
newFun()      // 1
// 上面代码中, 函数fun的返回值就是函数inner, 由于inner可以读取fun的内部变量, 所以就可以在外部获得fun的内部变量了。
// 闭包就是函数inner, 即能够读取其他函数内部变量的函数。由于在Javascript 语言中, 只有函数内部的子函数才能读取内部变量;
// 所以可以把闭包简单理解成“定义在一个函数内部的函数”。
// 闭包最大的特点, 就是它可以“记住”诞生的环境, 比如inner记住了它诞生的环境fun, 所以从inner可以得到fun的内部变量。
// 在本质上, 闭包就是将函数内部和函数外部连接起来的一座桥梁。
```

* 闭包的最大用处有两个: 一个是可以读取外层函数内部的变量, 另一个就是让这些变量始终保持在内存中, 即闭包可以使得它诞生环境一直存在。

```javascript
// 闭包使内部变量记住上一次调用时的运算结果
function fun(num) {
	return function() {
		return num++;
	}
}
var newFun = fun(1);
console.log(newFun());     // 1
console.log(newFun());     // 2
console.log(newFun());     // 3
console.log(newFun());     // 4
// num是函数fun的内部变量, 通过闭包, num的状态被保留了, 每一次调用都是在上一次调用的基础上进行计算。
// 从中可以看到, 闭包newFun使得函数fun的内部环境一直存在。
// 所以, 闭包可以看作是函数内部作用域的一个接口。
// 为什么闭包能够返回外层函数的内部变量？原因是闭包newFUN用到了外层变量num, 导致外层函数fun不能从内存释放;
// 只要闭包没有被垃圾回收机制清除, 外层函数提供的运行环境也不会被清除, 它的内部变量就始终保存着当前值, 供闭包读取。	
```

* 闭包的另一个用处是: 封装对象的私有属性和私有方法。

```javascript
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }
  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('qdd');
p1.setAge(26);
p1.getAge()      // 26
// 函数Person的内部变量_age, 通过闭包getAge和setAge, 变成了返回对象p1的私有变量。
// 注意: 外层函数每次运行, 都会生成一个新的闭包, 而这个闭包又会保留外层函数的内部变量, 内存消耗很大;
// 		所以不能滥用闭包, 否则会造成网页的性能问题。
```

#### 11) 立即调用的函数表达式

* 根据Javascript 的语法, 圆括号`()`跟在函数名之后, 表示调用该函数。
* 有时我们需要在定义函数之后, 立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

```javascript
// function这个关键字既可以当作语句，也可以当作表达式。
// 语句
function f() {}
// 表达式
var f = function f() {}
// 当作表达式时, 函数可以定义后直接加圆括号调用。
var f = function f() { return 1}();
f     // 1  函数定义后直接加圆括号调用没有报错。原因就是function作为表达式, 引擎就把函数定义当作一个值。这种情况下就不会报错。
```

* 为了避免解析的歧义, Javascript 规定, 如果function关键字出现在行首, 一律解释成语句。

  因此，引擎看到行首是function关键字之后, 认为这一段都是函数的定义, 不应该以圆括号结尾, 所以就报错了。

```javascript
// 函数定义后立即调用的解决方法, 就是不要让function出现在行首让引擎将其理解成一个表达式。最简单的处理, 就是将其放在一个圆括号里面。
(function(){ /* code */ }());
// 或者
(function(){ /* code */ })();
// 上面两种写法都是以圆括号开头, 引擎就会认为后面跟的是一个表达式, 而不是函数定义语句, 所以就避免了错误。
// 注意:上面两种写法最后的分号都是必须的。
```

* 推而广之, 任何让解释器以表达式来处理函数定义的方法, 都能产生同样的效果, 比如下面三种写法。

```javascript
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();

// 甚至像这样写也是可以的。
!function () { /* code */ }();
~function () { /* code */ }();
-function () { /* code */ }();
+function () { /* code */ }();
```

* 通常情况下, 只对匿名函数使用这种“立即执行的函数表达式”。

  它的目的有两个：

  * 一是不必为函数命名，避免了污染全局变量；
  * 二是 IIFE(Immediately-Invoked Function Expression) 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```javascript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二(比写法一更好, 完全避免了污染全局变量)
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());   
```

#### 12) eval 

* `eval`命令接受一个字符串作为参数, 并将这个字符串当作语句执行。
* 如果参数字符串无法当作语句运行, 那么就会报错。
* 放在`eval`中的字符串, 应该有独自存在的意义, 不能用来与`eval`以外的命令配合使用。

```javascript
eval('return;');      // SyntaxError: Illegal return statement
// 因为return不能单独使用, 必须在函数中使用。
```

* 如果`eval`的参数不是字符串, 那么会原样返回。

* `eval`没有自己的作用域, 都在当前作用域内执行, 因此可能会修改当前作用域的变量的值, 造成安全问题。

```javascript
var a = 1;
eval('a = 2');
a   // 2

// 为了防止这种风险Javascript 规定, 如果使用严格模式, eval内部声明的变量不会影响到外部作用域。
'use strict'
var a = 1;
eval('var a = 2');
console.log(a)     // 1

// 不过，即使在严格模式下，eval依然可以读写当前作用域的变量
(function f() {
  'use strict';
  var foo = 1;
  eval('foo = 2');
  console.log(foo);     // 2
})()
// 总之, eval的本质是在当前作用域之中注入代码。由于安全风险和不利于Javascript 引擎优化执行速度, 一般不推荐使用。
// 通常情况下, eval最常见的场合是解析JSON数据的字符串, 不过正确的做法应该是使用原生的JSON.parse方法。
```

### 3.8 数组

* 数组（array）是按次序排列的一组值。每个值的位置都有编号（从0开始）, 整个数组用方括号表示。

```javascript
// 除了在定义时赋值，数组也可以先定义后赋值。
var arr = [];

arr[0] = 'a';
arr[1] = 1;
console.log(arr)     // ['a', 1]


// 任何类型的数据, 都可以放入数组。
var arr = [
  {a:1},
  [1, 2, 3],
  function fun() {
    console.log('函数')
  }
];
arr[0];
arr[1];
arr[2];

// 如果数组的元素还是数组, 就形成了多维数组。
var a = [[1, 'a'], [2, 'b'], [3, 'c']]
a[0][1]    // a
a[1][1]    // b
```

* 本质上数组属于一种特殊的对象。`typeof`运算符会返回数组的类型是`object`。
* 数组的特殊性体现在, 它的键名是按次序排列的一组整数（0，1，2...）。

```javascript
var a = [[1, 'a'], [2, 'b'], [3, 'c']]

Object.keys(a)  // ['0', '1', '2'] Object.keys方法返回数组的所有键名
// 由于数组成员的键名是固定的（默认总是0、1、2...）, 因此数组不用为每个元素指定键名, 而对象的每个成员都必须指定键名。
// Javascript 语言规定对象的键名一律为字符串。 
// 所以, 数组的键名其实也是字符串。之所以可以用数值读取, 是因为非字符串的键名会被转为字符串。
a['1']       // [2, 'b'] 
a[1]         // [2, 'b']  数值键名被自动转为了字符串
```

* 对象有两种读取成员的方法：点结构（`object.key`）和方括号结构（`object[key]`）。但是, 对于数值的键名，不能使用点结构。
```javascript
var arr = [1, 2, 3];
arr.0     // SyntaxError     arr.0的写法不合法, 因为单独的数值不能作为标识符(identifier)。所以数组成员只能用方括号arr[0]表示(方括号是运算符，可以接受数值)。
```
#### 1) length 属性

* `length`属性返回数组的成员数量。

```javascript
[[1, 'a'], [2, 'b'], [3, 'c']].length      // 3
// Javascript 使用一个32位整数, 保存数组的元素个数。这意味着, 数组成员最多只有4294967295个(232 - 1)个,也就是说length属性的最大值就是4294967295。 
```

* `length`属性是可写的。如果人为设置一个小于当前成员个数的值, 该数组的成员数量会自动减少到`length`设置的值。

```javascript
var a = [1, 'a', 2, 'b', 3, 'c'];
a.length      // 6
a.length = 2
a             // [1, 'a']
// 当数组的length属性设为2（即最大的整数键只能是1）那么整数键2（值为2）之后的元素就已经不在数组中了, 被自动删除了。
// 清空数组的一个有效方法, 就是将length属性设为0。

// 如果人为设置length大于当前元素个数, 则数组的成员数量会增加到这个值, 新增的位置都是空位。
var a = [1, 'a'];
a.length = 2
a[3]          // undefined 读取新增的位置都会返回undefined

// 如果人为设置length为不合法的值, Javascript 会报错。
```

* 注意：由于数组本质上是一种对象, 所以可以为数组添加属性, 但是这不影响`length`属性的值。

```javascript
var a = [];

a['p'] = 'abc';
a.length        // 0

a[1.2] = 'abc' 
a.length        // 0
// 上面代码将数组的键分别设为字符串和小数, 结果都不影响length属性。
// 因为length属性的值就是等于最大的数字键加1, 而这个数组没有整数键, 所以length属性保持为0。
```

* 如果数组的键名是添加超出范围的数值, 该键名会自动转为字符串。

```javascript
var arr = [];
arr[-1] = 'a';
arr[Math.pow(2, 32)] = 'b';
console.log(arr.length);            // 0
console.log(arr[-1]);               // a
console.log(arr[4294967296]);       // b
// 数组arr添加了两个不合法的数字键, 结果length属性没有发生变化。这些数字键都变成了字符串键名。
// 之所以会取到值, 是因为取键值时, 数字键名会默认转为字符串。
```

#### 2) in 运算符

* 检查某个键名是否存在的运算符`in`, 适用于对象, 也适用于数组。

```javascript
var arr = [1, 2, 3, 'a', 'b', 'c'];

2 in arr      // true
'2' in arr    // true   由于键名都是字符, 所以数值2会自动转成字符串。
6 in arr      // false  如果数组的某个位置是空位, in运算符返回false
```

#### 3) for...in 循环和数组的遍历

* `for...in`循环不仅可以遍历对象, 也可以遍历数组, 数组也是一种特殊对象。

```javascript
// for...in 循环遍历的是数组的数字键
var arr = [1, 2, 3, 'a', 'b', 'c'];
for (let i in arr) {
  console.log(i);
}
// 0
// 1 
// 2
// 3
// 4
// 5


// for...in不仅会遍历数组所有的数字键,还会遍历非数字键
var arr = [1, 2, 3, 'a', 'b', 'c'];
arr.length = 3;
arr.foo = true
for (let i in arr) {
  console.log(i);
}
// 0 
// 1
// 2 
// foo  非整数键foo也遍历到了, 所以不推荐for...in遍历数组
```

* 数组的遍历可以考虑使用`for`和`while`循环。

```javascript
var arr = ['a', 'b', 'c', 2, 3];
// for
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// while
var i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
// while 从右往左遍历
var arrLen = arr.length;
while (arrLen--) {
  console.log(arr[arrLen]);
} 
```

* `forEach()`方法也可以遍历数组。

```javascript
var arr = ['a', 'b', 'c', 2, 3];
arr.forEach(element => console.log(element));
```

#### 4) 数组的空位

* 当数组的某个位置是空元素, 即两个逗号之间没有任何值, 我们称该数组存在空位。

```* 
var arr = ['a', , 'c'];
arr.length   // 3  数组的空位不影响length属性。虽然这个位置没有值,引擎依然认为这个位置是有效的。

// 需要注意的是,如果最后一个元素后面有逗号,并不会产生空位。也就是说,有没有这个逗号结果都是一样的。
```

* 数组的空位是可以读取的, 返回`undefined`。

```javascript
var arr = [, , ,];
arr[0]   // undefined
```

* 使用`delete`命令删除一个数组成员, 会形成空位, 并且不会影响`length`属性。

```javascript
var arr = [1, 2, 3, 4];

delete arr[0]         // true
 
arr[0]                // undefined
arr.length            // 4 delete命令删除了数组的第0个元素, 这个位置就形成了空位, 但是对length属性没有影响。也就是说, length属性不过滤空位 
```

* 数组的某个位置是空位, 与某个位置是`undefined`是不一样的。如果是空位，使用数组的`forEach`方法、`for...in`结构、以及`Object.keys`方法进行遍历，空位都会被跳过。

```javascript
// 空位
var arr = [, , ,];
arr.forEach(element => console.log(element))     // 不产生任何输出

for (let i in arr) {
  console.log(i);                                // 不产生任何输出
}

Object.keys(arr)                                 // []


// undefined
// 如果某个位置是undefined, 遍历的时候就不会被跳过。
var arr = [undefined, undefined, undefined];
arr.forEach(function(key, val){
  console.log(val + ' '+ key);
});
// 0 undefined
// 1 undefined
// 2 undefined

for (let i in arr) {
  console.log(i);  
}
// 0
// 1 
// 2

Object.keys(arr);      // ['0', '1', '2']

// 上面两个例子对比后: 空位就是数组没有这个元素, 所以不会被遍历到; 而undefined则表示数组有这个元素, 值是undefined所以遍历不会跳过。 
```

#### 5) 类似数组的对象

* 如果一个对象的所有键名都是正整数或零, 并且有`length`属性, 那么这个对象就很像数组, 语法上称为“类似数组的对象”（array-like object）。

```javascript
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
obj[0]           // 'a'
obj[1]           // 'b'
obj.length       // 3
obj.push('d')    // TypeError: obj.push is not a function
// 对象obj就是一个类似数组的对象。但是“类似数组的对象”并不是数组, 因为它们不具备数组特有的方法。
// 对象obj没有数组的push方法, 使用该方法就会报错。
```

* “类似数组的对象”的根本特征, 就是具有`length`属性。只要有`length`属性, 就可以认为这个对象类似于数组。但是存在一个问题, 这种`length`属性不是动态值, 不会随着成员的变化而变化。

* 典型的“类似数组的对象”是函数的`arguments`对象, 以及大多数 DOM 元素集, 还有字符串。

```javascript
// 下面的例子都不是数组（instanceof运算符返回false）,但是看上去都非常像数组。
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');
arrayLike[0]                // 'a'
arrayLike.length            // 2
arrayLike instanceof Array  // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length           // 0
elts instanceof Array // false

// 字符串
'abc'[1]                // 'b'
'abc'.length            // 3
'abc' instanceof Array  // false 
```

* 数组的`slice`方法可以将“类似数组的对象”变成真正的数组。

```javascript
var arr = Array.prototype.slice.call(类似数组的对象);
```

* 除了转为真正的数组,“类似数组的对象”还有一个办法可以使用数组的方法, 就是通过`call()`把数组的方法放到对象上面。

```javascript
function args() { return arguments }
var arrayLike = args('a', 'b');

function print(value, index) {
  console.log(index + ' : ' + value);
}

Array.prototype.forEach.call(arrayLike, print);
// 0 : a
// 1 : b
// arrayLike代表一个类似数组的对象, 本来是不可以使用数组的forEach()方法的, 但是通过call(), 可以把forEach()嫁接到arrayLike上面调用。


// 通过这种方法, 在arguments对象上面调用forEach方法。
// forEach 方法
var arrayLike = logArgs('a', 'b');

function logArgs() {
  Array.prototype.forEach.call(arguments, function (elem, i) {
    console.log(i + '. ' + elem);
  });
}
// 等同于
function logArgs() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(i + '. ' + arguments[i]);
  }
}


// 字符串也是类似数组的对象, 所以也可以用Array.prototype.forEach.call遍历。
Array.prototype.forEach.call('abc', function (chr) {
  console.log(chr);
});
// a
// b
// c
// 注意:这种方法比直接使用数组原生的forEach要慢, 所以最好还是先将“类似数组的对象”转为真正的数组, 然后再直接调用数组的forEach方法。
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
// a
// b
// c
```

## 4 运算符

### 4.1 算数运算符

* Javascript 共提供10个算术运算符, 用来完成基本的算术运算。

|     运算符      |     描述     |
| :-------------: | :----------: |
|       `+`       |  加法运算符  |
|       `-`       |  减法运算符  |
|       `*`       |  乘法运算符  |
|       `\`       |  除法运算符  |
|      `**`       |  指数运算符  |
|       `%`       |  余数运算符  |
| `++x` 或  `x++` |  自增运算符  |
|  `--x`或`x--`   |  自减运算符  |
|      `+x`       |  数值运算符  |
|      `-x`       | 负数值运算符 |

```javascript
// 1. 加法运算符, 求两个数值的和
1 + 1            // 2

// 非数值相加
true + true      // 2
1 + true         // 2  
// 布尔值都会自动转成数值，然后再相加。

// 两个字符串相加
'a' + 'bc'       // 'abc'  
// 如果是两个字符串相加, 这时加法运算符会变成连接运算符, 返回一个新的字符串, 将两个原字符串连接在一起。

// 字符串和非字符串相加
1 + 'a'          // '1a'
'true' +  1      // 'true1'
false + 'a'      // 'falsea'
// 加法运算符是在运行时决定, 到底是执行相加还是执行连接。也就是说, 运算子的不同, 导致了不同的语法行为, 这种现象称为“重载”（overload）。
// 由于加法运算符存在重载, 可能执行两种运算, 使用的时候必须很小心。
'3' + 4 + 5      // '345'
3 + 4 + '5'      // '75'
// 由于从左到右的运算次序, 字符串的位置不同会导致不同的结果。


// 2.除了加法运算符, 其他算术运算符（比如减法、除法和乘法）都不会发生重载。
// 它们的规则是: 所有运算子一律转为数值, 再进行相应的数学运算。
1 - '2'          // -1
1 * '2'          // 2
1 / '2'          // 0.5

```

* **对象的相加**：如果运算子是对象, 必须先转成原始类型的值, 然后再相加。

```javascript
var obj = { info:{} };
obj + 1;         // '[object Object]1'
// 对象obj转成原始类型的值是[object Object],再加1就得到了上面的结果。

// 对象转成原始类型的值, 规则是:
// 首先, 自动调用对象的valueOf()方法, 一般来说对象的valueOf()方法总是返回对象自身, 这时再自动调用对象的toString()方法, 将其转为字符串。
var obj = { info:{} };
obj.valueOf().toString()       // '[object Object]'  对象的toString方法默认返回[object Object]
// 有了以上结论, 就可以自己定义valueOf方法或toString方法, 得到想要的结果。
var obj = { 
  valueOf:function() {
    return 1;
  }
};
obj + 1;            // 2  定义obj对象的valueOf方法返回1, 于是obj + 1就得到了2
// 由于valueOf方法直接返回一个原始类型的值, 所以不再调用toString方法。

var obj = { 
  toString: function() {
    return 'hello';
  }
};
obj + 1;            // 'hello1'
// 对象obj的toString方法返回字符串hello。前面说过, 只要有一个运算子是字符串, 加法运算符就变成连接运算符, 返回连接后的字符串。

// 这里有一个特例, 如果运算子是一个Date对象的实例, 那么会优先执行toString方法。
var obj = new Date();
obj.valueOf = function () { return 1 };
obj.toString = function () { return 'hello' };
obj + 1             // "hello1"
// 对象obj是一个Date对象的实例, 并且自定义了valueOf方法和toString方法, 结果toString方法优先执行。
```

```javascript
// 3.余数运算符
// 余数运算符%返回前一个运算子被后一个运算子除, 所得的余数。
6 % 3            // 0
// 注意运算结果的正负号由第一个运算子的正负号决定
-6 % 5           // -1
6 % 5            // 1

// 为了得到负数的正确余数值, 可以先使用绝对值函数。
// 错误的写法
function isOdd(n) {
  return n % 2 === 1;
}
isOdd(-5)        // false
isOdd(-4)        // false
// 正确的写法
function isOdd(n) {
  return Math.abs(n % 2) === 1;
}
isOdd(-5)        // true
isOdd(-4)        // false

// 余数运算符还可以用于浮点数的运算。
// 但是由于浮点数不是精确的值,无法得到完全准确的结果。
6.2 % 2.3            // 1.6000000000000005


// 4.自增和自减运算符
// 自增和自减运算符是一元运算符, 只需要一个运算子。它们的作用是将运算子首先转为数值, 然后加上1或者减去1。
// 它们会修改原始变量。
var a = 1;
++a     // 2
a       // 2
--a     // 1
a       // 1
// 变量a自增后返回2, 再进行自减返回1; 这两种情况都会使得, 原始变量x的值发生改变。
// 自增、自减运算之后变量的值发生变化, 这种效应叫做运算的副作用（side effect）。
// 自增和自减运算符是仅有的两个具有副作用的运算符, 其他运算符都不会改变变量的值。
// 注意: 自增和自减运算符有一个需要注意的地方, 【就是放在变量之后】, 会先返回变量操作前的值, 再进行自增/自减操作; 
//                                      【放在变量之前】, 会先进行自增/自减操作, 再返回变量操作后的值。
var x = 2;
--x       // 1 
x         // 1
// x是先返回当前值, 然后自增, 所以得到1；
var y = 2;
++y       // 3 
y         // 3
// y是先自增, 然后返回新的值, 所以得到3。

// 5.数值运算符和负数值运算符
// 数值运算符`+`同样使用加号, 但它是一元运算符(只需要一个操作数), 而加法运算符是二元运算符(需要两个操作数)。
// 数值运算符的作用在于可以将任何值转为数值(与Number函数的作用相同)。
+true      // 1
+[]        // 0
+{}        // NaN
// 非数值经过数值运算符以后, 都变成了数值(最后一行NaN也是数值)
// 负数值运算符`-`, 也同样具有将一个值转为数值的功能, 只不过得到的值正负相反。
// 连续两个负数值运算符, 等同于数值运算符。
var x = 1;
-1         // -1
-(-1)      // 1


// 6.指数运算符
// 指数运算符`**`完成指数运算, 前一个运算子是底数, 后一个运算子是指数。
// 多个指数运算符连用时, 先进行最右边的计算。
2 ** 3 ** 2      // 512 相当于2 ** (3 ** 2)
```

### 4.2 赋值运算符

* 赋值运算符(Assignment Operators)用于给变量赋值, 最常见的等号`=`赋值运算符。

```javascript
var x = 1;       // 将1赋值给变量x
var y = x;       // 将变量x的值赋值给y

// 赋值运算符还可以与其他运算符结合
x += y           // 等同于 x = x + y

x -= y           // 等同于 x = x - y

x *= y           // 等同于 x = x * y

x /= y           // 等同于 x = x / y

x %= y           // 等同于 x = x % y

x **= y          // 等同于 x = x ** y

// 赋值运算符与位运算符的结合
x >>= y          // 等同于 x = x >> y

x <<= y          // 等同于 x = x << y

x >>>= y         // 等同于 x = x >>> y

x &= y           // 等同于 x = x & y

x |= y           // 等同于 x = x | y

x ^= y           // 等同于 x = x ^ y
```

### 4.3 比较运算符

* 比较运算符用于比较两个值的大小, 然后返回一个布尔值, 表示是否满足指定的条件。

| 运算符 |       描述       |
| :----: | :--------------: |
|  `>`   |    大于运算符    |
|  `<`   |    小于运算符    |
|  `>=`  | 大于或等于运算符 |
|  `<=`  | 小于或等于运算符 |
|  `==`  |    相等运算符    |
|  ===   |  严格相等运算符  |
|  `!=`  |   不相等运算符   |
|  !==   | 严格不相等运算符 |

* **比较运算符**分成两类：相等比较和非相等比较。两者的规则是不一样。
* 对于非相等的比较, 算法是先看两个运算子是否都是字符串, 如果是字符串, 就按照字典顺序比较(实际上是比较 Unicode 码点)；否则, 将两个运算子都转成数值, 再比较数值的大小。

```javascript
// 1.非相等运算符: 字符串的比较
// 字符串按照字典顺序进行比较。
'tzw' > 'qdd'       // true 
// *Javascript引擎内部首先比较首字符的Unicode 码点。如果相等, 再比较第二个字符的Unicode 码点, 以此类推。
// 所有字符都有Unicode 码点, 所以汉字也可以比较。


// 2.非相等运算符: 非字符串的比较
// 如果两个运算子之中, 至少有一个不是字符串, 需要分成以下两种情况:
// 【原始类型值】
// *如果两个运算子都是原始类型的值, 则是先转成数值再比较。
5 > '4'           // true  等同于 5 > Number('4')
true  > false     // true  等同于 Number(true) > Number(false)
2 > true          // true  等同于 2 > Number(true)
//注意NsN的比较。任何值(包括NaN本身)与NaN使用非相等运算符进行比较, 返回的都是false。
// 【对象】
// 如果运算子是对象, 会转为原始类型的值, 再进行比较。
// *对象转换成原始类型的值, 算法是先调用valueOf方法; 如果返回的还是对象, 再接着调用toString方法。
var = [2];
x > '11';   // true '2' > '11' 等同于[2].valueOf().toString() > '11'
x.valueOf = function() {
    return '1'
};
x > '11'    // false '1' > '11' 等同于(function() {return '1'})() > '11'

// 对象与对象之间的比较也是如此:
[2] > [1]                 // true [2].valueOf().toString() > [11].valueOf().toString()
({ x: 2 }) >= ({ x: 1 })  // true ({ x: 2 }).valueOf().toString() >= ({ x: 1 }).valueOf().toString()
```

* **相等运算符和严格相等运算符**

  * Javascript 提供两种相等运算符：`==`和`===`。

  * 相等操作符`==`:

    * 在比较之前, 会进行类型转换。它会尝试将两个值转换为相同类型, 然后再进行比较。
    * ==*类型转换规则==：
      * 如果两个操作数的类型相同(例如两个数字、两个字符串等), 则不进行类型转换, 直接进行比较;
      * 如果其中一个操作数是 `null`, 另一个操作数是 `undefined`, 则它们会被视为相等;
      * 如果一个操作数是数字, 另一个操作数是字符串, 会将字符串转换为数字,  然后比较它们的数值;
      * 如果一个操作数是布尔值, 另一个操作数是非布尔值(除了 `null` 和 `undefined`), 会将布尔值转换为数字(`true` 转换为 1, `false` 转换为 0), 然后进行比较;
      * 如果一个操作数是对象, 另一个操作数是原始值(字符串、数字、布尔值), 会首先调用对象的 `valueOf`方法获取原始值, 如果返回的还是对象, 再接着调用`toString`方法，然后按照上述规则进行比较;
      * 如果一个操作数是 `NaN`, 另一个操作数也是 `NaN`, 它们被视为相等;
      * `undefined`和`null`只有与自身比较, 或者互相比较时才会返回`true`; 与其他类型的值比较时, 结果都为`false`;
      * 在其他情况下，返回 `false`。

    ```javascript
    // 相等运算符用来比较相同类型的数据时, 与严格相等运算符完全一样。
    1 == 1.0         // true 等同于 1 === 1.0
    // 比较不同类型的数据时, 相等运算符会先将数据进行类型转换, 然后再用严格相等运算符比较。
    
    // 1.原始类型的值
    // 下面的几种情况原始类型的值会转换成数值再进行比较。
    1 == true        // true 等同于 1 === Number(true) 
    'true' == true   // flase 等同于 Number('true') === Number(true)
    '' == 0          // true 等同于 Number('') === 0
    '' == false      // true 等同于 Number('') === Number(false)
    '1' == true      // true 等同于 Number('1') === Number(true)
    ' \t\r\n ' == 0     // true  
    '\n  123  \t' == 123    // true 字符串在转为数字时, 省略前置和后置的空格
    
    
    // 2.对象与原始类型值比较
    // 对象(这里指广义的对象, 包括数组和函数)与原始类型的值比较时, 对象转换成原始类型的值, 再进行比较。
    // 具体先调用对象的valueOf()方法, 如果得到原始类型的值, 按照原始类型进行比较; 如果得到的还是对象, 则再调用toString()方法, 再进行比较。
    [1] == 1              // true 等同于 Number([1].valueOf().toString()) === 1
    [1, 2] == '1,2'       // true 注意'1,2'中间的空格
    [1] == true           // true 等同于 Number([1].valueOf().toString()) === Number(true)
    // 给个更直观的例子:
    var obj = {
        valueOf: function() {
            console.info('valueOf() 执行');
            return obj;
        },
        toString: function() {
            console.info('toString() 执行');
            return 'tzw';
        }
    }
    obj == 'tzw';
    // valueOf() 执行
    // toString() 执行
    // true 
    // 上面: obj是一个自定义了valueOf()和toString()方法的对象;
    // 这个对象与字符串'tzw'进行比较时, 会依次调用valueOf()和toString()方法, 最后返回'tzw', 所以比较结果是true。
    
    
    // 3.undefined 和null
    // undefined和null只有与自身比较, 或者互相比较时才会返回true; 与其他类型的值比较时, 结果都为false
    undefined == undefined    // true
    null == null              // true
    undefined == null         // true
    false == null             // false
    0 == undefined            // false 
    ```

  * 严格相等操作符 === :

    * 不进行类型转换, 直接比较两个值及其类型。
    * 只有在值和类型都相等的情况下, 才会返回 `true`。

    ```javascript
    // 1.不同类型的值
    1 === '1'          // false 
    true === 'true'    // false
    
    
    // 2.同一类的原始类型的值
    // 同一类型的原始类型的值（数值、字符串、布尔值）比较时, 值相同就返回true, 值不同就返回false。
    1 === 0x01         // true
    +0 === -0          // true
    
    
    // 3.复合类型的值
    // 两个复合类型（对象、数组、函数）的数据比较时, 不是比较它们的值是否相等, 而是比较它们是否指向同一个地址。
    ({} === {})                             // false
    ([] === [])                             // false
    (function () {} === function () {})     // false
    // 运算符两边的空对象、空数组、空函数的值, 都存放在不同的内存地址, 结果都是false
    // 如果两个变量引用同一个对象, 则它们相等。
    // *注意, 对于两个对象的比较, 严格相等运算符比较的是地址, 而大于或小于运算符比较的是值。
    var obj1 = {};
    var obj2 = {};
    obj1 > obj2     // false  比较值
    obj1 < obj2     // false  比较值
    obj1 === obj2   // false  比较地址
    
    
    // 4.undefinef和null
    // undefined和null与自身严格相等
    undefined === undefined   // true
    null === null             // true
    // 变量声明后默认值是undefined, 两个只声明未赋值的变量也是相等的。
    var x1;
    var x2;
    x1 === x2;    // true

* **不相等运算符和严格不相等运算符**

```javascript
// 1. 不相等运算符的算法就是先求相等运算符的结果, 然后返回相反值。
1 != '1'    // false 等同于 !(1 == '1')
// 2. 严格不相等运算符的算法就是先求严格相等运算符的结果, 然后返回相反值。
1 !== '1'   // true 等同于 !(1 === '1')
```

### 4.4 布尔运算符(逻辑运算符)

* 布尔运算符用于将表达式转为布尔值

| 运算符 |      描述      |
| :----: | :------------: |
|  `!`   |   取反运算符   |
|  `&&`  |    且运算符    |
|  `||`  |    或运算符    |
|  `?:`  | 三元条件运算符 |

```javascript
// 1.取反(非)运算符`!`用于将布尔值变为相反值, 即true变成false, false变成true。
!true          // false
!false         // true
// 对于非布尔值, 取反运算符会将其转为布尔值;
// 以下6个值取反后为true; 其它值都为false。
// 【undefined、null、false、0、NaN、空字符串('')】
!undefined     // true
!null          // true
!0             // true
!NaN           // true
!""            // true
// 其它值
!1             // false
!'hello'       // false
![]            // false
!{}            // false
// 如果对一个值连续做两次取反运算, 等于将其转为对应的布尔值, 与Boolean函数的作用相同。
!!x            // 等同于Boolean(x)
// 不管x是什么类型的值, 经过两次取反运算后变成了与Boolean函数结果相同的布尔值。所以, 两次取反就是将一个值转为布尔值的简便写法。


// 2.且(与)运算符`&&`往用于多个表达式的求值。
// 它的运算规则是: 
//	  如果第1个运算子的布尔值为true, 则返回第2个运算子的值(*注意是值,不是布尔值);
//    如果第1个运算子的布尔值为false, 则直接返回第1个运算子的值, 且不再对第二个运算子求值。
'tzw' && ''       // ''
't' && (1 + 2)    // 3
// 更直观的例子
var x = 1;
(1 - 1) && ( x += 1)     // 0
x       // 1 由于且运算符的第1个运算子的布尔值为false, 则直接返回它的值0, 而不再对第二个运算子求值, 所以变量x的值没变。
// 这种跳过第2个运算子的机制被称为“短路”。有些程序员喜欢用它取代if结构, 比如下面是一段if结构的代码就可以用且运算符改写。
if (i) {
  doSomething();
}
// 等价于(建议谨慎使用)
i && doSomething();  
// 注意: 且运算符可以多个连用, 这时返回第一个布尔值为false的表达式的值; 如果所有表达式的布尔值都为true, 则返回最后一个表达式的值。
true && 'tzw' && '' && 1 && 'tzw' && true     // ''
1 && 2 && 3                                   // 3


// 3.或运算符`||`也用于多个表达式的求值。
// 它的运算规则是: 
//	  如果第1个运算子的布尔值为true, 则返回第1个运算子的值, 且不再对第2个运算子求值;
//    如果第1个运算子的布尔值为false, 则返回第2个运算子的值。
'tzw' || ''       // ''
'' || 'qdd'       // 'qdd'
// 同样使用”短路“规则
var x = 1;
true || (x = 2)       // true
x       // 1  由于或运算符的第1个运算子为true, 所以直接返回true, 不再运行第2个运算子。所以, x的值没有改变。
// 注意: 或运算符可以多个连用, 这时返回第一个布尔值为true的表达式的值; 如果所有表达式都为false, 则返回最后一个表达式的值。
false || '' || 0 || 1 || 'tzw' || true        // 1
'' || 0 || false                              // false
// 或运算符常用于为一个变量设置默认值。
function saveText(text) {
  text = text || '';
  // ...
}
// 或者写成
saveText(this.text || '')    // 如果函数调用时, 没有提供参数, 则该参数默认设置为空字符串。


// 4. 三元条件运算符(?:)
// 三元条件运算符由问号(?)和冒号(:)组成, 分隔三个表达式。
// 它是Javascript 语言唯一一个需要三个运算子的运算符。
// 如果第一个表达式的布尔值为true, 则返回第二个表达式的值, 否则返回第三个表达式的值。
't' ? 'hello' : 'world'       // "hello"
0 ? 'hello' : 'world'         // "world"
```

### 4.5 二进制位运算符

* 二进制位运算符用于直接对二进制位进行计算，一共有7个。

**下面这些位运算符只对整数起作用, 如果一个运算子不是整数, 会自动转为整数后再执行:**

| 运算符 |                             描述                             |
| :----: | :----------------------------------------------------------: |
|  `|`   | **二进制或运算符**: 表示若两个二进制位都为0, 则结果为0, 否则为1。 |
|  `&`   | **二进制与运算符**: 表示若两个二进制位都为1, 则结果为1, 否则为0。 |
|  `~`   |         **二进制否运算符**: 表示对一个二进制位取反。         |
|  `^`   | **异或运算符**: 表示若两个二进制位不相同, 则结果为1, 否则为0。 |
|  `<<`  |                        **左移运算符**                        |
|  `>>`  |                        **右移运算符**                        |
| `>>>`  |                   **头部补零的右移运算符**                   |

```javascript
// 在Javascript 内部, 数值都是以64位浮点数的形式储存, 但是做位运算的时候, 是以32位带符号的整数进行运算的, 并且返回值也是一个32位带符号的整数。
// 1.二进制或运算符
// 二进制或运算符`|`逐位比较两个运算子, 两个二进制位之中只要有一个为1, 就返回1, 否则返回0。
1 | 2      // 3 1和2的二进制形式分别是01和10, 所以进行二进制或运算会得到11, 转换成10进制就是3。
// 位运算只对整数有效, 遇到小数时, 会将小数部分舍去, 只保留整数部分
1.7 | 2    //3  取整方法不适用超过32位整数最大值为2147483647的数。


// 2.二进制与运算符
// 二进制与运算符`&`的规则是逐位比较两个运算子, 两个二进制位之中只要有一个位为0, 就返回0, 否则返回1。
6 & 3      // 2 6(二进制110)和3(二进制011)进行二进制与运算会得到10(即2)


// 3.二进制否运算符
// 二进制否运算符`~`将每个二进制位都变为相反值(0变为1, 1变为0)
~3        // -4
// 上面表达式对3进行二进制否运算, 得到-4。之所以会有这样的结果, 是因为位运算时Javascript 内部将所有的运算子都转为32位的二进制整数再进行运算;
// 3的32位整数形式是00000000000000000000000000000011, 二进制否运算以后得到11111111111111111111111111111100;
// 由于第一位(符号位)是1, 所以这个数是一个负数。Javascript 内部采用补码形式表示负数, 即需要将这个数减去1, 再取一次反码, 得到负数的绝对值, 然后加上负号, 才能得到这个负数对应的10进制值;
// 这个数减去1等于11111111111111111111111111111011, 再取一次反得到00000000000000000000000000000100, 再加上负号就是-4。
// 简化记忆就是 一个二进制数与自身的取反值再加负一(-1)
~ -3       // 2
// 对一个整数连续两次二进制否运算得到它自身
~~ 3      // 3
// 所有的位运算都只对整数有效;二进制否运算遇到小数时, 也会将小数部分舍去, 只保留整数部分。
~~ 1.233333   // 1 使用二进制否运算取整, 是所有取整方法中最快的一种。
//对字符串进行二进制否运算,Javascript 引擎会先调用Number函数, 将字符串转为数值。
~ 'tzw'       // -1 相当于~Number('tzw') 在内部NaN被表示为一个特定的IEEE 754浮点数值;当将NaN 转换为其对应的32位有符号整数形式时,它会被转换为一个具有全1的二进制表示。
~ '42 cats'   // -1 ~Number('42 cats')
~ '011'       // -12 相当于~Number('011')
~ '0xEF'      // 239 相当于~Number('0xEF')
// 对于其他类型的值, 二进制否运算也是先用Number转为数值, 然后再进行处理。
~ null        // -1 相当于 ~Number(null)
~ []          // -1 相当于 ~Number([]) 


// 4.异或运算符
// 二进制异或运算`^`在两个二进制位不同时返回1, 相同时返回0。
0 ^ 3      // 3 
// 0(二进制00)与3(二进制11)进行异或运算, 它们每一个二进制位都不同, 所以得到11(即3)。
// 【Javasipt 中,`^=`是按位异或赋值操作符; 它将左操作数与右操作数进行按位异或运算, 并将结果赋值给左操作数。
// “异或赋值运算”有一个特殊运用, 连续对两个数a和b进行三次异或运算赋值,(a^=b; b^=a; a^=b;)可以互换它们的值;
// 也就是说, 使用“异或运算”可以在不引入临时变量的前提下, 两个变量的值。
var a = 10;
var b = 99;
a ^= b, b ^= a, a ^= b;
a          // 99
b          // 10  
// 这是互换两个变量的值的最快方法。
12.9 ^ 0   // 12


// 5.左移运算符
// 左移运算符`<<`表示将一个数的二进制值向左移动指定的位数, 尾部补0, 【相当于乘以2的指定次方】;
// 向左移动的时候, 最高位的符号位是一起移动的。
4 << 1     // 8 4的二进制形式为100, 左移一位为1000(即十进制的8), 相当于乘以2的1次方
-4 << 1    // -8 
// 因为-4的二进制形式是11111111111111111111111111111100, 
// 左移一位后得到11111111111111111111111111111000; 该数转为十进制(减去1后取反,再加上负号)即为-8
// 如果左移0位, 就相当于将该数值转为32位整数, 等同于取整, 对于正数和负数都有效。
13.5 << 0     // 13
-13.5  << 0   // -13


// 6.右移运算符
// 右移运算符`>>`表示将一个数的二进制值向右移动指定的位数; 如果是正数, 头部全部补0; 如果是负数, 头部全部补1。
//【右移运算符基本上相当于除以2的指定次方(最高位即符号位参与移动)】。
4 >> 2      // 1
// 4的二进制形式为 00000000000000000000000000000100,
// 右移一位得到 00000000000000000000000000000010, 即为十进制的2。
-4 >> 1     // -2
// 因为-4的二进制形式为 11111111111111111111111111111100,
// 右移一位, 头部补1, 得到 11111111111111111111111111111110, 即为十进制的-2。
// 右移运算可以模拟 2 的整除运算。
5 >> 1      // 2  相当于 5 / 2 = 2


// 7.头部补零的右移运算符
// 头部补零的右移运算符`>>>`与右移运算符`>>`只有一个差别, 就是一个数的二进制形式向右移动时, 头部一律补零, 而不考虑符号位;
// 所以, 该运算总是得到正值。对于正数, 该运算的结果与右移运算符`>>`完全一致, 区别主要在于负数。
4 >>> 2     // 1
-4 >>> 2    // 1073741823 
// 因为-4的二进制形式为11111111111111111111111111111100, 
// 带符号位的右移一位, 得到01111111111111111111111111111110, 即为十进制的1073741823。
// 这个运算实际上将一个值转为32位无符号整数。
// 查看一个负整数在计算机内部的储存形式, 最快的方法就是使用这个运算符。
-1 >>> 0    // 4294967295
// -1做为32位整数时, 内部的储存形式使用无符号整数格式解读, 值为4294967295(即(2^32)-1, 等于11111111111111111111111111111111)。
```

### 4.6 其它运算符，运算顺序

* **`void`运算符**的作用是执行一个表达式, 然后不返回任何值, 或者说返回`undefined`。

```javascript
void 0          // undefined 
void(0)         // undefined
// void运算符的两种写法, 都正确;【建议采用后一种形式, 即总是使用圆括号。】
// 因为void运算符的优先性很高, 如果不使用括号, 容易造成错误的结果。
var x = 3;
void (x = 5)    //undefined
x               // 5
```

* **逗号`,`运算符**: 逗号运算符用于对两个表达式求值, 并返回后一个表达式的值。

```javascript
'a', 'b'    // 'b'

var x = 0;
var y = (x++, 10);
x           // 1
y           // 10 逗号运算符返回后一个表达式的值。

// 逗号运算符的一个用途是, 在返回一个值之前, 进行一些辅助操作。
var value = (console.log('tzw'), true);    // tzw
value       // true 先执行逗号之前的操作, 然后返回逗号后面的值。
```

* **圆括号`()`**: 可以用来提高运算的优先级, 因为它的优先级是最高的, 即圆括号中的表达式会第一个运算。

```javascript
// 圆括号不是运算符而是一种语法结构。
// 它一共有两种用法,一种是把表达式放在圆括号之中, 提升运算的优先级; 另一种是跟在函数的后面, 作用是调用函数。
(4 + 5) * 3    // 27
// *注意, 因为圆括号不是运算符, 所以不具有求值作用, 只改变运算的优先级。
// 函数放在圆括号中, 会返回函数本身。如果圆括号紧跟在函数的后, 就表示调用函数。
function f() {
  return 1;
}
(f);       // function f(){return 1;}
f();       // 1
// *圆括号之中, 只能放置表达式, 如果将语句放在圆括号之中, 就会报错。
```

### 运算符优先级：

![image-20230614234355808](https://raw.githubusercontent.com/tzw160702/js-reverse/main/images/202306142348628.png)

## 5 数据类型转换

* Javascript 是一种动态类型语言, 变量没有类型限制, 可以随时赋予任意值。
* 如果运算符发现, 运算子的类型与预期不符, 就会自动转换类型。

### 5.1 强制类型转换

* 强制转换主要指使用`Number()`、`String()`和`Boolean()`三个函数, 手动将各种类型的值, 分别转换成数字、字符串或者布尔值。

* **Number()** : 使用`Number()`函数, 可以将任意类型的值转化成数值。

  ```javascript
  // number转换分两种情况:一种是参数是原始类型的值, 另一种是参数是对象。 
  // 1.参数是原始类型值
  // 数值: 转换后还是原来的值
  Number(123)          // 123
  // 字符串: 如果可以被解析为数值, 则转换为相应的数值
  Number('123')        // 123
  // 字符串: 如果不可以被解析为数值, 返回 NaN
  Number('123abc')     // NaN
  // 空字符串转为0
  Number('')           // 0
  // 布尔值:true 转成 1, false 转成 0
  Number(true)         // 1
  Number(false)        // 0
  // undefined: 转成 NaN
  Number(undefined)    // NaN
  // null:转成0
  Number(null)         // 0
  // Number函数将字符串转为数值, 要比parseInt函数严格很多。
  // Number只要有一个字符无法转成数值, 整个字符串就会被转为NaN。
  // parseInt和Number函数都会自动过滤一个字符串前导和后缀的空格。
  parseInt('\t\v\r12.34\n')   // 12    
  Number('\t\v\r12.34\n')     // 12.34
  // 空格字符包括空格符、制表符、换行符等空白字符, 它们在字符串中都被视为有效的字符; 当字符串以空格字符开头或以空格字符结尾时, 我们称之为具有前导空格或后缀空格。
  
  
  // 2.参数是对象
  // Number的参数是对象时, 转换规则如下:
  //      1.调用对象自身的valueOf()方法, 如果返回原始类型的值, 则直接对该值使用Number函数, 不再进行后续步骤;
  //      2.如果valueOf()方法返回的还是对象, 则改为调用对象自身的toString()方法。如果toString()方法返回原始类型的值, 则对该值使用Number函数, 不再进行后续步骤;
  //      3.如果toString()方法返回的是对象, 就报错。 
  var obj = { x:1 };
  Number(obj)        // NaN
  // 等同于
  if (typeof obj.valueOf() === 'object') {
    Number(obj.toString());          // NaN
  } else {
    Number(obj.valueOf());
  }
  // 默认情况下, 对象的valueOf方法返回对象本身, 所以一般总是会调用toString方法, 而toString方法返回对象的类型字符串(比如[object Object])。
  Number({})         // NaN
  // 如果toString方法返回的不是原始类型的值, 结果就会报错。
  var obj = {
    valueOf: function () {
      return {};
    },
    toString: function () {
      return {};
    }
  };
  Number(obj)       // TypeError: Cannot convert object to primitive value
  // 从上面的例子可以看到, valueOf和toString方法都是可以自定义的。
  ```

* **String()** : 使用`String()`函数可以将任意类型的值转化成字符串。

  ```javascript
  // String转换也分两种情况:一种是参数是原始类型的值, 另一种是参数是对象。
  // 1.参数是原始类型值 
  // 数值: 转为相应的字符串。
  // 字符串: 转换后还是原来的值。
  // 布尔值: true转为字符串"true", false转为字符串"false"。
  // undefined: 转为字符串"undefined"。
  // null: 转为字符串"null"。
  String(123)               // '123'
  String('tzw')             // 'tzw'
  String(false)             // 'false'
  String(undefined)         // 'undefined'
  String(null)              // 'null'
  String('123dfdsadg')      // '123dfdsadg'
  
  
  // 2.参数是对象
  String方法的参数如果是对象, 返回一个类型字符串; 如果是数组, 返回该数组的字符串形式。
  String({a:1})             // '[object Object]'
  String(['a', 1, 2])       // 'a,1,2'
  // String方法的转换规则与Number方法基本相同, 只是互换了valueOf方法和toString方法的执行顺序。
  // 转换规则如下:
  // 	  1.先调用对象自身的toString方法。如果返回原始类型的值, 则对该值使用String函数, 不再进行以下步骤;
  //    2.如果toString方法返回的是对象, 再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值, 则对该值使用String函数, 不再进行以下步骤;
  //    3.如果valueOf方法返回的是对象, 就报错。
  String({a: 1})             // '[object Object]'
  // 等同于
  String({a: 1}.toString())  // '[object Object]'
  // 如果toString法和valueOf方法, 返回的都是对象, 就会报错。
  var obj = {
    valueOf: function () {
      return {};
    },
    toString: function () {
      return {};
    }
  };
  String(obj)               // TypeError: Cannot convert object to primitive value
  // 同样valueOf和toString方法都是可以自定义的。

* **Boolean()** : `Boolean()`函数可以将任意类型的值转为布尔值。

  ```javascript
  // 转换规则是: 除了以下五个值的转换结果为false, 其他的值全部为true。
  // undefined、null、0(包含-0和+0)、NaN、''(空字符串)
  Boolean(undefined)        // false
  Boolean(null)             // false
  Boolean(0)                // false
  Boolean(NaN)              // false
  Boolean('')               // false
  // 注意: 所有对象(包括空对象)的转换结果都是true, 甚至连false对应的布尔对象new Boolean(false)也是true。
  Boolean({})                   // true
  Boolean([])                   // true
  Boolean(new Boolean(false))   // true
  ```

### 5.2 自动转换(隐式转换)

* 以下三种情况时, Javascript 会自动转换数据类型, 即转换是自动完成的, 用户不可见。

* 第一种情况, 不同类型的数据互相运算。

  ```javascript
  123 + 'abc'      // '123abc'
  ```

* 第二种情况, 对非布尔值类型的数据求布尔值。

  ```javascript
  if ('tzw') {
      console.log(123);      // 123
  }
  ```

* 第三种情况, 对非数值类型的值使用一元运算符(即`+`和`-`)。

  ```javascript
  +{name: 'tzw'}     // NaN
  - [1,2,3]          // NaN
  ```

​	自动转换的规则是这样的：预期什么类型的值, 就调用该类型的转换函数。比如, 某个位置预期为字符串, 就调用`String()`函数进行转换。如果该位置既可以是字符串, 也可能是数值, 那么默认转为数值。

```javascript
// 1.自动转换为布尔值
// Javascript 遇到预期为布尔值的地方(比如if语句的条件部分), 就会将非布尔值的参数自动转换为布尔值, 系统内部会自动调用Boolean()函数。
// 因此除了(undefined、null、+0或-0、NaN、''(空字符串))五个值, 其他都是自动转为true。
if ( !undefined
  && !null
  && !0
  && !NaN
  && !''
) {
  console.log('true');      // true
}


// 2.自动转换为字符串 
// Javascript 遇到预期为字符串的地方, 就会将非字符串的值自动转为字符串。
// 具体规则是, 先将复合类型的值转为原始类型的值, 再将原始类型的值转为字符串。
// 字符串的自动转换, 主要发生在字符串的加法运算时。当一个值为字符串, 另一个值为非字符串, 则后者转为字符串。
1 + '1'             // '11'
'1' + true          // '1true' 
'1' + {}            // '1[object Object]'
'1' + function(){}  // '1function(){}'
'1' + undefined     // '1undefined'
'1' + null          // '1null'

var obj = {
  width: '168'
};
obj.width + 20      // "16820"


// 3. 自动转换为数值
// Javascript 遇到预期为数值的地方, 就会将参数值自动转换为数值。系统内部会自动调用Number()函数。
// 除了加法运算符有可能把运算子转为字符串, 其他运算符都会把运算子自动转成数值。
'1' - '1'          // 0
'1' * '2'          // 2
true - 1           // 0
false - 1          // -1
'1' - 1            // 0
'1' * []           // 0
false / '1'        // 0
'abc' - 1          // NaN
null + 1           // 1
undefined + 1      // NaN
// *null转为数值时为0, 而undefined转为数值时为NaN。
```
