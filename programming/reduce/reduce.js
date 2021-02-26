/* reduce 方法的实现 */

let ary = [1, 2, 3, 4, 5]

function sum(ary) {
    let result = ary.myReduce((previousValue, currentValue, currentIndex, arr) => previousValue + currentValue, 0)
    return result
}



Array.prototype.myReduce = function (fn, initialValue) {
    let arr = this;
    let base = typeof initialValue === 'undefined' ? arr[0] : initialValue
    let statPoint = typeof initialValue === 'undefined' ? 1 : 0

    arr.slice(statPoint).forEach((value, index) => {
        base = fn(base, value, index + statPoint, arr)
    })
    return base;
}
console.log(sum(ary))
