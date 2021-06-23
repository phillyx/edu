/**
 * 给定一组非负整数 nums，重新排列它们每个数字的顺序（每个数字不可拆分）使之组成一个最大的整数。

注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数

作者：力扣 (LeetCode)
链接：https://leetcode-cn.com/leetbook/read/top-interview-questions/xa1401/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

输入：nums = [3,30,34,5,9]
输出："9534330"

 * @param nums 
 * @returns 
 */
function largestNumber(nums: number[]): string {
  nums = nums.sort((a, b) => {
    let s1 = `${a}${b}`
    let s2 = `${b}${a}`
    return +s2 - +s1
  })
  return nums[0] ? nums.join('') : '0'
}
