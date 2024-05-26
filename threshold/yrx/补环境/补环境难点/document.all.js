document = {};

_all_number = 0;      // 表示document.all的调用次数
Object.defineProperty(document, 'all', {
    get: function (){
        return [undefined, undefined, [1,2,3,4,5,6]][_all_number++]
    }
})

console.log(typeof document.all)   // 浏览器环境下结果为 'undefined'
console.log(typeof document.all)
a = document.all.length
console.log(a)

// document.all 的 typeof 在node.js 下是完全没有办法在js层面进行模拟的