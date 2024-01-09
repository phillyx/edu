const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let lineCount = 0
let m = 0, n = 0
/**@type {number[][]}*/
let matrix
rl.on('line', (line) => {
  if (lineCount === 0) {
    [n, m] = line.split(' ').map(Number)
    matrix = Array.from({ length: n }, () => Array.from({ length: m }, () => -1))
    // console.log(matrix.join())
  } else if (lineCount <= n) {
    const values = line.split(' ').map(Number)
    matrix[lineCount - 1] = values
  }
  if (lineCount === n) {
    rl.close()
  }
  lineCount++
})

rl.on('close', () => {
  console.log(solution())
})
/**
 * f(i,j) = g(i,j) === 1 ? 0 : f(i-1,j) + f(i,j-1)
 */
function solution () {
  const dp = Array.from({ length: n }, () => Array.from({ length: m }, () => 0))

  // 初始化
  for (let i = 0; i < m; i++) {
    // 1 障碍物
    if (matrix[0][i]) break
    dp[0][i] = 1
  }
  for (let i = 0; i < n; i++) {
    // 1 障碍物
    if (matrix[i][0]) break
    dp[i][0] = 1
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (matrix[i][j]) {
        dp[i][j] = 0
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }

  return dp[n - 1][m - 1]
}