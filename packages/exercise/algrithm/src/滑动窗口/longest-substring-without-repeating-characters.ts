/**
 * 适用于滑动窗口算法
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const map = new Map()
  let start = 0,
    end = 0,
    maxLen = 0,
    begin = 0
  while (end < s.length) {
    let tmpKey = s[end]
    end++

    if (map.has(tmpKey)) {
      // 更新初始位置
      start = Math.max(map.get(tmpKey), start)
    }
    const sub = end - start
    if (sub > maxLen) {
      maxLen = sub
      begin = start
    }
    // 和旧长度比较，选取最大值
    // maxLen = Math.max(maxLen, end - start);
    // 更新索引
    map.set(s[end], end)
  }
  console.log(s.substr(begin, maxLen))
  return maxLen
}

function lengthOfLongestSubstring2(s: string): number {
  const map: { [key: string]: number } = {}
  let left = 0, right = 0, res = 0
  const len = s.length

  while (right < len) {
      const c = s.charAt(right)
      right++
      if (map[c]) {
          map[c] += 1
      } else {
          map[c] = 1
      }
      while (map[c] > 1) {
          const d = s.charAt(left)
          left++
          if (map[d]) {
              map[d] -= 1
          }
      }
      res = Math.max(res, right - left)

  }
  return res
};
