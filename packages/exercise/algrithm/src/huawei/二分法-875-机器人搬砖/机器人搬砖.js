const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let lineCount = 0
/**
 * @type {number[]}
 */
let weights = []
const hours = 8

rl.on('line', (line) => {
  if (lineCount === 0) {
    weights = line.split(' ').map(Number)
    rl.close()
  }
  lineCount++
})

rl.on('close', () => {
  console.log(solution())
})

const solution = () => {
  const n = weights.length
  if (n > hours) return -1

  let l = 1, r = Math.max(...weights) + 1

  while (l < r) {
    const mid = l + ((r - l) >> 1)
    if (check(mid)) {
      r = mid
    } else {
      l = mid + 1
    }
  }

  return l
}
/**
 * 
 * @param {number} limit 
 */
const check = limit => {
  let time = 0
  weights.forEach(x => {
    time += Math.ceil(x / limit)
    if (time > hours) {
      return false
    }
  })

  return time <= hours
}