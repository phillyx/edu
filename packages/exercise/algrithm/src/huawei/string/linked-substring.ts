/**
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

function getLinkedSubstringIndex(str: string, substr: string) {
  if (substr.length >= str.length) return -1
  const len1 = str.length
  const len2 = substr.length
  const map = {} as {[key: string]: {count: number; usedCount: number}}

  const isAllMatched = () =>
    Object.values(map).every((x) => x.count === x.usedCount)

  for (let i = 0; i < len2; i++) {
    const ch = substr.charAt(i)
    if (!map[ch]) {
      map[ch] = {count: 1, usedCount: 0}
    } else {
      map[ch].count += 1
    }
  }

  for (let i = 0; i < len1 - len2; i++) {
    for (let j = i; j < i + len2; j++) {
      const chr = str[j]
      if (!map[chr]) {
        break
      } else {
        map[chr].usedCount += 1
      }
    }

    if (isAllMatched()) {
      return i
    }
  }

  return -1
}
