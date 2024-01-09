const isNumber = (str:string)=>/^\d+$/.test(str)

function calculatePlus(s: string) {
  const stack = []
  // 记录算式中的数字
  let num = 0;
  // 记录num前的符号，初始化未+
  let sign = '+'
  const len = s.length

  for (let i = 0; i < len; i++) {
      const c = s[i] as any

      // 如果是数字，连续读取到num
      if (isNumber(c)) {
          num = 10 * num + (+c)
      }
      // 如果不是数组，就是遇到了下一个符号
      // 之前的数字和符号就要存储进栈中
      if (!isNumber(c) || i === len - 1) {
          switch (sign) {
              case '+':
                  stack.push(num); break;
              case '-':
                  stack.push(-num); break;
          }

          // 更新当前符号
          sign = c
          // 数字清零
          num = 0
      }
  }

  // 将栈中所有的结果求和就是答案
  let res = 0
  while (stack.length) {
      res += stack.pop()!
  }
  return res;
}

console.log(calculatePlus('5-3+10'))

// https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABBAhgGwiNKoFMAKaIAzgBTEBcixUATjGAOYCUiA3gFCLfII3VQUEANaIAvIgDaAXS48A9PMSAG6MCq+oHTvQPD6gWjlAIW6AHU0Dq2nO5pcURGBABbcYgAMAbhOJFK1VeuBZJV2Ayb0DvyoAw-4C4SoDTmoBoyoBU5gDULmYWxDCMSBIA5NGpLhB8FmYp1AB0eYxQABYcLsBwtIik8Ygwdk4NiAA8iHmODdHRrJw8A7xg-BB2xJIw0ogoxNNgAJ4VgwpKgEGagDnmgPRmRoGAe-GAt36A39GAa8qADEqeLgMwwLUAhDDEAHIoj6QQzH2Xy5Y2dgCM9kQACofrZorVou8vtwAL7Q1xrdaAWDltoARv0CgEYdTaAcQTToAwuUA0HKAADlAFRyAXhbkA0nI+IyAGJUAhjAIGRgA1tQAVCoBt+MAEBbaeHXWoPZ6vd6IAA+IpaYklHVwSAAtIg-p9voNiAB3GBQCClWqJZJK5XfVDEXCIdKpCjwg08GhCYQFAAOJFKpE8zC6ACNaLgUMJnFblkaTalZebLf6bSIHU7SLLXR6vT6-f64WHuG5AC9mgAbTQDK+l5yf7qEl8hBUwjEEZAKB2gDe00ueJrwuEDFMDNyAMB1uYABI0AkOa6QDLfutAEI2tKxgBVvQASFnFzIgvbMJPYXKrSjAzDrBJHimV9csZ4hohII3b7XB7aRmLcXI2eF6oCBaEgZ84U9lhnAzEU4Iw3uhMNg8IQSKQqQAKyygAzNEAKpB8QA