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

解题思路：

每次新值v入栈时，要判断从后向前个x值的和是否等于当前值v
注意，如果相等，此处并不是简单的入栈
还要考虑刚生成的2v在栈内是否存在前x个值的和是否等于2v
如此重复
直到不满足条件，才入栈最终的值
然后i++，新值入栈，重复以上过程
我机试的时候就是简单的入栈了，没有内部的重复过程，导致通过率比较低
 */
function getNums(arr: number[]) {
  if (arr.length < 2) return arr
  const t = arr.slice(0, 1)
  for (let i = 1; i < arr.length; i++) {
    let v = arr[i]
    while (true) {
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
        v *= 2
        // t.push(v * 2)

        // while (t.length > 1 && t[t.length - 1] === t[t.length - 2]) {
        //   const vv = t.pop()
        //   t.pop()
        //   t.push(vv! * 2)
        // }
      } else {
        t.push(v)
        break
      }
    }
  }
  return t.reverse()
}

// console.log(getNums('5 10 20 50 85 1'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('1 1 3 5 2 3 5'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('6 1 2 3'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('12 6 1 2 3'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('2 22 12 6 1 2 3'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('1 2 3 4 10 10 10'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('2 8 2 3 5'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('1 3 2'.split(' ').map(x => +x)).join(' '))
// console.log(getNums('1 3 2 1 5 6'.split(' ').map(x => +x)).join(' '))

// https://www.typescriptlang.org/play?ssl=45&ssc=70&pln=44&pc=1#code/GYVwdgxgLglg9mABAcwKZQHIgLYGcAUAhgE7EBciYOARqsQNoC6AlIgN4BQiiMwiRpAHQAbVGGRQAFogA8iAEyti6EMSQliXRBAS4oifQF5EGwbmEwIqfAAYANIgCMzLcDjF+o-TETHHAbh5ZEyFRcSlAmABqKNZObm4vRAA3XxCGGEYtbgB3SRhRfihiEFQ47ISk3Bw0mwrE9EQAKzSoETEJaQBaJ3rEJOo4OGE04EJhXFQ+tw98JsCWgD5jGwWurvKErcRq7EQo4yh6JqzthIB6c+1dYdQROGR8XeZ-Pu5efl3fQ2NkzbOEoNhq0SlMAYDlIQANZvRAAXz6CL6H3wQOE-zOOjAen6rXa4W6zVhSR04CMiDq4LyBVQ-FJYH0cnR7Fh3DaAAc4Oz8C5wdx6VAYrCkeDUgAqQzyRAcRGIVATWnxAEckC4ST4P6w6iQmFnBFbfXwrTKKCqJBtZTJOiTHkcBFY3C3e6PNCYHAEADkAFYnDYFH6vX6ABw+xweszsixQfAexAe5iCbCEbkAD18i32KeYCaacBgYBjcezHAdTuED3wrqweBjjiciAAzIgfVKm17w7hIzBo7H44nk-g04YM1Eszm8wXe8XS6JnZX0NXPQA2eutjtdntF-up9OZ7OCXP5wvxlwzu7ll0L921qUrutriNR48JpM74d78dHqenm6zi-zt0aw9KV5ClRxb1XRt1yfKdt0HXdR33Q9JyLH9sTLCsq2vD170bRAABZfSIxwbGg7tnzgocRzHA8J2fNDHT-TCryAqUgwUPD20fcjYNfeD30Qz8UJPEtf3PZjAM9Osm3kMjNz7PiqI-Wiv1Q0T0KYy9JNrPCwObRAlzkijFIQmjkPooA