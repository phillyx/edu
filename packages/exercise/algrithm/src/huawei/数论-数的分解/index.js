// https://blog.csdn.net/m0_73659489/article/details/134936984
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,   // 从标准输入读取
    output: process.stdout   // 输出到标准输出
});

let res = [];  // 用于存储所有的解
let n;         // 输入的整数

rl.on('line', (input) => {  // 当有输入行时触发事件
    n = parseInt(input);   // 将输入解析为整数
    n *= 2;                // 将问题转化为 2n 的形式，简化计算

    let flag = 1;  // 判断有没有解

    for (let k = 2; k < Math.sqrt(n); k++) {  // 遍历所有可能的 k
        if (n % k !== 0) {
            continue;  // 如果 n 不能被 k 整除，则继续下一轮循环
        }

        // 判断是否有解
        if ((n / k - (k - 1)) % 2 === 0) {
            let startNum = Math.floor((n / k - k + 1) / 2);

            process.stdout.write(n / 2 + "=");  // 输出等号左边部分
            for (let x = startNum; x < startNum + k; x++) {
                process.stdout.write(x.toString());  // 输出每个加数
                if (x !== startNum + k - 1) {
                    process.stdout.write("+");  // 如果不是最后一个加数，输出加号
                }
            }
            flag = 0;
            break;
        }
    }

    if (flag === 1) {
        console.log("N");  // 如果没有解，输出 "N"
    }

    rl.close();  // 关闭输入流
});
