function isPrime(n) {
    if (n < 0) n *= -1;
    if (n == 1 || n == 0) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0) return false;
    if (n > 5 && n % 5 == 0) return false;

    for (var i = 3; i <= (n / 2) + 1; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

module.exports = isPrime