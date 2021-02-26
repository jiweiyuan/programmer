function type(x) {
    return Object.prototype.toString.call(x).slice(8, -1)
}

// console.log("null", type(null))


let ary = [null, undefined, true, false,1, 'string', Symbol(1), function fn(){}, new Date(), /^/, {name: 'Yuan'}]

ary.forEach(x=> {
    console.log(x)
    console.log(type(x))
    console.log('--------------')
})

function type(x) {
    if (x === null) {
        return 'null'
    }
    let t = typeof x;
    if(t !== 'object') {
        return  t
    }
    return Object.prototype.toString.call(x).slice(8, -1).toLocaleLowerCase()
}
