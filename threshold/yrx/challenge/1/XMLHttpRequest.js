(function () {
    var org = window.XMLHttpRequest.prototype.setRequestHeader;
    window.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
        if (key == 'safe') {
            debugger;
        }
        return org.apply(this, arguments);
    };
})();

