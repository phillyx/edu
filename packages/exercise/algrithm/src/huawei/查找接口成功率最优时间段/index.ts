/**
 * https://blog.csdn.net/m0_73659489/article/details/134606550 暴力枚举
 * https://blog.csdn.net/banxia_frontend/article/details/134066508 前缀和
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
function getMaxLengthOfLostValues(minAverageLost: number, failureRates: Array<number>) {
    const len = failureRates.length

    const result = [] as number[][]

    const prefixSumList = new Array(len)
    prefixSumList[0] = failureRates[0]
    for (let i = 1; i < len; i++) {
        prefixSumList[i] = prefixSumList[i - 1] + failureRates[i]
    }
    let maxLength = 0
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            const sum = i == 0 ? prefixSumList[j] : prefixSumList[j] - prefixSumList[i - 1]
            const length = j - i + 1
            if (sum <= minAverageLost * length) {
                if (length > maxLength) {
                    result.length = 0
                    result.push([i, j])
                    maxLength = length
                } else if (length === maxLength) {
                    result.push([i, j])
                }
            }
        }

    }


    if (result.length === 0) return 'NULL'
    return result.map(([a, b]) => `${a}-${b}`).join(' ')
}

console.log(getMaxLengthOfLostValues(2, [0, 0, 100, 2, 2, 99, 0, 2]))
console.log(getMaxLengthOfLostValues(1, [0, 1, 2, 3, 4]))
console.log(getMaxLengthOfLostValues(1, [4, 3, 2, 1, 0]))
console.log(getMaxLengthOfLostValues(10, [10, 20, 30, 40, 50]))
console.log(getMaxLengthOfLostValues(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
// https://www.typescriptlang.org/play/?#code/PQKhCgAIUgLAXeAHAzgLmMARgGwPYDmAdAMYoAmAdkZQKbzAC2ADAPoDsAzAGwCsAnABYAHP2ABDAE7wAliRy1g5euJk4UwAIydB3Zn17NIgFrNA2UqAs80B8clBgJk6TLkKkK1OgyzjKADxnjWAGaSeJTwtJTkEtJyCkoqahragvp8zMKQgLJKgAD+gDEqNpCAsOaAhUqA0nKAL6mAJXKARsaAIW6ApcaAx8qACEaA+UqA4c6AOvKAXHLFgMAxgBSugM6KgHSpgBSxgPOJgJ5OgOQGgDD-gAvmgFRygG+mZYCt1oChivUNgIyagKSxbYD+8v2AAHKLgA6mgCN+gBYRgFyes1eAtHKA89aLgMKKgAS+gL8JgPRmgKrKgFl5VYbfZtc6AHgUHpdHjUIV1mAA-TTMZg1QAupudZoBNv0AWdpnCEACkYMkoAEEAG60STiAi0AAyeBQ8DuS1Wm0AznqAcXVQYBO7UAs-qQwDOylzQYB4HUAcXKASW9xcSyZTqQBHemM+CzQB+RoAvxSegABzQD+qWzZoAgzUAOeaAKnM1YAGJUAmEqAF7c6oAV+MAe2oAOQAqnS6YAgBnAgGT4wCmioB540AD-FoX1+wCQ5oASOUAMhEbHmzQA03ido10mCSKVSafSmYnADFyKcATQqXKGfQBYCYBx+MAXl6AHgsAESAMCVAClps1lGeptIZTMAHCpPT6ANeVwYBgYMAL2rwpEo9GYq6fGoXQCwcoAseUAobHl5HMRben0a4OhzVc8ES6Wy+VZzs1PUGrdXQDQcoBwC0An9qzatYWgEEk4CK0bwAWnC5BJ5DeASd6AHNyzCAAD6gDTmgAlEaxqADAqyyABragAU6oAWJqLBe6yzFaW4YXe96AChyBHlMcNYEoAP0Z1LM+EPoAkMagaKFqAOSagBJxoA8XrercgDR8poYbgMwmgAEw6L6GoCd+QngIAL9GAHBm4CkoAgAz+oAx5GAFOJaCQK2J4diqAC8mhQsiRCaEQQlEJwRCCAAQopGScO8Hw1PuXSGYAB2qACbWVxJosgDPgQmgCQchclx3rMgrMJJNjAOAAQAK6UCQsghJAtLwAAsuI3h0uEBDwLAADyASdvAABq4g4LFtAoES6Y6cqTKaZQsWMC+kgADSQAEqgVZItAAEriGE6CQKSkjUgAngAPE1LVUgAfNBkAAN5QJAa0kCETKQAolCQHpnXdbFvUDUNRA7blsDgKt62bfAkC9SgsU4Hd+0ANoALqQOIKCQDNrUfR9V1rTdlBbUgvUBDI3gAMrNXSMhbftdAAO4jWN4jjQSO3QddkDg7QkMw3DCPwK9zCfftXVqEd-WDVVZPvbjAR4JIkBY-QkAyHtkCaAA3JzkCTdt4T8zIADUYuLStwMy3jENQ7DjDw0yr0yBTcsEwrxMq1z34859YsHdTx10ygquMzLAC+uMKHdjCZdllAXdzzBMyzbO2wL+3MKLgvC5QosS1LuMy8zrPs3dABW3Nc4bfOQNHQs7fzkdB8tIeyyDW2PYwMd7d7kAAPwa4TivK6TkefZp+Ol9rFefXrNda0rJOq5AeuaBbmeyxtoN3edeXc9HeuxzzGeZzIARszngv7dpma6VtMAD7Awfd+vnNT+zTuD3NWkOzleVrxvJ8PU98BnYfsAu+PJ-A2fz1EEgsUoLABKqx1lc43fG-21lV-cxXrfdeltIC0HULQTeHsAF6Vgfvf+O9V7px-uvB+F9n6v3fjIT+71v4oLWtbH+hDu7W1xqQ3Gk82ZoMvog-O3tFq9XgEdXaAByN0HoWG40Ycw+6VVz5EHtkgAk79xAdSwLgvae8AAGAASJa4hLbfjkVgS2UjoJEEjngEkBIWGQBYTjUhvcUB4AUGdQgBJUoZQQRdQqxUyoVSqgSISHUyYdWYB1NcHVnGQG8fwfgbivG4JxkYkxtAzEEAsfQKxjsbFFRVPYyq1VNAuPcTzLxHVOAdUEEE8AITTH4AiZYg+iDbHxPKokgkyTICvUEBk9JaTIDk2gsEzaoTwmRPSsU2JdjymOORC4-pPjUmcFSckDqhgcl5LCQUjp0Sr6lKZAkxxmTqlVO8Ss2pkBeAdW4B1dgHVhAdX8TzJpOMgA