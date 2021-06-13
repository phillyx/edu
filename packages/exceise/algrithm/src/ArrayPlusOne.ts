/**
 * 实现数字数组 + 1
 * [1,2] + 1 = [1,3]
 * [1,2,9] + 1 = [1,3,0]
 * [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2] + 1 = [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3]
 * @param {number[]} inputs
 * @return {number[]}
 */
function numberArrayPlusOne(arr: number[]): number[] {
  if (arr.length === 0) return []
  let newArr: number[] = []

  while (true) {
    let n = arr.pop()
    let sum = n + 1
    if (sum == 10) {
      newArr.splice(0, 0, 0)
    } else {
      newArr.splice(0, 0, sum)
      break
    }
  }
  return arr.concat(newArr)
}
