/**
 * https://leetcode.cn/problems/permutations/
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

 

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

function permute(nums: number[]): number[][] {
  const len = nums.length
  if (len === 0) return []

  const res = new Array<number[]>()
  const path = new Array<number>()
  const used = new Array<boolean>()

  const dfs = (depth: number) => {
    if (depth === len) {
      res.push([...path])
      return
    }

    for (let i = 0; i < len; i++) {
      if (used[i]) continue

      path.push(nums[i])
      used[i] = true

      dfs(depth + 1)

      path.pop()
      used[i] = false
    }
  }

  dfs(0)
  return res
}
