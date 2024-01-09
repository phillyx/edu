// https://blog.csdn.net/m0_73659489/article/details/134906034

// 引入readline模块，用于从标准输入读取用户输入
const readline = require('readline');

// 创建readline接口，配置输入输出流
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 监听用户输入的每一行
rl.on('line', (line) => {
  // 将输入的空格分隔的字符串转换为数字数组
  const w = line.split(' ').map(Number);

  // 监听用户输入的下一行
  rl.on('line', (line) => {
    // 将输入的字符串转换为整数
    const target = parseInt(line);

    // 定义函数，用于计算可攀爬的位置数量
    function countClimbable(hillMap, strength) {
      const n = hillMap.length;

      // 用于存储从左侧和右侧攀爬的代价的数组
      const L = Array(n + 1).fill(-1);
      const R = Array(n + 1).fill(-1);

      // 计算从左侧攀爬的代价
      for (let i = 0; i < n; i++) {
        if (hillMap[i] === 0 && i - 1 > 0 && hillMap[i - 1] !== 0) {
          let j = i - 1;
          R[i] = 0;

          while (j >= 0 && hillMap[j] !== 0) {
            if (hillMap[j] > hillMap[j + 1]) {
              R[j] = R[j + 1] + 2 * (hillMap[j] - hillMap[j + 1]);
            } else {
              R[j] = R[j + 1] + (hillMap[j + 1] - hillMap[j]);
            }
            j -= 1;
          }
        }

        // 计算从右侧攀爬的代价
        if (hillMap[i] === 0 && i + 1 < n && hillMap[i + 1] !== 0) {
          let j = i + 1;
          L[i] = 0;

          while (j < n && hillMap[j] > 0) {
            if (hillMap[j] > hillMap[j - 1]) {
              L[j] = L[j - 1] + 2 * (hillMap[j] - hillMap[j - 1]);
            } else {
              L[j] = L[j - 1] + (hillMap[j - 1] - hillMap[j]);
            }
            j += 1;
          }
        }
      }

      // 用于存储从左侧和右侧总共的攀爬代价的数组
      const LL = Array(n + 1).fill(-1);
      const RR = Array(n + 1).fill(-1);

      // 计算从左侧总共的攀爬代价
      for (let i = 1; i < n; i++) {
        if (hillMap[i] === 0) {
          LL[i] = 0;
        } else {
          if (hillMap[i - 1] > hillMap[i]) {
            LL[i] = LL[i - 1] + 2 * (hillMap[i - 1] - hillMap[i]);
          } else {
            LL[i] = LL[i - 1] + hillMap[i] - hillMap[i - 1];
          }
        }
      }

      // 计算从右侧总共的攀爬代价
      for (let i = n - 2; i >= 0; i--) {
        if (hillMap[i] === 0) {
          RR[i] = 0;
        } else {
          if (hillMap[i + 1] > hillMap[i]) {
            RR[i] = RR[i + 1] + 2 * (hillMap[i + 1] - hillMap[i]);
          } else {
            RR[i] = RR[i + 1] + hillMap[i] - hillMap[i + 1];
          }
        }
      }

      // 计算可攀爬的位置数量
      let cnt = 0;

      for (let i = 0; i < n; i++) {
        if (hillMap[i] > hillMap[i - 1] && hillMap[i] > hillMap[i + 1]) {
          let ans = 1e15;

          // 如果从左侧攀爬的代价存在，则更新ans
          if (L[i] !== -1) {
            ans = Math.min(ans, L[i] + LL[i]);
          }

          // 如果从右侧攀爬的代价存在，则更新ans
          if (R[i] !== -1) {
            ans = Math.min(ans, R[i] + RR[i]);
          }

          // 如果左侧和右侧都存在攀爬代价，则更新ans
          if (L[i] !== -1 && R[i] !== -1) {
            ans = Math.min(L[i] + RR[i], R[i] + LL[i], ans);
          }

          // 如果最小代价小于等于strength，则可攀爬，增加计数
          if (ans <= strength) {
            cnt += 1;
          }
        }
      }

      // 输出可攀爬的位置数量
      console.log(cnt);

      // 关闭readline接口
      rl.close();
    }

    // 调用计算函数
    countClimbable(w, target);
  });
});
