
/**
 * https://blog.csdn.net/m0_73659489/article/details/135160719
 * @param k 
 * @param rows 
 */
function getSpiralMatrix(k: number, rows: number) {
    const E_STAR ='*'
  
    const cols = Math.ceil(k / rows)
    const matrix = Array.from({ length: rows }, () => new Array<number | string>(cols).fill(E_STAR));
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]
    let x = 0, y = 0 // 从左上角开始
  
    let step = 1
    let direction = 0
    while (step <= k) {
      matrix[x][y] = step
      step++
  
      if (x + dx[direction] < 0
        || x + dx[direction] >= rows
        || y + dy[direction] < 0
        || y + dy[direction] >= cols
        || matrix[x + dx[direction]][y + dy[direction]] != E_STAR // 已访问
      ) {
        direction = (direction + 1) % 4 // 改变方向
      }
  
      x += dx[direction]
      y += dy[direction]
    }
  
    matrix.forEach(row => {
      console.log(row.join(' '))
    })
  }
  getSpiralMatrix(9, 4)
  getSpiralMatrix(3, 5)
  getSpiralMatrix(9, 3)
  getSpiralMatrix(20,5)
  getSpiralMatrix(20,6)