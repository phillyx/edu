/**
 * 查找一个有向网络的头结点和尾结点
 */
function getHeadNodeAndLastNodeOfGraph(N: number, arr: [number, number][]) {
    const MaxPoint = Math.max(...arr.flat())
    const linkList = new Array<number[]>(MaxPoint + 1).fill([]); // 邻接表
    const inDegree = new Array(MaxPoint + 1).fill(0);  // 入度数组
    const outDegree = new Array(MaxPoint + 1).fill(0); // 出度数组

    arr.forEach(([inNo, outNo]) => {
        linkList[inNo].push(outNo) // 构建邻接表
        outDegree[inNo]++; // a的出度加1
        inDegree[outNo]++; // b的入读加1
    })

    const headerNodes = []  // 入度为0 的节点
    const endNodes = []     // 出度为0 的节点

    for (let i = 0; i <= MaxPoint; i++) {
        if (inDegree[i] === 0) headerNodes.push(i)
        if (outDegree[i] === 0) endNodes.push(i)
    }

    headerNodes.sort((a, b) => a - b)
    endNodes.sort((a, b) => a - b)


    return endNodes.length === 0 && arr.length > 0 ? '-1' : [...headerNodes, ...endNodes].join(' ')
}

console.log(getHeadNodeAndLastNodeOfGraph(4, [[0, 1], [0, 2], [1, 2], [2, 3]]))
console.log(getHeadNodeAndLastNodeOfGraph(5, [[0, 1], [0, 2], [1, 2], [2, 3], [3, 1]]))
console.log(getHeadNodeAndLastNodeOfGraph(2, [[0, 1], [0, 2]]))

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUxT80PyNAAcoKjlCQ5oRBVCK-oHb9AhboFk1Blv0E6HQGJVA+HRKhGHADMBXAOwGMAXASwHsnIBzAKZsAEgICGAEwByXCQICCTCQBkxAZzYy5AeToBxAE5iADgAsAFFIBckJgwC2AIwEGANJDEGDNgNp2nLu7+zgYAuj6hAJSQAN5QkAksPBqQALJiAB4AClwcTGyQALxpYmymAHT2mebltZ4G5XQANqXmkZHxickFTXkA1socKcVMAgDukPJeYgCeADzBLhEAfObp2bn5kADUkACMkY0cTU3mEZEA3JDAwJCA3QmApcaAFhGdkElMKXkAIgJ8BgICIq2caTaYzNaZHJ5Aq7A5HE7mAAMlwSN0ggFNFQBleoAHU0AI36vd4pLgMNg-P4AoGjCZTIzg9ZQraww50Y6nZFXNGAL8UcfjXvVGlwDABRMQsCxnPIydzEzRcKJFZaxV4JBK9JgDIZsHySuXlYwMNQWGUyaJowAh5oAvvUeLxVtsgMrJ-wE2qYMlC222HNuYlw3MABUp7ZUq76-J0+Y1yj1eyCOXDowDf0QHXgBfDoE7qQUziOQGLQCNRAiKo25YwBccojILhAEFBxHTHwKAiUeYLxSLtq5mPLlZr4FedEFkHMTSEkA4QMRVzHc2K9M2bEnHuicTtwbog5D5OdHFCRUKxWRmezLmbeoNFg4HRXCQ4a-MDtDAO1O73++ijeksnzp8N5gvKd7tpZpIx6fmo5RqIKbDmOYYjuI40SFIqYiQAAtDGl4qu+J4QQYUEwXBCFIah6G9q8-xsAwBi8FhoHlMOTB8GUu77pAABkrEeF4dGNoxpiQIqFYAPyQAA5ChewiZAvi1OUQE5s27gyTRchqKE5QAFabOYkkiR0ya9oSXDDnRXB8OYggiNmeaKCo6iyjo+hGGY5gACzuD4PiIu4eyhO5XmQAATL5kA+Hs7hBe5AXuAAzKEUQdIZxlNKZ5lCKIkjWUoqgaHmuiGCYFgAKzuZ53nBaVgXlWFlWRTF5XRWV8XgIlAgmWZFnpR+cg2dl9kCHlTkWFFIUVT5fnhXF7RAA

// https://blog.csdn.net/mars1199/article/details/135029888?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522170330286916800225589672%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=170330286916800225589672&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-135029888-null-null.nonecase&utm_term=%E6%9C%89%E5%90%91%E5%9B%BE%E7%9A%84%E9%A6%96%E8%8A%82%E7%82%B9%E5%92%8C%E5%B0%BE%E8%8A%82%E7%82%B9&spm=1018.2226.3001.4450

// https://blog.csdn.net/m0_73659489/article/details/135071610