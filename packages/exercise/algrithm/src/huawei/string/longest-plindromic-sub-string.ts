/**
 * https://leetcode.cn/problems/longest-palindromic-substring
 */
function longestPalindrome(s: string): string {
  const len = s.length
  if (len < 2) return s

  let max = 0
  let str = s.substr(0, 1)

  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const sub = s.substring(i, j + 1)
      if (isHuiwen(sub) && max < sub.length) {
        str = sub
        max = sub.length
      }
    }
  }

  return str
}

function isHuiwen(str: string) {
  if (str.length === 1) return true
  let l = 0,
    r = str.length - 1
  while (l < r) {
    if (str.charAt(l) !== str.charAt(r)) {
      return false
    }
    l++
    r--
  }
  return true
}

function longestPalindrome1(s: string): string {
  const len = s.length
  if (len < 2) return s
  let left = 0,
    right = 0,
    maxLen = 0,
    start = 0,
    l = 1

  for (let i = 0; i < len; i++) {
    left = i - 1
    right = i + 1
    l = 1
    while (left >= 0 && s.charAt(left) === s.charAt(i)) {
      left--
      l++
    }
    while (right < len && s.charAt(right) === s.charAt(i)) {
      right++
      l++
    }
    while (left >= 0 && right < len && s.charAt(right) === s.charAt(left)) {
      l += 2
      left--
      right++
    }
    if (l > maxLen) {
      start = left + 1 // 多操作了一次
      maxLen = l
    }
  }
  console.log(start, maxLen)
  return s.substr(start, maxLen)
}
function longestPalindrome2(s: string): string {
  const n = s.length
  if (n < 2) return s

  const dp = new Array(n).fill([]).map(() => new Array<boolean>(n).fill(false))

  let maxlen = 0
  let str = s.substr(0, 1)
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = true
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = s.charAt(i) == s.charAt(j) && (dp[i + 1][j - 1] || j - i < 2)
      if (dp[i][j]) {
        const l = j - i + 1
        if (l > maxlen) {
          maxlen = l
          str = s.substr(i, l)
        }
      }
    }
  }
  return str
  //dp[i][j] = (s[i] == s[j]) and dp[i + 1][j - 1]
}

function longestPalindrome3(s: string): string {
  const n = s.length
  if (n < 2) return s

  let start = 0,
    end = 0

  for (let i = 0; i < n; i++) {
    const len1 = expandAroundCenter(s, i, i)
    const len2 = expandAroundCenter(s, i, i + 1)
    const len = Math.max(len1, len2)
    if (len > end - start) {
      start = i - ((len - 1) >> 1)
      end = i + (len >> 1)
    }
  }

  return s.substring(start, end + 1)
}

function expandAroundCenter(s: string, left: number, right: number) {
  while (left >= 0 && right <= s.length && s.charAt(left) == s.charAt(right)) {
    left--
    right++
  }
  return right - left - 1
}
