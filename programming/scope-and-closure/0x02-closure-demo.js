function getSum(a, b) {
    const fact = 1;
    return function() {
        return fact + a + b;
    }
}


const f = getSum(100, 200);
const res = f();
console.log(res);
