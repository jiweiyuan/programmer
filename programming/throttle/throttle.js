let container = document.getElementById('container')
let counter = 0
container.innerHTML = counter
function addCounter() {
  container.innerHTML = ++counter
}
container.addEventListener('mousemove', throttle(addCounter, 1000))



//


// v1 时间戳 头执行

function throttle(fn, wait) {
  let previous = 0

  return function() {
    let context = this
    let args = arguments
    let now = +new Date()

    if(now - previous >= wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}

// v2 定时器 尾执行

function throttle(fn, wait) {
  let timeout

  return function() {
    let context = this
    let args = arguments

    if(!timeout) {
      // 没有定时器
      timeout = setTimeout(function() {
        // 执行完清除定时器
        timeout = null
        fn.apply(context, args)
      }, wait)
    }

  }
}

// v3 首尾皆执行

function throttle(fn, wait) {
  let previous = 0
  let timeout

  return function() {
    let context = this           
    let args = arguments

    let now = +new Date()
    let remaining = wait - (now - previous)

    if(now - previous >= wait) {
      if(timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      fn.apply(context, args)
    } else if(!timeout) {
      timeout = setTimeout(function(){
        previous = +new Date()
        fn.apply(context, args)
        timeout = null
      }, remaining)
    }
  }
}


// v4 option (heading, tailing)