// taskPool
console.time('taskPool')
class TaskPool {
    constructor(tasks, limit) {
        this.limit = limit
        this.tasks = tasks
        this.pool = []
        this.run()
    }

    run() {
        let min = Math.min(this.tasks.length, this.limit - this.pool.length)
        for(let i = 0; i<min; i++) {
            let task = this.tasks.shift()
            let promise = task().then().catch().finally(() => {
                this.pool.splice(this.pool.indexOf(promise), 1)
                this.run()
            })
            this.pool.push(promise)
        }
    }
}


promisefn = () => {
    return new Promise((resolve) => {
        let time = 1099
        setTimeout((time) => {
            console.timeLog('taskPool')
            resolve(time)
        }, time, time)
    })
}

let tasks = []
for(let i=0; i<10; i++) {
    tasks.push(promisefn)
}
let taskPool = new TaskPool(tasks, 3)
