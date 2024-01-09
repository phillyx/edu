const isNumber = (str: string) => /^\d+$/.test(str)
const gcd = (m: number, n: number) => {
    if (m < n) {
        [m, n] = [n, m]
    }
    while (n !== 0) {
        [m, n] = [n, m % n]
    }
    return m;
}
/**
 * 包含括号 bracket 
 * 使用递归
 * 显示为分数
 * 
 */

function calculate(s: string) {

    const helper = (list: string[]) => {
        let stack: number[][] = []
        let sign = '+'
        let num = 0
        let dividend = 1

        let retDividend = 1
        while (list.length > 0) {
            const c = list.shift() as any
            if (isNumber(c)) {
                num = 10 * num + (+c)
            }
            // 遇到左括号开始递归计算num
            if (c === '(') {
                [num, retDividend] = helper(list)
                dividend *= retDividend
                // console.log('digui', num, retDividend)
            }
            if ((!isNumber(c) && c !== ' ') || list.length === 0) {
                switch (sign) {
                    case '+':
                        stack.push([num, retDividend]);
                        // console.log('+', stack.join())

                        break;
                    case '-':
                        stack.push([-num, retDividend]);
                        // console.log('-', stack.join())

                        break;

                    // 只要拿出前一个数字做对一个计算即可
                    case '*':
                        stack[stack.length - 1][0] *= num;
                        stack[stack.length - 1][1] = retDividend;
                        // console.log('*', stack.join())

                        break;
                    case '/':
                        dividend *= num
                        stack[stack.length - 1][1] = retDividend * num;
                        // console.log('/', stack.join())
                        // 用过就重置
                        retDividend = 1
                        if (dividend === 0) {
                            throw new Error('mod can not be ZERO')
                        }
                        break;
                }

                // 更新当前符号
                sign = c
                // 数字清零
                num = 0
            }

            if (c === ')') break;
        }
        let sum = 0;
        // x 要和非当前的索引的被除数相乘
        // 换个思路就是x*被除数的乘积，再除以自身的被除数
        stack.forEach(([x, d], i) => {
            sum += x * dividend / d
        })
        // console.log('here', sum, dividend, stack)
        return [sum, dividend]
    }

    const [m, dividend] = helper(s.split(''))
    // console.log(s, eval(s))
    // console.log(m, dividend, m / dividend)
    if (m % dividend === 0) {
        return `${m / dividend}`;
    }
    const _gcd = gcd(m, dividend)
    return `${m / _gcd}/${dividend / _gcd}`
}
console.log(calculate(' 5 - 3 + (10 + 4/2)/2'))
console.log(calculate('5 - 3 + 4 / 3 + 5 / 2'))
console.log(calculate('5 - 3 + (10 + 4 / 3) / 2 + 5 / 2 + 3'))

// https://www.typescriptlang.org/play?#code/MYewdgzgLgBAlhAcgVwLYCMCmAnGBeGACmmwC4YS4wBzASnwD4YB6APQB0ATAagBJmAdFEzRiUbLQBQoSLGrBO+IqnJg0WbABoYYVepz08TAN6SY5+ADNlMADw76pi85gBtVNrABdJa7DbULzMLAF9g8wB3AAs4ABtMIjAYAEI8AgAGR3CXd08fAj8AmABSHSDnMOdsTChkbCTUAG5JMOYAKjazNphAUGVAahVAG6NAd+UYdGwAQ2AAaxqYLphAf3lACldAJATAJX15wD4zQC5PQC45QDAlQAdTea7mSUlLZDBgKDhwGGBx2OBkWPHhYnJKGizsmWgYFFMLEAA44JSEWIIKBfcRUaiuLyGEzZZzxWDQSZTPQYHCIxG+couczoihwahJAgAcm4VNRFlJalQSnS9JJs04cAAbnBOJgwIoCABGc7E9mwapQAAi3N5-MFMBFYpg0TiCUh0IE8RoUCiMCYmRgTmVFn+sGASih0AEEBilighHo4wgMHGYAAnmyXHBrIQEChcdhCMBaFkTWKmUohekYN1I9wiNwQ16KimLMxmDBAOIJgAYlQBnusNAAD6gGnNdaAQujAOneTLT5h9RAtaWphCpYfDOSZ2klMp5fIF+UBwLBQatUCkbZcnJ78tjBC7st7nBrLgzD3AEBA8S1IGozc51GQcCpnjQnZq3blArHbcqbbrhEIyX9+iDIZgADI3w8UmkYFTf-QAB8AJgEctX5ahdXwH9DWNcdzAgCI4CgYA9WIckwFbOCXEeCAEhpKlSCXcdMWmAQQWQW1CD8E8YDnKc+1oZosPDFd-g3TAtx3fDtBIqYBAAKxAKhHSkIi2zGTBximJjmOcHC8IAWgIsTw14siKKiKiFI7Wiz3neUkRk2TiVYtd2M45slJ4qAsQEoSwBE0VjOJCSpOaFTl0zQAr5UAQMjAH+jQAvxUAWSVAAA5QAqOUOQB1bUALQVAE-tcLK0AZ2VAHvlDy5OdPC2mU5ziV41w1O1CC9QUxUvFcdIfDaAgmSMnL4Js6Z8oavjCsgkqhTKjqlDoi9OFqurTMgczYm3Zssus2zBOE0MnLq8xXOktLTQy39mGyubzEnXqZx0NAlty5qmts1ritK1wutnPT6MUOM0H6nLBvXTcRq4taJtIqaHJmjbzBXJZAHH4wBGHUAWcTADt-faXB6hcowh5w7y26HGxgGDYbFXVsBACIdEwLGAFFsAxoMqVQEBFEeJIwBAWAsBgAAtXGACUAHkW1R8wbw2hb7vDMIPJXQAXs0ABtNAGV9ILADJvIYPIgdClGAPnMyiwBQO0AN7SPMjDIl158c7wbH8WxbUZqjcr0OZcUkIDQFluZYTMAA8YB8wAYlUAPXTRcAELdACJfQBUfTdwBqiMAEzTDkAD7dAA05L0V0AI2MwsAXANAHvYwHAHozW22gDw43ZDwB7z0AGH-AFjFf3AFO5QArwMAari-cDr01MsEBsFxyZNKo23tE4LxtDgZEjSXC3mW4Ah7e6BHp0zRdlRCK8TMzNjntGqkgWqI8KBogeBXeqYx8hmo6iSfLF-0vtsi10011gXIYCX5ulCBUEcGIG0QShB0qRbNfHuG0aIG0TAuSeYhvvTCezKnjuDwp9d6cCKEPUBa87zMlKGfKCGRMLr1qPUGAAADXgxhmQQOuiEVBtVTZmhgAAfXkAqUhhBgFnzXpKTeaCMFYOIaQkIzAMFwMzCQhQuCWjSAARxF6wYngvDeB8P8ABWGAJUADMMAEyEGjDImAAAWZgAAmWgqin48KGoAgRzxXjvEwM2cRUiFGKJYDAaRCZxGZhUZoyefDRqPD0cIwxVJjEWIUXImMCYzGZkkfQGxCjrEwBUQoyRT8gA