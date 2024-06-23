// https://blog.csdn.net/banxia_frontend/article/details/134772493
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// 创建一个新的扫描器实例
let input = [];

readline.on('line', (line) => {
    input.push(line);
});

readline.on('close', () => {
    // 读取用户输入的整数n和l
    let n = parseInt(input[0]);
    let lucky = parseInt(input[1]);

    // 检查输入的整数n和l是否在指定的范围内
    if (n < 1 || n > 100 || lucky < -100 || lucky > 100) {
        console.log("12345");
        process.exit(0);
    }

    // 初始化位置变量p和最大位置变量mp
    let p = 0;
    let mp = 0;

    // 读取用户输入的整数cmd
    let cmds = input[2].split(" ").map(Number);

    // 对于每一个输入的整数
    for (let i = 0; i < n; i++) {
        let cmd = cmds[i];

        // 检查输入的整数cmd是否在指定的范围内
        if (cmd < -100 || cmd > 100) {
            console.log("12345");
            process.exit(0);
        }
        // 如果输入的整数cmd等于l
        if (cmd == lucky) {
            // 如果cmd大于0，那么位置p增加cmd+1
            if (cmd > 0) {
                p += cmd + 1;
            } else if(cmd < 0){
                // 否则，位置p减少cmd-1
                p += cmd - 1;
            }
        } else {
            // 如果输入的整数cmd不等于l，那么位置p增加cmd
            p += cmd;
        }
        // 更新最大位置变量mp
        mp = Math.max(mp, p);
    }

    // 打印最大位置变量mp
    console.log(mp);
});
