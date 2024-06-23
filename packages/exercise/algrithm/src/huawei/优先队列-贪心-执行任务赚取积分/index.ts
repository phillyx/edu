// https://blog.csdn.net/banxia_frontend/article/details/134749542
// https://blog.csdn.net/m0_73659489/article/details/134825195
function _PriorityQueue<T>(compare: any = (a: number, b: number) => a - b) {
    const queue = [] as T[]

    const add = (val: T) => {
        queue.push(val)
        queue.sort(compare)
    }

    const shift = () => {
        const res = queue.shift()
        // queue.sort(compare)
        return res
    }
    const isEmpty = () => {
        return queue.length === 0
    }
    const top = () => {
        return queue.at(0)
    }
    const size = () => {
        return queue.length
    }
    const toString = () => {
        return queue.toString()
    }
    return {
        add,
        shift,
        isEmpty,
        top,
        size,
        toString
    }
}


function getMaxScore(lines: string[], times: number) {

    const tasks = lines.map(x => {
        const [deadline, score] = x.split(' ').map(Number)
        return { deadline, score }
    }).sort((a, b) => a.deadline - b.deadline) // 按照任务开始时间升序排序

    // 创建优先队列，用于存储任务的积分
    const queue = _PriorityQueue<number>()
    // 遍历每个任务
    tasks.forEach(task => {
        // 获取任务的最晚处理时间和积分
        const { deadline, score } = task
        console.log(queue.toString(), score)
        // 如果当前队列的大小小于任务的最晚处理时间，说明任务还未过期可以添加到队列中
        if (queue.size() < deadline) {
            queue.add(score)
        }
        // 如果队列不为空，且队列顶部的任务积分小于当前任务的积分
        else if (!queue.isEmpty() && queue.top()! < score) {
            // 移除队列顶部的任务
            queue.shift()
            // 将当前任务的积分添加到队列中
            queue.add(score)
        }
        // 如果当前队列的大小已经达到总时间times,说明不可以再处理新的任务
        if (queue.size() > times) {
            // 移除队列顶部的任务
            queue.shift()
        }
        console.log(queue.toString())
    })

    let sumScore = 0
    // 当队列不为空时，继续处理
    while (!queue.isEmpty()) {
        // 累加队列顶部的任务积分到总积分
        sumScore += queue.shift()!
    }

    return sumScore


}

console.log(getMaxScore([
    '1 2',
    '2 3',
    '3 4',
    '3 5',
], 3))


// console.log(getMaxScore([
//     '1 2',
//     '1 3',
//     '1 4',
//     '3 5',
// ], 3))

// console.log(getMaxScore([
//     '1 2',
//     '1 3',
//     '1 4',
//     '1 5',
// ], 3))