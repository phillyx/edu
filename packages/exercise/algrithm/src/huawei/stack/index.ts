/**
 * 标题：计算堆栈中的剩余数字 
 * 向一个空栈中依次存入正整数， 假设入栈元素n(1<=n<=2^31-1)按顺序依次为nx...n4、n3、n2、n1, 每当元素入栈时，如果n1=n2+...+ny(y的范围[2,x]，1<=x<=1000)，则n1~ny全部元素出栈，重新入栈新元素m(m=2*n1)。
如：依次向栈存入6、1、2、3, 当存入6、1、2时，栈底至栈顶依次为[6、1、2]；当存入3时，3=2+1，3、2、1全部出栈，重新入栈元素6(6=2*3)，此时栈中有元素6；因为6=6，所以两个6全部出栈，存入12，最终栈中只剩一个元素12。
输入
5 10 20 50 85 1
输出
1 170  ,
说明
5+10+20+50=85， 输入85时，5、10、20、50、85全部出栈，入栈170，最终依次出栈的数字为1和170。

 */
function getNums(arr: number[]) {
  if (arr.length < 2) return arr
  const t = arr.slice(0, 1)
  for (let i = 1; i < arr.length; i++) {
    const v = arr[i]
    let sum = 0
    let j = t.length - 1
    let bool = false
    for (j; j >= 0; j--) {
      sum += t[j]
      // console.log(sum);
      if (sum === v) {
        bool = true
        break
      }
    }

    if (bool) {
      const l = t.length - j
      let count = 0
      while (count < l) {
        t.pop()
        count++
      }
      t.push(v * 2)

      while (t.length > 1 && t[t.length - 1] === t[t.length - 2]) {
        const vv = t.pop()
        t.pop()
        t.push(vv! * 2)
      }
    } else {
      t.push(v)
    }
  }
  return t.reverse()
}
