window = global
document = {}
location = {
  reload: function (){}
}
const crypto = require('crypto');
function hex_md5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}
console.log("\u6B64\u7F51\u9875\u53D7\u3010\u7231\u952D\u4E91\u76FE V1.0 \u52A8\u6001\u7248\u3011\u4FDD\u62A4");
var c = new Date().valueOf();
token = window.btoa("aiding_win" + String(c));
md = hex_md5(window.btoa("aiding_win" + String(Math.round(c / 0x3e8))));
document.cookie = "sign=" + Math.round(c / 0x3e8) + '~' + token + '|' + md + "; path=/";
location.reload();
console.log(document.cookie)
