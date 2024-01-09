"use strict";
/**
 * https://blog.csdn.net/banxia_frontend/article/details/135303187
 */
const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // 定义四个方向的坐标变化
class GameNode {
    constructor(x, y, candies = 0, steps = 0) {
        this.x = x;
        this.y = y;
        this.candies = candies;
        this.steps = steps;
    }
}
const getMaxCandies = (N, grid) => {
    const visited = Array.from({ length: N }, () => Array.from({ length: N }, () => [-1, -1]));
    let start = null;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] === -3) {
                start = new GameNode(i, j);
                visited[i][j] = [0, 0]; // 标记起点已访问
                break;
            }
        }
    }
    let maxCandies = Number.MIN_SAFE_INTEGER;
    const queue = [start];
    // BFS
    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (grid[currentNode.x][currentNode.y] === -2) {
            // 找到终点 孩子
            maxCandies = Math.max(maxCandies, currentNode.candies);
            continue;
        }
        for (let [x, y] of directions) {
            const nextX = currentNode.x + x;
            const nextY = currentNode.y + y;
            if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= N || grid[nextX][nextY])
                continue;
            const newCandies = currentNode.candies + Math.max(grid[nextX][nextY], 0);
            const newSteps = currentNode.steps + 1;
            const visitedNext = visited[nextX][nextY];
            const nextSteps = visitedNext[0];
            const nextCandies = visitedNext[1];
            // 如果新坐标未访问过或者有更优秀的路径（路径更少或糖果数更多）
            if (nextSteps === -1 || nextSteps > newSteps ||
                (nextSteps === newSteps && nextCandies < newCandies)) {
                queue.push(new GameNode(nextX, nextY, newCandies, newSteps));
                visitedNext[0] = newSteps;
                visitedNext[1] = newCandies;
            }
        }
    }
    return maxCandies > 0 ? maxCandies : -1;
};
