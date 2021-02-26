/* 深克隆的实现 */
var a = {
    age: 24,
    name: {
        frist: 'Yuan'
    },
    tech: ['Vue',  {name: 'TypeScript'}]
}
a.self = a

function deepClone(x, map = new WeakMap()) {
    if(x===null || typeof x !== 'object') {
        return x
    }
    if(x instanceof Array) {
        return x.map(x => deepClone(x, map))
    }
    if(Object.prototype.toString.call(x).slice(8, -1) === 'Object') {
        if(map.has(x)) return map.get(x)
        let result = {}
        map.set(x, result)
        for(let key in x) {
            result[key] = deepClone(x[key], map)
        }
        return result
    }
}

b = deepClone(a)
console.log(a)
console.log(b)
