/**
 * 给定一种规律以及一种字符串形式，判断该字符串是否遵循改规律的表现形式。。
例1:*

pattern=“abba”，str=“dogcat cat dog”

输出:truev
例2:
pattern=“aaaa”，str=“dog cat cat dog”
输出:false
 */
function isSameRegular(patten: string, str: string): boolean {
  const m = patten.length
  const arr = str.split(' ')
  const n = arr.length
  if (m != n) return false

  const func = (target: string[] | string) => {
    const map = {} as {[key: string]: number[]}
    for (let i = 0; i < n; i++) {
      const c = target[i]
      if (map[c]) {
        map[c].push(i)
      } else {
        map[c] = [i]
      }
    }
    return map
  }

  const pattenMap = func(patten)
  const strMap = func(arr)

  if (Object.keys(pattenMap).length != Object.keys(strMap).length) return false

  const pv = Object.values(pattenMap)
  const pv2 = Object.values(strMap)
  
  for (let i = 0; i < pv.length; i++) {
    if (pv[i].length !== pv2[i].length) return false
    if (pv[i].join('') !== pv2[i].join('')) return false
  }

  return true
}
console.log(isSameRegular('abba', 'cat dog dog'))
console.log(isSameRegular('abba', 'cat dog dog cat'))
console.log(isSameRegular('aaaa', 'cat cat cat cat'))
console.log(isSameRegular('abab', 'cat cc cat cc'))
console.log(isSameRegular('abcaba', 'cat bb cc cat bb cat'))
console.log(isSameRegular('abcd', 'aa bb cc dd'))
console.log(isSameRegular('abccba', 'aa bb cc cc bb aa'))
//https://www.typescriptlang.org/play?#code/PQKhCgAIUxNv0LO1AAcoWc9AjkYaP1CncoKeUWHVtQMm9AmOUCN9QeH1AYf8BIlQWtNBT6MKMHozQMhVBXBMCr9QTlMNAQt0AsIwA3O5QEAMI8IGj5AIwAuCOAAOAQwAuKgKYAnAHYBeQDgESgEZGlgXAIKAZxWaDAEwD2AcwDGqyG5WRHTs+HCAyfGAX4oyNgCu6gBukgBMMoqqGjoGSqnmVjb2zh7unt7OfsEyAGZKADaW6lAgwODFYdouKgCWDtqQzZYAykoAtuoASupOYWVKmgAUymrq2jKQ1prN2k4ANAs284vLTgCU80YODmXqSu0A3lAebdaQvZC6kNMa2gB0JysqABZXLjde400Dw2mlelgUZWaKgmAHJIDDdr9-pB2o9Ae9Zk5vldmsVIBN7gBCR7aXaQTTqFRhHSQUoVKpI7S3eqNYETFTjJyUrY2HYAbQAupAAD4gnZk3QAPkgl0gcuuTK8vSUCmB5wAvpAlJYZZA+QBrdQATx5SxWAvm2jCvSMWkFkHVVzlxQcQImJy8zWBAAYANwdSAAHhR-uaAGow2TZfK5X9FR5gRzNFyVHzmgKnfLcfjlQo+S4BVHMzHc-mBa8FGFLF8Js1ETG5Zr1PSZcX5aWC8C0xmGw7M46YxSqTTc1dHYzbs9ZgBZFXAlkuKaJWb1hW3Raz1WPBcTQGrnF4iYAeSMACt1E1XoajZYlzNtJvdhjPl9IMTICfz5fr7eNyqnx8WJfGSQ7Uu0dKVP4sbIgokTAp+F4qK8kTlBEt5Tg+-4Tl4sExPBZ6IchqHqL+NiPlBtKuviHoBo8foBsGsHPkBoYRkWMbZlMkTdsx3xvrojy4TxgHfCBlJgbS5SQRxh6wTxp4OMssIIvxgmRDE8mKdoym7GJw7gVJVSNhRoE0uEVSOnGljHOo7zOLW3R9IMwyjOMsLGKYMLrDCeQ+PkTgIoiVk2XZTgOT0-RDCMYyTDCHlKF58K+dkfmeIF4DBScoXhU5UWubFaQJd5eQlbkqjpZltllPZnQRc50VuXFphGIlPm5C4OReC4LgVTcIXVWFtW5S5MXuUYbiecV7gmB4HV5DNaW6RlfVZQNOWRSNjXGC4ditakkALR1di7UtlXZUNG0NQV40uJN8L7Yds0HUYWoJbpkBAA
