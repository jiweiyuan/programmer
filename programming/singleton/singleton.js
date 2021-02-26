function singletonify(className) {
    return new Proxy(className.prototype.constructor, {
        instance: null,
        construct(target, argArray, newTarget) {
            console.log(target === newTarget)
            console.log(target.name)
            console.log(newTarget.name)
            if(!this.instance) {
                this.instance = new target(...argArray)
            }
            return this.instance
        }
    })
}

class Book {
    constructor(name) {
        this.name = name
    }
}
let createBook = singletonify(Book)
let book1 = new createBook('book1')
let book2 = new createBook('book2')

console.log(book1)
// console.log(book2)
