/**
 * -输入：（mul 3 -7） 输出：-21
 * -输入：（add 1 2 3） 输出：6
 * -输入：（sub (mul 2 4) (div 9 3)） 输出：5
 * -输入：（div 1 0） 输出：error
 */

 export function evaluate(strs: string) {
  const strStack = []
  const optionStack = []
  let i = 0
  let boolError = false
  const prefixOperation = ['a', 's', 'm', 'd']

  for (; i < strs.length; ) {
    const char = strs.charAt(i)

    if (char === ' ') {
      i++
      continue
    }
    if (prefixOperation.includes(char)) {
      const tmpIndex = StringFindCharIndexByStartNo(strs, '(', i)
      const operation = strs.substr(i, tmpIndex - i)
      optionStack.push(operation)
      strStack.push('(')
      i = tmpIndex + 1
    } else if (char === '(' && prefixOperation.includes(strs.charAt(i + 1))) {
      strStack.push(char)
      //(operation
      const spaceIndex = StringFindCharIndexByStartNo(strs, ' ', i)
      const operation = strs.substr(i + 1, spaceIndex - i - 1)
      // console.log(operation);
      optionStack.push(operation)
      i = spaceIndex
    } else if (char === ')') {
      const curOperation = optionStack.pop()
      const tmpArr = []
      let tmpstr = strStack.pop()
      while (tmpstr !== '(') {
        tmpArr.push(tmpstr)
        tmpstr = strStack.pop()
      }

      try {
        const ret = Arithmetic(curOperation, tmpArr.reverse())
        strStack.push(ret)
      } catch (err) {
        boolError = true
      }
      i++
    } else {
      const index1 = StringFindCharIndexByStartNo(strs, ' ', i)
      const index2 = StringFindCharIndexByStartNo(strs, ')', i)
      if (index1 < index2 && index1 !== -1) {
        strStack.push(+strs.substr(i, index1 - i))
        i = index1
      } else if (index2 !== -1) {
        strStack.push(+strs.substr(i, index2 - i))
        i = index2
      } else {
        i++
      }
    }
  }

  if (boolError) return 'error'
  return strStack.pop()
}

function StringFindCharIndexByStartNo(
  str: string,
  searchChar: string,
  index: number,
) {
  for (let i = index + 1; i < str.length; i++) {
    if (str[i] == searchChar) {
      return i
    }
  }
  return -1
}

function Arithmetic(operationName: any, nums: any[]) {
  if (operationName === 'add') {
    return nums.reduce((a, b) => a + parseInt(b), 0)
  } else if (operationName === 'sub') {
    const tmp = nums.shift()
    return nums.reduce((a, b) => a - parseInt(b), tmp)
  } else if (operationName === 'mul') {
    return nums.reduce((a, b) => a * parseInt(b), 1)
  } else if (operationName === 'div') {
    let tmp = +nums[0]
    for (let i = 1; i < nums.length; i++) {
      if (+nums[i] === 0) throw false
      tmp /= +nums[i]
    }
    return tmp
  }
}