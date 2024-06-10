/**
 * leetcode 875 https://leetcode.cn/problems/koko-eating-bananas/
 * https://blog.csdn.net/banxia_frontend/article/details/134563292
 * https://blog.csdn.net/m0_73659489/article/details/134519883
 * 爱吃蟠桃的孙悟空
 */
function minEatingSpeed(piles: number[], h: number): number {
    debugger
    const canFinish = (k: number) => {
        let time = 0
        for (let pile of piles) {
            time += Math.ceil(pile / k)
            // primitive 跳出循环
            if (time > h) return false
        }

        return true
    }
    const n = piles.length
    // 每小时最多吃完一颗树，给定的time小于数组个数，返回0
    if (n > h) return 0;

    let l = 1, r = Math.max(...piles) + 1// 左闭右开

    while (l < r) {
        const mid = l + ((r - l) >> 1)
        if (canFinish(mid)) {
            r = mid
        } else {
            l = mid + 1
        }
    }

    return l
};

console.log(minEatingSpeed([3, 6, 7, 11], 8))

// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgbApogLgYwPYBNHQBwDsArNABYooAOAzgFzDBKqY4B0aAdsJQE4YBGSALbVgAawwSAtIgCGKAJYcA5lP6yOG2aKiwyFGvWCCMy9tSwdWHVMY0APBbID6AMz4cUiDlmCyeimhIwDgosgrwogCMAMwALEQAbDEATACcKbpw5FR0DCZmaBZWNijAQgAMzgQxiURpcXhpfgEKQYghqOGRwLEJUWl4eDFZ0ICMToDAKoAH4YDCFoAhboCa2oD5BoBeXlnAUK4Arhxoihgc0EJKAKLySsoAypTIWAAUlBGIdNAcW0L8iDwA2gC6ADRkWivd6fHgASmBbw+X2gAG9dNAkTh+FtlMovoikZgONQUNA0BoAGJKBTUUjQAC80DuYihoK+4KpAD54VikRykPjFEJcNSKuyOdBXBgeDSudBHkhoBhXJKntQmQiYELVUiebgANTUgCy8lI7EQEQeT2gwGgYnBgrVZvNvAUx0UADdcIBn2MAX4qAKv1APXO1rVCjldw10FZpCZPFQWx4h1cskiiD90AAvlBExGUFHDigeFsEyqkSn8wSDnjXlT5UhqKwkCoUKR2QxoIB560A8DqAN9NAADmgCxNCaAGO1AABygHSMwCIFoAYf8Am36ALO05hqW4A4uUADqaAEb9AFRyC9HgBX4wB7agKiwGaYdQ+HI9HoBUANyposS+DlqKAsXUqKIZrmwBnuoBb1MAz8qAAH0r0KAHdSFNO5bwAHmgCE2SLIUcVLY4sHLW9NRpO4xSkBAmWZVkoitGCOX3O5CQ4EkODJUg7gQ8ElUTIVHyOBQsETJNoEQeNoJtVVb2pBDoBQqJmPZQt2XTTMECgJNL0gKA4IwJBq1MSjTnOFRrluO5vhiQFEkBAhASiKIAXwaigA