/**
 * 用连续自然数之和来表达整数
 * 一个整数可以由连续的自然数之和来表示。给定一个整数，计算该整数有几种连续自然数之和的表达式，且打印出每种表达式。
 * 输入
9
输出
9=9
9=4+5
9=2+3+4
Result:3
   解析：应用等差数列
   d = 1
   S = ((a1+an)*n*d)/2
   推导出
   a1 = (2s/n -n+1)/2
   推导出 2s % n == 0 
          2s>(n-1)n
 */

function getSumList(S: number) {
  if (!S) return null
  const arr = [[S,0]] // n=1
  for (let n = 2; 2 * S > n * (n - 1); n++) {
    if ((2 * S) % n == 0) {
      let a = ((2 * S) / n - n + 1) / 2
      arr.push([a, n])
    }
  }
  return arr
}

/**
 * 给一个正整数NUM1，计算出新正整数NUM2，NUM2为NUM1中移除N位数字后的结果，需要使得NUM2的值最小。
收起 
输入描述:
1.输入的第一行为一个字符串，字符串由0-9字符组成，记录正整数NUM1，NUM1长度小于32。

2.输入的第二行为需要移除的数字的个数，小于NUM1长度。
如：
2615371
4
输出描述:
输出一个数字字符串，记录最小值NUM2。
如：131
 */

function getMinNumStr(num: string, K: number) {
  const arr = num.split('')
  const len = arr.length
  let n = len
  while (n > len - K) {
    for (let i = 0; i < n; i++) {
      if (+arr[i] > +arr[i + 1]) {
        arr.splice(i, 1)
        break
      }
    }
    n--
  }
  return arr.join('')
}

/**
 * 双十一众多商品进行打折销售，小明想购买自己心仪的一些物品，但由于受购买资金限制，所以他决定从众多心仪商品中购买三件，而且想尽可能的花完资金，现在请你设计一个程序帮助小明计算尽可能花费的最大资金数额。
 * 典型的三数之和问题
 * https://leetcode.cn/problems/3sum-closest/
 */
function threeSumClosest(nums: number[], targetPrice: number) {
  nums = nums.sort((a, b) => a - b)
  let ans = -1
  const setMaxPrice = (sum: number) => {
    if (targetPrice - sum >= 0) {
      if (targetPrice - sum < targetPrice - ans) {
        ans = sum
      }
    }
  }
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const sum = nums[left] + nums[right] + nums[i]
      setMaxPrice(sum)

      if (sum > targetPrice) {
        right--
      } else if (sum < targetPrice) {
        left++
      } else {
        return sum
      }
    }
  }

  return ans
}
