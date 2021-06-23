/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function (arr: number[]): string {
  if (arr.length == 0 || !arr) return ''
  if (arr.length == 1) return arr[0].toString()

  let doubleArr = new Array(10).fill([])
  let tmp = arr.map(x => x.toString())
  // 类似于分治法的思想，将同类数字起头的归并到一个数组内
  for (let i = 0; i < 10; i++) {
    doubleArr[i] = tmp.filter(x => +x[0] == i)
  }
  // 然后对数组进行排序
  doubleArr = doubleArr.map(ar => ar.sort((a, b) => (a + b).localeCompare(b + a)))
  let str = ''
  //   return doubleArr.flat().join('')
  doubleArr.forEach(x => {
    x.forEach(y => {
      str += y
    })
  })
  return str
};