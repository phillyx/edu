/**
 * 第 i 个人的体重为 people[i]，每艘船可以承载的最大重量为 limit。

每艘船最多可同时载两人，但条件是这些人的重量之和最多为 limit。

返回载到每一个人所需的最小船数。(保证每个人都能被船载)。
输入：people = [3,2,2,1], limit = 3
输出：3
解释：3 艘船分别载 (1, 2), (2) 和 (3)
 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/boats-to-save-people
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
 var numRescueBoats = function (people, limit) {
  let arr = people.sort((a, b) => a - b)
  let left = 0, right = arr.length - 1;
  let retSums = 0
  //  进行循环，退出循环条件为两指针相遇，表示需求都完成
  while (left <= right) {
    retSums++
    if (arr[left] + arr[right] <= limit) {
      left++
    }
    right--
  }
  return retSums
};