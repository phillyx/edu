/**
 * https://leetcode.cn/problems/coin-change/
 */
function coinChange(coins: number[], amount: number): number {
  const map = new Map<number, number>()

  const dp = (price: number):number => {
    if (price === 0) return 0
    if (price < 0) return -1
    let res = Number.MAX_SAFE_INTEGER

    if (map.has(price)) return map.get(price)!

    for (const coin of coins) {
      let sub = dp(price - coin)
      if (sub === -1) continue

      res = Math.min(res, sub + 1)
    }
    map.set(price, res === Number.MAX_SAFE_INTEGER ? -1 : res)
    return map.get(price)!
  }

  return dp(amount)
}


function coinChange2(coins: number[], amount: number): number {
  const len = amount + 1
  const dp = new Array(len).fill(len)
  dp[0] = 0

  for (let i = 0; i < len; i++) {
      for (const coin of coins) {
          if (i - coin < 0) continue
          dp[i] = Math.min(dp[i], 1 + dp[i - coin])
      }
  }

  return dp[amount] === len ? -1 : dp[amount]
};