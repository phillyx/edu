/**
 * 游戏分组
 * DFS https://blog.csdn.net/m0_73659489/article/details/134802807
 * DP https://blog.csdn.net/m0_47384542/article/details/135086156
 */

function setGameGroups(line: string) {
    const arr = line.split(' ').map(Number)
    // 计算所有评分的总和
    const total = arr.reduce((a, b) => a + b)

    // 初始化差距最小值
    let ans = total
    const len = arr.length

    // 初始化选择数组，表示每个参与者是否已经被选入
    const choose = Array(len).fill(false)
    const dfs = (selectedCount: number, sum: number) => {
        if (selectedCount === (len >> 1)) {
            // 当入选5名队员时，计算当前两队的评分差距并更新最小值
            // const group2 = total - sum
            // const tmp = sum - group2
            // 即 sum-(total-sum) = 2sum - total
            ans = Math.min(ans, Math.abs(total - 2 * sum))
            return
        }

        // 遍历所有参与者，将未被选中的队员加入当前队伍
        for (let i = 0; i < 10; i++) {
            if (choose[i]) continue

            choose[i] = true
            dfs(selectedCount + 1, sum + arr[i])
            choose[i] = false
        }
    }
    // 调用深度优先搜索函数，起始时队员数量为0，当前评分总和为0
    dfs(0, 0)

    return ans
}

console.log(setGameGroups('1 2 3 4 5 6 7 8 9 10'))


function GameGrouping(values: number[]) {
    // sum
    const total = values.reduce((a, b) => a + b, 0)
    const len = values.length
    const visited = new Array(values.length).fill(false)
    let ans = total
    const arr = [] as number[]

    const backtrack = (selectedCount: number, sum: number) => {
        if(arr.length === len >>1){
            const tmp  = arr.reduce((a,b)=>a+b,0)
             ans = Math.min(ans, Math.abs(total - 2*tmp))
            return
        }
        // if (selectedCount === len >> 1) {
        //     ans = Math.min(ans, Math.abs(total - 2*sum))
        //     return
        // }


        for (let i = 0; i < len; i++) {
            if (visited[i]) continue
        
            visited[i] = true
            arr.push(values[i])
            backtrack(selectedCount + 1, sum + values[i])
            arr.pop()
            visited[i] = false

        }
    }

    backtrack(0, 0)
    return ans

}
