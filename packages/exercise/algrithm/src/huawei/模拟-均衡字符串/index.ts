function getBalanceSubStringCount(str: string) {

    let sum = 0
    let res = 0
    for (let chr of str) {
      if (chr=== 'X') sum += 1
      else if (chr === 'Y') sum -= 1
      if (sum === 0) {
        res++
      }
    }
    return res
  }
  console.log(getBalanceSubStringCount('XXYYXY'))
  // https://blog.csdn.net/m0_73659489/article/details/134802701