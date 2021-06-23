/**
 * https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/
 * dp[i] = [...dp[i-1][0, len], nums[i]] (nums[i] > dp[i-1][len - 1])
 * dp[i] = [nums[i]] nums <= dp[i-1][len - 1]
 * maxLenth = Math.max(...dpi.length)
 */
 function findLengthOfLCIS(nums: number[]): number {
  let maxLenth = 1
  let dp = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
      if (nums[i] > dp[dp.length - 1]) {
          dp = [...dp, nums[i]]
      } else {
          dp = [nums[i]]
      }
      maxLenth = Math.max(maxLenth, dp.length)
      // if (nums[i] > dp[i - 1][dp[i - 1].length - 1 ]) {
      //     dp[i] = [...dp[i - 1], nums[i]]
      // } else {
      //     dp[i] = [nums[i]]
      // }
      // maxLenth = Math.max(maxLenth, dp[i].length)
  }
  return maxLenth

    // if(nums.length <= 1)
    // return nums.length;
    // let ans = 1;
    // let count = 1;
    // for(let i=0;i<nums.length-1;i++) {
    // if(nums[i+1] > nums[i]) {
    //     count++;
    // } else {  
    //     count = 1;
    // }
    // ans = count > ans ? count : ans;
    // }
    // return ans;
};