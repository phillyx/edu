/**
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
 */

/**
 * dp[i] = Math.max(dp[i-1], price[i] - minPrice)
   minPrice = Math.min(price[0, ...i-1])
 */
function maxProfit(prices: number[]): number {
  let max = 0
  let minPrice = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i])
    max = Math.max(max, prices[i] - minPrice)
  }
  return max
}
/**
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 * 贪心 */
function minProfic(prices: number[]): number {
  let res = 0

  for (let i = 1; i < prices.length; i++) {
    res += Math.max(prices[i] - prices[i - 1], 0)
  }

  return res
}
