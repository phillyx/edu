/**
 * 迪杰斯特拉（Dijkstra）算法--有向网络最短路径
 * 单源最短路径问题是：对于给定的有向网络G=（V，E）及单个源点v，求v到G的其余各顶点的最短路径。
算法的基本思想
a.初始时，S只包含源点，即S＝{v}，v的距离为0。U包含除v外的其他顶点，即:U={其余顶点}，若v与U中顶点u有边，则<u,v>正常有权值，若u不是v的出边邻接点，则<u,v>权值为∞。

b.从U中选取一个距离v最小的顶点k，把k，加入S中（该选定的距离就是v到k的最短路径长度）。

c.以k为新考虑的中间点，修改U中各顶点的距离；若从源点v到顶点u的距离（经过顶点k）比原来距离（不经过顶点k）短，则修改顶点u的距离值，修改后的距离值的顶点k的距离加上边上的权。

d.重复步骤b和c直到所有顶点都包含在S中。
 */
const maxPointsLength = 200
const maxEdge = Number.MAX_SAFE_INTEGER
const E_YES = 1
const E_NO = 0
/**
 * @param {number} N PointsLength
 */
function getMinVirusTime(N: number, edgesLength: number, arr: [number, number, number][], startPoint: number) {
    const linkList = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(maxEdge))

    arr.forEach(([inNo, outNo, weight]) => {
        linkList[inNo][outNo] = weight // 构建邻接表
    })

    // 用来存储起点到其他个点之间的距离
    const dists = new Array(N + 1).fill(maxEdge) // dist[i]为源点到节点i的最短距离
    const preNodes: number[] = [] // 当前节点i的前驱节点
    const visitNodes = new Array(N + 1).fill(E_NO)// 节点i的最短路径是否已求出，值为1表示已求出

    const Dijkstra = () => {
        for (let i = 0; i <= N; i++) {
            dists[i] = linkList[startPoint][i] // 各节点到开始点位的距离值
            if (dists[i] !== maxEdge) {
                preNodes[i] = startPoint; // 初始状态下各前驱点
            } else {
                preNodes[i] = 0; // 如果两点非连接，定义其前驱为0
            }
        }

        visitNodes[startPoint] = E_YES; // 初始点状态设置为已访问，值为1
        dists[startPoint] = 0; // 设置初始点到自身的距离为0

        let count = 0;
        while (count <= N) {
            let min = maxEdge
            let targetIndex = -1

            for (let j = 0; j <= N; j++) {
                if (visitNodes[j] === E_NO && dists[j] < min) {
                    min = dists[j]
                    targetIndex = j
                    break;
                }
            }

            count++

            if (targetIndex === -1) continue;

            visitNodes[targetIndex] = E_YES

            for (let j = 0; j <= N; j++) {
                const compare = dists[targetIndex] + linkList[targetIndex][j]

                if (visitNodes[j] === E_NO && dists[j] > compare) {
                    dists[j] = compare
                    preNodes[j] = targetIndex
                }
            }
        }
    }

    Dijkstra()
    // 去除自己，去除多余的index,题目从1开始
    const dd = dists.filter((_, i) => i !== 0 && i !== startPoint)
    if(dd.includes(maxEdge)) return -1
    return dd.length > 0 ? dd.sort(((a, b) => b - a)).at(0) : -1
}


console.log(getMinVirusTime(4, 3, [[2, 1, 1], [2, 3, 1], [3, 4, 1]], 2))

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUwr+MB3ND1poTydCTRoCH+AiBLAVgawGcAXAJwENBIf8HTvQVZsBaewSHNBEFUEV-QHb9AAc0Fv3Qe9jAIfpQYgVWVACXa9BgO9TAGRmB6M0BY-4E-tQHFygTb9AWdqAQt1acA4gF50ANUAw-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

// https://blog.csdn.net/m0_45688966/article/details/106040335?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-106040335-blog-83904991.235%5Ev39%5Epc_relevant_3m_sort_dl_base2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-106040335-blog-83904991.235%5Ev39%5Epc_relevant_3m_sort_dl_base2&utm_relevant_index=1