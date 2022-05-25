/**
 * 给定一个正整数数组，最大为100个成员，从第一个成员开始，走到数组最后一个成员最少的步骤数，第一步必须从第一个元素开始，1<=步长<len/2，第二步开始以所在成员的数字走相应的步数，如果目标不可达返回-1，只输出最少的步骤数量。

输入：由正整数组成的数组，以空格分隔，数组长度小于100，请自行解析数据数量。
输出：正整数，表示最少的步数，如果不存在输出-1.
样例：
7 5 9 4 2 6 8 3 5 4 3 9
2
 */
function minSteps(arr: number[]) {
  const len = arr.length
  let minSum = Number.MAX_SAFE_INTEGER
  const len2 = Math.floor(len / 2)

  for (let i = 1; i < len2; i++) {
    // console.log('i',i)
    let count = 1
    let currentIndex = i
    while (currentIndex < len) {
      let nextStep = arr[currentIndex]
      currentIndex += nextStep
      // console.log(arr.length,currentIndex)
      if (currentIndex <= len) {
        count++
      }
      if (currentIndex === len - 1) break
    }
    // console.log('count',count,'currentIndex',currentIndex)
    if (currentIndex === len - 1) {
      minSum = Math.min(minSum, count)
      //  console.log(minSum,'minSum')
    }
  }
  return minSum === Number.MAX_SAFE_INTEGER ? -1 : minSum
}
