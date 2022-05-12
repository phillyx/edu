/**
 * 最大子矩阵和
 * 给定一个正整数、负整数和 0 组成的 N × M 矩阵，编写代码找出元素总和最大的子矩阵。
 */
function getMaxMatrix(matrix: number[][]): number[] {
  const rows = matrix.length
  const cols = matrix[0].length
  let colSums = []
  let sum = 0
  let beginCol = 0
  let maxSum = Number.MIN_SAFE_INTEGER

  let ans: number[] = []

  for (let i = 0; i < rows; i++) {
    colSums = new Array(cols).fill(0) // 重置

    for (let j = i; j < rows; j++) {
      sum = 0
      beginCol = 0
      for (let k = 0; k < cols; k++) {
        colSums[k] += matrix[j][k]
        if (sum > 0) {
          sum += colSums[k]
        } else {
          sum = colSums[k]
          beginCol = k
        }

        if (sum > maxSum) {
          maxSum = sum
          ans = [i, beginCol, j, k]
        }
      }
    }
  }
  return ans
}

/**
 * 欢乐周末聚餐
 * https://blog.csdn.net/qq_34465338/article/details/124403459
 */
