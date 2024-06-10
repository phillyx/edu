/**
 * 给定一个数组，计算长度为‘k’的连续子数组的最大总和
 * 输入： arr=[100,200,300,400]
 *       k=2
 * 输出：700
 * @param {Array} arr
 * @param {number} k
 */
function maxSum(arr: [], k: number): number {
  const n = arr.length
  if (n < k) return -1

  let maxSum = 0
  // 计算出第一个窗口的值
  for (let i = 0; i < k; i++) {
    maxSum += arr[i]
  }

  let sum = maxSum
  for (let i = k; i < n; i++) {
    // 新窗口的和 = 前一个窗口的和 + 新进入窗口的值 - 移出窗口的值
    sum += arr[i] - arr[i - k]
    maxSum = Math.max(maxSum, sum)
  }
  return maxSum
}

/**
 * 给定一个字符串S和一个字符串T, 请在S中找出包含所有字母的最小子串
 * minimum-window-substring
 * 输入： S = 'ADOBECODEBANC', T= 'ABC'
 * 输出： 'BANC'
 *
 * 分析：
 * 1. 在S中找出包含T所有字母的第一个子串
 * 2. 判断: 当前窗口内可能包含一个更小的能满足要求的窗口
 *    窗口没有滑动的位置有可能包含了一个更小的能满足要求的窗口
 * 3. 为解决以上问题，当找到第一个满足的窗口后，就从S字符串左侧开始缩小窗口
 * 4. 判断： 如果缩小后的窗口仍能包含T所有字母的要求，则当前窗口可能是最小能满足题目的窗口，存下来，继续从左开始缩小窗口
 *    如果缩小后的窗口不能满足包含T所有字母的需求，则缩小窗口停止，从右边开始扩大窗口
 */

function minWindow3(s: string, t: string): string {
  const slen = s.length, tlen = t.length
  if (tlen > slen) return ''
  const need: { [key: string]: number } = {}
  const window: { [key: string]: number } = {}

  t.split('').forEach(x => {
      if (need[x]) {
          need[x]++
      } else {
          need[x] = 1
      }
  })
  let left = 0, right = 0
  let count = 0
  let start = 0, maxLen = Number.MAX_SAFE_INTEGER
  let res = ''
  while (right < slen) {
      const chr = s.charAt(right)
      right++

      if (need[chr]) {
          if (window[chr]) {
              window[chr]++
          } else {
              window[chr] = 1
          }
          if (window[chr] === need[chr]) {
              count++
          }
      }

      while (count === tlen) {
          if (right - left < maxLen) {
              maxLen = right - left
              start = left
              res = s.substring(start, right)
          }

          const outChar = s.charAt(left)
          left++
          if (need[outChar]) {
              if (window[outChar] === need[outChar]) {
                  count--
              }
              window[outChar]--
          }
      }
  }

  return res
}


export function minWindow(s: string, t: string): string {
  if (s.length == 0 || t.length == 0) return ''
  const map: {[key: string]: number} = {}
  // 使用欠款结构解决
  // 每个字符出现的次数，也就是每个欠了多少钱
  for (let i = 0; i < t.length; i++) {
    if (map[t[i]]) {
      map[t[i]]++
    } else {
      map[t[i]] = 1
    }
  }

  // 比较字符串的长度，
  let count = t.length // 总共欠这么多钱'
  let left = 0
  let right = 0
  let max = Number.MAX_SAFE_INTEGER
  let res = s
  let start = 0
  let len = max
  while (right < s.length) {
    const charI = s[right]
    // 命中i, 欠款减一
    if (map[charI]) {
      if (map[charI] > 0) {
        count--
      }
      map[charI]-- // 'AADBC' 'ABC' map[A] =-1 存在负值的情况，小于0表明多还了
    }

    // 向右滑动窗口
    right++
    // 每次窗口通过--count == 0来锚定满足条件：当前窗口已经包含所有目标字符，已还清欠款
    while (count == 0) {
      // 当前窗口内有可能包含一个满足条件的更小的窗口
      if (right - left < max) {
        max = right - left
        start= left
        len = right -left
        // 先存下来
        res = s.slice(left, right)
      }
      const charLeft = s[left]

      if (map[charLeft]) {
        // 窗口左侧值，要达到还的正好的状态，如果多还了，要补回来，补多了，就又欠款了，count+1
        map[charLeft]++
        if (map[charLeft] > 0) {
          count++
        }
      }
      // 从左侧开始缩小窗口
      left++
    }
  }

  return max === Number.MAX_SAFE_INTEGER ? '' : res
}
function minWindow2(s: string, t: string): string {
  const slen = s.length, tlen = t.length
  if (tlen > slen) return ''
  const map: { [key: string]: { count: number, usedCount: number } } = {}
  for (let i = 0; i < tlen; i++) {
      const c = t.charAt(i)
      if (map[c]) {
          map[c].count++
      } else {
          map[c] = { count: 1, usedCount: 0 }
      }
  }

  let left = 0, right = 0
  let count = t.length, start = 0, minLen = Number.MAX_SAFE_INTEGER
  const isValid = () => Object.values(map).every(x => x.usedCount >= x.count)
  while (right < slen) {
      const c = s.charAt(right)
      right++

      if (map[c]) {
          if (map[c].count > map[c].usedCount) count--
          map[c].usedCount++
      }
      // while (isValid() && left < right) {
      while (count === 0 && left < right) {

          const d = s.charAt(left)
          const distance = right - left
          // console.log(left, right, s.substring(left, right))
          if (distance < minLen) {
              minLen = distance
              start = left
          }

          if (map[d]) {
              map[d].usedCount--
              // console.log(c, map[c], count)
              if (map[d].usedCount < map[d].count) {
                  count++
              }
          }
          left++
      }
  }

  return minLen === Number.MAX_SAFE_INTEGER ? '' : s.substr(start, minLen)
};
/**
 * 最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的最长子串的长度
 * longest-substring-without-repeating-characters
 * 输入： 'abcabcbb'
 * 输出： 3
 * @param {string} s
 */
 var lengthOfLongestSubstring = function (s) {
  const map = new Map()
  let start = 0, end = 0, maxLen = 0;
  let begin = 0
  while (end < s.length) {
      let c = s[end]
      end++

      if (map.has(c)) {
          start = Math.max(map.get(c), start);
      }
      if (end - start > maxLen) {
          maxLen = end - start
          begin = start
      }

      map.set(c, end);
  }
  console.log(s.substr(begin, maxLen))
  return maxLen
};

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