/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days = [], costs = []) {
  if(days.length > 365 || days.length == 0) {
      console.error('input days invalid')
      return -1
  }
  if(days.some(d => d == 0 || d > 365)) {
      console.error('day-value in input days invalid')
      return -1
  }
  if(days.some((d,i) => d <= (i == 0 ? -1 : days[i-1]))) {
      console.error('day-value in input days is not increment')
      return -1
  }
  if(costs.length !== 3) {
      console.error('costs.length must be 3')
      return -1
  }
  if(costs.some(c => c < 1 || c > 1000)) {
      console.error('cost-value in input costs invalid')
      return -1
  }

  // 如果天数多的票更便宜那就买更便宜的票
  if(costs[1] > costs[2]) {
      costs[1] = costs[2]
  }
  if(costs[0] > costs[1]) {
      costs[0] = costs[1]
  }

  // 备忘录 数据预置
  let dp = new Array(365+1).fill(-1) // 如果当天不旅行，置-1
  for(let d of days){
      // 当天有旅行计划，默认最大花费
      dp[d] = Number.MAX_SAFE_INTEGER
  }
  
  dp[0] = 0 // 第0天现实中不存在，默认0

  for(let i = 1; i <= days[days.length - 1]; i++) {
      if(dp[i] != -1) {
          dp[i] = Math.min(dp[i], dp[i - 1] + costs[0])
          if(i - 7 >= 0) {
              dp[i] = Math.min(dp[i],dp[i - 7] + costs[1])
          }else {
              // 小于7天也可以买7天的票
              dp[i] = Math.min(dp[i], costs[1])
          }

          if(i - 30 >= 0) {
              dp[i] = Math.min(dp[i], dp[i-30] + costs[2])
          }else {
              dp[i] = Math.min(dp[i], costs[2])
          }
      }else {
          dp[i] = dp[i-1]
      }
  }
  
  return dp[days[days.length -1]]
};