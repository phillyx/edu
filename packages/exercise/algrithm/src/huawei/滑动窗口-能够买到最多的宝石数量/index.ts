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