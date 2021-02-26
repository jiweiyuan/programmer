// memoize 技术
// 局限性 ： 运用toString 方法不是很健壮
function memoize(fn) {
    let map = new Map;
    return (...args) => {
        if(map.has(args.toString())) {
            console.log('缓存')
            return map.get(args.toString())
        }

        let result = fn(args)
        map.set(args.toString(), result)
        return result
    }
}


var squareNumber = memoize(x => {
    console.log('计算')
    return x * x
})

// 计算 => 16
let num = squareNumber(4)
console.log(num)

// 缓存 => 16
let num_cache = squareNumber(4)
console.log(num_cache)

// 缓存 => 16
let num_cache_1 = squareNumber(4)
console.log(num_cache_1)

console.log(Object.is([1], [1]))
console.log(new Set([[1], [1]]))
