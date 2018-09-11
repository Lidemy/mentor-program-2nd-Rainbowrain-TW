//給定 n（1<=n<=30），依照規律「回傳」正確圖形（每一行是一個陣列的元素）

function stars(n) {
    var result = [];
    for (var i = 1; i <= n; i++) {
        result.push("*".repeat(i));
    }
    return result;
}

module.exports = stars;