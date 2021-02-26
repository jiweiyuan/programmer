/*
 * 实现函数 sendRequest
 * @param { number[] } urls
 * @param { number } max
 * @param { function } request
 * @param { function } callback
 */

console.time('request')
function sendRequst(urls, max, request, callback) {

    let p = new Promise((resolve) => {
        let result = []
        let concurrency = 0

        function run() {
            if(!urls.length) return Promise.all(result).then(data => resolve(data))
            let min = Math.min(urls.length, max - concurrency)
            for(let i=0; i<min; i++) {
                let url = urls.shift()
                let promise = request(url)
                promise.finally((data) => {
                    concurrency--
                    run()
                })
                concurrency++
                result.push(promise)
            }
        }
        run()
    })
    p.then(data => {
        callback(data)
    })
}

function requst(url) {
    return new Promise((resolve) => {
        let time =1000
        setTimeout(() => {
            let response = `${url} is requested!`
            console.timeLog('request')
            resolve(response)
        }, time)
    })
}
const urls = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png']
const callback = (data) => { console.log(data) }
sendRequst(urls, 3, requst, callback)

