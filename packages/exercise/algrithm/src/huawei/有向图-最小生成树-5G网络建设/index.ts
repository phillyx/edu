// https://blog.csdn.net/m0_73659489/article/details/134842215
type T_LINK = 0 | 1

interface I_Alpha {
  x: number
  y: number
  weight: number
  prelinked: number
}
const YES = 1
const NO = 0
const LINK_STATUS = {
  YES,
  NO,
}
const MAX_N = 21
const FAILED_VALUE = -1
/**
 * CRUSKAL
 */
function resolve(lines: string[]) {
  // 初始化并查集
  const unionFindSets = new Array(MAX_N).fill(0).map((_, i) => i)
  const alphas: I_Alpha[] = []

  // 使用路径压缩找到节点x的根节点
  const find = (x: number) => {
    if (unionFindSets[x] !== x) {
      unionFindSets[x] = find(unionFindSets[x]) // 路径压缩
    }

    return unionFindSets[x]
  }
  // 合并两个集合
  const merge = (x: number, y: number) => {
    const fx = find(x)
    const fy = find(y)
    // 已合并
    if (fx === fy) return NO
    unionFindSets[fx] = fy
    // 合并完成
    return YES
  }
  // 0. process data
  // 第一行 基站的个数
  const n = +lines[0]
  // 第二行 基站对
  const m = +lines[1]

  for (let i = 2; i <= m + 1; i++) {
    const [x, y, weight, prelinked] = lines[i].trim().split(' ').map(Number)

    if (prelinked === LINK_STATUS.YES) {
      // 如果已连接，直接合并两个节点
      merge(x, y)
    } else {
      // 否则将边加入边列表
      alphas.push({x, y, weight, prelinked})
    }
  }

  // 1. 按权重大小进行排序 升序
  alphas.sort((a, b) => a.weight - b.weight)
  // console.log(alphas)
  let ans = 0
  // 2. 从边集中取出权重最小，且两个顶点都不在同一个集合的边加入生成树中
  for (const alpha of alphas) {
    if (merge(alpha.x, alpha.y)) {
      ans += alpha.weight
    }
  }

  // 3. 判断所有节点是否连通
  let ok = true
  for (let i = 1; i <= n; i++) {
    if (find(i) !== find(1)) {
      ok = false
      break
    }
  }

  // 如果所有节点都连通，输出最小花费；头则输出-1
  return ok ? ans : FAILED_VALUE
}

console.log(resolve(['3', '3', '1 2 3 0', '1 3 1 0', '2 3 5 0']))
console.log(resolve(['3', '3', '1 2 3 0', '1 3 1 0', '2 3 5 1']))
console.log(resolve(['3', '1', '1 2 5 0']))

// https://www.typescriptlang.org/play?#code/C4TwDgpgBAKg+gGQJIDkDSUC8UAMUA+UAjAFAkCWAdsBAE4BmAhgMbRJwCCANmABaNQA3iSiioADwBcUSgFcAtgCM6IsSGlylKsVADuEcgHNewDQuW1VosLQhcqAawgATM1ssBfEswD2lAM7AUACaAKIAyljE3n6BUCgA8lE4MQFByOhw4TAcMACqkdjCOmHhADRW8QkVXr5pUACyHAAacChRAEykdXEAYhxICKEAInAAahwIeaFRALSkAPQAVEsiS1AAwgBKBWiTawsk9LKUzMDkflC2-j5cAG4QABT2lBD+0oG0VIYA2gC6AEohJUFgsoIBcJUA05qANGVAG56gFPzQBjaZUekEThdKL0qM5whBgP4oq9dFAOLRaIwQI8mq0UACAHT0chcLiPHD0+SMMCPR5wMpQchAzAAPn5AJRsSCjB4-HeUHY3D4jH+UX+ZB0oKggH95QAUroB72MAIfqAaOVAJT+gD8jQAMSoAgoMAnQ7iQAhboBOCxt4vqjMoziijykMnMdEFIuKOjE5HoUEe6L8WPduPxP3EfywmGw4iBgaDQdswFktEoEgA3JUdF506II5jsTH-HGE9g3c5w5QMVGcXiq-GAXmoBqDSa1SXM9nc2Xm5Xq5Vi2INYAIFVhgBI5QBUcoipy64vI6IZoNgvW4LHz1D73P7gSWoKioPRxFE616O4WxGf6CAr9jHiBbyeNYAn3Rnd9EIbDF6JrWb5XHig5VAWJ7DhWrY-BeNbniAkEltOsKADHagAIRr+oFZjmIQRMhogTqIGo4HSUA2D4rD+ASziMMAjAgmCgA03oAAHKADIRUCAF-qgCbXna86AA6mK5BLm2AANQvG8Pw4H8TFQMxgAxcpxvGAJ-awlQPIUQSVQUlELJlT0D4tBhlweL8p0nbkFAAA82CaWJxCWWJYmpthZ5xnufL6EYJh8jYdiOC4CGSVW5B-HSwBfPIjz0v4YD2MAjwAORQEl7Kco8KC+rQYrYf+jz+S8Tgekm2AZGgWQ5Pk4R0qUrknuqYKAEGagA55p+gB78YApcaADD-gAvbp1M4Ls6DViGutAbl6e5iieHhQHY-jQGmDUaoAZCqAJhKgBgOoAnfGAAVKgCmiltgDoSoAFhHYToUqKv4dJgLI-i8I8ggSJ5egGMYwB+bYRUuFAHjTSWxE-X2JFgkQ5GAJDGgDC5oAs4mAOSagDwOoA2-HsYAScaAPF6lQXTKdI3LQiWPIwfKKEejB0t5b1QLMUCKKTr0mH9og9LcEB0lwPiGPj0qMP49NQKZkoBMkhFdmCHTkYAc3JbYigC0coAa8qAF+K0OAADmcPdYAKHILoAbhnWoAvwmALBygAU6oAMCqsYuU52rte2APiuGGAIgWUsGUZYZnpjAg+KGLvc8eJb5WNE0u3S4h8v7b71SNUCMALYnYP7ZMmNhANeHJADM5GACRKgC1poAAkaAJDmNqAPRmK3tYAWAmVHzUA+A4USRbIEBC4ZxnPGZVnYEQlk2dglBOS5Xvpvl14ClAACESbni+RAAqHI0V1eUoLULJ6KLYjAOPPYgJ0DwtQK1Oc2trxfdYAyfFy8rgCNQYAnLGANj-gAsmmtR-zJUA54dPAD84cC9I-SDCM4yTNMBaJ4zUyLM2aPGuLcB4jwfhJSTklPk0DYGpSIFADoUAk64AQUlJBaCkE4AwSgtBABWdBgIxSAOZqzdmYD7hPCgTAuBdDEHINQeguBWDiAsNSvgqARCiBJRIakG4QCKGgLeOAmh8DWEYKQSgohuD+FkBIEAA
