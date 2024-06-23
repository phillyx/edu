// https://blog.csdn.net/m0_73659489/article/details/135142265
// 导入readline模块
const readline = require('readline');

// 创建readline接口，用于处理输入输出
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 定义一个类 Node，用于存储数据
class Node {
    constructor(name, hot, nameLower) {
        this.name = name;         // 节点名称
        this.hot = hot;           // 节点热度
        this.nameLower = nameLower; // 节点名称的小写形式
    }
}

let n;      // 总节点数
let w = []; // 存储权重的数组
let a = []; // 存储节点对象的数组

// 监听每一行输入
rl.on('line', (line) => {
    if (!n) {
        n = parseInt(line); // 解析输入的第一行，获取总节点数
    } else if (w.length === 0) {
        w = line.split(' ').map(Number); // 解析输入的第二行，获取权重数组
    } else {
        const parts = line.split(' ');
        const name = parts.shift(); // 提取节点名称
        const v = parts.map(Number); // 将剩余部分解析为数字数组

        // 计算节点热度，热度为每个权重乘以对应值的总和
        const hot = v.reduce((acc, val, i) => acc + val * w[i], 0);
        const t = name.toLowerCase(); // 将节点名称转换为小写形式

        // 创建 Node 对象并添加到数组 a 中
        const node = new Node(name, hot, t);
        a.push(node);

        // 如果已经读取了 n 个节点，进行排序并输出结果
        if (a.length === n) {
            a.sort((u, v) => {
                // 按热度降序排序，如果热度相同则按名称升序排序
                if (u.hot !== v.hot) {
                    return v.hot - u.hot;
                }
                return u.nameLower.localeCompare(v.nameLower);
            });

            // 输出排序后的节点名称
            for (let i = 0; i < n; i++) {
                console.log(a[i].name);
            }

            // 关闭 readline 接口
            rl.close();
        }
    }
});
