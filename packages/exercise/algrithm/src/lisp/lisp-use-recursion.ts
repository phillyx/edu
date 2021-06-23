enum E_CALCTYPES {
  ADD = 'add',
  SUB = 'sub',
  MUL = 'mul',
  DIV = 'div',
}

export function evaluate(expression: string) {
  const len = expression.length
  const runtime = (k: number): {value: number; index: number} => {
    let vals = []
    let str = ''
    let op = ''
    let value = NaN
    while (k < len) {
      const chr = expression.charAt(k)
      switch (chr) {
        case '(':
          const ret = runtime(k + 1)
          // 保存子式的结果
          vals.push(ret.value)
          // 更新右边界
          k = ret.index + 1
          break
        case ' ':
          if (!str) {
            ++k
            break
          }
          if (isNaN(+str)) {
            op = str
          } else {
            vals.push(str)
          }
          str = ''
          ++k
          break
        case ')':
          str && vals.push(str)
          switch (op) {
            case E_CALCTYPES.ADD:
              value = add(...vals)
              break
            case E_CALCTYPES.SUB:
              value = sub(...vals)
              break
            case E_CALCTYPES.MUL:
              value = mul(...vals)
              break
            case E_CALCTYPES.DIV:
              value = div(...vals)
              break
            default:
              if (vals.length > 0) {
                value = +vals[0]
              }
              break
          }
          return {value, index: k}
        default:
          str += expression[k]
          k++
          break
      }
    }
    if (vals.length) {
      value = +vals[0]
    }
    if (!value) throw new Error('something wrong.')

    return {value, index: k}
  }
  try {
    return runtime(0).value
  } catch (error) {
    return 'error'
  }
}

const add = (...args: any[]) => args.reduce((a, b) => a + parseInt(b), 0)
const sub = (...args: any[]) => {
  const tmp = args.shift()
  return args.reduce((a, b) => a - parseInt(b), tmp)
}
const mul = (...args: any[]) => args.reduce((a, b) => a * parseInt(b), 1)
const div = (...args: any[]) => {
  let tmp = +args[0]
  for (let i = 1; i < args.length; i++) {
    if (+args[i] === 0) throw new Error('mod can not be ZERO')
    tmp /= +args[i]
  }
  return tmp
}
