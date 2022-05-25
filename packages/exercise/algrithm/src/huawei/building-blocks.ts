/**
 * 有一堆长方体积木，它们的宽度和高度都相同，但长度不一。小橙想把这堆积木叠成一面墙，墙的每层可以放一个积木，也可以将两个积木拼接起来，要求每层的长度相同。若必须用完这些积木，叠成的墙最多为多少层？

如下是叠成的一面墙的图示，积木仅按宽和高所在的面进行拼接。
输入描述:
输入为一行，为各个积木的长度，数字为正整数，并由空格分隔。积木的数量和长度都不超过5000。
输出描述:
输出一个数字，为墙的最大层数，如果无法按要求叠成每层长度一致的墙，则输出-1。
示例1
输入
3 6 6 3
输出
3
说明
可以每层都是长度3和6的积木拼接起来，这样每层的长度为9，层数为2；也可以其中两层直接用长度6的积木，两个长度3的积木拼接为一层，这样层数为3，故输出3。
示例2
输入
1 4 2 3 6
输出
-1
说明
无法用这些积木叠成每层长度一致的墙，故输出-1。

 */
function getMaxLevelofLego(arr: number[]) {
  arr = arr.sort((a, b) => b - a)

  const maxV = arr[0]
  const sum = arr.reduce((pre, cur) => pre + cur, 0)
  const range = Math.floor(sum / 2)
  let res = -1

  for (let i = maxV; i <= range; i++) {
    if (sum % i === 0) {
      res = judge(arr, i)
      if (res != -1) {
        // 要找到最大的层数，所以从小的长度向大的去寻找，找到时，不需要向后继续，直接结束
        break
      }
    }
  }
  return res;
}

function judge(arr: number[], length: number) {
  const temp = [...arr]
  const len = arr.length
  let count = 0

  for (let i = 0; i < len; i++) {
    if (temp[i] === 0) continue     // 当前积木已经被使用过

    if (i === len - 1 && temp[i] !== length) return -1 // 已经到最后一个，无法拼成

    let sum = temp[i] // 当前层积木已拼总长度
    temp[i] = 0

    if (sum === length) {
      count++ // 当前积木刚好铺满，层数加一
      continue
    }

    for (let j = i + 1; j < len; j++) {
      if (temp[j] === 0) continue // 积木已被使用

      if (j === len - 1 && temp[j] + sum !== length) return -1 // 已找到最后一个，无法拼成

      if (temp[j] + sum > length) continue // 当前积木和当前层级所有积木的和已超出固定长度，不能使用

      if (temp[j] + sum === length) {
        temp[j] = 0
        count++
        break; // 刚好铺满，此层位置已经铺好，继续铺下一层
      }
      // < 加上本次积木还不够
      sum += temp[j]
      temp[j] = 0
      continue
    }

  }

  return count
}

console.log(getMaxLevelofLego([3,6,6,3]))
console.log(getMaxLevelofLego([3,5]))
console.log(getMaxLevelofLego([6,1,6,1]))

// https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAcwKZQLIEMAeAZVAN1QBs5gDk4AKLAJzoC5EwQBbAI1ToG0BdAJSIA3gChEienUQBeSQwB0AZzh0o1WgBpEHITIB8OxAFpJA8YgsQESqIja4AarPm8ADHys27S9i6kKdKgAJiAQqBoADkHaECB0eobRqIgA1IhxdNpu5hLWYLaIdFhgaC7YUAAWCsBkqtS+bIgA9IgATLmIJOhFqEouxgCMFsCqiNTddjAuDjiOANyI0wA8csWlqIswqalCYhISMMDjjYgApEuyMnI5IhYHvf1yAFYgwWi0DNownQ9H40F+gBCORDPb3B4tVqAQMjAH5GgAYlQAA5oByTUAIW6AIR1AA6mgBh-wACRoBTuUAc3KAeB1UYB-VMAZXqARBU0YBu5UA39qw7EIwBvptjALBygAB06FUwBwKoBzv0At37YwAvboBS40Ay36AfXMIQ8OEEsABrWWIAC+EPVEk1vSg8SQgPmonVolAkFgCEQr3eESkzFYnG4-G03VKVTt7C4CTueW8iCgqDYkRcPAUoaknh9BTsLv8ihdyCqFkmGTg4DsN1EIzGEx60xuW0Qyy6qDAWx24L+x2o-sDPBgfCuNyE+VgrBSD2arUAyvqAWSVAPeegApzQBPuoB5v0A1RGAf3lABSugHH4zOV8bUPPXYtIUyDIQAMk3foDkTrDZBcnjVSEQV1dDXgyhiFHSN5gAA5QBUctjAAemgFWbQA-RoAEI3nB2TpxyDW+71jevbooOQ6foA3AaUhCwEHi4bh-ocVaASuJ6VBWkLWGmOxgf2A6AFhKgC+moAXymAId22JYoABUoPiqLYwG2GooYgozSDmdjPC40zpIMizcUWLoCeW3qQv81Z7jwzwNtcTYpmArYgCknaIJBk5TqxqGLtxcmriYiAbog27jAhMlpIgpxHquCZYWe6B6iY16qUOCKIo+L4fj+WlLFWZkNukpyGJhzYIEpKndoRgAxKuBgDlfrigCQ5oOqJRUOgChsYAX4qAF9qgBZ2pSHKAL8B04+RJ-kWehx4lrZ2GQrutbmRmtU+nhqQqhI8qoEqiyqaRlHYoAJtbooAsvKAHb+o5kSR2JCmRgDQcg+6IqtqHatEWNGAFBygA05oAhNaDoAG-HsoA+JoqqcqRAVJMkqmVjU4WFTHKSxFjGhI56ObhilGpm+QqN0ChkMg1BoJguAEMQZAUKgVDUDwADM2gAGzw9o0OCOYX1wD9f0A+g2D4EQpDkJQNAw9oACsKOiGjGNwP9gM4yD+Pg5DPAI4ZiOGeTlOoL91NY0DuOgwTENE4M2gACzaG0SPwxzNjo1zmO08DeNg4TUMi4gsPtFLiBwyjQA