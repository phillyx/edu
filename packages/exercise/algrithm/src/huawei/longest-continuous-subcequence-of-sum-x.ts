/**
 * 有N个正整数组成的一个序列。给定整数sum，求长度最长的连续子序列，使他们的和等于sum，返回此子序列的长度，如果没有满足要求的序列，返回-1。
 * 输入描述:
序列：1,2,3,4,2

sum：6
输出描述:
序列长度：3

 */

export function maxSecquenceLength(arr: number[], n: number) {
  let res = -1

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      res = 1
      continue
    }

    let sum = arr[i]
    let count = 1

    for (let j = i + 1; j < arr.length; j++) {
      count++
      sum += arr[j]
      if (sum === n) { 
        res = Math.max(res, count)
        continue
      }
    }
  }

  return res
}
/**
 * https://www.jianshu.com/p/ad5d6c66b372
 */
export function maxSecquenceLengthUsePreFixAndMap(arr: number[], n: number) {
  const sums = new Map([[0, -1]])
  let preSum = 0 //sumi
  let ans = 0

  for (let i = 0; i < arr.length; i++) {
    preSum += arr[i]

    if (!sums.has(preSum)) {
      sums.set(preSum, i)
    }

    const diffSum = preSum - n
    if (sums.has(diffSum)) {
      ans = Math.max(ans, i - sums.get(diffSum)!)
    }
  }

  return  ans
}
