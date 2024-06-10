/**
 * https://blog.csdn.net/qq_31076523/article/details/134824369
 * https://dream.blog.csdn.net/article/details/129218196
 * https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABAWRmAylATmg5gUQA8IALAQzAFMAKdALkQGds8BKRAbwChFfEIEzRABsYQgLyIAglixkAngDpgWOAFtarANw8+Aej39BURGVmJJo5osaiINVjbhYo1Vl128DiGMETUzLEUAKzg0agByCPZxSXR2LEooECwkdA8+RG8BMCE1NABhciwLU1kAbQAGAF1PLMMcoWEyZgBJMAATSkJS9EVmts7ugHlganywIrN3OsaTRgB3MgAHUvGGMBA1ACNKLAAaRDANrd2sGIA+TgzMvnKrKHK1asOH8rBq6tL7sUeP19+T0+dUy6FKDxCYTAkWidQAvjdeMIkogJlMSnFFKQzFJXJV3JlkSYBlB2l0epJKnVgM5-ESfKVKloGQAeRB9ZFgXBQEjMmAAan57G4tz4vn8fWxWAKcC6uOoMHYLMkaOKWOKMrleNYwpBotRhWKvXVONcir1opJZO6pRgFsQCMyjr4NJK1HpMEZfMQbI5lC5PL5gt1+p8floJqw8sViCuqrMiAAZInWSIWqShoQQ6G+IsVgrXunrVn7ZltokyABre3O3gI2aCODI-pwXCaOqJZKpdk6euNJuUFtt1AYFhcojYqiRMjbCBdYDRCySCIzueUBfufvN4St6gjzA4cfEchTiKz+dkRexRArtfAbawreDnfDtAHvATk80FfbGd-q-LmQQG-tsD6bo2267vuY4EMeFDfhAv4ATeq6PhBz5QW+MGfvB06zohl4xIBZAQIhYFcE+Q57lhh6wZO34dARqFEShBEdLO0RAA 
 * 
 * @param S 
 * @returns 
 */
function MinStringExchane(S: string) {
    const list = Array.from(S);
    // const arr = list.slice().sort()

    // if (arr.join('') == S) return S

    // const minChar = arr[0]
    // const lastIndex = S.lastIndexOf(minChar)

    const swap = (m: number, n: number) => {

        [list[m], list[n]] = [list[n], list[m]]
        S = list.join('')
    }

    let minChar = S.charAt(0)
    let lastIndex = 0
    for (let i = 0; i < S.length; i++) {
        if (S.charCodeAt(i) <= minChar.charCodeAt(0)) {
            minChar = S.charAt(i)
            lastIndex = i
        }
    }
    for (let i = 0; i < S.length; i++) {
        if (S.charAt(i) > minChar && i < lastIndex) {
            swap(i, lastIndex)
            break
        }
    }

    console.log(S)
    return S;
}

console.log(MinStringExchane('abcdef') == 'abcdef')
console.log(MinStringExchane('bcdefa') == 'acdefb')
console.log(MinStringExchane('abababa') == 'aaababb')
console.log(MinStringExchane('cba') == 'abc')
console.log(MinStringExchane('abccba') == 'aaccbb')
console.log(MinStringExchane('dcbaabc') == 'acbadbc')