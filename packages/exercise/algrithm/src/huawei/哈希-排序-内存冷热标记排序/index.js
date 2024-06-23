// https://blog.csdn.net/m0_73659489/article/details/134519863
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = 0;
let numbers = [];
let m = 0;

rl.on('line', (line) => {
    if (n === 0) {
        n = parseInt(line);
    } else if (numbers.length === 0) {
        numbers = line.split(' ').map(Number);
    } else if (m === 0) {
        m = parseInt(line);
        let cnts = new Map();
        for (let x of numbers) {
            cnts.set(x, (cnts.get(x) || 0) + 1);  // 记录每个内存页出现的次数
        }
        let w = [];
        for (let [a, b] of cnts) {
            if (b >= m) {  // 把出现次数超过阈值的内存页存入数组中
                w.push(a);
            }
        }
        w.sort((a, b) => {
            if (cnts.get(a) !== cnts.get(b)) {
                return cnts.get(b) - cnts.get(a);  // 按照频率降序排列
            }
            return a - b;  // 按照编号升序排列
        });
        console.log(w.length);
        for (let x of w) {
            console.log(x);
        }
    }
});

