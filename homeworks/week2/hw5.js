//給定兩個長度為 l(1<=l<=1000)的數字（但型態為字串），請回傳兩個數字相加後的結果。
function add(a, b) {
    //取較長的字串為運算次數
    var count = a.length >= b.length ? a.length : b.length;
    //result 用來裝計算結果 carry 用來判斷進位
    var result = [];
    var carry = 0;

    //開始計數
    for (var i = 0; i < count; i++) {
        //由後往前取 a 及 b 字串的字元與進位相加，字串長度小於 i 時則以 0 計算
        var temp = Number(a.length > i ? a[a.length - 1 - i] : 0) + Number(b.length > i ? b[b.length - 1 - i] : 0) + carry;
        
        //進位判斷
        if (temp >= 10) {
            carry = 1;
            temp = temp % 10;
        } else {
            carry = 0;
        }

        //輸出到結果
        result.unshift(temp);
    }
    
    //最後判斷是否還有進位
    if (carry === 0) {
        return result.join("");
    } else {
        result.unshift("1")
        return result.join("");
    }
}

module.exports = add;