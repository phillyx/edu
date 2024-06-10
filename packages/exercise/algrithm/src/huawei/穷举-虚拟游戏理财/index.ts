/**
 * https://blog.csdn.net/m0_73659489/article/details/134825442
 * https://www.typescriptlang.org/play/?target=99#code/GYVwdgxgLglg9mABAcwKZQLIEMAeAlAeQEkAKAOQC5EwQBbAI1QCcAaRAZzqLADdV2oVGg2ZtOtPDHYBrIXUatEhIgBkpg6vOYBtALpsmU6WoFyRTPWxi9+UExuEK9ASkQBvAFCJviAPS-EQFSjQBFYwD21QFKjRABeIODAXIzEACpECMBw5y8fCAQBRCY4KWilYnsAOlosAAcSEkUYVyiAPncMnx8mdBAmJCYkxGs+AXttGF0WxABfZzGAG3RELDB2QoAGAG4-AMAAc0ByTUA2U0Aptxm5iAALODh2VEK9eaXHHVHW-0RANMzACUVAYADARTDAK+UQwAA5QBUcoByuUAgypjYBwHokWZQPordYwRAAHkQZERAGoMa5PGNWjBgIgakYhiMURw6JIZIgAGQ0vo2QbqYa6cnibgDOF0+aLcl5KQsnF41o+BZLGL89gs4UixCnc6Xa4jGUTMbjDwQqFE2HwmJreGo9F9LFC2XeSHQnUAK0KSIxiAAjOsbYbnSbmmaRQSiYYZKTWfbfcZmVbWciYuIqdIVZ7uf1bP7EPb40yBNpQyiI1xGVAY2buWK+fkpWTA8X07pTZ6zYWJeXS7ly6G87L5RcrjFhmxm9WfOrPf2+xrWllFnCoLQKgBBJg9GJgVAAd0QM6YWAAnuRnCVgDBptMSMspiOzu2d1CAKJYU4kawAE1QOGiTU8non09nwzAD5wrJiKbsZl70fR4+ymMZ2igTokHfVcSitfIwBIAByRBkKmdUPFHdg4FmEppjgZASDQTBcGUEgAFYWAdZZlmoujtBolgACY6IAZjogAWOiKOWfRtDYlhOJYKiADZ6P41iWA4liuPYvjnGcIA
 * @param N 
 * @param sumInvest 
 * @param sumRisk 
 * @param ROIList 
 * @param riskList 
 * @param investList 
 * @returns 
 */
function getMaxROI(N: number, sumInvest: number, sumRisk: number, ROIList: number[], riskList: number[], investList: number[]) {
    // 投资回报 = 投资额 * 回报率
    const rois = ROIList.map((r, i) => {
        return r * investList[i]
    })
    let ans = 0; // 最大收益
    let choose = [] as number[]
    // 首先考虑只投资一个产品
    for (let i = 0; i < N; i++) {

        if (riskList[i] < sumRisk && investList[i] < sumInvest && ans < rois[i]) {
            ans = rois[i]
            choose = [i]
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            if (riskList[i] + riskList[j] <= sumRisk
                && investList[i] + investList[j] <= sumInvest
                && ans < rois[i] + rois[j]) {
                ans = rois[i] + rois[j]
                choose = [i, j]
            }
        }
    }

    const tmpArr = new Array(N).fill(0)
    choose.forEach(index => {
        tmpArr[index] = investList[index]
    })

    return tmpArr.join(' ')
}

console.log(getMaxROI(5,100,10,[10,20,30,40,50],[3,4,5,6,10],[20,30,20,40,30]))