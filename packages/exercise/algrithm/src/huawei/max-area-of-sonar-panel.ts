/**
 * https://blog.csdn.net/G1useppE/article/details/124780308
 * 题目描述：
给航天器一侧加装长方形和正方形的太阳能板(图中的斜线区域);
需要先安装两个支柱(图中的黑色竖条);
再在支柱的中间部分固定太阳能板;
但航天器不同位置的支柱长度不同;
太阳能板的安装面积受限于最短一侧的那支支柱的长度;

现提供一组整型数组的支柱高度数据;
假设每个支柱间的距离相等为一个单位长度;
计算如何选择两根支柱可以使太阳能板的面积最大;

输入描述
10,9,8,7,6,5,4,3,2,1
注释，支柱至少有两根，最多10000根，能支持的高度范围1~10^9的整数

柱子的高度是无序的
例子中的递减是巧合

输出描述
可以支持的最大太阳板面积:(10m高支柱和5m高支柱之间)
25
 */

function maxSqr(arr: number[]) {
  let max = 0
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      // 面积取决于最小的那块面板
      const height = Math.min(arr[i], arr[j])
      const area = height * (j - i)
      max = Math.max(max, area)
    }
  }

  return max
}

function maxSqr2(arr: number[]) {
  let i = 0,
    j = arr.length - 1,
    res = 0
  while (i < j) {
    res =
      arr[i] < arr[j]
        ? Math.max(res, (j - i) * arr[i++])
        : Math.max(res, (j - i) * arr[j--])
  }
  return res
}
