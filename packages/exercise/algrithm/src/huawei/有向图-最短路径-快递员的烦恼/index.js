let mp = Array.from(Array(15), () => Array(15).fill(0));
let id = Array(1005).fill(0);
let ans = 100000000;

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

// 全排列枚举
function dfs(arr, n) {
    if (n == 1) {
        // 根据arr的排列结果模拟路径移动，计算结果，并取最小
        let sum = mp[0][arr[0]];
        for (let i = 0; i < arr.length - 1; i++) {
            if (mp[arr[i]][arr[i + 1]] == 0) {
                return;
            } else {
                sum += mp[arr[i]][arr[i + 1]];
            }
        }
        sum += mp[arr[arr.length - 1]][0];
        ans = Math.min(ans, sum);
        return;
    }
    for (let i = 0; i < n; i++) {
        swap(arr, i, n - 1);
        dfs(arr, n - 1);
        swap(arr, i, n - 1);
    }
}

function floyd(n) {
    for (let k = 0; k <= n; k++) {
        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= n; j++) {
                if (mp[i][k] != 0 && mp[k][j] != 0) {
                    if (mp[i][j] == 0 || mp[i][j] > mp[i][k] + mp[k][j]) {
                        mp[i][j] = mp[i][k] + mp[k][j];
                    }
                }
            }
        }
    }
}

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let input = '';
process.stdin.on('data', (data) => {
    input += data;
});

process.stdin.on('end', () => {
    const lines = input.trim().split('\n');
    let [n, m] = lines[0].split(' ').map(Number);
    let lineIndex = 1;

    for (let i = 1; i <= n; i++) {
        let [x, val] = lines[lineIndex++].split(' ').map(Number);
        id[x] = i;
        mp[0][i] = val;
        mp[i][0] = val;
    }

    for (let i = 1; i <= m; i++) {
        let [id1, id2, val] = lines[lineIndex++].split(' ').map(Number);
        mp[id[id1]][id[id2]] = val;
        mp[id[id2]][id[id1]] = val;
    }

    floyd(n);

    let arr = Array.from({ length: n }, (_, i) => i + 1);
    ans = 100000000;
    dfs(arr, n);

    console.log(ans);
});
