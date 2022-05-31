/**
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-dong-tai-gui-hua-2/
 * dp(i) = max(dp(j))+1  0<=j<i 且nums[j] < nums[i]
 */
export function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0

  const dp = new Array(nums.length).fill(1) // 单独一个数是是一个子序列，初始化值为1

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 比较小于i的值，比nums[i]小的，说明可以接在nums[j]后面形成一个更长的子序列
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}

export function lengthOfLISUseBinarySearch(nums: number[]): number {
  const len = nums.length
  if (len === 0) return 0

  const cell: number[] = []
  cell[0] = nums[0]

  for (let i = 1; i < len; i++) {
    const num = nums[i]
    // 如果cell中的元素都比当前索引值小，插入到cell最后
    if (num > cell.at(-1)!) {
      cell.push(num)
      continue
    }
    // 否则用当前索引值覆盖掉cell元素中最小的一个，该最小值小于当前索引值
    let left = 0
    let right = cell.length - 1
    while (left < right) {
      const mid = left + ((right - left) >> 1)
      if (cell[mid] < num) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    cell[left] = num
  }
  // cell中存储比较小的元素，cell未必是真实的最长上升子序列,但长度是对的
  return cell.length
}
