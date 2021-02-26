// 1. instanceof
function Person(name) {
    this.name = name
}

let p = new Person('Yuan Jiwei')

console.log(p instanceof Person)


// 2. mock instanceof
function instanceofMock(L, R) {
    if(typeof L !== "object") {
        return false
    }

    while (true) {
        if(L === null) {
            return false
        }
        if(L.__proto__ === R.prototype) {
            return true
        }
        L = L.__proto__
    }
}

console.log(instanceofMock(p, Person))
