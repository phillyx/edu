/**
 * 总重量=（货物A的数量*货物A的单件重量）+（货物B的数量*货物B的单件重量）
 * 总利润=（货物A的数量*货物A的单件利润）+（货物B的数量*货物B的单件利润）
 * 
 */

function calculateMaxProfix(wa:number,wb:number,wt:number,pa:number,pb:number){
    let maxProfit = 0;

    for(let countA = 0;countA*wa<=wt;countA++){
        let remainingWeight = wt-countA*wa // 计算剩余的重量
        if(remainingWeight% wb === 0){ // 如果剩余的重量可以整除货物B的重量
            let countB = remainingWeight / wb
            let profit  = countA*pa + countB *pb // 计算当前利润
            maxProfit = Math.max(maxProfit,profit) // 更新最大利润
        }
    }

    return maxProfit
}

console.log(calculateMaxProfix(10,8,36,15,7))

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUxuA0WcTDziQXkBD-hyWMJZOBBQIW6AdTRELPQVWVA3uSUEh-gag0wCECismLqoZZBKJUDLbNEs2I5cFPrXpNCwtuXGdInYOHAAzAK4A7AMYAXAJYB7TZG0BDADbb1Fs7oCmAWTMAPAAoAnQ6v0uAFADuZgBcmuoAtgBG9h4ANAGRoRHRcQG6SVExsQAOIWGZcdmJ+SkAlADeUJDVFva6kOGunt769ciQAAwA3CrV1aqGHn619dqGWrrYkO3dYxPYIEEAPMhpXXOakzQ0FVV9fSOQHvaN+ppnAOYA6vb6FwAWbZBpALQbk4tmkMDAkICF0YB070AlkqATXlcEg9vtIPpVH5jqdzpprrcHroAKTPSLTZAzCrfX6AIM1ADnmoPBiEA98qAU7lAC6mgBM01hkyFQg51UzjTYMaZHE5mM6XG53R7fTFM5mQQ7ZLw+epc94LXKQGhsiackBFfH-AGAZX1ALJKfFFzMa7ilrS5zl09wAdEa-EbmtKcibdKUNYAXs0ADaaAAHNAOSa+rFkAAvpCg5Djrp1B4THaneAQ2NNABnQy1S0WQwXPzmKw2OxOJom-wARg6sQAHLEAMwANlihYArLEAOylUpAA

// https://blog.csdn.net/banxia_frontend/article/details/135051144