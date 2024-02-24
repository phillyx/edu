/**
 * https://blog.csdn.net/m0_73659489/article/details/134614850
 * 在一个大型体育场内举办了一场大型活动，由于疫情防控的需要，要求每位观众的必须间隔至少一个空位才允许落座，现在给出一排观众座位分布图，座位中存在已落座的观众，请计算出，在不移动现有观众座位的情况下，最多还能坐下多少名观众
 */
function getSeatCount(line: string) {
    const arr = line.trim().split('').map(Number)
    let res = 0

    for (let i = 0; i < arr.length; i++) {

        // 如果有空位，判断前后是否也是空位
        if (arr[i] === 0) {
            let leftStatus = false, rightStatus = false
            // if (i === 0 && arr[i + 1] === 0) {
            //     leftStatus = true
            //     rightStatus =true
            // }
            // if (i === arr.length - 1 && arr[i - 1] === 0) {
            //     rightStatus = true
            //     leftStatus = true
            // }

            // if (i > 0 && i < arr.length - 1 && arr[i - 1] === 0 && arr[i + 1] === 0){
            //     leftStatus = true
            //     rightStatus = true
            // }

            leftStatus = i === 0 || arr[i - 1] === 0
            rightStatus = i === arr.length - 1 || arr[i + 1] === 0


            if (leftStatus && rightStatus) {
                res++
                arr[i] = 1
                i++ // 跳一格，不跳的话，下一轮 i-1 为 1，无意义判断
            }
        }
    }

    return res
}

console.log(getSeatCount('10001'))
console.log(getSeatCount('0101'))
console.log(getSeatCount('00100'))