// https://blog.csdn.net/m0_73659489/article/details/134914657
function getSubstringMaxLength(s: string) {
    const str = s + s;
    const N = s.length
    const check = (start: number, end: number) => {
        if (end - start >= N) return false
        let countO = 0, countX = 0, countL = 0
        for (let i = left; i <= end; i++) {
            if (str[i] === 'o') countO++
            else if (str[i] === 'x') countX++
            else if (str[i] === 'l') countL++
        }
        return countL % 2 === 0 && countO % 2 === 0 && countX % 2 === 0
    }

    let left = 0, right = 0, ans = 0


    while (left < N && right < N * 2) {
        const subLen = right - left + 1
        if (check(left, right)) {
            ans = Math.max(subLen, ans)
        }
        if (subLen >= N) {
            left++
        } else {
            right++
        }
    }
    return ans === 0 ? N : ans
}

// console.log(getSubstringMaxLength('alolobo'))
console.log(getSubstringMaxLength('looxdolx'))
// console.log(getSubstringMaxLength('bcbcbc'))


// https://www.typescriptlang.org/play?target=99#code/GYVwdgxgLglg9mABAcwKZQMogEYGcoBOMYyAsgIYAeAMqiVABYAUuAXIvkSQJSIDeAWABQiUYggJ8HQogC8HRAGoOAbmFjxkqIgBycjgDoANnWSN1YiWCkQGqCAGt9LKOQJR2YEAFtsqAgA0iHQAJp4+fgS8sgB8-BYaojDAiEyhiAC00m7aMfI6vAToIARIwORGuKgJiSbaEuBQAPL6AAxBDWBQABptHXCN1G01GsBwBKl1iDD6JsBQKtOIADzyoYswioq8giKJ+8mpnADaMAC6crLyAORw17ydzVsj+8GVqNMpLgSnF1c3lHumka3Wee1eYlQ70+R0Iv0uNyMQMe1DBEIAvi9REUoCUkCjEABSRAAJgRiFaiAAZFTgV0WsSyf8KdTaY9eozya0apihDUpnNtPJ2ogiMgGEKKUFyNZhnz5RoAO4MGAmSaoeYrXSs0UwcXaZbagBUpJ2WM01m0uBwtCQ8jFEsyiEFSkQAEZzYcmLZ7A4mIKgg6oNwzeCIYgZbh9BRGAZvFQWDa6NLrNxzRovZHEHltVk3aHw68cXiI9Z02JeRjPV9rdhbdn8gXC86NVA0a90W8qvEwxCg+39pWKzVi6VS1HmZSAPza9iR4S84QAeiXFtwcBMxjgyCYaEwOE4xDIVFtZmY1wqG7g2DuIeEVnXm6M2936CweEIR4oNFMjCY12fOBKBCDdATvIQVzXDdUC3Hc93fQ8SG-U8-2ubAIHQ9D7m4IA