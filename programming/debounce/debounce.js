/**
 * dobounce
 * https://github.com/mqyqingfeng/Blog/issues/22
 * 
 * 对于一些频繁触发的事件
 */


// 用例
// window.addEventListener('resize', function fn() {})
// window.addEventListener('resize', debounce(fn, wait, immediate))

/**
 * 实现步骤
 * 1. 高阶函数（闭包） setTimeout
 * 2. this
 * 3. 参数
 * 4. 立即执行（immediate）: 没有定时器任务立即执行
 * 5. 返回值 （immediate 为 true 的时候返回） =》 面试时写到这一步即可
 * 6. 取消 返回具名函数（带有 cancel 方法）
 */

function debounce(fn, wait, immediate) {
    let timeout, result
    return function() {
        let contex = this
        let args = arguments
        if(timeout) clearTimeout(timeout)
        if(immediate) {
            // 没有定时器， 立即执行
            let callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if(callNow) result =  fn.apply(contex, args)
        } else {
            timeout = setTimeout(function() {
                fn.apply(contex, args)
            }, wait)
        }
        return result
    }
}

// 

function debounce_cancel(fn, wait, immediate) {
    let timeout, result
    function debounced() {
        let contex = this
        let args = arguments
        if(timeout) clearTimeout(timeout)
        if(immediate) {
            // 没有定时器， 立即执行
            let callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if(callNow) result =  fn.apply(contex, args)
        } else {
            timeout = setTimeout(function() {
                fn.apply(contex, args)
            }, wait)
        }
        return result
    }
    debounced.cancle = function() {
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}

// Note: setTimeout 返回值

var timeout = setTimeout(function(){
    console.log(1000)
})
clearTimeout(timeout)
console.log(timeout)