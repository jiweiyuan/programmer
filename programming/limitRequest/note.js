let p = new Promise(resolve => {
    setTimeout(() => {
        resolve('p')
    }, 1000)
})

p.then(data => {
    console.log(100)
    return 'data'
})

Promise.all([p]).then(data => {
    console.log(data)
})
