function palindrome(str: string, left: number, right: number) {
    // 从中间向两边分开
    while (left >= 0 && right < str.length && str.charAt(left) == str.charAt(right)) {
        left--
        right++
    }
    // 多运算了一次
    return str.substring(left+1, right)
}

function longestPalindrom(str: string) {
    let res = ''
    for (let i = 0; i < str.length; i++) {
        // 奇数
        const s1 = palindrome(str, i, i)
        // 偶数
        const s2 = palindrome(str, i, i + 1)

        res = res.length > s1.length ? res : s1
        res = res.length > s2.length ? res : s2

    }

    return res
}

console.log(longestPalindrom('acaba'))