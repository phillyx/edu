/**
 * 能够买到最多的宝石数量
 * https://blog.csdn.net/m0_73659489/article/details/134519914
 * https://blog.csdn.net/banxia_frontend/article/details/134750300
 */
function getMaxGems(N: number, gems: number[], price: number) {
    let ans = 0, sum = 0, l = 0, r = 0

    while (r < N) {
        sum += gems[r]
        if (sum > price) {
            sum -= gems[l]
            l++
        }
        ans = Math.max(ans, r - l + 1)
        r++
    }

    return ans;
}
// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWxfgMPiagHOUAxKgAc0FiagQt0Lnahn90AdTQecSpZoALAFyoAcBnALmGACMAbAewHMA6AY3oATAHa8RAUyrAAtgAYA+gHYAzADYArAE4ALAA4twAIYAnKgEt+7CcCFSj59vWABGFTo0utWlzrJxqOiYWDh4BYTFJaVYjEQAPcyMFADMTThEqCREhYzNLa1t7R2c3HSUNORU5OX9gKGSAVxF+C3TobikAWSM4gHEJGXoACgA5RmgRBplWCRMAGnaBpgmpmZMAbQBdBdoTSwlxyenZgEpoAG8yaGvrKmhY+mgAXmg5Bfop59eF9i+36BMfygV2uAHcKI4JNAhoCADzQEZnS4wa6o64fGTQADULw6g3WJk2ILR0HMyWhGOgAD5oLt9kjiSTUZSALS4pbrdhElFMtHsLFYxmogC+QuuDy+3SoFF4Mh6QweC0BLOgvyx0BcJzFAIFxNFkGJJikDRMInuInoAG4oMKgA


// https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABAcwKZQLIEMAeBxVAWwGE5woAKNQgZwC5EwRCAjVAJwG0BdAGkQAO7GBFQMmrDgEpEAbwBQiJYggIaURABtUSALwoiNAHTawyKAAtFymMEQVTiXc8QAGGe3Qh2SV-OtK2ho0zE5uAVroKmRgGvp+ytFg6ogA7jBgACZwqWE8-olBkcBxbvzCyBalCcqpFjDa9hVViAA8kWAyComJqskaUIQCYdQ0nM1Q3BGJIYSIANT6gwLTygD0a4i29rNt+kIiqF2rShs96Vk5RgIgNBYUy1IniGcAvs91Dag7oQB8gsJRMceiCkilMiNDJxtCUpqCemcLtlUkYaAJNIcHKgSvwAIxPeGJREZZHXOACCgEwlKXYAWn0mWehWxUHm8wKoPe8NU5DC2EsRkIuAoPNi5RglQ0tOKGnmiHxHJBEzZES5yk8UG8SFFUHk73kfRocG0JjgyCo6Gw+CIpHIFE4AA5+AAWfgANn4AGY8e7+AB2Pjy9xPQ3G1Cm81oTC4AgkGKUTge+Ven2IJ2IACcKcQACYXYHcQBWKQhtRhiMW6PWuN2zi41P15NNxstvEF4NAA
function getMaxGemCount(gems: number[], price: number) {
    const len = gems.length
    if (len === 0) return 0

    let sum = 0
    let count = 0
    const window = []

    let left = 0, right = 0
    while (right < len) {
        const tmp = gems[right]
        sum += tmp
        // if (sum <= price) {
        //     window.push(tmp)
        // }
        while (sum > price) {
            const d = gems[left]
            // window.splice(left, 1)
            // window.pop()
            sum -= d
            left++

        }
        count = Math.max(count, right - left + 1)

        right++
    }
    return count
}

console.log(getMaxGemCount([8, 4, 6, 3, 1, 6, 7], 10))
console.log(getMaxGemCount([6, 1, 3, 1, 8, 9, 3, 2, 4], 15))
console.log(getMaxGemCount([1, 1, 1, 1, 1, 1, 1, 1, 1], 10))