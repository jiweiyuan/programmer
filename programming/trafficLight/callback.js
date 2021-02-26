// 绿灯亮3s 黄灯亮1s 红灯亮2s 循环持续不断
console.time('trafficLight')
const green = () => {
    console.timeLog('trafficLight')
    console.log('绿灯亮3s')
}
const yellow = () => {
    console.timeLog('trafficLight')
    console.log('黄灯亮1s')
}
const red = () => {
    console.timeLog('trafficLight')
    console.log('红灯亮2s')
}


function task(fn, time, callback) {
    fn()
    setTimeout(() => {
        callback()
    }, time)
}

const step = () => {
    task(green, 3000, () => {
        task(yellow, 1000, () => {
            task(red, 2000, step)
        })
    })
}
step()
