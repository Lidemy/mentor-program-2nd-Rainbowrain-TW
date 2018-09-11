//給定一個長度小於 100 的字串 s，請回傳 s 是否為迴文（迴文的定義：正著唸倒著念都一樣）
function isPalindromes(str) {
    var msg = "";
    if (str.length % 2 !== 0) {
        msg = str.substring(0, Math.round(str.length / 2)) + str.slice(Math.trunc(str.length / 2));
    } else {
        msg = str;
    }

    for (var i = 0; i < msg.length; i++) {
        if (msg[i] !== msg[msg.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

module.exports = isPalindromes