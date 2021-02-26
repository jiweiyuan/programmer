const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => reject('error'), 200);
});

// Promise.all([promise1, promise2, promise3]).then((values) => {
//     console.log(values);
// });


// 输入 promise []
// 输出 new Promise()

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const promiseNum = promises.length;
        let resolvedValues = new Array(promiseNum)
        let resolvedCounter = 0;
        for(let i=0; i<promiseNum; i++) {
            Promise.resolve(promises[i]).then(value => {
                resolvedValues[i] = value;
                resolvedCounter++;
                if(resolvedCounter === promiseNum) {
                    resolve(resolvedValues)
                }
            }, reason => {
                reject(reason)
            })
        }
    })
}

promiseAll([promise1, promise2, promise3, promise4]).then((values) => {
    console.log(values);
}, err => {
    console.log(err)
});

