function getSum(a, b) {
    const fact = 1;
    let c = 1234;
    return function sum() {
        // sum.all - sum.vo => {fact, a, b} - {} => {fact, a, b}
        return fact + a + b;
    }
}


const f = getSum(100, 200);
const res = f();
console.log(res);


(() => {
    // no bind this
    console.log(this);
})()
