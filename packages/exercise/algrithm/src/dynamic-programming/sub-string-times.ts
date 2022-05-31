/**
 * 一个字符串，一个子字符串，判断子字符串在字符串中出现的次数，不要求连续，但有先后顺序，s=rabbbit t=rabbit，出现的次数为3
 */

function numDistinct(s: string, t: string) {
  const n = s.length,
    m = t.length
  // const f = new Array<number[]>(n + 1).fill([]).map(()=>new Array(m + 1).fill(1))
  const f = new Array<number[]>(n + 1).fill(new Array(m + 1)) //f[i][j]表示s的1-i字符串包含多少t的1-j字符串，字符串下标从1开始
  for (let i = 1; i <= n; i++) f[i][0] = 1 //初始化
  f[0][0] = 1
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      f[i][j] += f[i - 1][j]
      if (s.charAt(i - 1) == t.charAt(j - 1)) f[i][j] += f[i - 1][j - 1] //最后一个字符相等的时候
    }
  }
  return f[n][m]
}
