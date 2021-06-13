/**
 * 
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  // 1.暴力hash
//   let map = new Map()
  
//   nums.forEach(x => {
//     if(!map.has(x)) {
//       map.set(x, 1)
//     }else {
//       map.set(x, map.get(x) + 1)
//     }
//   })

//   for(let [k,v] of map) {
//     if(v >= nums.length / 2) {
//       return k
//     }
//   }
  
  // 2.取巧 先排序，出现次数大于 ⌊ n/2 ⌋ 的元素 一定出现在 中间
  // nums= nums.sort((a,b) => a - b)
  // return nums[Math.floor(nums.length / 2)]
   
  // 3. 摩尔投票法
  
  let count = 1, ret = nums[0];
  for(let i = 1; i < nums.length; i++) {
    if(ret == nums[i]) {
      count++
    }else {
      count--
      if(count == 0) {
        ret = nums[i]
        count = 1
      }
    }
  }
  return ret
};