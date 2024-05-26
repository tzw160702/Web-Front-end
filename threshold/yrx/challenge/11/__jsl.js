setTimeout = function() {};     // 不需要页面跳转所以置空
window = {};
window.addEventListener = '1';
document = {};
document.addEventListener = function(a, b, c) {
    b()
};
document.createElement = function() {
    return {
        firstChild: {
            href: 'https://www.python-spider.com/'
        }
    }
};

js_code

console.log(document.cookie);

