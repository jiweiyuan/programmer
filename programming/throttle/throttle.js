let counter = 0

function addCounter() {
  container.innerHTML = ++counter
}

let container = document.getElementById('container')
container.innerHTML = counter
container.addEventListener('mousemove', throttle(addCounter, 1000, {tailing:true, heading: false}))

// 面试的时候要安装这种顺序一次写出比较好

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

// v3 首尾皆执行 => 面试中要写出的水平

function throttle(fn, wait) {
  let previous = 0
  let timeout

  return function() {
    let context = this           
    let args = arguments

    let now = +new Date()
    let remaining = wait - (now - previous) // now - previous >= 0  === remaining <=0

    if(now - previous >= wait) { // now < previous => 更改了系统时间 
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


// v4 option (heading, tailing) => 要掌握的水平 
// 三种情况 
// 1. heading = true tailing = true
// 2. heading = true tailing  = false
// 3. heading = false tailing = true
// Note: heading 和 tailing 至少有一个 true

// heading = false 头不执行 -> 取消基于时间戳的机制 -> 走定时器的机制
// tailing = true 尾不执行 -> 取消基于定时器的机制 -> 走时间戳的机制

function throttle(fn, wait, options = { heading: true, tailing: true}) {
  if(!options.heading && !options.tailing) throw new Error('throttle 函数 options配置不能全为false')

  let previous = 0
  let timeout

  return function() {
    let context = this
    let args = arguments
    let now = +new Date()

    if(options.heading === false) {  // 控制时间戳 一种技巧
      previous = now
    }
    let remaining = wait - (now - previous)

    if(now - previous >= wait) { 
      if(timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      fn.apply(context, context)

    } else if(!timeout && options.tailing === true) { // 控制定时器
      timeout = setTimeout(function() {
        previous = +new Date()
        fn.apply(context, context)
        timeout = null
      }, remaining)
    }
  }
}

// v5 返回值 具名函数 取消方法