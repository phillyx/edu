/**
 * https://blog.csdn.net/m0_73659489/article/details/135119914
 * 小扇和小船今天又玩起来了数字游戏
 * 小船给小扇一个正整数 n ( 1 ≤ n ≤ 1 0^ 9 ) ，小扇需要找到一个比n大的数字m，使得m和n对应的二进制中1的个数要相同
 */
function getSameSecondary1Count(n: number) {
    const arr = `0${parseInt(`${n}`).toString(2)}`.split('').map(Number)
    console.log(arr.join(''))
    const len = arr.length

    // 找到第一个01子串，反转；将当前索引之后的高位中的1全部移到低位
    for (let i = len - 1; i > 0; i--) {
        if (arr[i] === 1 && arr[i - 1] === 0) {
            // 找到第一个01子串，反转；
            [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]

            // 将当前索引之后的高位中的1全部移到低位
            // let count1 = 0
            // for (let j = i + 1; j < len; j++) {
            //     if (arr[j] === 1) count1++
            // }
            // console.log(count1)
            // for (let j = i + 1; j < len; j++) {
            //     arr[j] = count1 > 0 ? 1 : 0;
            //     count1--

            // }
            let pre = i + 1
            for (let j = i + 1; j < len; j++) {
                if (arr[j] === 0) {
                    [arr[j], arr[pre]] = [arr[pre], arr[j]]
                    pre++
                }
            }

            break
        }
    }
    console.log(arr.join(''))
    return parseInt(arr.join(''), 2)


    // const visited = Array(len).fill(false)

    // const queue = [] as string[]
    // const list = new Set<string>()
    // const backtrace = () => {
    //     if (queue.length === len) {
    //         list.add(queue.join(''))
    //         return
    //     }
    //     for (let i = 0; i < len; i++) {
    //         if(visited[i]) continue

    //         queue.push(arr[i])
    //         visited[i] = true

    //         backtrace()

    //         queue.pop()
    //         visited[i] = false
    //     }
    // }
    // backtrace()

    // let ans = Number.MAX_SAFE_INTEGER
    // list.forEach(x=>{
    //     const tmp = parseInt(x,2)
    //     if(tmp>n){
    //         ans = Math.min(ans,tmp)
    //     }
    // })

    // return ans
}
// 全排列效率太低了
// console.log(getSameSecondary1Count(7))
// console.log(getSameSecondary1Count(2))
console.log(getSameSecondary1Count(1e2-1))


// https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAcwKZQMoEMC2qOoQIAmWATgJ4CMAwnOFABRgBciYIOARqmQJSIA3gFgAUIgmIiYAM5RE5MogC8iAAYAGACSCADuRmoAkmCZqdYAL5q+AOihwMUMjDDJGAJj7XbM3QBsYJgByYLscLF1GADlOHn4xSSkEGTh-VFt-OHdFWwArOFdGUL4+RMlpOUR0pFVcmuQoAAsxcokAenbEQD8jQAYlQBpvQAA5QCo5DSpABW1AJjlAGH-AWeVAG3jAbH-AMB1AZX1AWSVAIl9AVH1AaTlAOBVAELdADazAWXlAWjlDqkALRUALhMBvz17AOXlTtsRgOCVGdPkYFWrUEgALSIKgAbkQfwAfIgNBCYECgQIROIkpIYMBEIxFABtGAAXRUylUVEQADIyQoyGQ8YgQVRCcTVBpkW80ZJOj0BiMxlM5ks2ezEDjcX96fiADRUmkExnC0WS6W08X41qooUcrprLZ7I5nS43B7PV7qjWITk-ZIMUnMwXszkfL6WvL-P4AalBEJdAB4AWAvW63azTRrOUkMVjcXlGcTQQIiNbA3a0ZzLMmkpzKmkMll3AnTFQyiGhQ7Pljna7EB7wYgfX6A0GhOnNWio3L81BSTCNIgAPygxBsOHNjpdJIdqiItVmltp4vsy26MioSvVkfvMvfdC11eene+moN4Mz9kR7HUnHRonM48njUii-RqW4peofFyh801+Ktuq+d3xBXyTf8NTnO853XLhlywABrZMwMkBCJCzdJMmyc8yHyQowGKMIiySZcoBAMgkH0MhDBMJhcgKIoSilLw1TeTMUnkAA3GAZCCVBiH+ABBaksAoLcwDsYAYH8fxGGALB-EMIsmK6Sp5AARxAVA1P+HFCSwGREDkFw3C0hTklkeRAiqVQwFQAB3RACCgb19NcZAoUYfCWyUxAuCwCAYOcHyV1UNyVBhFEMzHdFMUYVT1JzQFGiaa8-VvUczXMqBbCwYhiGitS1Kw2i8OMjVCOIsBisQiqJEdcttz+Zl4UQA9AXhQMUvNCLT2ARh2M4qBuLxfF4wQWAOFQacWw1GL8t0EAZCaDDBvc1KNV6rjiEG-5nDUiaVqFbzfP8iBUDc3aOrNaaMl0OAomW87Vo49bNtUaTZPG00w0qj6uiQ86Dr8sgAtO0RjMtLBZH+WJuF4WwAFleIADQAfQwXiADEAFEkaMaIABUMYAcQxgAlUGOIyx0MZ8haAA9lChMLJoqFjECgHBdH+MiKNMRgaYlBjvrRDFGDZ3QoRExm9vZcHdNUWGsGaWwcCKGWJVFu7PokX7U3kwXSpIhRZDEOdOWuQAk40AdCVAAlTQBw50AKk0nkAMLkxGY2RszQ9w0EwXB8EIEhyGoOgGEYAB2UoXcUlJ3dzRgvewPACGkUhKFoegea8IsUJzdC459xP-ZToOeaoVAPCBQs+CAA