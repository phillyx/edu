/**
 * 现有两组服务器A和B，每组有多个算力不同的CPU，其中AM是A组第1CPU的运算能力，B是B组第1CPU的运算能力。一组服务器的总算力是各CPU的算力之和。为了让两组服务器的算力相等，允许从每组各选出一个CPU进行一次交换，求两组服务器中，用于交换的CPU的算力，并且要求从A组服务器中选出的CPU，算力尽可能小。
输入描述:
第一行输入为L1和L2，以空格分隔，L1表示A组服务器中的CPU数量，L2表示B组服务器中的CPU数量第二行输入为A组服务器中各个CPU的算力值，以空格分隔.第三行输入为B组服务器中各个CPU的算力值，以空格分隔。
1 <=L1 <= 100001 <= L2 <= 10000
1 <= Ali] <= 1000001 <= Bi <= 100000
输出描述:
对于每组测试数据，输出两个整数，以空格分隔，依次表示A组选出的CPU算力、B组选出的CPU算力。
要求从A组选出的CPU的算力尽可能小。
备注:
保证两组服务器的初始总算力不同.
答案肯定存在。
示例1
输入
2 2
1 1
2 2
输出 1 2
 */
function solve() {
  let [l1, l2] = readline().split(' ').map(Number)
  let a = readline().split(' ').map(Number)
  let b = readline().split(' ').map(Number)

  a.sort((a, b) => a - b)
  b.sort((a, b) => b - a)

  let sumA = a.reduce((acc, cur) => acc + cur, 0)
  let sumB = b.reduce((acc, cur) => acc + cur, 0)

  for (let i = 0; i < l1; i++) {
    for (let j = 0; j < l2; j++) {
      if (sumA - a[i] + b[j] === sumB - b[j] + a[i]) {
        return `${a[i]} ${b[j]}`
      }
    }
  }
}

print(solve())
