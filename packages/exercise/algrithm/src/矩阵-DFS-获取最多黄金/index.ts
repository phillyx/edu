/**
 * https://blog.csdn.net/m0_73659489/article/details/134606589
 * @param m 
 * @param n 
 * @param k 
 * @returns 
 */
function getMaxGold(m: number, n: number, k: number) {
    const matrix = Array.from({ length: m }, () => new Array<number>(n).fill(0))
    const getDigitalSum = (x: number) => {
        return `${x}`.split('').map(Number).reduce((a, b) => a + b, 0)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = getDigitalSum(i) + getDigitalSum(j)
        }
    }
    let res = 0
    const visited = Array.from({ length: m }, () => new Array<boolean>(n).fill(false))

    const isInArea = (x: number, y: number) => {
        return x >= 0 && x < m && y >= 0 && y < n
    }
    const dfs = (x: number, y: number) => {
        if (!isInArea(x, y)) return
        if (visited[x][y]) return

        visited[x][y] = true

        if (matrix[x][y] > k) return

        res++
        /***
         *  dx = [-1, 1, 0, 0]; // 方向数组，表示上下左右四个方向的横坐标变化
         *  dy = [0, 0, 1, -1]; // 方向数组，表示上下左右四个方向的纵坐标变化
         */
        dfs(x - 1, y)
        dfs(x + 1, y)
        dfs(x, y - 1)
        dfs(x, y + 1)
    }

    dfs(0, 0)

    return res
}

console.log(getMaxGold(4,5,7))
console.log(getMaxGold(40,40,18))


// https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABAcwKZQLIEMAeBxOAGwBMAKAWwC5EwRyAjVAJwBobraHm2BrDuxkwCUiAN4AoRFMQQEAZyiJyWKExg5EAXkQBBJkywBPAHTAmccqVGJCqMMigALauUQBfNqRGaAfDVQA7rr6RgA8nII+pGBCpjCEhKQADEJCktKyYAoo6AAiMMgwUFiEAMp0WoikOPxcwlp+EtLNiEzoIExIAAYAJKI4bl3GcgAOhEWkAOSTscojpAByAsyxbcQgEKikpFhs9N5+WIgA1Ij0bCnpUm5XiMBwTFW2ijCVSQDciK+hSp8wx8cRE0WlJ7o9SM9EAArN6fGE-MBwgFA24gqTKVTqADaMAAuliobjKmgoPlCsUynRSDARKcSWSiiVypYoWk0e5bjdmpC2nI3rdMtkAG4wORFVDESp6AwmMwWKw2OwOZxKdyeA7+ILSsL0OBEVBYMBRGJxBKkYAlOSoVLiAXyF5yACSYD0Bsq1VqgjYhk9KwaYlR0jaUA6SA0Pm0SUQADJo4gND9XLHEIZEBHEFHk6mEZy7VlFMRgHztB6aMtWCnffVfAH2TBgFUAISi52urDVb2pVrtTqBqT1qoisVQCVYnD4wy4kTB0O29lD8XEMcTonaVQgVBztEDigqNQ4ZdYydpxA8ac9sBbkG8gF9xAAegAVM+74hH1JiBptFiALQARjYACMwuXFPnve9EEATtNAEQVQAHU0AEb9ABh-wALCMALk9ACg5QBoOUAM91AGflQBttUAKjkYMAELdACorQAFdUAcAtAA3lQA0ZVfd9EGIVNvySC5ALYf9QIfCCYIQlCMJwgjiOgkjAFa-aj6MY+870LORqkQH9ECAww2TReTFNOVT1JBTScG9JSVN0lp9MM7STJuW5NPYjM0luGdOm7ORxCswV9WMQg4GQUgSWwfAiDIAAWFgAFYWAAdhtdzbE87zfPQfyCBIUggvYtKWD-AAOVIgA