/**
 * https://www.typescriptlang.org/zh/play/?#code/GYVwdgxgLglg9mABAcwKZQLIEMAeAZVMZKACwHlgBlEAI0qgCcYiB1GUgUQDdCyAKSgC5EAZ0bNkASkQBvAFCJFiCAjGjGiALyJKiANQ6A3AqUqwagDaEtOgHRWipE4qtREWczYAMzxK7+owG7aXgA0iEzIJMGIPkrKqm4QJKgQANY2fNKaAHyyvvEwwIh8kdGIALQBQYg52g7SDOggDEjAWBYiqAVK-irgMXHxSsBwDCX+MDZWQYaIUwA82mVQczB6etLywzvzxXxiDLbJWAwAglB8MNma2gDkcHfS-WBQGz2KAL4fEc2tCQNEABSRAAJi0t1ivm+8QA7iQYFYJoE3AsAkgAGQYiIwKKosGIABU6K2PzMahEtAISGWuPKVRmbgMAEY5D8iiVkqk0llSbthh4RDZsKRbABbXB8QXhSk0amSH7fdn7WXU2r1Qh8-m9FHvfmfRCoTqofLapQrPW7GFKJXxJpQFpIQVyJXkuBWexwZB8NCYXDU4jkKi0ehMVjsEjcXh8O4dd1wGiPSQKt0eixen3obD4QiBijUOjicOcHhgfh3dNwHAAE3dOCeKdU7tQnu9vuzAdI+ZDReQbBL0djNCww5oDaAA
 * @param S 
 * @returns 
 */
function getMaxLengthOfSubStringWithEvenO(S: string) {
    const str = S + S;
    const len = S.length
    let ans = 0
    let left = 0, right = 0
    const check = () => {
        if (right - left >= len) return false
        let count = 0
        for (let i = left; i <= right; i++) {
            if (str.charAt(i) === 'o') count++
        }
        return count % 2 === 0
    }
    while (left < len && right < 2 * len) {
        const subLen = right - left + 1

        if (check()) {
            ans = Math.max(ans, subLen)
        }

        if (subLen >= len) {
            left++
        } else {
            right++
        }
    }

    return ans
}

console.log(getMaxLengthOfSubStringWithEvenO('alolobo'))
console.log(getMaxLengthOfSubStringWithEvenO('looxdolx'))
console.log(getMaxLengthOfSubStringWithEvenO('ababab'))