const CryptoJS = require('crypto-js');
k = 'wdf2ff*TG@*(F4)*YH)g430HWR(*)' + 'wse';
t = Date.parse(new Date()) / 1000;
m = CryptoJS.enc.Utf8.parse(k);
a = function (word) {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, m, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
 };
function list(num){
    return {
        "page": String(num),
        "uc": a(t + '|' + num)
    };
}

console.log(list(page))