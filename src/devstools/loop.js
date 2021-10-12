function looper(amount, func) {
    let x = 0;
    let timer = setInterval(() => {
        x++
        func();
        if (x >= amount) clearInterval(timer);
    }, 1000);
}
module.exports = looper;