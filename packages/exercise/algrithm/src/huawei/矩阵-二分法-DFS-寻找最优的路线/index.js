const N = 25;
let n, m;
const g = new Array(N).fill(0).map(() => new Array(N).fill(0));
const vis = new Array(N).fill(0).map(() => new Array(N).fill(false));
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

// 深度优先搜索函数，判断是否能从起点 (x, y) 到达终点 (n-1, m-1)，
// 限制条件是当前路径上的值不小于 limit
function dfs(x, y, limit) {
    // 如果当前位置的值小于 limit，直接返回 False
    if (g[x][y] < limit) {
        return false;
    }
    // 如果已经到达终点，返回 True
    if (x === n - 1 && y === m - 1) {
        return true;
    }
    // 标记当前位置已经访问
    vis[x][y] = true;
    // 遍历四个方向
    for (let i = 0; i < 4; i++) {
        const a = dx[i] + x;
        const b = dy[i] + y;
        // 判断是否越界、已访问或者值小于 limit，是则继续下一个方向
        if (a < 0 || a >= n || b < 0 || b >= m || vis[a][b] || g[a][b] < limit) {
            continue;
        }
        // 递归调用 dfs，判断是否能从新的位置 (a, b) 到达终点
        if (dfs(a, b, limit)) {
            return true;
        }
    }
    // 若四个方向都无法到达终点，则返回 False
    return false;
}

let l = 0;
let r = 65535;

let lineCount = 0;

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    if (lineCount === 0) {
        n = parseInt(line);
    } else if (lineCount === 1) {
        m = parseInt(line);
    } else {
        g[lineCount - 2] = line.split(' ').map(Number);
    }
    lineCount++;
}).on('close', () => {
    while (l < r) {
        const mid = Math.floor((l + r + 1) / 2);
        // 初始化 vis 数组
        for (let i = 0; i < N; i++) {
            vis[i].fill(false);
        }
        // 如果可以从起点到达终点，更新 l 为当前限制条件
        if (dfs(0, 0, mid)) {
            l = mid;
        } else {
            r = mid - 1;
        }
    }

    // 输出结果
    console.log(l);
});
