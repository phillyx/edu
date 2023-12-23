/**
 * 
 下图中，每个方块代表一个像素，每个像素用其行号和列号表示
为简化处理，多段线的走向只能是水平、竖直、斜向45度.
上图中的多段线可以用下面的坐标串表示: (2,8),(3,7),(3,6),(3,5),(4,4),(5,3),(6,2),(7,3),(8, 4),(7,5)。
但可以发现，这种表示不是最简的，其实只需要存储6个蓝色的关键点即可，它们是线段的起点、拐点、终点，而剩下4个点是几余的。
现在，请根据输入的包含有几余数据的多段线坐标列表，输出基最简化的结果。
输入描述:
2 8 3 7 3 6 3 5 4 4 5 3 6 2 7 3 8 4 7 5
1、所有数字以空格分隔，每两个数字一组，第一个数字是行号，第二个数字是列号2、行号和列号范围为10.64)，用例输入保证不会越界，考生不必检查:3输入数据至少包含两个坐标点。
输出描述:
2 8 3 7 3 5 6 2 8 4 7 5压缩后的最简化坐标列表，和输入数据的格式相同。
备注:
输出的坐标相对顺序不能变化
示例1
输入
2 8 3 7 3 6 3 5 4 4 5 3 6 2 7 3 8 4 7 5
输出
2 8 3 7 3 5 6 2 8 4 7 5
 */

function isTriangle(a: [number, number], b: [number, number], c: [number, number]) {
    const m = Math.sqrt(
        Math.pow(
            Math.abs(a[0] - b[0]), 2)
        + Math.pow(
            Math.abs(a[1] - b[1]), 2)
    )
    const n = Math.sqrt(
        Math.pow(
            Math.abs(c[0] - b[0]), 2)
        + Math.pow(
            Math.abs(c[1] - b[1]), 2)

    )
    const q = Math.sqrt(
        Math.pow(
            Math.abs(a[0] - c[0]), 2)
        + Math.pow(
            Math.abs(a[1] - c[1]), 2)
    )
    return m + n > q && m + q > n && q + n > m
}


function resolve(str: string) {
    const arr = [[+str.charAt(0)]]

    for (let i = 1; i < str.length; i++) {
        const char = str.charAt(i);
        if (char === ' ') continue;

        if (arr[arr.length - 1].length === 1) {
            arr[arr.length - 1].push(+char)
        } else {
            arr.push([+char])
        }
    }

    const len = arr.length

    const begin = arr[0]
    const end = arr[len - 1]
    const retArr = [begin]
    for (let i = 1; i < len - 1; i++) {
        if (isTriangle(arr[i - 1] as [number, number], arr[i] as [number, number], arr[i + 1] as [number, number])) {
            retArr.push(arr[i])
        }
    }
    retArr.push(end)
    return retArr.flat().join(' ')
}

console.log(resolve('2 8 3 7 3 6 3 5 4 4 5 3 6 2 7 3 8 4 7 5'))

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUrGg5Qf2qFo5QMP+HnrQVHKE7TQ6uqGO5QCwjAAOQ0HmFQAl90zzAKV0DdFQGQjB35UBiVQdCUmDAuT3EC45QAO9AaMqAQTUBgLikBYmoFbrQP1+gELdADrGBEFUBXyoF+AwPRmgFhtAznqBABkBrXoBe3PYBzTJQBYArIDK9AHThAUHLI50mYHvlQKdyNOICN0uYAK6oDgFoBMctwAXJAAFABMADQAHACUcVEAzHEA7CnpcQBsORlWORZxFjlWcWk5eXExOZlVOQlxkOWpjcWAQAzggGLyXoCLyoANziiAm-GAs57cgLByGoAA5vxyKHSAedoqgADpgIGRgBragBUKeRiAuyGATkFygM6KgHSpgJ0OgM7K7iiAwdqAN3IaMlJygO6xl3qAC0ZfgBN+lxQgBgAwCWSnALBhLhpAAeKgE15OQ9IaACnUUIB36MAnBaAO2NAMnxgFNFOSAUGVANQqgEhzOGAB1NMa5ZME2AQUNjAF+KgC-1eaCOSAZb9ADnmPTxgHnjQAP8eFwDFIAlIGlIJkJZA8jKrG1FQrJXLRdLJeKLFLIFZwABGPSAASMSeTAOrankAXl6AHgtAGBKgBS09CAEjkMGaiIARvxQgBpvEhmjTML2AGLkXaaNBwYnpmOwmIBgYMAL2q8PUABjseXKKBogGj5PGAXflAIPRU0AWPKAKNjADKuKEAwAGAfFcpoBR-UAAxaAU-Nwmk8ZTAM+BgEQdYnO4KXXmMwXC0XiyXqnWyyDDxXSqyAaOVAJT+gDgVORs2n0litqlWwDw+oAPt0AMCo9QDgmoALm2FTMCQV3gE-tQBeGYB4vSmakAG8qCcBcDN68B4kVimVjuVJQVLUtWVCc1RlTVtV1JlfxHbUgPAv8tRnKAQGAcBwAAMwAVwAOwAYwAFwASwAezwyASIAZwAFQAJxIgBDPCAHMABsAFMoiYyIAG08JwgBbAAjTj6NaQTRPEgBdVoRP4qSxIkyAlNk1oCMU4TlMk7TZKSSAAG8oEgUyCIo6iiMgITIAAXkgABZJiiIACzsaiAEd6KIqITNM-zHOctyAAcyIAd18gKov8pzXLsJiROoni+MTGTIAAWkgESUpklJJySPyooAakCuLQoiwrotM2K3ISpKmL4vU0sy7Kmry+pCoKgLzLwyzVLs0q3M87zIqqmq7HK0aqpioL4sSqICJyjKspy9quqqkrxsmyqxtmuqFsa5qVra1oOs6wqer6jyBvG4afJ26rZu26aAvG-aGtS5bFtStaHsgTanvCqaXre+aGqar7Dt+gL1tM+jOKInD6MomySsogA+SBroAMmx6z-qxyBMco3HCbRonrPAABfTDsPw4jyMo+HqLI9iADduMs+jIi5ki2IM4zuosqymPo+iBr4viiq5uwCJc0WAEEfMTJIZJkzCAqwsjxaiLirJIga9QAbioyAAB5IBlri2Nck2SKKoqBb+y6rLl0WBplt36KVqISKSI2-pIrDoi9uzbPsgBySAI4MnrSMEziA8D4OeLFvjRfouxrdY1zlqarPOJtlyw-svUnZe-yM-TsWC6LvOZImnDqJcqIiq92GoqpyBOPY6jOKMv6Aozxvm6iKWvdyv6aYCmmLuFyBrYG4fs9cjX-JdrLONYvml7T1K596qzC4AE13+i+MXzKmoPvr4aIhWxYlsTt7w9XNe16I9dN0u7fNhfC7znbB25cqpB2iDRBizE2JcVTufA2V80pMWopAASekVJqXonJSAVcSKIOQag6S6C0FYJwQTCGSCUEYN0oQ3KICK53wfpnYKTcW44MntNae-lOFwwRowkeLcT4dzvkjJmvCa5YXYs5KISQ7AACsyJ8yiFHGO1NMKXVZpxLOZFWJRGZqzDmSipyjhlIBccIFxwqknAhZC0EY5JCAA