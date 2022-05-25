/**
 * 标题：最长的指定瑕疵度的元音子串 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
开头和结尾都是元音字母（aeiouAEIOU）的字符串为 元音字符串 ，其中混杂的非元音字母数量为其 瑕疵度 。比如:

·         “a” 、 “aa”是元音字符串，其瑕疵度都为0

·         “aiur”不是元音字符串（结尾不是元音字符）

·         “abira”是元音字符串，其瑕疵度为2

给定一个字符串，请找出指定瑕疵度的最长元音字符子串，并输出其长度，如果找不到满足条件的元音字符子串，输出0。

子串：字符串中任意个连续的字符组成的子序列称为该字符串的子串。

收起 
输入描述:
首行输入是一个整数，表示预期的瑕疵度flaw，取值范围[0, 65535]。
接下来一行是一个仅由字符a-z和A-Z组成的字符串，字符串长度(0, 65535]。
输出描述:
输出为一个整数，代表满足条件的元音字符子串的长度。

示例1
输入
0
asdbuiodevauufgh
输出
3
说明
 满足条件的最长元音字符子串有两个，分别为uio和auu，长度为3。

示例2
输入
2
aeueo
输出
0
说明
没有满足条件的元音字符子串，输出0
示例3
输入
1
aabeebuu
输出
5
说明 满足条件的最长元音字符子串有两个，分别为aabee和eebuu，长度为5

题解：
和补种白杨树题型相似，代码相似度几乎100%
都是需要抛却要求解的参数，从作用因子上去寻求就解。
所谓作用因子就是副作用，影响整体连贯的单个因子的聚合
 */
function getSubstrWithFlawDegree(flow: number, str: string) {
  const arr = ['a', 'i', 'e', 'o', 'u', 'A', 'I', 'E', 'O', 'U']
  const arrFlowIndex: number[] = []
  const N = str.length

  str.split('').reduce((pre, cur, index) => {
    if (!arr.includes(cur)) {
      pre.push(index)
    }
    return pre
  }, arrFlowIndex)

  const M = arrFlowIndex.length

  if (flow > M) return 0

  if (flow === M) return N

  let res = 0

  for (let i = 0; i <= M - flow; i++) {
    let left = 0
    let right = N

    if (i > 0) {
      left = arrFlowIndex[i - 1] + 1
    }

    if (i + flow < M) {
      right = arrFlowIndex[i + flow]
    }
    let tmp = right - left
    res = Math.max(res, tmp)

  }

  return res
}

console.log(getSubstrWithFlawDegree(0, 'asdbuiodevauufgh'))
console.log(getSubstrWithFlawDegree(2, 'aeueo'))
console.log(getSubstrWithFlawDegree(1, 'aabeebuu'))
console.log(getSubstrWithFlawDegree(2, 'acabeebuu'))
console.log(getSubstrWithFlawDegree(2, 'aabeebuubaaaa'))
console.log(getSubstrWithFlawDegree(3, 'aabeebuubaaaa'))


// https://www.typescriptlang.org/play?#code/PQKhCgAIUxwC0DIzBY-4AHND+qYELdDgxoLO1CqLoVtdAyvXUGFFQZ-TAFbUCY5SAH0kDfTQF9TAFNMDYlRARkCXPOyQUMVAGtrtEAJgBsozgBZpAaT6Bb6MAAUSMCwci3CAAfUAsmoBiVQMt+gPh1AvwmB6M3KB1bUCz1oAh-gIYBTAJYB7AK4BBAKIBJAPIAqoCQ-+iWgGTeVIBccpBWkZCAMP+AboqAtHKA77aAQubogHrpVtaADqaA84lRSZAEhJCAQAyAK9aAQZoAXODgAO2Qbe3tgDgE9oC4BJCAgAyQ3b0WZBFUyeUmUQAMTa0dHd3O7gBOPWqj47bGm3HB84tL9gBGzqsjcRNJ5VGiTYCbftiAAHKAVHLjCYDv0YB+RoBfijjldBoOLUBKANz1AMnxvySqEICVqgBzzb5qQAMSoBDu0AzbGAQ3NAG9ypDG4VBUJmlSa1EQ4xSgG+5QDwhq9AHvxgFu-MLhQAjfoAEI3QFEA8XqAdCVAA+eUUAp9HjLlUUngQBspoB3WMg4AhgFNFQDzxoAH+MagDTMwAyEYqzG9AC6m+QSgAsIwBcnoAQjMA+ObocoAMwANvYAO4JQBryoAeBUAwMGAF7UANozAA0kHEAFZgwBmYMAXVJgFLjQDQcoBTc2emt1r0Ao3KARlcIvYALQALz0nhzAC0OSyJuNYQAKANB0MR6Py36qxpQqL6w2AY7kjZjcfiItR0LCJSbANHynHlCvAc3sAGcACYndxueeOABu9nc7htAHMABZN8Bh8CAF+jAHBmUF7eOBBOogEhzQAkcq8EoAwJUA1EpRZeuPSb9wJWFRGGI6jvcirgPcTjuI4riHnM57gIAhTZ3le-aEhMxLgGOx5gRO9inI4jhLu4h7BqeZ6QChN4DlQj7Pu+UR4ScBF6ARRH-oQUSkdAwDgDa7gAHYAMYAC5uPxkA7o4wkAMruCcs7CasADqzjCXuABiDqOgAIo4O6rARVb2q4jr1JA-HuAAtkxqyBgpqxmfZzj8TuACUkAAN5QJAgmuPxCmQPYqyrJAAC8kA+gA5PYkWBpFzixZAkWOIlkWuKl7ipZ4qW+Kl3ipf4qWBJFkbeb5-nCYFwWaSZvj8auAAeZkWdZjirD6kZhRFpVtOVAUAHJdfZAB0dqOC5alNG0I2zgADnaqlVpFkWucNBnzu4gmOFWVazQZgaCWsgbOY17mhQAfJ53ltM4NqQFWACEQWrMNzmCXa7irrOVaHasrnuV5Rx7Y4w2ze4s57lWJ2OA1rnXZAAC+8MGcJazicD3kI4Gz01Y6dWnVNPl+QFACyXU43atX1TDo3jTuk3ebd93GY6kCXST7ko2jkBzIzd1GZTrOhcLkAc5AXOrOJ-WE2NlUGbOXW820NquCFVay5AziKwA3JrkAADzhWTOaQCzuvOAA1BbAPwxrY02pV4VzB0GurM4+6O5A0vw0zUNszzNtHPbnsU1TjU+lrJucJ1FuQBOHRIz7-Na7HLMG6LgeLG7Hvk9Vgv4zDEeQKngs9e0SMu1JkDCZZs1ddne6VSbwfI44CtG-YanDZZ9gNVW8uBjXs1w5jhMS+J8vgInfWuGNo2uDuVaSTJcn2SpamaU6un6YZtbRQuS4ruuv67nuK1wzPc+U4vy+yfJinrxpWnbwZ22iHFkHQef4CXyD19L1JO+a9VJPy3npV+VZOAf3woRLc39f7zxvoA1eD8QGbx0uAwy78kr2EEjAoi8Diazz-gvABK977KTQc-TBb9oFMVgXJPCeFCH+WIYgshQDUEb2oTvbaYY6GsS3CcJhMV-pAA