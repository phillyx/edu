/**
 * https://leetcode.cn/problems/permutation-sequence/
 * 给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

"123"
"132"
"213"
"231"
"312"
"321"
给定 n 和 k，返回第 k 个排列。

 

示例 1：

输入：n = 3, k = 3
输出："213"
 */

function getPermutation(n: number, k: number): string {
  const used = new Array<boolean>()
  const path = new Array<number>()
  const factorial = calculateFactorial(n)

  const dfs = (depth:number) => {
      if (depth === n) return

      const f = factorial[n - 1 - depth]

      for (let i = 1; i <= n; i++) {
          if (used[i]) continue
          if (f < k) {
              k -= f
              continue
          }
          path.push(i)
          used[i] = true
          dfs(depth+1)
          // 不需要继续遍历，直接跳转到叶子节点，后面的数没必要尝试了
          return
      }
  }

  dfs(0)

  return path.join('')

};
/**
 * 
把候选数放在一个 有序列表 里，从左到右根据「剩下的数的阶乘数」确定每一位填谁，公式 k / (后面几位的阶乘数) 的值 恰好等于候选数组的下标；
选出一个数以后，k 就需要减去相应跳过的阶乘数的倍数；
已经填好的数需要从候选列表里删除，注意保持列表的有序性（因为排列的定义是按照字典序）；
由于这里考虑的是下标，第 k 个数，下标为 k - 1，一开始的时候，k--。
 */
function getPermutation2(n: number, k: number): string {
  k-- // 在n个全排列中找到下标为k-1的那个数

  const factorial = calculateFactorial(n)
  const path = new Array<number>(n)

  const nums = new Array<number>(n).fill(0).map((_, i) => (i + 1))

  for (let i = n - 1; i >= 0; i--) {
      const index = Math.floor(k / factorial[i])
      path.push(nums.splice(index, 1)[0])
      k -= index * factorial[i]
  }

  return path.join('')
}

function calculateFactorial(n: number) {
  const f = new Array<number>(n + 1)
  f[0] = 1
  for (let i = 1; i <= n; i++) {
      f[i] = f[i - 1] * i
  }
  return f
}