/**
 * https://blog.csdn.net/weixin_48157259/article/details/135304492
 */
function resolve(input: string) {
    const lines = input.trim().split('\n');
    const pushList = lines[0].split(',').map(Number)
    const popList = lines[1].split(',').map(Number)

    const n = pushList.length
    const queue = []

    let ans = ''

    let popIndex = 0

    for (const pushNum of pushList) {
        // 将push_num加入队列中，注意只能从队列右端加入
        queue.push(pushNum)

        while (queue.length > 0) {
            // 判断队头、队尾元素情况
            // 注意：此处一定要先判断队头
            // 因为当队列中仅剩一个元素时，从左边出队
            // 若【队头元素】等于下一个出队元素
            if (queue[0] === popList[popIndex]) {
                // 该元素从左边出队
                queue.shift()
                popIndex++
                ans += 'L'
            } else if (queue.at(-1) === popList[popIndex]) {
                // 从元素的右边出队
                queue.pop()
                popIndex++
                ans += 'R'

            } else {
                break
            }
        }
    }

    return ans.length === n ? ans : 'NO'
}

console.log(resolve('4,5,6,7,0,1,2\n6,4,0,1,2,5,7'))

// https://www.typescriptlang.org/play?target=99#code/LAKAZgrgdgxgLgSwPZQAQCcCmBnJAbAN0wAoEoAHCOALlWznTIHMBKVAb1FW9RhXtR4yOVAF5UZSnAB0DBAFtiLadnJC4xAOQAdKJpYBuLjz5QBlbAAsAMggHihUHAG0ADAF0VahBs0AafWl5AENyYgA5CHkAI0x0FmNuU3Mkclt7QWFsZwBGT1V1LQDlELDImLiEkETefjhUNHELGzsZPEwoJjhLGuT6gEcITCGxVGd3UBr2+uCzUc1NSZAeQUx68lSASSgAE0wAD1HXJZWwJHRUYj7UZvLUJDAbiCt0uDZOZZWeAHpv1EAwHWaAH0oFFAAVKgFNFQD4aYB0JUAtHKAGH-ABc2gHhDQBXyoBfgMAc3KwwDPyoB7r0hNRWg2GmGkzWItyiVWJPAA7pYEO1LqShtJ2p1uqgAHyoVzvOlfVC-VCAEiVALWmUMALJqAQAYoYA+HUAwoqAAl9AKMGgFbFIVfUWowBY-4ATa0AIJqAADlAFnagEDIwASipKZdqVqLAAdqgC45QDK+rC4YBRuUAlkomwBUcqrAG+mCKxgDPdQCd8YAvxSh9p+f0Ap0GABAYZarAIgMgElvQBxcoBoOX90dVse4CEexDZmDc7jEoiaqVezg25G2e327kFn2FHZFf0Ap9GqsNRmPtztfMsqJlgDRVYcdhtNg4Aannha+s2wqHn4k01kWQ87AF9UJg8NhMBIS6PghoALQ5NjVmtpVr1ra7A6tjjLh1-LGqwAhbriB0-HhRwbJQgO4WdX32RdwNQVd103AAlHdlwPI8Tw-Xdp1QaIsGCABrVDtT3GoSOqIcsDgCB0DQVcOQ6LpLCrcQ0AAfjguZaE0cIAHkdzI0Bknwck8CQJhiCwXBCBITQABY-AAVj8AA2PwAHY-FcPwcj8AAmXRVPkrSdN0xT1P0FggA