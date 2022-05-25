/**
 * 补种未成活胡杨
 * 近些年来，我国防沙治沙取得显著成果。某沙漠新种植N棵胡杨（编号1-N），排成一排。一个月后，有M棵胡杨未能成活。
现可补种胡杨K棵，请问如何补种（只能补种，不能新种），可以得到最多的连续胡杨树？
N 总种植数量
M 未成活胡杨数量
M 个空格分隔的数，按编号从小到大排列
K 最多可以补种的数量


其中：
1<=N<=100000
1<=M<=N
0<=K<=M
输出描述:
最多的连续胡杨棵树
示例1
输入
5
2
2 4
1
输出
3
说明
补种到2或4结果一样，最多的连续胡杨棵树都是3
示例2
输入
10
3
2 4 7
1
输出
6
说明
补种第7棵树，最多的连续胡杨棵树为6(5,6,7,8,9,10)

这是一道典型的滑动窗口题

描述中索引是从1开始的，为了计算方便，胡杨树数组第0个位置至-1，无实际意义，len <- N+1
使用双指针left <- right <- 1
通过计算死亡胡杨数量为K+1时，最长连续队列出现，此时distance <- right - left
为什么是K+1呢？因为K ~ K+1内可能存在多个存活的杨树，直接到K+1个位置，计算最为方便
最后要考虑下循环结束的边界条件，如果此时满足deadcount == K, 最大距离应为distance <- right - left + 1
比较 max = Max(max, distance)
具体思路请看下图： https://postimg.cc/FkJZdYww

相关边界值要注意下

K == M ret N
M == N && K == 0 ret 0
K = 0 , 直接取0 ~ 0 之间的距离，比较求最大值
 */

function getMostPolarTree(N: number, M: number, deads: number[], K: number) {
  if (K === M) return N
  if (M === N && K === 0) return 0

  N += 1
  const trees = new Array(N).fill(1)
  trees[0] = -1 // 无实际意义，便于计算

  // 设置死去的胡杨树
  deads.forEach((x) => (trees[x] = 0))

  let left = 1
  let right = 1
  let count = 0
  let res = 0
  let deadCount = 0

  if (K === 0) {
    // deads<trees 使用deads遍历性能更优
    deads.reduce((pre, cur) => {
      const distance = cur - pre - 1
      res = Math.max(distance, res)
      return cur
    }, 1)
    // 最后一个死亡的胡杨到列尾的距离
    res = Math.max(res, N - 1 - deads[M - 1])

    // for (let i = 1; i < trees.length; i++) {
    //   if (trees[i] === 0) {
    //     const l = i - left
    //     res = Math.max(res, l)
    //     left = i + 1
    //   }
    // }
    return res
  }

  while (right < N) {
    if (trees[right] === 0) {
      count++
    }
    if (count === K + 1) {
      // 正常遍历到第K个死亡胡杨树的位置时，后面的胡杨如果存活，补种K个成功后，是可以连接到一块的，所以要多遍历一次至K+1个死亡胡杨
      const distance = right - left
      res = Math.max(distance, res)

      count = K
      left = deads[deadCount] + 1 // 左指针移动到第x个死亡的胡杨的后面一位
      deadCount++
    } else if (count === K && right === N - 1) {
      // right到头
      const distance = right - left + 1
      res = Math.max(distance, res)
    }
    right++
  }

  return res
}

function getMostPolarTreeBetter(
  N: number,
  M: number,  /// deads.length
  deads: number[],
  K: number,
) {
  if (K === M) return N
  if (M === N && K === 0) return 0
 
  let res = 0

  // 设定左右指针 保证中间有K颗补种
  for (let i = 0; i <= M - K; i++) {
    let le = 0
    let ri = N
    if (i > 0) {
      le = deads[i - 1]
    }

    if (i + K < M) {
      ri = deads[i + K] - 1
    }

    let temp = ri - le
    res = Math.max(temp, res)
  }

  return res
}
console.log(getMostPolarTree(10, 10, [], 0))
console.log(getMostPolarTree(10, 7, [], 7))
console.log(getMostPolarTree(5, 2, [2, 4], 0))
console.log(getMostPolarTree(5, 2, [2, 4], 1))
console.log(getMostPolarTree(10, 3, [2, 4, 7], 1))
console.log(getMostPolarTree(11, 4, [2, 4, 7, 8], 2))
