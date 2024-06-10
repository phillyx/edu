/**
 * @author phillyx
 * @email 1020450921@qq.com
 * @data  2024-06-02
 * @link https://www.typescriptlang.org/zh/play/?#code/PQKhCgAIUgBBDArgFwBYHsBOkAOqCWANoQJ4AeUMsApgLbxGQCMADAEwsAsArCwJxsmsAI7CAdAGN0tSnAAm8ZPEiQObTgFoWANi1tKwcFIB2AZ2SQA5tWQBBTJngkAksbnUykALyQAFBNRMAC5Ic0x8Y0sASm8APkgAbygVSBNzVMCAYXR3W29IAHJ4AslUeExs3ORfFijklTSLAIqc6gANfObS8srqW2ra+shMG0RMYwyW9w6NSd7bcABfcHAAM0RjCWR8dAmR03RCADdqX3Lg0ORwyIBtAF0AGlDqcoCQsIjoxKHGyHPbQh4ZQ+YzUADukHsjhIvjY2iiYlWREINTqKUghBskAAigA5RC0fIsH67dJhbH5AoAfgKK3RqywfkxFnwRIA3JBWQAeZ6vVBiTGRNAc-AAalFMSS6PRv2a+VML0wAW6mH6vnwdSG6Pwqz8cq8PnJkq10pUeIJ4pNppM22MiGoVsgy0d-0BZRu1jsDicrncZH8gSid0t6OdMtJTVQ1AkAGt8r4wu8rp8Yl54lLTRisXbCT5zTJM5BgMBUugcCRHb9kLQcFD8q6gWJTIR8BJTmjMwzsL5mZNIOhdWFjYXw2YWW4PPlPVCfRP-c0OyPObrfNXaw4bhE-XdvD4WJAAGQHyA5yBcvcxEbIMYTVbwQgKx3o6gP6jLvxrqGbuc7+K1SCfhuW4eHcGgaE+KQvgqJ4EmBjrLIWV43gBmD2kMCEpL8OCYOgbamKYAAiijAn4iaXNcXxpt8hZdkyWJygO5HDkupZjpyc5TjYM4uHOAaYIuI46n4DbusBZA7gakD-jaERoSxkBQW+QlnA4AJAt+26QH+MQifAGkgXB8mKTi+K0IZmYYSollZhY+xEnSKTnIiWAAKLwAEvieFRGamspATRjGnlRMxS77CGLHFpAgAvZoADaaAP7ygAUroAowaAK2KEEqNhuHUPhRFKEF8HoZq6JIeMwzZUsKyRWkhzUAK6CWL4+yHCcvg3AUEiKAUDwFAARsgXUFGU-XdVc1DUAUjxFEoARUjSwVGKSNV1Q1TXHKcbVRsQ6ADWCWCEHIA0SIQ6CIAdk1gi++27NQGCgiQmAFPNQA
 */
const getArrayIndex = (chr: string) => {
    const chrCodeA = 'a'.charCodeAt(0)
    const chrCodeX = chr.charCodeAt(0)
    return chrCodeX - chrCodeA
}

function resolve(arr: string[], search: string) {
    const arrAlpha = new Array(26).fill(0)
    let QNum = 0
    const strQ = '?'

    for (let i = 0; i < search.length; i++) {
        const chr = search.charAt(i)

        if (chr == strQ) {
            QNum++
            continue
        }

        arrAlpha[getArrayIndex(chr)]++
    }

    const check = (str: string) => {
        let num = QNum
        // copy
        const tmpArr = arrAlpha.slice()
        for (let chr of str) {
            const index = getArrayIndex(chr)
            if (tmpArr[index] == 0 && num <= 0) return false
            else if (tmpArr[index] > 0) tmpArr[index]--
            else num--
        }
        return true
    }
    const processData = (str: string) => {
        for (let chr of str) {
            const index = getArrayIndex(chr)
            if (arrAlpha[index] == 0) continue
            else if (arrAlpha[index] > 0) arrAlpha[index]--
            else QNum--
        }
    }
    let res = 0

    arr.forEach(x => {
        if (check(x)) {
            res++
            // 更新使用情况
            processData(x)
        }
    })

    return res
}

// console.log(resolve(['cat','bt','hat','tree'],'atach??'))
console.log(resolve(['hello','world','cloud'],'welldonehoneyr'))
