/**
 * https://writings.sh/post/algorithm-minimum-edit-distance
 * https://blog.csdn.net/a553181867/article/details/89008264
 */
function MinEditDistance(a: string, b: string) {
    const m = a.length, n = b.length
    // 为处理边界方便，假设对字符串头部插入 $ 符号
    // horse => $horse
    // ros => $ros
    // 如此一来，dp[i][j] 的意思是，a[..i-1] 编辑到 b[..j-1] 的最小编辑距离

    const dp = Array.from({ length: m + 1 }, () => Array.from({ length: n + 1 }, () => Number.MAX_SAFE_INTEGER
    ))

    // horse => $ 的编辑距离显然是：删除 5 个字符
    // 即 dp[i][0] => i
    for (let i = 0; i <= m; i++) dp[i][0] = i
    // $ => ros 的编辑距离显然是：插入三个字符
    // 即 dp[0][j] = j
    for (let j = 0; j <= n; j++) dp[0][j] = j

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 在 a[..i-1] => b[..j-2] 的基础上，再插入一个字符 b[j-1] 得到
            // 即表格左方值 + 1 得到
            const left = dp[i][j - 1] + 1
            // 在 a[..i-2] => b[..j-1] 的基础上，再删除一个字符 a[i-1] 得到
            // 即表格上方值 + 1 得到
            const up = dp[i - 1][j] + 1
            // 末尾两个字符相等
            // a[..i-1] => b[..j-1] 等价于 a[..i-2] => b[..j-2]
            let leftUp = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : dp[i - 1][j - 1] + 2

            dp[i][j] = Math.min(left, up, leftUp)
        }
    }

    return dp[m][n]
}

console.log(MinEditDistance('abc', 'abc'))
console.log(MinEditDistance('ABCABBA', 'CBABAC'))
// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAdwE4CWiBAdgOZoB0a8wKA9mosAIYA2Z9hi8AtgLS9SBXgFcBAUwAmRfjKYsSAYwlRYCZOizAARm3plKStFJKUSE5iwCs1gMwBGABzOAbAHZWeYkrYTgUpYsBGxowE4AnAAMUU4ATK4ALGogwFAAZqLKxPQk0ACypACiMogAIgQKyhIAFCwY0EyE5AA00DoNTaRkAJTQAN5q0MNKuUzQvNAAvNAslH7kPG15MzrzEovwQ8PY0IBccoAgmoBgLoCd8YAyroCdpoD98oAw-4DiCoB90YCf2oDq2oBk3oBMcoAsmoAXCYBLxoBTRWgABJoG9AO-K22gu3gXDQEmmAD4QbC8PCobs8IwkSCsWgMcBoIAgzUAJtaAADlAKbmNykKAA2gQALq0gBWDOggBC3QDwhoBcA0A9GY3Fi0yiUAj8BxswBo-oBE+MADErtIWUZlitnswAA5oB4HWlgF3YwDdnlAoaMSOMadNoABBPB4FgAT0o6SxvBq-WgCzIPAakwA1NAHNAAL5tGp9KbIi1W232+iO52u93QPLe30B6BBnEAOXEOgkeEo+TNAA0APoAZTNADEioWAJJpgAqRQA4kUAEpQno9fUwYbQwmo+E40Hs7U6wB8ZoA2R15gCx-wAESoATNOg1mggCo5d4E6CAZ2VoDT6UyomyQ9ACFD0lwU35EIfTVEANyXgA8M14t4Ins9fW3jNpe9NR67O0JoIHniHLDuOU6AoAkHIrm8a6btue4svu0DMsep41OeyFXrezLQA+8bYa+750ghrKmihkCoXgZ6WJeMwOM+uGPs+hEDFC3bQCeVHoTROF0dhjH4chLGDH+7FibsgAU6rMCqiuKOI6AqSpxCqgBf6oAAh6AFByNyALGKgJktB8pKnJgDp+jKbFif+G6ABYRgA8FoAZ7oXIAPArQIm0CmeZFmGuMfjpBeMwfkyOH8D6bKJh54mElJgrCqKynyYpyocupWnaXO+nvNJslsu5okWZZ662RpTkuT6blmbleVeReogoKaH7QMF4qISVDjhexuyANTmgB8OoAJHLQYAH26AJLebXdrs0UiolB4KcKRlsoNgDvcoAcXLSTF-BxVNCXKSNwwYT5iAAKq1TMgoEA1IXTFMqwsmdckAPxbnSp2NYFN2haVDT1c913PSVcSdnlYkBc1Mz5CwPCUEIJDcb5bQ1W0e2HR2FXDH6UKoxRol4JYoh4Hk268EyJAMlA6NQF59B+PMBg1IUJAlEQFRVCoNQAOQsDoSgs20bMcyz7Zk2MFMSFTZA08UpSM4gijMyzZoAEIAMLy3LZpc9ALMKyrKsK3zSNAA