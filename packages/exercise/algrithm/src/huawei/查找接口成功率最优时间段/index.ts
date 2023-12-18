/**
 * 服务之间交换的接口成功率作为服务调用关键质量特性，某个时间段内的接口失败率使用一个数组表示，数组中每个元素都是单位时间内失败率数值，数组中的数值为0~100的整数，给定一个数值(minAverageLost表示某个时间段内平均失败率容忍值，即平均失败率小于等于minAveraqeLost，找出数组中最长时间段，如果未找到则直接返回NULL。
输入描述:
输入有两行内容，第一行为/minAverageLst，第二行为傲组，数组元素通过空格"分隔，minAverageLost吸数组中元素取值范围为0~100的整数，数组元素的个数不会超过100个。
输出描述:
找出平均值小于等于minverageLos的最长时间段，输出数组下标对，格beginlndex-endindx(下标从0开始)，如果同时存在多个最长时间段，则输出多个下标对且下标对之间使用空格(拼接，多个下标对按下标从小到大排序。
示例1
输入
01234
输出
0-2
说明
A、输入解释: minAverageLost=1，数组10.1.2.3.4B、前3个元素的平均值为1，因此数组第一个至第三个数组下标，即0-2
 */
function getMaxLengthOfLostValues(minAverageLost: number, arr: Array<number>) {
    const len = arr.length

    const result = []

    // 先暴力，再考虑是否优化
    for (let i = 0; i < len; i++) {
        let t = -1;
        for (let j = i + 1; j < len; j++) {
            const tmp = arr.slice(i, j + 1)
            if (tmp.reduce((a, b) => a + b, 0) <= minAverageLost * tmp.length) {
                if (t < j) {
                    t = j
                }
            }
        }
        if(t!==-1){
            result.push(`${i}-${t}`)
        }
    }

    if(result.length === 0 ) return 'NULL'
    return result.join(' ')
}

console.log(getMaxLengthOfLostValues(2, [0, 0, 100, 2, 2, 99, 0, 2]))
console.log(getMaxLengthOfLostValues(1, [0, 1, 2, 3, 4]))
console.log(getMaxLengthOfLostValues(1, [4, 3, 2, 1, 0]))

// https://www.typescriptlang.org/play?#code/PQKhCgAIUxYc0QqVDScoF9TAlcoI2NAhboUuNDHyoBCNB8pUHDnQHXlAuOQUGAYwCldBnRUDpUwCljB5xME8nQcgNAYf8AXzQKjlAb6bJArdaBQxRy5AjJqBSWOKB-eRqAAOT6AHU0AjfoAsIwFyeXdYFo5QPPWfQMKKgAl9AvwmB6M0CqyoFl5IaJnEVgHgVdavZlfkADAD8ARh8fTEAXUxUuQE2-QCztZVcACgBbAEsAOwBBADcAUwAnAEMAc2yAGQB7AGcAF21+ITFAZz1AcXUnQE7tQFn9N0BnZWanQHgdQDi5QElvAZSMnIKAR1LKqq5APyNAL8V9QABzQH9U+q5AIM1AHPNAKnN5wAYlQEwlQBe3bEAV+MA9tQA5AFUSksAgBnBAZPjAU0VAeeNAB-iALjf3oBIc0AJHKAGQjRK0uIAab0UoPIwDGWTyRVK1WhgBi5OGAJoU1O4zIAsBMA4-GALy9ADwWACJAGBKgBS0riIiYo8rVQAcKvozIA15RcgGBgwAvar5AsEwhF1GZMKpALBygCx5QChsYSgj4+C9Xosfv8ls0XIMRmMGcUmZh1ptlepANBygHALQCf2lxSQAjbKFNIAG1SABNsgAPAC02VdaRd7vi5sAc3I+QAA+oBpzQAlNsdoAYFQEgA1tQAU6oAsTT4hpEXGOyrT5otgBQ5PMoBRk+KAH6NsFxc5bAJDGwb6h0A5JqAJONAPF6Ly0gGj5AIA8A+AIAJgAzAAWN6LPuegfgQAv0YA4M3A6UAgAwfQDHkYApxN+kHpyL1swAvAF3EEAHQBE8Dk9Dk8jgBCS8AskpDkymTAa8hHwAHaoATa3UML4gDPgVCgCQcqoajmlwXQ+FOUAgMA4AAGYAK6pAAxlUyRlKkkDFFUACy+TuiUPqFFUAAWADyCFMlUABq+SOkh2QVEkaRIgUe7VFuqRIYkdq5AANJA+S5LkW7pKJ+QAJ4ADw8XxeQAHyRpAADeUCQJpqFYdUkCOj6kD7sJoknvpqSkWR4AaVpOlVJAuTMUhjp2UZADaAC6VmaZpwDAJAgASioALWaANlKXCALGKgDAAYAimGWIAZCqABjygBoytZkAIWUuSQPE+l2ckhmQD4ADckC5TJek+kVyQANSVSp6nefVZV2S5kCegEBUpfVaUZVl2R2QAVnluWVZAbWQANpVmUVfXVbVHUNTZqS6VUiQAA55SJuQnhUjrJKh2TxMkQkDcNASRnN83JAhmXLStJ4OS6SF7fE8T5EJNoqfuinCZAw02kJPgqTJRk7hxMy6TAN2mSR5GzfNcPeZd12QKVfWw-D6Oac1fXnejAC+OP1fj8NE3Dl3xFUACE+77q1kZ1Rj9mOc5J4rUhFRkfEAAGAAkqnJLjnq81UuOc2dxMpfjKVkw5FROVUUPmeRhnU-lkAqQ5VRIbk2EAOT3I8OspRrWvYTLcsnn1ZRpPEOuQDrZ2S9pi1lPppllIU8S4QRRHQ5R1GzPRjHMfEA5Ca5Pj-UJ8pCaHkCxwAnPHkdx+5kZnU7FQu9kbse17hHEYrfs0YHTEsQEYcRyNMdCUOQkjqn6c6VnOee713sFxZVHFwxpfxOXkCuSONfV1X+UN0AA