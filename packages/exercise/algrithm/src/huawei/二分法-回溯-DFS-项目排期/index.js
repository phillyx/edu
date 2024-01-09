// https://blog.csdn.net/m0_73659489/article/details/135273515
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let w = []; // 存储每个工作的时间
let n, m;   // n为人数，m为工作数量

rl.on('line', (line) => {
  if (!n) {
    // 如果n未定义，则解析第一行输入为工作时间列表w，并按降序排序
    w = line.split(' ').map(Number);
    n = -1; // 将n设置为-1，以便下次判断进入else分支
    w.sort((a, b) => b - a);
  } else {
    // 解析第二行输入为人数n
    n = parseInt(line);
    m = w.length;

    // 定义检查函数，判断在x天内是否能完成n个人的m个工作
    function check(x, cnt, choose) {
      if (cnt === m) {
        return true;
      }

      for (let i = 0; i < n; i++) {
        // 避免重复选择同一个人
        if (i > 0 && choose[i] === choose[i - 1]) {
          continue;
        }

        // 如果第i个人能够完成当前工作，则更新状态并继续检查下一个工作
        if (choose[i] + w[cnt] <= x) {
          choose[i] += w[cnt];

          if (check(x, cnt + 1, choose)) {
            return true;
          }

          choose[i] -= w[cnt];
        }
      }

      return false;
    }

    let l = 1, r = w.reduce((acc, curr) => acc + curr, 0);

    // 使用二分查找确定最少需要的天数
    while (l < r) {
      const mid = (l + r) >> 1;

      // 如果能在mid天内完成所有工作，则缩小搜索范围至[l, mid]
      if (check(mid, 0, Array(n).fill(0))) {
        r = mid;
      }
      // 否则，需要更多天数，搜索范围为[mid+1, r]
      else {
        l = mid + 1;
      }
    }

    // 输出最少需要的天数
    console.log(l);
    // 关闭读取接口
    rl.close();
  }
});
