function printFactor(n) {
    for (var i = 1; i <= (n / 2); i++) {
        if (n % i == 0) console.log(i);
    }
    console.log(n);
}