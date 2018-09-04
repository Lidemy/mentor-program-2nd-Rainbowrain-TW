function join(str, concatStr) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        if (i === str.length - 1) {
            result += str[i];
        } else {
            result += str[i] + concatStr;
        }
    }
    return result;
}

function repeat(str, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
        result += str;
    }
    return result;
}