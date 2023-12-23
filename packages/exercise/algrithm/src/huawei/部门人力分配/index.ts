/**
 * 部门在进行需求开发时需要进行人力安排。当前部门需要完成N个需求，需求用requlrementsl表示，requirements表示第1个需求的工作量大小，单位:人月。
这部分需求需要在M个月内完成开发，进行人力安排后每个月的人力是固定的。
目前要求每个月最多有2个需求开发，并且每个月需要完成的需求不能超过部门人力。请帮部门评估在满足需求开发进度的情况下每个月需要的最小人力是多少?
输入描述:
输入第一行为M和requirements，M表示需要开发时间要求，requirements表示每个需求工作量大小，N为requirements长度1 = N/2 <= M <= N <= 1041 <= requirementsli] <= 10^9
输出描述:
对于每组测试数据，输出部门需要人力需求，行末无多余空格
示例1
输入
3
3534
输出 6
说明
输入数据两行，第一行输入数据3表示开发时问要求，第二行输入数据表示需求工作量大小，输出数据一行，表示部门人力需求
 */
function minManpowerDemand(months: number, requirements: number[]) {
    const N = requirements.length;
    const M = months;

    if (N === 1) {
        return requirements.at(0)
    }

    const nums = requirements.sort((a, b) => a - b)
    // 计算人力需求为K时，需要多少个月完成工作
    const check = (k: number) => {
        let left = 0, right = N - 1;
        // 
        let ans = 0;
        // 进行循环，退出循环条件为两个指针相遇，表示需求完成
        while (left <= right) {
            if (nums[left] + nums[right] <= k) {
                // 如果每轮匹配，左右指针相加不超过k, 表示当月可做两个需求
                left++
            }
            // 每轮循环，右侧数值大的需求必减1
            right--
            // 每轮匹配都会多一个月完成工作
            ans++
        }

        return ans
    }

    // 人力需求最小值为nums数组中的最大值，否则nums.at(-1)无法在一个月内完成
    // 人力需求的最大值为nums数组中最大的两个元素相加
    // 设置左闭右开区间，最大值为 nums.at(-1)+nums.at(-2)+1
    const getMinRequirement = () => {
        let left = nums.at(-1)!
        let right = nums.at(-2)! + nums.at(-1)! + 1

        while (left < right) {
            const mid = left + ((right - left) >> 1)
            // 如果在人力需求取mid时，所花费时间不超过M
            // 那么说明人力还有富余，right左移零空间减半
            if (check(mid) <= M) {
                right = mid
            }else{
                // 如果在人力需求取mid时，所花费时间不超过M
                // 那么说明人力有所紧缺，left向右移动令搜索空间折半
                left = mid + 1
            }
        }

        return left
    }

    return getMinRequirement()
}

console.log(minManpowerDemand(3,[3,5,3,4]))

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUwLhMC9TAU6obfjAyEYAHTBCNoAH1CLyoN9N1BAyLUC65QbKVBI7UCTjQIAZBlfUFklBYwGO1AEIwDlAqOS0Bh-rIApXAE4BTAI4BXADZiAtqIB2AFwDO0wBYRgLk8+YqQEt5StdsA03gEZemQCFugU91AOvKB5xMDkmoHgdPoFVlQLLyALlKAIc1pwQE342EAwJSxiRABZbn9AUMUOPD4yKmpAOBVAees46wpAejNAL7VALO1rIMA7t0YiTGz-QABzQCxNQEhzACYrZMA3PUAUORq2dmssQFg5QF+AwFDYwHH4hApaQHfowDo9BEAR6MAGeURAQ7tAZtisPGRAMr1rQFGDQFbFQGg5HqJrWtd8+sBEHQB+cEBk+MBTRUB540AH+J8n59NAADlUQBcctFADEqekkhlEChUqj40W0xDw+EAL6lVXQScFGaHabJYBwudycAFgiFQtSAf1SduZIABeSCcYDNSAAHlp0WZtM47Mg5gADAAWKksyDEzFqaT6AC6XN5AD0AJxPQBfih8voBP7UAcXKZQAjfoBpW0Aq9GAB1NAHbGfEeipYRAo-FQgGpzQAHpvVAJrygC8vQA8FuAtIBo+XM33AAGZ-QBWP18pWQABs4EAL9GAODNvsbACRyqD4f1QL2Nfu0iMAd6mo0yAGLk089jfDMHi3KbFcb-nxtJNyFgoCBgOAAGaSRQAY2U+gA9opIHJ9IpogBDRQAB17AHdRMIACKQ8cAEwAFHJ+8oABaqHyQRSSOQAIznABpheiScZd-vDyfhABtCUASkgAG8oJAv53+6plHSaQvAxRVUAA6aQlAAc23ABuT9v1-f82VpDcVB3OD4MgfRW0gVdOWpAjuVfD8v1I0ixGUSRhAHEVIWvUDR2UVceWfTCAF9wEwn9FD-W85FUQDaNJMDVF7YQmNXUdzyPV9qQAPkgUdIAAWkgGTMOAYBIEAQujAHTvK1MABABpfABCIW44g4BwuMQyBOy3UROwAa0A1cnL3A9jznWSFJIsjSIg-8INbf9aR5c9hH0SCt1CgDVPMOD-NIzTIEwsjAsUnjAJ5RKksgFK0EAKv1AHrnPhAAAExUSsAQ3NADe5AEE24QBwY0ACJTAA+3QBxBNrLQsA4NLSOnLd9Ag3Dgv-IVIui5RiL6pLsNwzzVAfUapQAaj4xaJpiqUhSc6a8v2-KtMAIM1ABzzTJADt4wBOZUAWUS+EAM91AGflFrWsAAqUBnGJzz20eh-EAe+VAC0FBrGwOvLRpWlaZv8jiQa-FKLpKvgHsAcvkDUAHgVnH6TBAFH9QB5xR9GHhSimLlOUyGyLhq7rsAX4TACx5epfks9hrIJ8dVHByGOMhiiqIHVn2M48mtIMy5UYBBaDS1QBaOQuZxUb4QAyFUATCUFoYpjlPMZ87UAVZtEAZhJesFyADJl0Xxal2oMYawBhRUAAl9Xo0rTAD7owA7fzuwBb1Ie7BAC5lJE+At0X1tV1d1efFaVcY4PmlD-HSO43jINEZRomHAAlS9RVcnz30hjLRsA8O1Y1gBCHPE8Jyb88PMCI+UqOi8gNaC+D4uG+5AW8oGobRBG0QQuZcuYr2mG4--Idl0AvO1tXVdNv-VTRtfOSFI1snkuOk7EAMwA15TH0zAAEjQBGoMATljkXesZolX2GtMAYoTAAk5WMKEADfjGkAGe1HV0InlDuwBvz0AN7TnSRDjQAUsqXywjhVc9lHJOXXPoZcr4hTRCHgTL8s9AJj1AWxUQ0hVCiD8sgw6kBTqbwbJgHesD97H1PuMC++Cr6QDvg-cgjQ96AHJfQAXP58FGoARBUHrf0ABVKgATuUADgmgAiXwAYADKMQG0MgHnFCsDW4xxBtDPKnN9rc2ojI3uyh+aYXUQOBOSdU7pzoioVcrFOZx17BBcCvZIIwJHOOKcs4FxLkUGuP0p4HweMDKeDxfIXzPiAA

// https://blog.csdn.net/weixin_48157259/article/details/134816118?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-0-134816118-blog-134298148.235^v39^pc_relevant_3m_sort_dl_base2&spm=1001.2101.3001.4242.1&utm_relevant_index=3