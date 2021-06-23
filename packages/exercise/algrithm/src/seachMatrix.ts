type item = number[]
/**
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 * 每行中的整数从左到右按升序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,50]], target = 3
 * 输出：true
 */

// class Solution {
//   public boolean searchMatrix(int[][] matrix, int target) {
//       if(matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
//       int n = matrix.length , m = matrix[0].length;
//       int l = 0 , r = m * n - 1;
//       while(l < r)
//       {
//           int mid = l + r >> 1;
//           if(matrix[mid / m ][ mid % m] >= target ) r = mid;
//           else l = mid + 1;
//       }
//       if(matrix[r/m][r%m] == target) return true;
//       else return false;
//   }
// }

/**
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-a-2d-matrix-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
export function searchMatrix(matrix: item[], target: number) {
  if (matrix.length === 0) return false
  const i = matrix.length
  const j = matrix[0].length
  let rowNo = i - 1
  let colNo = 0
  while (true) {
    if (rowNo < 0) break
    if (colNo >= j) break
    let tmp = matrix[rowNo][colNo]
    if (tmp === target) {
      return true
    } else if (tmp > target) {
      rowNo--
    } else {
      colNo++
    }
  }
  return false
}