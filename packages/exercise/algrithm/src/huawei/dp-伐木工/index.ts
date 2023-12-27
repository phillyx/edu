function maximizeProfit(X: number) {
    let dp = new Array(X + 1).fill(0).map((_, i) => i)
    const nums = new Array<number[]>(X + 1).fill([]).map((_, i) => [i])

    for (let i = 4; i <= X; i++) {
        for (let j = 1; j <= i / 2; j++) {
            const compare = dp[j] * dp[i - j]
            if (compare > dp[i]) {
                nums[i] = [...nums[j], ...nums[i - j]]
            }
            dp[i] = Math.max(compare, dp[i]);
        }
    }
    // return dp;
    const arr = nums[X]
    const ret = arr.filter(x => x !== 2)
    const tmp2 = arr.filter(x => x == 2)

    if (tmp2.length % 2 !== 0) {
        ret.push(2)
    }
    for (let i = 0; i < tmp2.length >> 1; i++) {
        ret.push(4)
    }
    ret.sort((a, b) => a - b)
    return ret
}

// function getLengths(X:number) {
//     let dp = maximizeProfit(X);
//     let lengths = [0,1,1,1,1];

//     let i = X+1;
//     while (i > 4) {
//         for (let j = 1; j < i; j++) {
//             if (dp[i] === dp[i - j] * dp[j]) {
//                 lengths.push(j);
//                 i -= j;
//                 break;
//             }
//         }
//     }
//     return lengths.sort((a, b) => a - b).join(' ');
// }
// for (let i = 1; i <= 50; i++) {
//     console.log(maximizeProfit(i));
// }

const maximizeProfit2 = (X: number) => {
    if (X < 5) return X;
    if (X % 3 === 1) return new Array(Math.floor(X / 3 -1)).fill(3).concat(4)
    if (X % 3 === 2) return new Array(Math.floor(X / 3)).fill(3).concat(2).sort((a,b)=>a-b)
    return new Array(X/3).fill(3)
}
console.log(maximizeProfit2(12))

// https://www.typescriptlang.org/play?target=99#code/GYVwdgxgLglg9mABAWwIYA8bJgLwKYAKATnMDFABQAaAXImCMgEZ5ECUiA3gFCJ+IAbPFEQATAA6IAvPTwB3RAEEiRVAE9qiANSIAjGwB0ZAQIoAGQ2nEUKAfQA0iGBykA+J2178ICAM4iGZF9pWQVlVTUAHkCWIgBtAF1XTR19IxgTCkTLVGs7R2dpdziYBM8vPmA4IkQKIREYEIAWAG4nREiZKjaYLS0OHn4hxCqauuFEACsQ3TbpzvaAekQAJjm+gYrhoZ8wf0QfZHFUIjwQiTjJhMQAKjFxEsQAWimEre2+GGBaw+PTxHcF1Kmw+oPojF8JWuMjiBjhgUhV0ccIMCMeLyubzB-AAvu8PkDoYgALKoKAACwMaHQFF+JzwjkJbBa+L4eKG7P4i2WpygICISAkLJ2fhEJxqMjRVCx3lFiF5IXF6QEUFYFHQRUQGoAhFIZCtPCK9iIoEcVoqVMrVUR1ZqNXrVuUhl9aqbxCsDEIwABzCmIACkq0QupkFi4rPlwgM4hAvnJFANW05lWqtXq7VDPQ6iDdHq9vvJAPcsycG3DoN50dj8aahtxW0rvmqlAoqEcTBc7lQz0QHYbwn5SF53Dx3G5I3A0HgSG9wgAMngfRTfNQaDFWJtx0N0xIQtSsLhCCQyJQqMyx8ttxN88uQnEzPZdI-n7oEiyL8N040ulpZh+hnI5IZGcFCNO4tbhluHyjGmEzTDIJbzE46z9JBl7Yk43wUIS0gOkCPZXLc9yXGUaEYdsN7kr4VZxhQkznlB5GfM8MiTCyjFMUwpyoAA1ux6HYniHEcv+9Ycbyg6CIuBbUU2RAtm2vadog3YvB2BiTHAMBgBQADkiC6QxyxCcsMHjA0MxZgsACsZg9GWPAcbsTZCJ6cDehQ+7YPgxCkOQoFsEZiCjs5IheYevknuaMiruCzAbpqgz8C6miRIg1kcBJAqIN0WwpVQAaIAAzLhCGZQO2VgPISgqOoFCkhSRgCHA1SaMsJVPPohjGKYRWGLsEBkhQtZ5VhBWBiVer6uVfKVdV4R1Q1lLAM1rUFe1gXKr1-UIINlAGgYckKfYHZuKgTx9kMWVIFVYS1RoVCLH1W0UH1I7cM5cCuc1HnhT5x7kCsFC6AabBAA

// https://blog.csdn.net/suoyudong/article/details/88726139