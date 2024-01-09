/**
 * https://blog.csdn.net/m0_73659489/article/details/134933169
 * 
 */
const swap = (arr: number[], i: number, j: number) => {
    [arr[j], arr[i]] = [arr[i], arr[j]]
}

function resolve(input: string) {
    const matrix = Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => 0))
    let ids = new Array(1001).fill(0)
    let ans = Number.MAX_SAFE_INTEGER

    const lines = input.trim().split('\n');

    let [n, m] = lines[0].split(' ').map(Number)
    let arr = Array.from({ length: n }, (_, i) => i + 1)

    let lineIndex = 1;

    for (let i = 1; i <= n; i++) {
        let [x, value] = lines[lineIndex++].split(' ').map(Number)
        ids[x] = i
        matrix[0][i] = value
        matrix[i][0] = value
    }

    for (let i = 1; i <= m; i++) {
        let [id1, id2, value] = lines[lineIndex++].split(' ').map(Number)
        const id1Index = ids[id1]
        const id2Index = ids[id2]
        matrix[id1Index][id2Index] = value
        matrix[id2Index][id1Index] = value
    }

    const floyd = () => {
        for (let k = 0; k <= n; k++) {
            for (let i = 0; i <= n; i++) {
                for (let j = 0; j <= n; j++) {
                    if (matrix[i][k] !== 0 && matrix[k][j] !== 0) {
                        if (matrix[i][j] == 0 || matrix[i][j] > matrix[i][k] + matrix[k][j]) {
                            matrix[i][j] = matrix[i][k] + matrix[k][j]
                        }
                    }
                }
            }
        }
    }
    const dfs = (n: number) => {
        if (n === 1) {
            let sum = matrix[0][arr[0]]
            for (let i = 0; i < arr.length - 1; i++) {
                if (matrix[arr[i]][arr[i + 1]] == 0) {
                    return
                }
                sum += matrix[arr[i]][arr[i + 1]]
            }
            sum += matrix[arr[arr.length - 1]][0]
            ans = Math.min(ans, sum)
            return
        }
        for (let i = 0; i < n; i++) {
            swap(arr, i, n - 1)
            dfs(n - 1)
            swap(arr, i, n - 1)
        }
    }

    floyd()

    dfs(n)

    return ans
}

// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAIwDYD2A5gHQDGaAJgHYnUCmiwAtgAwD6A7AMwBsArAE4ALAA5BwAIYAnRAEsyeesEqNJcvGmABGbsMHdu23oKixoZkMChkC1NImhoA7pJTQAvNAAUM6RmhqAFdmHHppAG0AXQAaaDkA4NDwuIArRJCw6QBKTwA+aABvM2hSiL8I1NjoCrkoqM9oculIuriKqqioAF8oADMg6jJ5O2hpejQCPAA3em85ahQgxACHaQWiXOKYUuhbe0dmSUR1gA9GgEEWyQBPEj7pAmZvQuglaiJEeADtbWhuuLeXIeApXaS3e6PZ6vd6fb7QX7-QHAgqsbLZEqlJSOOSUNCNBjOaBg27ebSsVjabL3DR4bxozFvRg1eyNABymXCJAAshcABrsADKFwAYgBRdgASTZABUxQBxMUAJSgjP2DjeCwmjQWS0QJBOcme1LQKDwckQ3gA5AAdahW7IAblVOyxzIi1DizAaXnNDDQEVYURIpvNlqt0AdJCOKG8HOSOUZ2JqLUu1zuDyeLyZHy+iSRPnYcTkKPi0AA1AiMZAk8y-fRJdRVOcvNpnTXXdA+gRpD5k3JGm2ywAeLzUR3xcvlraM3ZMxwRU5xaaSPBBeg+zX+iL1xvNqfB0MW62R6kxuOcxOdue4gOnTdyWe7I6G06BqIROqNFdr+hP0ovmcn4fkG36ruujK9B2c7dr23j9oOE4DqO0DMEhU4zteuzJp+lDaMWlAAEzLuBG6NPWAa7k29CnAeIZmseEZRue8ZZNWc5zuqOJ4XuNE6niuHaF0WGlFx8REbxLbiQGuKEcJHHPscQG4tokkfrJalgb+-6oUpchvhp1H3oJmleD+EGdlBap2BqfSEDclCNEC+RFDpsF9syADWjSsBO3koeO0CeRhrkiRx7nwcyA5eL5I5juh06hQpyW7BFyapD5E4ZQFWUhdsKUFbsch9D4gH6cBESeQ0ACEHgxdAABkDW6a+lUflU0C1TFmGFb1RUld4ZUGe1Pr1QAPmNLXKSN0AFENFVVRWU3lVVlRRD1fWbQBenDWtjTzXUbVLfNq1VDpW2lFBF0cVdF23YV903ZB1kHNAlB9PiXjeNQGQJqW+XJcVPjUJ4dVVklvXJmgIT7Tt77NJEQbyb1aVRZlI4ptIJCwl80AALQIglG1bUDg1w7U9QI5+S1CaN0BohD12lOMiBBNI1Dnclj19dDzAVl480Ux+tQ0-UnOXeLTgw+WAvky0CPY-QubwPjCKU0GkuSKyXjcsc8DRgsvj2HEvPsb1LNsxzYXc6lPYeTi6PIYEROMwVLhuL4LTFnEIME1SkvvWg32q-7YVzu7sZ+N7gQh2bCmPVZnZ2QQDlAi6c6B991aMhb7MsmgPRAA