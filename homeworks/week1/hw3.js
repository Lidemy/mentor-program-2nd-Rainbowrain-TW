function reverse(str) {
    var result = "";

    for (var i = 0; i < str.length; i++) {
        result += str[str.length - 1 - i];
    }
    //題目寫輸出我不知道是回傳還是印出，就都做
    console.log(result);
    return result;
}