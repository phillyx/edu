/**
 * 最长子字符串的长度
 * 给你一个字符串 s，字符串s首尾相连成一个环形 ，请你在环中找出 'o' 字符出现了偶数次最长子字符串的长度。
 * 出现0次，返回s.length
 */

export function MaxSubstringLength(s: string) {
    const arr = s.split('')
    const arrDouble = [...arr, ...arr]

    let maxLength = 0

    let j = arr.length
    const isEvenO = (ar: string[]) => {
        return ar.filter(x => x === 'o').length % 2 === 0
    }
    
    while (j) {
        for (let i = 0; i <= arr.length; i++) {
            // 存在偶数项o
            if (isEvenO(arrDouble.slice(i, i + j))) {
                maxLength = Math.max(j, maxLength)
            }
        }
        j--
        if (maxLength !== 0) break
    }
}