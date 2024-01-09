const isNumber = (str:string)=>/^\d+$/.test(str)

/**
 * 包含括号 bracket 
 * 使用递归
 * https://labuladong.gitee.io/algo/di-san-zha-24031/jing-dian--a94a0/ru-he-shi--24fe4/
 */

 function calculate(s: string) {
  const helper = (list: string[]) => {
      const stack: number[] = []
      let sign = '+'
      let num = 0
      while (list.length > 0) {
          const c = list.shift() as any
          if (isNumber(c)) {
              num = 10 * num + (+c)
          }
          // 遇到左括号开始递归计算num
          if (c === '(') {
              num = helper(list)
          }

          if ((!isNumber(c) && c !== ' ') || list.length === 0) {
              switch (sign) {
                  case '+':
                      stack.push(num); break;
                  case '-':
                      stack.push(-num); break;
                  // 只要拿出前一个数字做对一个计算即可
                  case '*':
                      stack[stack.length - 1] = stack[stack.length - 1] * num;
                      break;
                  case '/':
                      if(num === 0){
                        throw new Error('mod can not be ZERO')
                      }
                      stack[stack.length - 1] = stack[stack.length - 1] / num;
                      break;
              }

              // 更新当前符号
              sign = c
              // 数字清零
              num = 0
          }

          if(c=== ')') break;
      }

      return stack.reduce((a, b) => a + b, 0)
  }

  return helper(s.split(''))
}
console.log(calculate(' 5 - 3 + (10 + 4)/2 + 5 / 2'))

// https://www.typescriptlang.org/play?ssl=53&ssc=54&pln=9&pc=1#code/MYewdgzgLgBAlhAcgVwLYCMCmAnGBeGACmmwC4YS4wBzASnwD4YB6APQB0ATAagBJmAdFEzRiUbLQBQk5gCpZkmLJiBQZUDUKoBujQO-KMdNgCGwANaZYi5YH95QBSugJATASvrmY55tIBmyMMChxwMYPoAbYGQA-WFickoaegBvRRgE0EhYAAtMAIAHHHwiAIQoSPEqagBtAF16PCY4hNrapOgKKEMjcjA0LGxynPL4uoSA0wo4ajAcgHJucb7+wdh21ByABhm6gHcUuEHc-IFBmigUmCYl2NX+xPBG4By86AEITdcoQnp9CBh9MABPc4u4VxEBAoDA4QjAWhnC7Q2oLHIARiWShgcO4RG4EL+-QAvli6sxmDBAOIJgAYlQBnutpAAD6gGnNeyAQujAOneCzxtQBRBueE5MHGhHGUJh0LhBDSmTBdygUgFtVxLISbMIhAAhMCOmCITAAGQavwwRVc8bc+gAHyNMHFe0wByOnIIpxgNSl-QgazgUGAR2IIzA-Md0P8EEw3KmpFlvqaLQEGWQj0IC1oAG5dNhMPojPHQzD-YHxgBacYhsOO6ARqMxnNxxN6FNpjPQgkwQBXyoBAyMA-0aAL8VALJKgAA5QBUcoAHU0A6tqALQVAJ-avcZgGdlQD3yrWLlnubJ87OBcXjCVV0YLVaYDmYPCyjkN+vmsYt9RDju9wflAt04WpVXU3f73V5+NmEuXzCjxuzxfd-uh4nkYx4Rvs55HABB6Erey4wo+NYvjKL71oAL2aAA2mgDK+h2gBk3loy4QF6OTAMu9aDoAoHaAG9py5CjAKy+shjoAuCNqGnySbVs+FyMRcyZQMg2BjL+yacMgwCYAq+gADS6JUTD6DAaLoDJpwzDxMB8QJYwilk2DEA8GR5C84x8lIuINCAgx7CA1DgoEwShOEBoAKyXgAzIpRCIp5AAstDMAATJ5rmEgFplAA




// 使用分数表示
// 参见 ../huawei/符号运算/index.ts