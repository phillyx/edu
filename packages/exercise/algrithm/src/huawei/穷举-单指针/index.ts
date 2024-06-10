/**
 * https://www.typescriptlang.org/zh/play/?#code/GYVwdgxgLglg9mABBAFgUwgawMogEbZQBOMYA5gBTYBciAzsaWQDSIAytDJ5AlIgN4AoQYlGIANmigSAkmAAmaAB6IAvIgAMwsRKmIiaOmsQBaAIwixwOEUQVJ0mMY0BuRE4A87AHSTyUFDcYAGpgviEdHQgEBmQUW3Vsb1QAQyIAQSh7OUUlHktI92A7NmSUNMyKGD5VWriicILCsXEc5VCmnQBfbWaYYuyFZTU6pL8yAMbmyIMjdRhO5rwDFMxF0R7u3tEDKBAiJFnhHsFosDo4SV84SlQMHHxCbkoAchSINBfWN7wIRReeDwgA
 * https://blog.csdn.net/banxia_frontend/article/details/129640773
 */
function checkSubString(S: string, L: string) {

    let lIndex = 0

    let res = -1
    for (let i = 0; i < L.length; i++) {
        const chr = S.charAt(lIndex)
        if (L.charAt(i) === chr) {
            lIndex++
        }

        if (lIndex === S.length) {
            res = i
            break
        }
    }

    return res

}

console.log(checkSubString('ace', 'abcde'))