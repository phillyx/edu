// https://blog.csdn.net/m0_73659489/article/details/135046824
const readline = require('readline');

// 创建readline接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 读取输入
rl.on('line', (input) => {
    const parts = input.split(' ');
    const A = parts[0];
    const B = parts[1];

    const m = B.length;
    const n = A.length;

    let dp = new Array(n + 1).fill(0).map((_, j) => j);

    // 遍历字符串B
    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;

        // 遍历字符串A
        for (let j = 1; j <= n; j++) {
            let temp = dp[j];

            // 如果字符匹配
            if (A[j - 1] === B[i - 1]) {
                dp[j] = prev + 1;
            } else {
                // 如果字符不匹配
                dp[j] = Math.min(dp[j], dp[j - 1]) + 1;
            }
            prev = temp;
        }
    }

    // 输出最短距离
    console.log(dp[n]);

    rl.close();
});
