/**
 * https://blog.csdn.net/m0_73659489/article/details/134993013
 */
const E_MAX_LENGTH = 100001
function getMaxNumberTasks(N: number, lines: string[]) {
  let ans = 0

  const priorityQueue = [] as number[]

  const tasks = Array.from({length: E_MAX_LENGTH}, () => [] as number[])

  lines.forEach((line) => {
    const [x, y] = line.trim().split(' ').map(Number)
    // 开始时间x的任务 添加其终止时间
    tasks[x].push(y)
  })

  for (let i = 0; i < E_MAX_LENGTH; i++) {
    while (priorityQueue.length > 0 && priorityQueue[0] < i) {
      // 如果结束时间小于当前开始时间，从队列中移除已经结束的任务
      priorityQueue.shift()
    }

    if (tasks[i].length > 0) {
      priorityQueue.push(...tasks[i]) // 将当前时刻开始的任务加入队列
      priorityQueue.sort((a, b) => a - b)
    }

    if (priorityQueue.length > 0) {
      ans++
      priorityQueue.shift() // 从队列中取出结束时间最早的任务，安排在这一天
    }
  }
  return ans
}

console.log(getMaxNumberTasks(3, ['1 1', '1 2', '1 3']))
console.log(getMaxNumberTasks(4, ['1 3', '2 5', '3 7', '6 8']))
console.log(getMaxNumberTasks(5, ['1 4', '2 3', '5 8', '6 9', '7 10']))

// https://www.typescriptlang.org/play?target=99#code/MYewdgzgLgBAogfQLIEEAaCAycByBxAFQAkYBeGARgAYaqKBYAKADMBXMYKAS3BgHMAplCQBDAB45WAWwBGAgE4EREANYQAFDgBcMMNLnyANDAA2XMAIg7o883wDaAXQCUMAN5MYX00JgjIZDBUTJ7eoJCwAA62ILZQAJ4AiqwCKYFOfhC6+gpOIYzeMOHQMFDKaoEo8vIi8QB0zPIgUupuPmB8UAAWOoioGNj4xDAAvsbqrqQAfDAZytmyuS75hWYWEA2xcCLAXeprAmQzHgWFYeAl9mLG8Y6BB3VQti3OdRCRZlDqAOQw369SESRTQ5eTOUJnGAAeihMEAAPqAac1AG+mgBfUsSAELdAN9ygEKlGCAb9tAAVKgDdFQATfoAja1RELOZVUECujjqkVYED28XBpy8I3ZVOYsRg+18XECVAA3DAhQAeeDIdBYXCEIhirgAamVrhOkK8AHculwTId1NEeHEkikUnV9R1ujAZlQYAAye0wI2xLgJZKpAT2Kh3KVcdVUzXQ2GAIM1ADnmgGW-QD65qjAPA6gDi5QDK+oBZJURqMAMP+AOblAPhpgHQlQC0coBvz0AJmmAJ91APN+0ax2MDmpdJo95pZXGYX3ZQZGK01Lf5NLU9i4DMtnS6NqCAY5QedMQbZoEjOZezqy77dMHrhhMEAYDoppGAbiVEdWCYBTRTztch9bdps9b1ibfPoy7kJ7hpnV8b8+H1ttE6n3n8ECqg+hSXu6c5vLqrYTMGMA5gWgBryoAX4rRqigAA5oAl6bVumgCR2oAScaABTqgCb8YAAHKAJSaD6dowVKUYU8hCKw8hgH4kAikwlFMMUID6haIB8OogjCOIkiLIo5QaAAzIY9jfBQlDfIYMkwAATPJinid8Ljspx3EmLx-FCKIEigkotLqAALFJamqUpMAAKyqeJMAAOyqQAbDAAAcGnOFpFxcZ+ekCYZwkGCZajqLZlmyWZ1kwOpCm2Z5bkwAAnKpTmUFQ3nOEAA
