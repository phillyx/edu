// 贪心
// https://blog.csdn.net/banxia_frontend/article/details/136192490
// https://blog.csdn.net/m0_73659489/article/details/135439190
function minTriangleGroupSteps(source: number[], target: number[]) {
    const n = source.length
    const value2GroupMap = new Map<number, number>()
    const group2ValueMap = new Map<number, number[]>()

    // 1. 先获取target分组
    // Map (9) {7 => 0, 8 => 0, 9 => 0, 4 => 1, 2 => 1, 1 => 1, 3 => 2, 5 => 2, 6 => 2},  Map (3) {0 => [7, 8, 9], 1 => [4, 2, 1], 2 => [3, 5, 6]}
    for (let i = 0; i < n; i += 3) {
        const index = Math.round(i / 3)
        value2GroupMap.set(target[i], index)
        value2GroupMap.set(target[i + 1], index)
        value2GroupMap.set(target[i + 2], index)

        group2ValueMap.set(index, target.slice(i, i + 3))

    }
    // console.log(value2GroupMap,group2ValueMap)
    // 2. 根据target分组获取source分组值
    // [0, 0, 0, 2, 2, 1, 1, 1, 2]
    const originalGroup = [] as number[]
    for (let i = 0; i < n; i++) {
        originalGroup[i] = value2GroupMap.get(source[i])!
    }
    // console.log(originalGroup)
    // 将获得的分组值继续处理为组-key映射
    const sourceGroup2ValueMap = new Map<number, number[]>()
    originalGroup.forEach((value, index) => {
        if (!sourceGroup2ValueMap.has(value)) {
            sourceGroup2ValueMap.set(value, [index])
        } else {
            sourceGroup2ValueMap.set(value, sourceGroup2ValueMap.get(value)!.concat([index]))
        }
    })
    // console.log(sourceGroup2ValueMap)
    let moveCount = 0
    Array.from(sourceGroup2ValueMap.values()).forEach(arr => {
        if (Math.abs(arr[1] - arr[0]) > 1 || Math.abs(arr[2] - arr[1]) > 1) {
            moveCount++ // 如果不连续，至少需要一次调整
        }
    })

    // 为了避免过度计算，通过计算组间的交错来可能减少调整次数
    const _set = new Set<number>()
    let adjusetCount = 0
    originalGroup.forEach(x => {
        if (!_set.has(x)) {
            _set.add(x)
        } else {
            adjusetCount++
        }
    })

    return Math.min(moveCount, adjusetCount)
}


// function minTriangleGroupSteps(nums:number[],line2Nums:number[]){
//     const n = nums.length; // 排队的总人数

//     // 创建映射数组，将序号映射到组号（每3个人为一组）
//     let map = new Array(n + 1);
//     for (let i = 0; i < n; i++) {
//       map[line2Nums[i]] = Math.floor(i / 3);
//     }

//     // 将初始序号数组转换为对应的组号数组
//     let groupNums = nums.map(num => map[num]);

//     // 创建数组列表的数组，用于存储每个组号出现的位置
//     let positions = new Array(Math.ceil(n / 3)).fill(null).map(() => []);

//     // 遍历组号数组，记录每个组号出现的位置
//     groupNums.forEach((num, i) => positions[num].push(i));

//     // 初始化调整位置次数为0
//     let movedCount = 0;
//     console.log(positions,'positions')
//     // 遍历每个组的位置列表，检查是否需要调整位置
//     positions.forEach(posList => {
//       if (posList.length === 3) {
//         // 如果一个组有3个成员，检查他们是否连续
//         if (posList[1] - posList[0] > 1 || posList[2] - posList[1] > 1) {
//           movedCount++; // 如果不连续，至少需要一次调整
//         }
//       } else if (posList.length === 2) {
//         // 如果一个组有2个成员，检查他们之间的间隔
//         if (posList[1] - posList[0] > 2) {
//           movedCount++; // 如果间隔超过2，需要一次调整
//         }
//       } else if (posList.length === 1) {
//         // 如果一个组只有1个成员，最坏情况需要两次调整
//         movedCount += 2;
//       }
//     });
//     console.log(movedCount,'movedCount')
//     // 为了避免过度计算，通过计算组间的交错来可能减少调整次数
//     let seenGroups = new Set(); // 用于记录已经遇到的组号
//     let adjustments = 0; // 记录因组间交错导致的调整次数
//     console.log(groupNums)
//     groupNums.forEach(num => {
//       if (!seenGroups.has(num)) {
//         seenGroups.add(num);
//       } else {
//         adjustments++;
//       }
//     });

//     // 最终的调整次数是之前计算的调整次数和因交错导致的调整次数中的较小值
//     movedCount = Math.min(movedCount, adjustments);

//     // 输出最小调整次数
//     // console.log(movedCount);
//     return movedCount
// }

console.log(minTriangleGroupSteps([7, 9, 8, 5, 6, 4, 2, 1, 3], [7, 8, 9, 4, 2, 1, 5, 3, 6]))

console.log(minTriangleGroupSteps('8 9 7 5 6 3 2 1 4'.split(' ').map(Number), '7 8 9 4 2 1 3 5 6'.split(' ').map(Number)))
console.log(minTriangleGroupSteps('4 2 8 5 3 6 1 9 7'.split(' ').map(Number), '6 3 1 2 4 8 7 9 5'.split(' ').map(Number)))

console.log(minTriangleGroupSteps('1 4 7 8 9 2 3 5 6'.split(' ').map(Number), '1 2 3 4 5 6 7 8 9'.split(' ').map(Number)))

console.log(minTriangleGroupSteps('4 1 5 7 3 6 8 9 2'.split(' ').map(Number), '1 2 3 4 5 6 7 8 9'.split(' ').map(Number)))

console.log(minTriangleGroupSteps('3 1 2 6 4 5 9 7 8'.split(' ').map(Number), '1 2 3 4 5 6 7 8 9'.split(' ').map(Number)))


console.log(minTriangleGroupSteps('1 2 3 6 5 4 9 8 7'.split(' ').map(Number), '1 8 3 4 5 6 7 2 9'.split(' ').map(Number)))


// https://www.typescriptlang.org/play/?target=99#code/PTAEipYxh-QWAKBUALALsgDgZwFwgEYBsB7AcwDoBjDAEwDtSaBTZYXAQxoA8BLVgfQDMAToRrIGNKsFaDkXcvgbAqTVl3wZgARgDMANk0BOAEwAWAwAY4-AK41yskaAC2XGgBVBPGsQUBxYdZoAMpimAAUGITWguQMWKA01k64DIIA2gC6ADSgyNLETPGJyamZAJSgAN5woLWg5CIYyAmgALygkdGxpAreyIg1dQ00TaAAbqz41gxG-lFoALKsaG0JDADuoEtoADzFKYI5+6kAfGFlg7XDo8QBaEYAapPT26uMm9t7SQdH36UZZwusEuoAQmlIoEAEoqAduDAGvKeUEBWQgDAlQAjfiCEK8wgYKpUAOxtE6gcw5AAchOJOQMFJJoBMFM0OSMDJymhZoG0FKMOQArFycrouQBfHJbZagMLaXHmClpPFkqnZUBs1pEtImJmspXM1WgNLaXkCjJCkH8QiCCUKZpcVbmADcoBtOwSDptAGp2lKqiC6vVGtaJAwOKslv1SAEJGEbWApT66hMpjM5oFtqQMEwwgikWkuErXMoOEDfb6E9NZndU+nkJn8kwc6A3cq84HC3HaqWkxXlmmM1m6+7QEZmwWgW3QLd5o9ngxKxn80Gcn3kGn8HIGFGcgOpaPYL6Tbu6ghroQFD0SGEO+X5tsshPAlPE9si4ewEYIYBOC0AdsZLtFwzoxBg0UAHgUMTANJaQgzVB1ZGDlSZDIQWuZpzS4YhXEmZMVnaTJQFYDAEj+dIEIPWozQtMIrUdW1XVAZ0aFdN03VxMcULQmgMLuHMMlWS9MNTJEIiiACuLKABCEF919I9GhPBgz2IMJWPQ-BMOfWoEEAMB1oUAdP1ABC3YDAHO-QBbv0AEE1ADAXQAuOVRABaABrBgAE9AAIzQAQHUQ-0OiE2JMIfF5xXad4xV2Y5DgIkoiMBEElPYlS7lIMiAFFWHIRAwgvadNxbCpdWqEjiy4fgJVE-9vLuXyZ27RA8PSxMymYvLizqEqGB8p5H27KsaumHIcxbDI1OLIVQAYdQGG9BrGs8roWrKtq-LQHtqw7HJmta6d+IzDsxIoERyFYateoLfqBr3CSBukkZZPkwTprW9q0AGyinEIMYGAAYSiURbRBABBQRBFYBz4uEJwboAu75tIDsMHOMp4vNJKUrCaQLRyscColUNEFIVhcBhlG0k0bjrNw-7wP60AiTZAAfamxTDXH8bJodQBJgmiYqKn6sm4tntej7bGQRjQTAQAgzUAHPNAFg5QA9+KMwAYf8AZ8DAEQdQAAdMAQMjAAA5QBCa0AYBjABdTMdJLqIUdyksALMAMLlAH8EwBZRUAcfjADK9QBC6MAdO85cALAS7dd1FABfU3TABK5QBMVMAU3NAHvlQBfgMAecUlf1rXAAdTdyRmaXgqzeDZQCCJgvnCyK8so1gqAAK2sKsBa+9pLDy6KOPmeHBER1LgzRibagxsJRJTphSCqmHC25nm6k75cC6oMJWxb0AhpG9NxoHuoC+L0vPqFt1DbOuAQUEJhohoensZcGgwj597l5yBeS6YMvkCBfcN-gMAbDsBxd4PjwvB8Gb5hCBhwmKbAQsyFkVcjAjAADkkj-0IuUXKCBfRIRaAFCBPRxDEH6A6BAgAk40APhpulADcBoALrkE7AnvsWBAgBsJUAF96rk46ojlhpQA8XqAHflVygAGJVRIwwAEP+AHnrbQgAqOXwRZDWqJACQ-3AWBdQnr+TWJsP6AMHJhF3o2TQZQ7RiLAL6MilomBUQrjROiDEmLjXEb6Jwyw0jAJmOApwGAuLcXaFjeKRBzRRlBByFRajBp32MSLUAGlAC4SoAac0mE0MADbxgAjYwsoAT+1AAperpdhNCPG+koneNAVj8KIOsaQUxaAFFJApNktIxR+qqOId48hFCaGAHQlQAFhG6RoXLQAFK6ADi5QAGtqAAqFLhvD2GAC-FQADc66UALLygA7f0SRI7RaBCAYC4M-dJ0jQCyMBmEBxsQ1AKNcdueKah8C5PwPgOG2S0rZTVMUrx6iXygEALIJgAw5XibQwADdGAFV9TpPT+nDNGbUFJaS64NzSsUTcRzQATKmTMwpSQMikDQCXVKXA6olPeT4wJgA0ZX1sM+OFlK7eKei9BgVAr7UXhceU8RAFJAumVwRoWQADkpKZmUqBGUsA1znmDKGTUuWgABi0AKfmgB6M0AGQq6sUUjJIb6Gl5KRjfOSqlIFAAZLgoxm7eNboVMIMq5XLl6KgxAbRWienqoq85EsNZdMAJDmfDAAIRoADRUOWcsAGtygAbuT5bLeFvo26qqaITYmgLJmyvdeYbiVNQC0y9RgH1yA0gsxJm6sNRNKbKj1Wcnmx9cXL0YugsWUtZaK1VprXWBthWTX3Pqqeo1HTKqjcgvoWqdXtCMPGgeCBDUmqMLwy11r7WAGk5P2PtAApac6uorrvVqo9azYNobyaxtrUYhNk0k1X1TT4iWPbAChsXbIwct1ba31n22ohbp07uGiWgdIa1UVs1dq9oyip31vTUa1EgAr5WNZoFtVrAAA5oAeXVACjBoAVsV1aABI5XN27nDYuTYLBsNaSlFvhSbCD07CVyWJUfYDV8qWzuXnS+FCBLa20dq7D2XsXa+wDiHCO0dY5EMxdo9M4hMKzMCpnasKifHNMeYAJ91ADzfoAcQSWFxMYfC-ORcS7ICcOIZAsz7Q+MeYAA7VfZB0AD-agAXwN0mRglMkiXnk+RA+l06NOZMSpK3JTgKQwL3aWoqVGaA0e7tVYodUr083M5ZkeBn3H5r3AemexmB7nyaMJ0QGBU19t3YNFzGGwAvsABN+Sm9bx25e2wAskquyi-HQAMSqSbk4psjgBaOV0oAYPjADwOiBVzQHXogfLnvLJrhEMleQ7hATPmRMYBC0VhAgBk+O6S+vLynmtgDg9dVDgsXPeK3sgHexWcVXw8bfWAvWEOv08OwD+mFv7hDlFSBUoAeQChyBqaCcEORKlW6AUka26RQUZBtnIBpQC6GOnfGb545vvz8HcZbMNKXkmpASPkgpOTMjZCYSlaY0CrmrJS0AdKsnLDCFYg4ZQciUoJB9ukg5lQcg29dwHGBgfTLCGDiHByYepDqkCe7ClHsLee1-UIb36TMnJHyTkgo2Sfcx9j0H4P9lQ8J4IOH4Ofuo+ZPSckBJqQ8lZyD3HHPIc5O58Tu7qn4MPdcG-Cnn9Aivdx-90AiPQDUmZJyb74ucd485zLwivPKVsn18j772uju66N+z-HXPzd1Xl5dNTZPlfze8JT9X1Pcf0jZHyAkjP7d68d5L53ZvwoW6t2j+ktudcGEjyb6X0PXc7lJ0fb3T21fBAD5Szk8fBSJ913b0kqepcE-N-D+PnIy+CmT1X6PGfY9u+IXAbP5Pff5415blHYe+T0mpMLlvpu2+w7r-bhv6Om8o5T0DiXaea-t53HfIAA


