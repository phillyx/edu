const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (s) => {
    let n = s.length;
    s += s;
    let pre = [];
    for (let i = 0; i < (1 << 3); i++) pre.push([]);
    pre[0].push(-1);
    let x = 0, ans = 0;
    for (let i = 0; i < 2 * n; i++) {
        if (s[i] == 'l') x ^= 1;
        else if (s[i] == 'o') x ^= 2;
        else if (s[i] == 'x') x ^= 4;
        let q = pre[x];
        q.push(i);
        while (q[q.length - 1] - q[0] > n) q.shift();
        ans = Math.max(ans, i - q[0]);
    }
    console.log(ans);
    rl.close();
});
