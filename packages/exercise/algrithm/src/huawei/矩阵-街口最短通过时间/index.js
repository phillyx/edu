/**
 * https://blog.csdn.net/m0_73659489/article/details/135037844
 * 思路: 优先队列bfs
优先队列bfs
首先自定义一个结构体存储队列中的节点，里面x、y为节点的位置、V为这个节点的时间、p为这个节点是从哪个方向来的，这里定义上右下左四个方向分别为0-3，这样方向+1再取模4就是右转，-1取模4就是左转，-1在模4时和+3是相同作用的，代码中使用+3可以避免出现负数的情况。
将节点重载运算符使节点在队列中是按照时间排序的
然后使用优先队列跑一下bfs，因为从起点开始哪个方向都是无消耗的，bfs开始时将起点的四个方向都入队作为起始状态。循环结束时终点的权值就是最终的答案。
 * */
class Solution {
  constructor() {
    this.dx = [-1, 0, 1, 0] // 上右下左四个方向的x坐标变化
    this.dy = [0, 1, 0, -1] // 上右下左四个方向的y坐标变化
  }

  calcTime(lights, timePerRoad, rowStart, colStart, rowEnd, colEnd) {
    const ans = Array.from({length: 10}, () =>
      Array.from({length: 10}, () => Array(4).fill(Number.MAX_SAFE_INTEGER)),
    ) // 存储最短时间的数组

    const queue = []
    for (let i = 0; i < 4; i++) {
      queue.push({x: rowStart, y: colStart, position: i, sum: 0}) // 将起点的四个方向入队列
      ans[rowStart][colStart][i] = 0 // 起点的时间为0
    }

    while (queue.length > 0) {
      const node = queue.pop() // 取出队列中时间最小的节点
      if (node.sum > ans[node.x][node.y][node.position]) continue // 如果当前节点的时间大于已经记录的最小时间，跳过
      for (let i = 0; i < 4; i++) {
        // if (i === 2) continue; // 遇到下方向时跳过
        const tp = (node.position + i) % 4 // 计算新方向
        const tx = node.x + this.dx[tp],
          ty = node.y + this.dy[tp] // 计算新位置
        if (tx < 0 || tx >= lights.length || ty < 0 || ty >= lights[tx].length)
          continue // 如果新位置超出边界，跳过
        let tv = node.sum + timePerRoad // 计算新时间
        if (i !== 1) tv += lights[node.x][node.y] // 如果不是右转方向，加上当前位置的红绿灯时间
        if (tv >= ans[tx][ty][tp]) continue // 如果新时间大于已经记录的最小时间，跳过
        ans[tx][ty][tp] = tv // 更新最短时间
        queue.push({x: tx, y: ty, position: tp, sum: tv}) // 将新节点入队列
      }
    }

    return Math.min(...ans[rowEnd][colEnd].slice(0, 3)) // 返回终点的最短时间
  }
}

// Example usage:
const lights = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const solution = new Solution()
const result = solution.calcTime(lights, 10, 0, 0, 2, 2)
console.log(result)
