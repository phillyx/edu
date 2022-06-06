/**
 * 关联子串
 * 给定两个字符串str1和str2，如果字符串str1中的字符，经过排列组合后的字符串中，只要有一个字符串是str2的子串，则认为str1是str2的关联子串。
若str1是str2的关联子串，请返回子串在str2的起始位置；
若不是关联子串，则返回-1。
示例1：
输入：str1="abc",str2="efghicabiii"
输出：5
解释：str2包含str1的一种排列组合（"cab")，此组合在str2的字符串起始位置为5（从0开始计数）
示例2：str1="abc",str2="efghicaibii"
输出：-1。
预制条件：

输入的字符串只包含小写字母；

两个字符串的长度范围[1, 100,000]之间

若str2中有多个str1的组合子串，请返回第一个子串的起始位置。
 */

function checkInclusion(s1: string, s2: string): boolean {
  const substr = s1, str = s2
  const len1 = str.length
  const len2 = substr.length
  if (len2 > len1) return false

  const map = {} as { [key: string]: { count: number; usedCount: number } }
  for (let i = 0; i < len2; i++) {
      const ch = substr.charAt(i)
      if (!map[ch]) {
          map[ch] = { count: 1, usedCount: 0 }
      } else {
          map[ch].count++
      }
  }

  let left = 0, right = 0, count = len2

  while (right < len1) {
      const c = str.charAt(right)
      right++

      if (map[c]) {
          if (map[c].count > map[c].usedCount) count--
          map[c].usedCount++
      }
      while (count == 0) {
          const d = str.charAt(left)
          left++

          if (right - left + 1 == len2) return true

          if (map[d]) {
              map[d].usedCount--
              if (map[d].usedCount < map[d].count) {
                  count++
              }
          }
      }
  }
  return false

};