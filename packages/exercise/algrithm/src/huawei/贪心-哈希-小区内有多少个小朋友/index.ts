// https://blog.csdn.net/m0_73659489/article/details/135464903
function getNeighborhoodCount(arr: number[]) {
    // arr.sort()

    // let res = 0
    // let count = 1

    // let target = arr[0]
    // for (let i = 1; i < arr.length; i++) {
    //     if (arr[i] === target) {
    //         count++
    //     } else {
    //         res += target + count
    //         target = arr[i]
    //         count = 1
    //     }
    // }
    // res += count + target
    // return res

    const map = new Map<number, number>()
    arr.forEach(x => {
        if (!map.has(x)) {
            map.set(x, 1)
        } else {
            map.set(x, map.get(x)! + 1)
        }
    })

    let res = 0
    for (let [key, value] of map) {
        res += key + value
        // res += Math.floor(((key + value)/(key+1)) * (key+1))
    }
    return res
}
console.log(getNeighborhoodCount([5, 2, 3]))
console.log(getNeighborhoodCount('5 2 3 1 3 4 5 6 19 1 1 2 3 4 5 6 2 3 4 5 1 2 3 4 4'.split(' ').map(Number)))