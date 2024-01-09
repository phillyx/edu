/**
 * https://blog.csdn.net/m0_73659489/article/details/134498173
 * 瑕疵度为K的最长元音子字符串
 */

function getMaxFlawSubString(flow: number, str: string) {
    const vowels = new Set('aeiouAEIOU')

    let l = 0, r = 0, ans = 0,
        // 辅音计量个数
        cnt = 0

    while (r < str.length) {
        if (!vowels.has(str[r])) {
            // 如果当前字符是辅音
            cnt++ // 辅音个数加一
        } else {
            while (cnt > flow || !vowels.has(str[l])) {
                // r如果当前辅音个数大于K 或者 左指针指向的字符为辅音字母
                if (!vowels.has(str[l])) {
                    cnt--
                }
                l++ // 左指针前移
            }
            if (cnt == flow) {
                // 如果辅音个数等于K，也就是符合题目要求的子串
                ans = Math.max(ans, r - l + 1)
            }
        }
        r++
    }

    return ans
}

console.log(getMaxFlawSubString(0
    , 'asdbuiodevauufgh'
))
console.log(getMaxFlawSubString(2
    , 'aeueo'
))
console.log(getMaxFlawSubString(1
    , 'aabeebuu'
))

// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWxVF0K2ugyvUFxyBpQIW6ABzQ-qmGFFQZ-TAFbUHVtQMm9AmOSlmCigDMBXAOwGMAXASwHsXoA5gFMOAWQCGADwBiAG3EB3AMpMARko4AnLiwEAKBrJ4KAXNBZMAtqqGaANNADOWs8+26AlNADeNaP7Y+Z2gAN2MhWUdoAF5zIQVoJRE9AHJxIV4mAEEAUQBJAHkAVRSPehh-aFkRKpjoAAYHTTrG6HEWKNjGv0rK4GBoQFD4wkBC6MB5xMAqOUAHUx7e6DYWDhby3oUACy5q6D1mgB4nLQA6at0ONa9fCrnoLgZtgEIwhQjHQ7XxRz03AG1NAF0PBdZtd-P1oIAgzUAOeaAZX1ALJKFEA9GbDYEghYcADU6OgYOG00ABUqAADkUf4AL7QF5CHzEubrTaUvRo6AAPmghmM0AAPhzoI9wpE3h8vlpvrIAUCriDrmDNFC4bipoByTUAcXLoaCANCNAKAB0EAZ7qAcGNABEpusAiCqYCioYakQCz1tTJbcHk8XgLPj9RYCqRLJZK0QBab02kEk-3XWSY7EDPX62GAb88g9BAx6QXaGYsYrE2QpxZ6QWCofLAJLeKsAMP+AfTlAIw6CPIgAgVQAZGYA7t0AgZGAIRtMMRqAms+1OtAJGdDpYpHpO01oN7aliAIxldtzeOS2cgzSY2bx2aaERMTT8TtQFeQQIdHjVY48fTCMRSOSKFTqLQ6fT1WYONKOAAmqiYvBfQhC4iYTAYAhrCkUCAlA+6OIeQjHqeIgSDI8jKGoGjuPoABMj7QGkQhMEIPDAZAoF7kEkHQXoZ5wZeiE3ihejjhhaTiDYQjvkw+GAkAA