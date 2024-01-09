/**
 * https://blog.csdn.net/m0_73659489/article/details/135273559
 * 员工派遣
 */
function disdpatchEmployees(line: string): number {

    const [x, y, ctnx, ctny] = line.split(' ').map(Number)

    const check = (k: number) => {
        const c = Math.floor(k / (x * y))  // 整除xy
        const a = Math.floor(k / x) - c // 整除x 分配给y
        const b = Math.floor(k / y) - c // 整除y 分配给x
        const d = k - a - b - c // 不能整除x 且 不能整除y
        return d >= Math.max(0, ctnx - b) + Math.max(0, ctny - x)
    }

    let l = 1, r = 1e9// 左闭右开

    while (l < r) {
        const mid = l + ((r - l) >> 1)
        if (check(mid)) {
            r = mid
        } else {
            l = mid + 1
        }
    }

    return l
};

console.log(disdpatchEmployees(''))
// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAIwDYD2A5gHQDGaAJgHYnUCmiwAtgAwD6A7AMwBsArAE4ALAA5BwAIYAnRAEsyeesEqNJcvGmABGbvwBMPfkKixogDRVAp7qA+W0DGCaZDAoAMwCu1MvILVolOVRRJRDJ4AFFmFEIAT3p6NAAKPDkGDGg0RGlkogBKVOpXZhx6aWgAbyhTaCqyb3ToAG0ADwAaaCjWz2oW6E6ogF1oAF5oJIYSNEi5RHiAcmgZ7JJmSRR4gDkCoulsipgqntrEHvh6MgBrIeh4s7zN4uyhgD4yyv39muo6skuAWSD4EjOQgEaTXaDAK6NMxRbIPcEQwAupoATNMaUVebwOnyOkl+-0BwNBFwhjQeAFoevDoMioYAwJUAsomATb80XsMZi6jhcYgAUCCCCwRCYdByd9sFSkVFoPSGY10W8PnVKJcLuSceSOcLKYBYOUAvwHU6CAFDloDrkczWVVpIxXNIfIrHsM-lylpJGvFWB1EF0hdAcA8ANTQB0A5Yut09D0S8kk9EAX12byURzwl20rRKw209AkEMAZ7qAW9TAM-KgAB9OP7ADu8A09CuSYAPNBti8WRj5UdmHJFcMk-74vESuS8A9Hs9tDsm285M4riFTmd4m3KLDG2aMWnoPPZfto9B6Joq+Ux2ak8N59B-doN1VY02r+iLYgrT48FBowBuXbyghKEiEIjxPwBIIQnCSICBiOJZgWbIgA