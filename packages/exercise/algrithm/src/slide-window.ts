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
  let count = t.length // 总共欠这么多钱
  let left = 0
  let right = 0
  let max = Number.MAX_SAFE_INTEGER
  let res = s

  while (right < s.length) {
    const charI = s[right]
    // 命中i, 欠款减一
    if (map.hasOwnProperty(charI)) {
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
        // 先存下来
        res = s.slice(left, right)
      }
      const charLeft = s[left]

      if (map.hasOwnProperty(charLeft)) {
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

/**
 * 最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的最长子串的长度
 * longest-substring-without-repeating-characters
 * 输入： 'abcabcbb'
 * 输出： 3
 * @param {string} s
 */
function lengthOfLongestSubString(s: string): number {
  const map = new Map()
  let start = 0,
    end = 0,
    maxLen = 0
  while (end < s.length) {
    let tmpKey = s[end]
    if (map.has(tmpKey)) {
      // 当map中已存在指针i的值，此刻就要确定窗口左边的位置，比如 abcb, start初始值为0，此刻出现b，那么新窗口为cb，因此要更新位置
      // start = Math.max(map.get(tmpKey) + 1, start);
      start = Math.max(map.get(tmpKey), start)
    }
    // 有这种情形abcbcad，第一次出现c时长度为3，第一次出现b长度为2，所以要比较，新窗口就无效了，同理，指针继续向右，每次更新位置，获取最大值，最终就得出结果
    maxLen = Math.max(maxLen, end - start + 1)
    // 保存当前索引，+1是为了保证 如新入参数存在，直接向右划出当前窗口，
    // 这种方式很难理解
    map.set(s[end], end + 1)
    end++
  }
  return maxLen
}
