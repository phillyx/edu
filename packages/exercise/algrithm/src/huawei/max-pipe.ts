/**
 * 算法工程师小明面对着这样一个问题，需要将通信用的信道分配给尽量多的用户：


信道的条件及分配规则如下：

1)     所有信道都有属性：”阶”。阶为r的信道的容量为2^r比特；

2)     所有用户需要传输的数据量都一样：D比特；

3)     一个用户可以分配多个信道，但每个信道只能分配给一个用户；

4)     只有当分配给一个用户的所有信道的容量和>=D，用户才能传输数据；


给出一组信道资源，最多可以为多少用户传输数据？
输入描述:
第一行，一个数字R。R为最大阶数。

0<=R<20

 

第二行，R+1个数字，用空格隔开。

代表每种信道的数量Ni。按照阶的值从小到大排列。

0<=i<=R, 0<=Ni<1000.

 

第三行，一个数字D。

D为单个用户需要传输的数据量。

0<D<1000000
输入
5
10 5 0 1 3 2
30
输出
4
最大阶数为5.

信道阶数：0       1    2    3    4    5

信道容量：1       2    4    8    16  32  

信道个数：10     5    0    1    3    2

单个用户需要传输的数据量为30

 

可能存在很多分配方式，举例说明：

分配方式1：

1)     32*1 = 32

2)     32*1 = 32

3)     16*2 = 32

4)     16*1 + 8*1 + 2*3 = 30

剩下2*2 + 1*10=14不足以再分一个用户了。

 

分配方式2：

1)     16*1 + 8*1 + 2*3 = 30

2)     16*1 + 2*2 + 1*10 = 30

3)     32*1 = 32

4)     32*1 = 32

剩下16*1=16不足以再分一个用户了。

 

分配方式3：

1)     16*1 + 8*1 + 2*3 = 30

2)     16*1 + 2*2 + 1*10 = 30

3)     16*1 + 32*1 = 48

4)     32*1 = 32

恰好用完。
 */
function getMaxPipeNum(level: number, pipes: number[], target: number) {
  const levels = new Array(level+1).fill(0).map((_,i) => Math.pow(2, i))
  // console.log(levels)
  const arr = pipes
    .map((x, i) => new Array<number>(levels[i]).fill(x))
    .flat()
    .filter((x) => x > 0)
    .sort((a, b) => a - b)
  // console.log(arr)
  let left = 0
  let right = arr.length - 1
  let sum = 0
  let count = 0
  // 双指针
  while (left < right) {
    // 先遍历右侧指针所在的值大于等于target
    if (arr[right] >= target) {
      right--
      count++
    } else {
      sum += arr[right] // 右侧大值只取一次
      right--
      // 循环添加左侧小值
      while (sum < target && left < right) {
        sum += arr[left]
        left++
      }
      // 直到满足条件
      if (sum >= target && left < right) {
        sum = 0
        count++
      }
    }
  }
  return count
}

console.log(getMaxPipeNum(5,[10,5,0,1,3,2],30))

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUx070VZtCnuoaC9AQeoeB1BwZoI3TCf2oAXdBN+MHYLQADlAqOUDvUwDIzAYf8AB0wQMjAwHUCwEwQ-lAKV0BC3dwZQTAYEqBZRMCbfoF4dQPOJgLE1unQOxGgLH-wy-t0CG5oDe5QFPKwwCORgTCVAQZqBoOSXgAjAEpINm4AEjQJDm-QL8JDwHo6gcgMFgXAJAbGnfAIAZfQC45ACdePm5ATu0JYIAmAD1QwBXrQE8nQGx-5TjrW0hHeSZAAnlAZPjuQAdTQDtjCWdSYgUAETTM8ABmHNsKeUB75UBTuWEpcn5aQDF5QHnrQb5AK+VAX4DhEU65ZoAWdptJh0BlfTmF7kdVGMAYlQA+AF562nlAWSNpksrm8BFAL8VSQBG-fkARWMAEu1pAAHMpXuCUkAiDryW4VQD4-+BioBTRUA88aAB-iAFzgQA03qRADIRtAoZUA6toAJQCeOCP0A5Jq+MoBZQABgAPCc8TS4lTlJBlCjADFymLxAGpzORcRdAF5egB4LQApaYAAfUp4EAx3KACwjRoBZz1UZQkADkAJYBQCQxoBzR183EAPAqAObl0IAGJRJgCTjQDoSlLaSd1XS8QAaSB2jU08xUr0AOhZbMAkHKY7E4+pS+rBQCqyuQCowSuUqraafUPV7U8yYeAAKwWKmQTOuyDmSAtSBxVrpx7gJbgUnk4KZ33gfjkhS53I2Iu2OK5Eu2Ja5bNNvgxBSd9vdvu5AAcuXMADYbC0Jyo+PzR23bPnbBvCz3cmXwFGY3HKrEWsyoMoutNABragAp1QAR+lJhIBO00A8Pq0QB8coBo+UAL9GYMxXzfcwzCsdslxAIsTmLA9snAuJIMgaCl2UNp23nEBu2Qg8VnQudEO5SApwI0sQBLZCL0ASyVjAQ7tCPMSCqROcwlkAWDlAGbYnpAFjFAQFkAMLkpVZcAgLiUDVkLfCi0I4ipNI8jiwvODZ0kyBCNo1TC0YpCFNQ8SIKgmDlFwnsEIMlDwGojDzGYucOO43jozkAS-WEoR3xaMS8JImSNIQ+TzyycSrN8zCNIYz1tIC1ogpUwj9O0pYpyMvTTMig9AAcDQBfTU4QAY7UpaBgHAAAzABXAA7ABjAAXdUAHsysgABzABTKqAFkAEMAA8AAV1QAB2a1USoAWwACgAG2agA3ZqJsRSAytGgAjZrQhdfqBuagBnBalpG1bQgAbQAXRdKqOtCFqqr2la1usABvKBIAq+rtqqyAptmibtu0srmoAd0gABBUJQg6gBPSaZrm3lLG9Ir1QmiaxqpeGRo6-qxrGgB9J11WsE4jkgTqqoAC29fraoBsa4hdAnLGe4BgBet7aqm70Jtqxroe+7bGZsV6yveyBLtCbTNsG7bnpsb0Maxsauvpwnif+oHQfBiGaX2w6jl5ubtqO9UTvhxHkcVywBdsBGJo6qqxqt2Wzaqtbsa6lXIC6yBibRmXIG9bbatCe2xo6l1lo9jrIAAWkgCOmZZoXA45rmebFq2po+qaio+6DmRsTPIFCdVGrJ3PRbBznmrKxryZjwtnsL7bRu0-PPta1nyvLtvmcgQAZ5UAcGNAAiU56AbJpHmsgaGc8gGki5LsvHr93vAAlFQBZBMAMOVAGflQBy+WHuw70NElADi5QBJb2Pi6rtav31SKqexaO4vS6qk7vegy-rqX9t5+f6Po79wWtUu7cm5H7AAvpAA2k8nrf2biNVS0EH5PzLq-Xuu8SQGkmIANeVSCAEJrABP8y5-wIb3QAVfqAHrnQA37aAAKlQAZ7o73QAaAhY8J5TzgbPSAH8O4ADJuHtxnnPZBVUv7f0gOw7kiCwZHWzi-AhBdmo5xAQQsBJCWaABe3U0gBDu3YpoAht82Et1OJwy611IC8P4R9QRC9hGQBgaI9hec5GdzKlVJR38VG5A8ZALxoRWolVCA1V6XdwAqPAEndmzVObczGtdTqvUtrDXGpmJ0R1PROmSVSJ05gnQtCdHEM655LZAA