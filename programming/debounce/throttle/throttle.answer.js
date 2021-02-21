/**
 * throttle https://github.com/mqyqingfeng/Blog/issues/26
 * 定义： 如果你持续触发事件，每隔一段时间，只执行一次事件。
 */

// const container = document.getElementById('container')
// container.onmousemove = throttle(fn, wait)

// v1 时间戳
// 使用时间戳 触发事件的时候 取出当前的时间戳， 减去之前的时间戳(最开始为0)，
// 如果大于 设置的时间就执行， 小于就不执行

function throttle(fn, wait) {
    let previous = 0
    return function() {
        let contex = this
        let args = arguments

        let now = +new Date()
        if(now - previos > wait) {
            fn.apply(contex, args)
            previous = now
        }
    }
}

// v2 定时器


// Note
let timer1, timer2
timer1 = +new Date() // 返回指定日期的毫秒数量

setTimeout(() => {
    timer2 = +new Date()
    console.log(timer2 - timer1)
}, 1000)
