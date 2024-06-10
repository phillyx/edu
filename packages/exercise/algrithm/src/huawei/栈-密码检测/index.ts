
/**https://blog.csdn.net/m0_73659489/article/details/134629422 */
function checkPassword(str: string) {
    const arr = [] as string[]

    for (let chr of str) {
        if (chr === '<') {
            arr.pop()
        } else {
            arr.push(chr)
        }
    }
    let bool = false
    if (arr.length < 8) {
        bool = false
    }

    let upperCount = 0, lowerCount = 0, numCount = 0

    arr.forEach(chr => {
        if (chr >= 'a' && chr <= 'z') {
            lowerCount++
        } else if (chr > 'A' && chr <= 'Z') {
            upperCount++
        } else if (chr >= '0' && chr <= '9') {
            numCount++
        }
    })

    if (lowerCount > 0 && upperCount > 0 && numCount > 0 && lowerCount + upperCount + numCount < arr.length) {
        bool = true
    }

    return `${arr.join('')},${bool}`
}

console.log(checkPassword('ABC<89%000<'))

// https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABBAFgUwgawAoEMDO+A7nAE4AmAFPlKQFyI2kxgDmAlIgN4BQi-yBDUS5SpRAF5EAbQC6I-I1otWcnnwHAyiSgBs0UZCnFxgS0p14DriGGcqpxE54gDkAHleWNNm6NIAdAAOcEGU7D42AL6IaLr4aNyRvvz+wSD4KA7GESmIUZEF1vqGAEZwcLqSiMC48WiRdjpp+mxQKIjuiAAc3nnlldW19YXqxQaIIEFBaKQAwnDghlIADAA0iLpwRLMLS9XriGAgALZ7YMuIK2MCaVqkAKK4qNlOAHxJeU2viG9SrrhXIgAGTAozidz-ABeXk+eQEWx280WFwA1KjkgIYnEErZ7I5fm4AIJA0Hgzr-ABasKs8P4UxmyKW6Mx-Gx9TxOgJfzcK1JYIJkLcAE4aaybMcziioCy8kUsRFGvZEbtpYSViCwQzVfsPhqyZLzoY9ZrNtsdRdEKjJtMLYZrYa1V0Wmg2ig+ikBlUpLQQA1rAVIqQDCBSEgAAYAEi4aQAVnAWJRXF4omto16ouGeIGIEJKmgAltWNkMDgCMQyFQPESAEJzdzdYUAUhWrc87HYQA