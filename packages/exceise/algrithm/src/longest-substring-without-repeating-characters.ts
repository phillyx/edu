/**
 * 适用于滑动窗口算法
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const map= new Map()
  let start = 0, end = 0, maxLen = 0;
  while(end< s.length){
      let tmpKey = s[end]
      if (map.has(tmpKey)) {
          // 更新初始位置
          start = Math.max(map.get(tmpKey), start);
      }
      // 和旧长度比较，选取最大值
      maxLen = Math.max(maxLen, end - start + 1);
      // 更新索引
      map.set(s[end], end + 1);
      end++
  }
  return maxLen
};