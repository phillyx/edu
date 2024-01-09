/**
 * 方法2： 有向图-归并集合
 * https://blog.csdn.net/banxia_frontend/article/details/129865702
 * https://leetcode.cn/problems/number-of-islands/submissions/310984285/
 *  可以组成网络的服务器
 */


function getMaxServer(n: number, m: number, lines: number[][]) {

    const visited = Array.from({ length: n }, () => Array.from({ length: m }, () => false))

    const dfs = (i: number, j: number) => {
        if (i < 0 || i >= n || j < 0 || j >= m || +lines[i][j] === 0) return 0

        if (visited[i][j]) return 0

        visited[i][j] = true
        let count = 1
        /***
         *  dx = [-1, 1, 0, 0]; // 方向数组，表示上下左右四个方向的横坐标变化
         *  dy = [0, 0, 1, -1]; // 方向数组，表示上下左右四个方向的纵坐标变化
         */
        count += dfs(i - 1, j)
        count += dfs(i + 1, j)
        count += dfs(i, j - 1)
        count += dfs(i, j + 1)
        return count

    }

    let max = 0

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            max = Math.max(max, dfs(i, j))
        }
    }

    return max
}

console.log(getMaxServer(4,5,[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))
console.log(getMaxServer(4,5,[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]))

// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAIwDYD2A5gHQDGaAJgHYnUCmiuAhtQB4CWzA+gGYBOBaonrVKwZv0QcyeesEqNmHPGmABGAEwBOABwA2AKwB2AAyaosBMnRZgcxmQKLy1YCkH56AWzXUArt449PwAtAS8oRxoeKyUamj+ON7RaBxCagDM6qZ6ACyauobAlnDQgPfKgKdygCN+gAhGgIr+gDt+gCFugLDmgIVKgBZqpSWQUFC8-tRk0kLQRIwAssxsAMohAG4hABTUGNABQSEANNDe65vB-Lt4HAyYG4FHANoAuncAlNAA3v0w0B9O1GiI0AvRHBElGgAF5oABBfj8ZgATxIAgI3mWz2gcmoREQ8AO0AAvrtlk8QQA+CFQ2HwwRIlFojFYva4-GEkm8ZiqegPB5vD6fDK-Si8NCg6DLDgHK47aAAKzFW34TJelm5So4vGFHGgAB5oKZoAAfXXQdVEsHUPUGyWa7VmqXQY30-XQADUp3O1w490lt1BILBpie-EY-n4ptMXKV3JVwv+aSBbo9t39geD2rD4b+ANj7uunqFiH4-noirTcl+TiGvzB6iL4dAYGr4bKlDYQuuoXUu3b2t2pluAG5oNhoIBO00AiCqAB1NqoAYf8AFhGALk9AFBygGg5QBnuoBn5UA22qAKjlR81AFRWgAV1QDgFoAN5UAaMr1pWNmEt0zdju7Nt9gfAYfjqdzpdrrc7wCtfkezxe3IgL0aY8uWTpgvyaAitAoTQJ2kqcu8aZlsIEHQFBMGOvBuyIYB0Cob8jqQQKIq4bB8FIaBBEEOBxEYaRHDkdh6hUaBAaIEGpqEamuK8SWewzEKoZ9Mh0C8AQ-DCgJ6q+v26patQ8mOo6TyvGJSoSVJywCRack2lq3j9pKKlqfhSreEJYLTJiJCWWwyz2bsmFMVKHL4Ti1aeaJSocVxglsFA3lQF8aAEHIJCEEQywTIg0xzIsKx5NshjbNc1wAETqBl2xZTleW5dluWmBltxpQVFUlYV+UlWVmVFZVNVNXVGVVa1TXFc1CZIaF4X0JFxAxVMMzzPwSz8MsyWpelFUNW182leVDVzR17UtQt1WdZ162rW1y2ld1QA