/**
 * https://www.typescriptlang.org/play/?target=99#code/GYVwdgxgLglg9mABAcwKZQHIEEAqBhOcKACmQCcYATALkTBAFsAjVMgbQF1OAaRGAG34BnWvWatOASkQBvAFCJFfYIlIVKAOn6owyKAAtEAXhOIADNLLoQZJGYVKICIVERk4AdyHGU6rTr19B0UnMBdEJ2Efcio2Mw5-XQNgxG1XK28jcxS0xAYAQwAPAEkwYFRoeDACIh97JQjnVxghUqwrfJ9iGFFGFjJeACte8TJpIwA+WRSGqygbJBhECayzRAAydb5EAB43T29NxEHl1Y2tk733LxSAXxTQ8MpgTNUeuj7WIZH+8an5BoNGAqYgAQhabQ63SGkks1ls2UBSmBqhilDYMC4gw4iFBWQAjHD5gj7DMlGiMVicVkAEyIAD09MAT7qAfujAHepZMUuSctQJnIZACohfzEALFJRCj42ABafG8OXmXjxADcDPpiEAnaaARBVAA6mgBG-QAw-4ALCMAXJ6AKDlANBygDPdQDPyoBttUAVHLawAhboAqK0ACuqAcAtABvKgDRlEVixCUACeUrMSvlvFlHFVjM1usNpsttsdLsArX5ev0B+n8nlgVwAaiyzyE3UQ0sQCsGklzhHziCLQZeZYLlZhtdqjZL0OO5crNaRITrheLzZgQwb-bk-LmC0aRDu04awDgZFUuSWq1VSyuB23BYL0gBg5Xa+IuROW97e0iQlVgwPR5FSjjgCvlQCyCYAw5SZgDsPQAl0YA+IaAMvmgBdcoAAkaAKXGgBnkc6IGACX+z6KCixDdIIQgaDAkD8CAlCoKWMDSAAPoRfBoRhWE4XhxDVtIRwUpibDYsYBLnNseLHE+g5cY0YSuEIjA+N244cYhgIFCUZQVLACA1PWWQALL5AYGjicQ4mlOUlQycOvD8QwA7cUiGQHqJ9xcWZSgWUOYRwNoWhwMgalFBpUlVLJUAGdZQi2ag9mOWinluPCSAZCkcazgi+RkGQGjAPwSnEJIsUCFArDEJKkyIBlpg0kl2hJEE9xyI8Pl+aQ6DYPgw7EGwKRsAqCrhm25gcNwdUNRGiotW1DRxJ1jXyq17WdU1jVDb1TWjf1HByK1iD1bwNIcLCQA * https://blog.csdn.net/m0_73659489/article/details/135071783
 * https://leetcode.cn/problems/number-of-islands/
 *
 * @param grid
 * @param ills
 * @returns
 */
function getNATCount(grid: number[][], ills: number[]) {
  if (grid.length === 0) return 0
  const rows = grid.length
  const cols = grid[0].length
  let res = 0
  let maxInfectionCount = 0
  const isInArea = (i: number, j: number) => {
    return i >= 0 && i < rows && j >= 0 && j < rows
  }
  const dfs = (i: number, j: number) => {
    if (!isInArea(i, j)) return 0
    if (grid[i][j] != 1) return 0

    grid[i][j] = 2 //已访问
    let count = 1
    /***
     *  dx = [-1, 1, 0, 0]; // 方向数组，表示上下左右四个方向的横坐标变化
     *  dy = [0, 0, 1, -1]; // 方向数组，表示上下左右四个方向的纵坐标变化
     */
    count += dfs(i - 1, j)
    count += dfs(i + 1, j)
    count += dfs(i, j - 1)
    count += dfs(i, j + 1)

    return count
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 只遍历已确认感染人所接触的人群
      if ((ills.includes(i) || ills.includes(j)) && grid[i][j] == 1 && i != j) {
        const sum = dfs(i, j)
        maxInfectionCount = Math.max(maxInfectionCount, sum)
        res++
      }
    }
  }
  console.log(maxInfectionCount)
  console.log(grid)
  return res
  // return arr.flat().filter(x => x === 2).length
}

console.log(
  getNATCount(
    [
      [1, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1],
    ],
    [1, 2],
  ),
)
