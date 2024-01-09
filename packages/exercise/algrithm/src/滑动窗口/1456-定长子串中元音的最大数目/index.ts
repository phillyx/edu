/**
 * https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 * 给你字符串 s 和整数 k 。

请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。

英文中的 元音字母 为（a, e, i, o, u）。
 */
function maxVowels(s: string, k: number): number {
  const vs = new Set('aeiou')
  let ans = 0
  let currentWindowVowelCount = 0
  for (let i = 0; i < k; i++) {
    if (vs.has(s[i])) {
      currentWindowVowelCount++
    }
  }
  ans = currentWindowVowelCount
  if (currentWindowVowelCount === k) return k

  for (let i = k; i < s.length; i++) {
    if (vs.has(s[i - k])) currentWindowVowelCount--
    if (vs.has(s[i])) currentWindowVowelCount++
    ans = Math.max(ans, currentWindowVowelCount)
  }
  return ans
}
