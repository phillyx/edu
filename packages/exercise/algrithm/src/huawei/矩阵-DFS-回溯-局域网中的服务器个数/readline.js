// 引入readline模块
const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
  input: process.stdin, // 设置输入流
  output: process.stdout // 设置输出流
});

let n, m, g, st, dx, dy, cnt, res; // 定义变量

// 逐行读取输入
rl.on('line', (line) => {
  if (!n) { // 如果n未定义
    [n, m] = line.split(' ').map(Number); // 读取行数和列数
    g = []; // 初始化二维数组
    st = new Array(n).fill(0).map(() => new Array(m).fill(false)); // 初始化标记数组
    dx = [-1, 1, 0, 0]; // 方向数组，表示上下左右四个方向的横坐标变化
    dy = [0, 0, 1, -1]; // 方向数组，表示上下左右四个方向的纵坐标变化
    cnt = 0; // 计数器清零
    res = 0; // 结果清零
  } else {
    g.push(line.split(' ').map(Number)); // 读取二维数组数据
  }
}).on('close', () => { // 读取完毕后执行
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (g[i][j] === 1 && !st[i][j]) { // 如果当前位置是陆地且未被访问过
        cnt = 0; // 计数器清零
        dfs(i, j); // 进行深度优先搜索
        res = Math.max(res, cnt); // 更新结果
      }
    }
  }
  console.log(res); // 输出结果
});

// 深度优先搜索函数
function dfs(i, j) {
  cnt++; // 计数器加一
  st[i][j] = true; // 标记当前位置为已访问
  for (let d = 0; d < 4; d++) { // 遍历四个方向
    let x = dx[d] + i, y = dy[d] + j; // 计算新的位置
    if (x >= 0 && x < n && y >= 0 && y < m && !st[x][y] && g[x][y] === 1) { // 如果新位置合法且是陆地且未被访问过
      dfs(x, y); // 递归访问新位置
    }
  }
}
