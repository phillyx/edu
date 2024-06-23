/**
 * https://blog.csdn.net/m0_73659489/article/details/135231530
 */
function getGPUTaskTime(maxTasks: number, tasks: number[]) {
    const taskLen = tasks.length
    let remain = 0
    let time = 0
    let i = 0
    for (; i < taskLen; i++) {
        const t = tasks[i]
        if (remain + t <= maxTasks) {
            remain = 0
        } else {
            remain += t - maxTasks
        }
        time++
    }

    time += Math.ceil(remain / maxTasks)

    // while (time !== 0 || i < taskLen) {
    //     if (i < taskLen) {
    //         remain += tasks[i]
    //         i++
    //     }
    //     remain -= maxTasks
    //     if (remain < 0) remain = 0

    //     time++
    // }
    return time

}


console.log(getGPUTaskTime(3, [1, 2, 3, 4, 5]))
console.log(getGPUTaskTime(4, [5, 4, 1, 1, 1]))