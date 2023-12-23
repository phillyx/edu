function mincostTickets2(costs: number[], days: number[]) {
    const MAX_DAY = 365
    const FAILED_VALUE = -1;

    if (days.length > 365 || days.length === 0) return -1

    if (days.some(d => d == 0 || d > 365)) return -1

    if (days.some((d, i) => d <= (i == 0 ? -1 : days[i - 1]))) return -1

    // 如果天数多的票便宜，就买更便宜的票
    for (let i = costs.length - 1; i >= 0; i--) {
        if (costs[i] < costs[i - 1]) {
            costs[i - 1] = costs[i]
        }
    }
    let dp = new Array(MAX_DAY + 1).fill(-1) // 如果当天不旅行，-1

    dp[0] = 0 // 第0天现实中不存在，默认0

    for (const d of days) {
        // 当天有旅行计划，默认最大花费
        dp[d] = Number.MAX_SAFE_INTEGER
    }


    for (let i = 1; i <= days.at(-1)!; i++) {
        if (dp[i] == -1) {
            dp[i] = dp[i - 1]
            continue
        }
        
        dp[i] = Math.min(dp[i], dp[i - 1] + costs[0])

        if (i - 3 >= 0) {
            dp[i] = Math.min(dp[i], dp[i - 3] + costs[1])
        } else {
            // 小于3天也可以买3天的票
            dp[i] = Math.min(dp[i], costs[1])
        }

        if (i - 7 >= 0) {
            dp[i] = Math.min(dp[i], dp[i - 7] + costs[2])
        } else {
            dp[i] = Math.min(dp[i], costs[2])
        }
        if (i - 30 >= 0) {
            dp[i] = Math.min(dp[i], dp[i - 30] + costs[3])
        } else {
            dp[i] = Math.min(dp[i], costs[3])
        }
    }

    return dp[days.at(-1)!]
}
// 5 14 30 1001 
// 3 15 20 21 200 202 230
console.log(mincostTickets2([5, 14, 30, 1001], [1, 3, 15, 20, 21, 200, 202, 230]))

// https://www.typescriptlang.org/play?target=99#code/GYVwdgxgLglg9mABAWxpOBnKAVGEDWAplBgBQSYkBciYIyARoQE4DaAugDSIAmAhgE8MNOoxYcAlIgDeAKEQLEFMFkQBZAIIANAPoARDQE1EAXkQBmAGwBWeYuWqAYhoCSAGQCienQDUNbgFUPU0QAWgBGAG5ZOwUYYERSfiEAOgAbQjAAcygAC0QAPgsbRAAfUt5BDHTMnPyTBsQABilmYhBmJAiYxUR4xOTqjDhkQiTTIp5TMyayiqmiq2sJVvbOsPCexX6kqpTh0dIk7hgpE0nEAB4zUhhp5sQAfg3EGkHWO9DEcPYV1agOl1NrFEAB6UGIQBBmoAc80AlJqAB1NAFiagBC3QAWnoB++UAOdqAGH-AIw6gAc5QAvZli0SDgHBmIkMlA+iEKFhqhlsnkwt9IrSCjN2TBQqEpHJer0dvSSB92FclJQMB9WT9+SDBfYpTKvj86cqYOwFYoAL4gvW9am8AAOITAhAA7ogNMxmIJSJpdAZjABqb4SFLAGBpNKkCJScFQ6GAZX1YYBYOUAo6aAGQjsd0QTxjawmuKZmCIYAabyasMADc6APO1ALRyYcAGtqACnVsYANvMAJdFNLYKcmU8gIVRTOAJQbyxUKQOhwCQ5tHAIXRgCQlCuVwAA5oByTUAjUGATljtQoE6weCnEAA5ehMZgpR06ADKGkcHh0LhX2A8AHEPAAlfUxMkUqnEWlmKK066VVJ8KB+8ISACE3JdF0O07HYF01e5-RkOdBTA5cwNlLVO0FZRYDoQhoINTtoNgkI1E-XIUlQMAkkTTVuHg1VxTdEVpWTCRa0FHZPgsQoZmApD51I5c8LyQi0BIsVyNI1lzCoyUGVYOUMMQQg0gwQgoI4xRA0AeB1ADi5cxYUAfTlAHvlQBTuXxTTSSUzixVw-C+OI2DuBoyTfgwhihQSW5WQAdlY5p2I4nCzB4giiIEsiTRVRBXLE2yACZ7KQnUZLkhSBRMnz1AsgLrPE0UovomLoKYkTZk5TzFKSrjzN4tKuKEkLzGTRBqOVUTss7WLZPk4qlOSvzLMCrgMulRqHN6PUQTaAF1gXQYUk-b8-y1PVA2sb4ABYLFmcImiacJEFkQNzG+RaItmCKtsOo6mgixAIpq2QHDgDJ0jgLJSCIkVcAIYgyFYaxuHCJbuBqn6Np+bhJP+n7vsuppuGO6GNthiLoZq34JCAA