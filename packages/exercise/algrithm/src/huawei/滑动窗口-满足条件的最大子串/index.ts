const isLetter = (char: string) => /[a-zA-Z]/.test(char)

function getSubStringMaxLength(str: string) {
    let maxLength = -1
    let l = 0, r = 0
    let letterIdx = [] as number[]
    let hasLetter = false

    while (r < str.length) {
        const chr = str.charAt(r)
        if (isLetter(chr)) {
            hasLetter = true
            letterIdx.push(r)

            if (letterIdx.length > 1) {
                l = letterIdx.shift()! + 1
            }

            if (r === l) {
                r++
                continue
            }
        }

        maxLength = Math.max(maxLength, r - l + 1)
        r++
    }

    return !hasLetter ? -1 : maxLength
}

console.log(getSubStringMaxLength('abC124ACb'))
console.log(getSubStringMaxLength('a5'))
console.log(getSubStringMaxLength('aBB9'))
console.log(getSubStringMaxLength('abcdef'))

// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAIwDYD2A5gHQDGaAJgHYnUCmiuAhtQB4CWzA+gGYBOBaonrVKwZv0QcyeesEqNmHPGmABGAMwAWAKwA2bdoDsmqLGBQyQtImgc0AGUYj+0ALzQAFGXiSM0Lb8HNREAJQeAHzQwADazAC0AF4AggkAWgC6wCQitj5+-GFQULwArtRk0kLQRIwAymU49YjBoQCyzGzOoYjwXkEBQSHh0ADe5tBTcnYAtl09RH0e0Anqk9OM0HgrAAwANNBunrsb21szrgCSlGwrsZnQzGjQ1GWzOPT8D2czCM-OZBfFa8ZiqeglGBTaAAd3gKno3jcAB5Aq0SHJevAIhModDodZqLZoL5jmj+ORCilEF4imd8RxeN4HIDXAUijj6fjoX4nC5gZ5WmUIXjufjLl8bmwSCgymh+nTIFyxYzvBL+FKMaIlvBoNF1JzRWKxTtPOrNfLGTSwgBCaAAamg6yNxvxhLQBDkGOIXjwxRdYoAvpDXQymbSPO4zYbQ8b+Pb7crQ4TpG8RbGpsGA9As0n5t1tctPJ0+iR81584s+oc3Altg6nf7XfHE6Lc6L+IwyvxqNAbbzWcCAPyrdTQAKVwvwKDt92e+jeoheOqIRrNVojToFrFeADkzBwAGF1AAmbQpQ84Xdhf1zr2EJcrtctNpELdV-r73TX282eeL5cGiaF9NwWKc92YAAhSCAE4fysP97x9J9gI3DowJ3fccDIRReB-IA