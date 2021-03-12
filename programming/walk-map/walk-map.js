/**
 * 算法题：
 * - 给你一副类似于如下的地图
 * 0000000000
 * 0010001011
 * 0000103001
 * 0020000000
 * 0000001000
 * 1000000000

 * 初始时你在S的位置, 你可以向上下左右四个方向发射一枚子弹; 子弹碰到1时, 会顺时针变向90度, 然后继续前进; 问你在S向哪个方向射击, 能够最快将子弹打入E内; 
 */

let map = [
    [0,0, 0, 0,0,0, 0, 0,0,0],
    [0,0, 1, 0,0,0, 1, 0,1,1],
    [0,0, 0, 0,1,0,'e',0,0,1], 
    [0,0,'s',0,0,0, 0, 0,0,0], 
    [0,0, 0, 0,0,0, 1, 0,0,0],
    [1,0, 0, 0,0,0, 0, 0,0,0] 
]
let start = [3, 2]
let end = [2, 6]

// while

function walk(start, end, direction, map) {
    let current = start
    let step = 0

    if(isEnd(current, end)) return step

    function next() {
        let row = map[current[0]]
        let value = row[current[1]]
        if(value === 1) {
            transWalk()
        } else {
            directWalk()
        }
    }

    function transWalk() {
        switch(direction) {
            case 'x': 
                direction = '-y'
                break
            case '-x':
                direction = 'y'
                break
            case 'y':
                direction = 'x'
                break
            case '-y':
                direction = '-x'
                break
            default:
                throw new Error('Value of direction must be one of "x", "-x", "y", "-y"')
        }

        directWalk()
    }
    function directWalk() {
        direction === 'x' ? ++current[1] :
        direction === '-x' ? --current[1] :
        direction === 'y' ? --current[0] :
        direction === '-y' ? ++current[0] : null
    }

    while(inMap(current, map)) {

        if(isEnd(current, end)) return step
        ++step
        next()
    }
    throw new Error('can walk to target position')
}


function inMap(current, map) {
    return current[0] >= 0 && current[1] <= map.length  && current[0] >= 0 && current[1] <= map[0].length
}

function isEnd(current, end) {
    return current[0] === end[0] && current[1] === end[1]
}


let step = walk(start, end,'y', map)
console.log(step)