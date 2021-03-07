function getSum(a, b) {
    let fact = 1;
    let c = 1234;
    return function sum() {
        // sum.all - sum.vo => {fact, a, b} - {} => {fact, a, b}
        fact ++;
        console.log(fact);
    }
}


const f = getSum(100, 200);
const res = f();
f();

const f2 = f;
f2();

const f3 = getSum();
f3();
console.log(res);

