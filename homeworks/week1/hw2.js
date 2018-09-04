function capitalize(str) {
    if (str[0] == str[0].toUpperCase()) {
        return str;
    } else {
        return str[0].toUpperCase() + str.slice(1);
    }
}