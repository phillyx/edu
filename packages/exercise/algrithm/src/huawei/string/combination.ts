/**
 * 给定一个只包含大写英文字母的字符串S，要求你给出对S重新排列的所有不相同的排列数。
如：S为ABA，则不同的排列有ABA、AAB、BAA三种。
提示：用排列组合；阶乘；最终只要给数字，不要列出所有字符串再算总数

 */

function AlphaSort(N: number):number {
  if (N == 1) {
    return 1
  }
  return N * AlphaSort(N - 1)
}

function getAlphaCN(str: string) {
  const map = new Map<string, number>()
  for (let i = 0; i < str.length; i++) {
    const chr = str.charAt(i)
    if (!map.has(chr)) {
      map.set(chr, 1)
    } else {
      const n = map.get(chr)!
      map.set(chr, n + 1)
    }
  }
  let sum = AlphaSort(str.length)
  for (const [key, value] of map) {
    sum /= value
  }

  return sum
}
