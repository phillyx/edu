/**
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * @param nums
 * @returns
 */
function singleNumber(nums: number[]): number {
  if (nums.length === 0) return -1
  if (nums.length === 1) return nums[0]
  let n = nums[0]
  for (let i = 1; i < nums.length; i++) {
    n ^= nums[i]
  }
  return n
}

// var singleNumber = function(nums) {
//   const map = {}

//   for(let i = 0; i < nums.length; i++) {
//     let key = nums[i]
//     if(!map[key]) {
//       map[key] = 1
//     }else {
//       map[key]++
//     }
//   }
//   return Object.keys(map).find(k=> map[k]  == 1)
// };
