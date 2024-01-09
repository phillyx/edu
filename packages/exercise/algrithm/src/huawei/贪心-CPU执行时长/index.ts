/**
 * good https://blog.csdn.net/qq_31076523/article/details/134829897
 * bad https://blog.csdn.net/m0_73659489/article/details/135231530
 * 3 maxTask
 * 5 length
 * 1 2 3 4 5 nums
 * 以示例1为例，每秒任务执行过程如下：
第1秒开始进来1个任务，执行完成后剩余0个任务（1<=3）
第2秒开始进来2个任务，执行完成后剩余0个任务（2<=3）
第3秒开始进来3个任务，执行完成后剩余0个任务（3<=3）
第4秒开始进来4个任务，执行完成后剩余1个任务（4>3）
第5秒开始进来5+1个任务，执行完成后剩余3个任务（6>3）
第6秒开始进来3个任务，执行完成后剩余0个任务（3>=3）
 */
function getMinExcuteTime(nums: number[], maxTask: number) {
    let step = 0, remainNum = 0,curNum = 0
    while (step < nums.length || remainNum != 0) {
        curNum = remainNum
        if (step < nums.length) {
            curNum += nums[step]
        }
        remainNum = curNum > maxTask ? curNum - maxTask : 0
        step++
    }

    return step
}
console.log(getMinExcuteTime([5,4,1,1,1],4))
console.log(getMinExcuteTime([1,2,3,4,5],3))
console.log(getMinExcuteTime([5,1,4,4,5],3))

// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWhzA9ogJtAFgF0wBwM4BcwwARgDaLwB0AxnigHZUMCmmwAjhwPoDMAjAAYA7ADYArACZewAIYAnTAEsaZFsBRtZSsnmD9eAFgAckgJzGzwqLGglZaLLkLFylWvSat2AW0HdhXgkzEzM5RRU1DS0dPQMpAXFeQRs4XmgfWQAPABVZPABrVOhxaDUGeEx0Yv5oSWh0wxLoBgBXHzxiwFO5QC5PQGj5fkAuOT7AGH-AeetAJc9Ab7lAQqVAcyNAGQjAcfjAaC9AIM1AaDlALH+oQBpvfgnAAH1Aac1AbfjAU3N+QCo5WZHFwBjtQAQjQDgVQEslQE15QRuZwAh--gAeAC8vEAkP97SRHM7nSTfO4LJ5vT7fH6SIGgva8SEXXiwh4vD5fWY-XhosGQXaGLHnQy4+H497XImGAB86PJ4ip4gA1IyZnCER8cUTRKyybtRFShXy8YjCb9eMzgWTYMAoAAzVoMGjKRAMBBsACySgYAFEsjRWpgWDklD4WAAKNodAgtdokFjyADaAF0ADQZbJ5Qoup3u+QASmgAG8bNA42pMNA8FacNBAdBBP75CxMsaAHLtNMZ30W+QFnxFlIwOPQADu6B0LGg9uTLFT-1dHSo5Uq6GgAB9+9Bs7mGOXoABCdOCSMx6s1mul8fpkfaMftWMLuNKNXN1vtzt4bssCpVWebrcLpeFrnpp14T3770XhcAXxfNdX+cL6evFeZAa5PkBTQAA-NAf7QAAtIBQYgS6VaXnG+5clyF7vpAF7ZpgrTyHq+5QBhNC6ngiBqN2lD2vAhrGmaFpWjadr2p64i+oYvr8BxHF+oY4bhlAxEMKR5EUPAVE0aa5qWtatoOp6nGSL6vBsb64h+rwfECSRZEsBRYnUZgRqSfRMlMSxXHsexalKXxQA