/**
 * # 【招聘问题】
 * > 某公司组织一场公开的招聘活动，假设由于人数和场地的限制，每人每次面试的时长不等，并已经安排给定，用（S1，E1）,（S2，E2）,(sj,Ej)...(si<Ei,均为非负整数)表示每场面试的开始时间和结束时间，
 * >面试采用一对一的方式，即一名面试官同时只能面试一名应试者，一名面试官完成一次面试后可以立即进行下一场面试，且每个面试官的面试人次不超过m。为了支撑招聘活动高效顺利进行，请你计算至少需要多少名面试官。
 * <p>
 * - 输入描述：输入的第一行为面试官的最多面试人次m，第二行为当天总的面试场次n，接下来的n行为面试的起始时间和结束时间，起始时间和结束时间用空格分隔。其中，1<=n,m<=500。
 * - 输出描述：输出一个整数，表示至少需要的面试官数量。
 * <p>
 * 解题思路：
 * 1、首先对所有面试的场次进行汇总，并按照开始和结束时间递增排序
 * 2、总面试场次不为空时，把一个面试官可以面的所有场次m从总面试中分配，每分配一次，面试官+1
 * - 示例1：
 * - 示例1：
 * 输入：
 * 2
 * 5
 * 1 2
 * 2 3
 * 3 4
 * 4 5
 * 5 6
 * 输出：3
 * <p>
 * 输入：
 * 2
 * 5
 * 1 6
 * 2 6
 * 3 4
 * 4 5
 * 5 6
 * 输出：4
 * <p>
 * 输入：
 * 2
 * 5
 * 1 6
 * 2 6
 * 3 6
 * 4 6
 * 5 6
 * 输出：5
 * <p>
 * 输入：
 * 2
 * 5
 * 1 4
 * 2 3
 * 3 5
 * 2 6
 * 4 6
 * 输出：3
 * <p>
 * 输入：
 * 3
 * 6
 * 2 3
 * 3 4
 * 4 5
 * 1 4
 * 4 5
 * 5 6
 * 输出：2
 * <p>
 * 输入：
 * 1
 * 6
 * 2 3
 * 3 4
 * 4 5
 * 1 4
 * 4 5
 * 5 6
 * 输出：6
 */

export function minInterviewers(m: number, n: number, arr: Array<number[]>) {
    //sort
    let sortedArr = arr.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0]
        }
        return a[1] - b[1]
    })

    let minInterviewers = 0
    
    while (sortedArr.length) {
        let next = sortedArr.shift()
        let index = m - 1

        let i = 0
        while (i < sortedArr.length) {
            if (index > 0) {
                if (next![1] <= sortedArr[i][0]) {
                    // 删除元素，指针前移，索引不变
                    next = sortedArr.splice(i, 1)[0] as number[]
                    index--
                } else {
                    i++
                }
                continue
            } else {
                break;
            }
        }
        minInterviewers++
    }
    

    return minInterviewers
}