// https://blog.csdn.net/m0_73659489/article/details/134793010
function getMostPissa(pissas: number[]) {
    const n = pissas.length
    let res = 0
    const E_SPAN = -1
    const memo = Array.from({ length: n }, () => new Array<number>(n).fill(E_SPAN))
    
    const func = (left: number, right: number) => {
        // 每次只能从两次缺口选择披萨
        // 选择大块的
        if (pissas[left] > pissas[right]) {
            left = (left + 1) % n
        } else {
            right = (right + n - 1) % n
        }
        if (memo[left][right] !== E_SPAN) {
            // 已计算，直接返回结果
            return memo[left][right]
        }
        if (left === right) {
            // 边界条件：左右端点相同，说明只剩下一块pissa
            memo[left][right] = pissas[left]
        } else {
            // 各取两块区域值进行比较，取最大的那个
            memo[left][right] = Math.max(
                pissas[left] + func((left + 1) % n, right),
                pissas[right] + func(left, (right + n - 1) % n)
            )
        }
        return memo[left][right]
    }

    for (let i = 0; i < n; i++) {
        // 枚举第一步取那块披萨
        const left = (i + 1) % n // 左侧缺口
        const right = (i + n - 1) % n // 右侧缺口
        res = Math.max(res, pissas[i] + func(left, right))
    }

    return res
}

console.log(getMostPissa([8,2,10,5,7]))

// https://www.typescriptlang.org/play/?target=99#code/GYVwdgxgLglg9mABAcwKZQLJwM5QAozbYCGAFAA6EnYBciYIAtgEaoBOA2gLoCUiA3gFgAUIjGIICXPUQBeRJSLFsAOgA2qMMigALEeMQaoiNqmxzEABn3jJYaY1SM4FgIJs2xAJ4rgbOIyk-Iaa2jp0SAC+ADSIpHyyAHz0qADuiO6eXgA8DCzsiaRgPL4wamqkALQAjDw8NmINElLGoJAWpBrAUBFMrGyxbDDIOj30fewJyUKiBuIA9POIgPPWgITWgFfKgL8BgHNygCRyq4Bc-oDHyoCQCYCXRoDVRoAUIU0Gi4iA0ZmALGqAWPLngOSagOrqgCFut+IwwDiimoHC6UC4iGSwOUHCGI3BfBmc2RIW6HTBiAA1IhaogAKT0P5iSKIVBqbCoAREuZw0YdWnGbFISo4vgEsDUyLUgFxRzOUGobpcWHDUYQgCEsnkNUR1LuS0AT7qAQujAOnegBh-wAvboBS40AK-GAPbVAMt+gBzzOXiUxQEBsJB8uACoUi+FcTncwGdQXGKXyBmy2YohZLQCd8YAZV0AhuaAN7lAFj-gDPdQDPyoB7r0AnQ6AD7dADAqasAL9GAODN1oBLJUA0HKAADlPtDTWIbXbwQ6xRZodgK07fXMSWSKVTG377oAQFUAa8q7T6ALmVAPvqgB4FQDb8YAZCMAK9aAYPi1d3AADm72+gGKEwBUcqXEOWwcKGRD5BhiLoVIxiAAPUgbgy1+tYxBtCCkN1o7G49mDUVQHjRS-ia+72-3k+UCxKQDK3syrL4vQ9TtiiMF+lysFiOalrWk4trblW4JNIhTTAHAbBxEYiAwBYlgANwkYg2T0JRMCYpiPodksgBZ5oAfHKADTeBaAKbW3bLp81zUnY0gYvIpCkS+bIyPcUaAOXyxxCS0Jgfh0EkyCyr7SUsMbyUc1KmOY+6Hjox5nqBZixNeMAQtigFgu+8J1DhIhNChVomGYIi4cIwlwBo6hwMgpBoJgOD4FQZAcAAHNEABM0TVJY0QAKzRAA7LwPBAA