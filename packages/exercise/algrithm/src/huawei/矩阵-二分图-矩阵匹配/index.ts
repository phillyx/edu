/**
 * https://blog.csdn.net/m0_73659489/article/details/135071758
 * 从一个N*M(N<=M)的矩阵中选出N个数，
 * 任意两个数字能在同一行或同一列，
 * 求选出来的N个数中第K大的数字的 最小值是多少
 */

function findKthValueFromMatrix(line0: string, lines: string[]) {
    const [n, m, K] = line0.split(' ').map(Number)
    let max = 0

    let matrix = lines.map(line => {
        const row = line.split(' ').map(Number)
        max = Math.max(max, ...row)
        return [0, ...row]
    })

    const check = (t: number) => {
        const mp = matrix.map(row => row.map(x => x <= t))
        let res = 0
        const match = new Array(m + 1).fill(0)
        for (let i = 1; i <= n; i++) {
            const chw = new Array(m + 1).fill(true)
            if (find(i, mp, chw, match)) {
                res++
            }
        }

        return res >= n - K + 1
    }

    const find = (index: number, mp: boolean[][], chw: boolean[], match: number[]) => {
        if (!mp[index] && mp[index].length !== m + 1) return false

        for (let j = 1; j <= m; j++) {
            if (mp[index][j] && chw[j]) {
                chw[j] = false
                if (match[j] === 0 || find(match[j], mp, chw, match)) {
                    match[j] = index;
                    return true;
                }
            }
        }

        return false
    }
    let l = 1, r = max
    let ans = 0
    while (l < r) {
        const mid = l + (r - l) >> 1
        if (check(mid)) {
            ans = mid
            r = mid
        } else {
            l = mid + 1
        }
    }

    return ans
}

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUgLAXeAHAzgLmMARgGwPYDmAdAMYoAmAdkZQKbzAC2ADAPoDsAzAGwCsAnABYAHP2ABDAE7wAliRy1g5euJk4UwAIydezdpva9hUGIDm5QABygKjkAciACyACmsAeALx2AlIBC3QJfugVjTAWjlASATAL8VrS0AHU0AYf5NIQG+5QHhDQBI5SMB1bUBfgMAKdUAYFXNAGQjANCNcwHQlGOhIQCEbUMBTcy9wiIDAGm8AaUByTS8I1K9IQABzQHgdQB4FQHozQCxNQEQdE2BwcAAzAFdKElk8SkgZmUpyZvhYADVxHDnaADFJPEY7cXhJGQAPBxwN2mY0SBRrjYIAGkhHunQ3h9KAQANoAXQ8kAA3lBIHCSCt3pAQZQfowfs0wZBXL8nswiCgkI94A4AOSQUkeIiMcRIJxzRhYWiSDywuEKeCQGm3bGQZjTOHs+hcq43Hk4v60FDU2kPJ7YgB80LZgvhiM5ZwA7rzJQSiTISeTKTK6dYGUyWSrVdzeZcdjL7tyfkQXVrWarVZJ6HNJKsQcxna68JqwSqAL6slUIyhIkiwWgkADWvIc8FelHNzMhriVMI9gujSMYSF5NI+txNDi1isgWsr4qVPLckHgHnd+d+wq9KF5-I7kELnLLcd5dG1AEFJJJxABPByMSAAakgmip6xwOAczHb+ZmeEkkAewpkvM0AG5ICfm5QLzJF4vIXn+wX1QPYNqcWPIJPp3OF8vVyIddN2uI4d2fGQZkPdZNgcGQ0SQH4401NErjjNtlWfDtu3vK0OzDPC4QIwja29X1SJ7BVP0gABaSBmiXFdwwFF8Y05GDyBTDZlFudNM0kBDXiwPA8AUcRKHBcEkPfISRLEiSwVQ+A4z4xlmXBbNcxIyDDwAQmLEFuNoW4sQAMlMrkkEMzZjLBIgFGBHZIF01wcX-FdIS9eAfVWGYDhQWgWN3fdDw5SAACtTwvSLm0YaL70fEjVR0+crKMkyQXCsyLOQzKIUwrCPVyrLeT89RAsKj0UuHWA8uxVy+UgAAfJq1m4+c0NqrKEOklCRWU2AMKfSr8xquqcXSs8ksKryfJbSQjimkbBQIyrVvwoKPVm8iyoC5jVTCnBTx+A83PEW4VTC8SexxPtBU1WA1FoULIGcWtEv7QcuRkTiJUYqtaN+SEFSVTRtKghw4wTRN5x+obprha7Sx+hHa2R8gSLDSBaHKgqsKOtyfsYsH+3WojNu21ZrvAMMgA