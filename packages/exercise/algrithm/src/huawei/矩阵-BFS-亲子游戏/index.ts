/**
 * https://blog.csdn.net/banxia_frontend/article/details/135303187
 */
const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] // 定义四个方向的坐标变化
class GameNode {
    x: number
    y: number
    candies: number
    steps: number
    constructor(x: number, y: number, candies = 0, steps = 0) {
        this.x = x
        this.y = y
        this.candies = candies
        this.steps = steps
    }
}
const getMaxCandies = (N: number, grid: number[][]) => {
    const visited = Array.from({ length: N }, () => Array.from({ length: N }, () => [-1, -1]))

    let start = null as any as GameNode
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] === -3) {
                start = new GameNode(i, j)
                visited[i][j] = [0, 0] // 标记起点已访问
                break
            }
        }
    }

    let maxCandies = Number.MIN_SAFE_INTEGER
    const queue = [start]
    // BFS
    while (queue.length > 0) {
        const currentNode = queue.shift()!
        if (grid[currentNode.x][currentNode.y] === -2) {
            // 找到终点 孩子
            maxCandies = Math.max(maxCandies, currentNode.candies)
            continue
        }

        for (let [x, y] of directions) {
            const nextX = currentNode.x + x
            const nextY = currentNode.y + y

            if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= N || grid[nextX][nextY]) continue

            const newCandies = currentNode.candies + Math.max(grid[nextX][nextY], 0)
            const newSteps = currentNode.steps + 1
            const visitedNext = visited[nextX][nextY]
            const nextSteps = visitedNext[0]
            const nextCandies = visitedNext[1]
            // 如果新坐标未访问过或者有更优秀的路径（路径更少或糖果数更多）
            if (nextSteps === -1 || nextSteps > newSteps ||
                (nextSteps === newSteps && nextCandies < newCandies)) {
                queue.push(new GameNode(nextX, nextY, newCandies, newSteps))
                visitedNext[0] = newSteps
                visitedNext[1] = newCandies
            }
        }
    }

    return maxCandies > 0 ? maxCandies : -1
}


// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAIwDYD2A5gHQDGaAJgHYnUCmiuAhtQB4CWzA+gGYBOBaonrVKwZv0QcyeesEqNmHPGmABGAMwBWTQAZN6gBwB2KLGBQyQtImiUO-emWk3oAXmgBtLwFp1ADTQegC6QV56Qeph3oHBMRFB-iEh0NjQgFnagJJygNtqgFRygJ2mgIgqgCFugArqgOAWgBvKgGjKVnjMaGjQAOLMALb0AHIEitAA3ubQw2wY0NQAru049PxDwwCeY5PTs-PQZKwO9JjjUzNzMMPQtvToy-trR8PW1Lb8Ey4E-AAUo3ur-EFLHwdBm2IODsPMEgqd0CC9ABKAbrY7QRDwDhoEhsEFsOHHRHIkgLEELTHDbEogHbZqeUlAtCEhFIlHg8knETodYAXyg7Mgt1s0CIjAAssw2ABhLZUkEvLoXT5BIj8DiUaUHLwhFUw9wAPlh1w2NjsADdkRwRJQQQBBfj8ZgLEgCAjtF79aByahERFjLrQVlBF7qrUWq02u0Op0ut3wD1en1+7z+JLRKFQqDrOR2WySOyeSZ4PDQRp56h4-NtTo9RTrXjPaAvVPQDiQgDcdegAB5oF0mxwANRdmGDHXwyv8au1gBWjeg47bHcnPb7NPhHF41blCq8HFVo9S7h30F8mnnA-hx+G6akIIYAHdWh1ur16C8OEFR0mjyf4Ya0Mb6JR15vt94kTxGkwDQBUgAN0YA7rGAJ0OgBPuoA-dGAHepC7vjgTjMAA1ihwycu+XpssmOq1u0QqioCwKeF0lz8CQ-IAJJdNwADKZoAGIAKLcAxAAq7EtOxABK6zcnYACOEz0BJIJeGeiAhOs6QAEKsUx6yXkicjVuJkn0CQYaItAWrQtqeEiRsEyWqIiBlvQILaRJJBoEivCIL6ACENJLiu8q-mQFlOMINmoqqfmWYF964tuu6+AATIeeHwukgB+RoADEqABN+0HQIAltqAAra2HQCRIpihR0CCoiJCFS8hVkWS-z+VZQWUjsr4JcctzSJM9A0pyNJDiOjDeGw3ypAQy4OE4LgcDY8Wtbqdx2AwbCIAAGiCoUBdZEVol20AYm+x5mYtiAAJprfV4WKLi0A7QSkD5V5LxHatbZ6NAAA+b3jPQS2rRqlHvZ9R2nS9ANfUtp1-e2oOrr+T2qkDIQwu1HCdYRs1zTyV41eKFLnZtl1Nc0O1lfAFVCi8MNeHDVPfSdMTQvlh30JeTHMoy60NRFDLXdA6iM3q0Cft+lBdLTIJCyaNM-fDtPHfJ+3wkzS2s2cjISz+otLRE8vo0riDYyV6si7TXjRPl6SAEGagA55oADaaVIAVOZIYA4-GAGhGgCgAYAkOaAC9mgAY8oAA54lIA97GACH6gAQ-yHXuAIg6LuAGs+VuAA6mXuAFiagCQ--dy6PbTKsQjunj+KDR3Z80WpXkXAP5fCmfK2zHi7qXNcAGQN2D+vFc0bZY23iYmejxz2bpKATE5mfXiWd6KFXK1BED0-MwbaCzyzbOJhXxxG5riDaxezNF6vwzryb0Tb5e8-5bh77nzhaPHE4iAWdQBWkW3hnBNAAD8j9FeRzRjP4HJAA