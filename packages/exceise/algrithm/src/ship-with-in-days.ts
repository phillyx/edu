/**
 * 传送带上的包裹必须在 D 天内从一个港口运送到另一个港口。

传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。

返回能在 D 天内将传送带上的所有包裹送达的船的最低运载能力。



示例 1：

输入：weights = [1,2,3,4,5,6,7,8,9,10], D = 5
输出：15
解释：
船舶最低载重 15 就能够在 5 天内送达所有包裹，如下所示：
第 1 天：1, 2, 3, 4, 5
第 2 天：6, 7
第 3 天：8
第 4 天：9
第 5 天：10

请注意，货物必须按照给定的顺序装运，因此使用载重能力为 14 的船舶并将包装分成 (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) 是不允许的。 
示例 2：

输入：weights = [3,2,2,4,1,4], D = 3
输出：6
解释：
船舶最低载重 6 就能够在 3 天内送达所有包裹，如下所示：
第 1 天：3, 2
第 2 天：2, 4
第 3 天：1, 4


 */
export function shipWithinDays(weights: number[], D: number) {
  /**
   * 暴力法
   * 要在 D 天内运完所有包裹，那么每天至少的承载量为 sum / D
   * 但是，因为一次至少运 1 个包裹，而这个包裹的重量可大可小，那么可能 weights[i] > sum / D
   * 假设包裹最大的重量为 maxWeight
   * 因此，最低承载量应该为 capacity = max(sum / D, maxWeight);
   */
  const sum = weights.reduce((a, b) => a + b, 0)
  let minWeight = Math.ceil(Math.max(...weights, sum / D))

  let count = 1
  let tmp = 0
  let i = 0
  
  while (i < weights.length) {
    tmp += weights[i]
    if (tmp <= minWeight) {
      i++
    } else {
      tmp = weights[i]
      count++
      i++
    }

    if (count > D) {
      i = 0
      count = 1
      minWeight += 1
      tmp = 0
    } else if (count <= D && i === weights.length) {
      return minWeight
    }
  }
  return -1
}

export function shipWithinDaysWithBinarySearch(weights: number[], D: number) {
  /**
   * 要在 D 天内运完所有包裹，那么每天至少的承载量为 sum / D
   * 但是，因为一次至少运 1 个包裹，而这个包裹的重量可大可小，那么可能 weights[i] > sum / D
   * 假设包裹最大的重量为 maxWeight
   * 因此，最低承载量应该为 capacity = max(sum / D, maxWeight);
   */
  const sum = weights.reduce((a, b) => a + b, 0)
  let minWeight = Math.ceil(Math.max(...weights, sum / D))
  // 最低承载量
  let left = minWeight
  // 最高承载量
  let right = sum

  const isOK = (capacity: number, day: number) => {
    let temp = 0
    weights.forEach((x) => {
      if (temp + x > capacity) {
        temp = 0
        day--
      }
      temp += x
    })
    return day > 0
  }

  while (left < right) {
    let mid = left + ((right - left) >> 1)
    if (isOK(mid, D)) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
}
