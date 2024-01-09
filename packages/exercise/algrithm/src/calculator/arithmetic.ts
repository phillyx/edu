/**
 * 四则运算
 * 带空格
 */

 const isNumber = (str:string)=>/^\d+$/.test(str)
 function calculate(s: string) {
     const stack: number[] = []
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
         if ((!isNumber(c) && c!== ' ' ) || i === len - 1) {
             switch (sign) {
                 case '+':
                     stack.push(num); break;
                 case '-':
                     stack.push(-num); break;
                 // 只要拿出前一个数字做对一个计算即可
                 case '*':
                     const pre = stack.pop() as number;
                     stack.push(pre * num);
                     break;
                 case '/':
                    if(num === 0){
                      throw new Error('mod can not be ZERO')
                    }
                     const pre2 = stack.pop() as number;
                     stack.push(pre2 / num)
                     break;
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
     // or 
     // stack.reduce((a,b)=>a+b,0)
     return res;
 }
 
 console.log(calculate(' 5 - 3 + 10 / 2 + 3 + 5 / 3'))
 // https://www.typescriptlang.org/play?#code/MYewdgzgLgBAlhAcgVwLYCMCmAnGBeGACmmwC4S4wBzASjwD4B6APQB0ATAagBJGA6KJmjEo2GgCgAZsjDAoccDGABDADbBkq5YOKkYFajRgBvcTHNLw0fVGXAA1nrBos2ANoBdfDE9mLjRhhABujAVX1AdO9AeH1AWjlAELdAB1NAdW0-c1VMWGdUbwAGAG5kmADgkIzAWSUYwDJvQHflQBh-wFwlQGnNQDRlQCpzTnzU2Ag4KjBvAHJOPvzQSFhU3oIIPnGqKAALcXzJEFxCDvhsnI2AHhhxrbhOTiNTCzPLUaVvCDc4L2UIGGUwAE98s8LAIM1AHPNAejNE6qAPfjALd+gG-owBryoAGJQy7wscEkRAQKAwOEIwBoJ1h5xgGW8AEYsjAAFQ4tAwThETjorEwAC+NK+30AsHL-QAjftVAIw6v0A4gmQwBhcoBoOUAAHKAKjkqgzAoBpOTKiUAMSpVDmAQMjABragAqFQDb8YAICyiNPhREIAEIkS5UeiYAAyc1KA14Ah9GD2owAHydG1tBHGMAAtDA8ZjsdiIAB3OBQYBzIhdHr+gOxlQQTAOwakGmxs7QOz2PgAB2QEDmhAyNC26GwmGU9jyaYD8cTfS9fRT1erGYcObzBa9RZLZYrVebH0CgCvlRWAf6NAF+KJVFiUAWgqAT+1RYBC6LCgGdlQD3yqmaw860TG5vqyNrNmy9dbG3syBs4QjA9SSjsP2B4Gz1nc-nCMfEyTu-u06Xy5Wv5nLWDqMHuT41lYsCfgATKemY5pe15PI8GSuI+EEWK2r4dh+ZZwYERZAQG-59r+9K-oUgAvZoADaaAMr6JTigOUYTEolGBIkgCgdoAb2m-riBBZDS9JnBRg4wIAYDraoAAkaAJDmMSAMt+3yAEI2spcoAKt6ABIW7RpDAZaPAJ+RBnMcCpJGL7TJg1DzDG2J6eSkzmReV40Aa+TCf4gQrDA+SFNhfBluwyDAJghCEMoAA06B0PQyicOg4VZBIZxllAyDYL0el5BRh4gKk0wgFQaJqBoWg6PaACs3owAAzOSvqEoEcEUrVFKVYE1V9BiQA