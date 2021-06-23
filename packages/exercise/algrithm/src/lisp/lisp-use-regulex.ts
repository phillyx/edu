export function evaluate(expression: string) {
  let reg = /\s?(\()\s?(\w{3})\s/g
  let reg1 = /(\d+\s)(\d+)/g
  let reg2 = /(\)\s?)(\d+)/g
  let reg3 = /(\)\s?)(\w{3})/g
  let reg4 = /(\d+)\s?(\w{3})/g
  let str = expression.replace(reg, '$2$1')
  console.log(str)
  str = str.replace(reg1, '$1,$2').replace(reg2, '$1,$2').replace(reg3, '$1,$2').replace(reg4, '$1,$2').replace(/(\d+\s)/g,'$1,').replace(/(,+)/g,',')
  console.log(str)
  const func = new Function(`
  const add = (...args) => args.reduce((a, b) => a + parseInt(b), 0)
  const sub = (...args) => {
    const tmp = args.shift()
    return args.reduce((a, b) => a - parseInt(b), tmp)
  }
  const mul = (...args) => args.reduce((a, b) => a * parseInt(b), 1)
  const div = (...args) => {
    let tmp = +args[0]
      for (let i = 1; i < args.length; i++) {
        if (+args[i] === 0) throw new Error('mod can not be ZERO')
        tmp /= +args[i]
      }
      return tmp
  }
  debugger;
  return ${str}`)
  try {
    return  func()
  } catch (error) {
    return 'error'
  }
 

}
