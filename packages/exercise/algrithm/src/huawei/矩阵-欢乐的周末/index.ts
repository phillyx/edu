// 定义四个方向的偏移量(上 下 左 右)
const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
]

type T_VISITED = Array<Array<Array<boolean>>>

function dfs(
  curX: number,
  curY: number,
  targetX: number,
  targetY: number,
  map: number[][],
  visited: T_VISITED,
  person: number,
) {
  if (curX === targetX && curY === targetY) return true

  for (const [x, y] of dirs) {
    const nextX = curX + x,
      nextY = curY + y
    if (
      nextX < 0 ||
      nextY < 0 ||
      nextX >= map.length ||
      nextY >= map[0].length ||
      map[nextX][nextY] === 1 ||
      visited[nextX][nextY][person]
    ) {
      continue
    }

    visited[nextX][nextY][person] = true

    if (dfs(nextX, nextY, targetX, targetY, map, visited, person)) return true
  }

  return false
}

function queryPicnics(m: number, n: number, map: number[][]) {
  const visited: T_VISITED = Array.from({length: m}, () =>
    Array.from({length: n}, () => new Array(2).fill(false)),
  )
  const persons: [number, number][] = []
  const targets: [number, number][] = []

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === 2) {
        persons.push([i, j])
      } else if (map[i][j] === 3) {
        targets.push([i, j])
      }
    }
  }

  let person0 = persons[0]
  let person1 = persons[1]
  let res = 0

  for (const [targetX, targetY] of targets) {
    // 重置访问数组
    visited.forEach((row) => row.forEach((cell) => cell.fill(false)))

    if (dfs(person0[0], person0[1], targetX, targetY, map, visited, 0)) {
      visited.forEach((row) => row.forEach((cell) => cell.fill(false)))
      if (dfs(person1[0], person1[1], targetX, targetY, map, visited, 1)) {
        res++
      }
    }
  }

  return res
}

// https://www.typescriptlang.org/play?target=99#code/PTAEiztRJOUbbVCo5RO00IgqgQt0PIKhvz0POJAKQUHKkGg5UQM91RBn5QEoAoAYwHsA7AZwBdQATASwCcnQBeUAG0hAWgCMAGlAAGALrShU2QuEzp41UPWgJcuVSosAngAcApqAAqAfQBqASQDKDqwFEAIgNABBbtwBDYwAeP0CQsKDggCM6OgAbcwCGAD40wwAzAFcGGhZORg4MpmwaLO4ADQAuUAYsgFto825pMu4ATRq6xubpFgDuAHNzFmrahqaW0H6hkc7xnqn6gNMuieahOU3pADdOJk4Wc3Ya20cXdw9pC15GNcWKUABvKlA30E4M0FLyioF+QQzYajUAAMlBoDa7X+gIGwPaj24I3KDGm3Cy5gA3IZ3qAMnRuN96Mw2EIAB7SYxyUB0L5cXiPF643HE1i1cxkkGCNp-ADUoAp7M50O55Wh-OMr2Zb0+3wYHJBwVkoAAPiqhSxoUqZKr1fLOX8UoJlqYAHSJBiDFgAC11GuhRtAJu0cnN5ktNrVTpWQn1oy2fva1IBgnEdr2ByO7F9CoqAYVQaENyYjDkjKl0pZjHydXMGeZAF8cZmI4djjGDfHhVtk6nvCx0Xn87jZdh2MVsH6KtJA304SNu9N+5rpCbdvsy+xrs0UwwKIjkdxUQ2Mfmi-mkSwUXiAvEmHn19lcvlCgBHDHcYwABU4NAYt5K9Xukx7z963tWC0mm026azJNAUso1OexnFcTxvEiYxTQybg6HqbAnlAC0rWtGp6lAAtpGwR5+BSXx-CCGC4IQpCUJtLpMOw3D8PlAB3AjwmwAAmCgYM4eJ4mwDJd33edqH-Nla2YGpfXWKZukmLZg2EAxBLYIERiYUTJPfVTuGk7xNmLN58UJbBEjYThvBkTEPlAJV6jMzheV5P9Mz075DNAAArEyzLcpUGA82z7Mzd5W2dTgthc4MAVAVjnmbfz3mEphTVMLImGtbAhE4aRQoEmK3gLUBzD3SxAp9YKhFCmFQAAZj87L3kUlh4sS5LUvS1y02i6Ui38zr3nXfNnOEnVBDil0+pGUBhLDIaZ0YJglDk95nKRPhBBkHS8QJUoZtJOruzqoMaS+OqmAoJlMxAUBAFnEwA7f0AfujADvUwAHU0AEb92sAicoxggk3ACGgUrgui8P+z7uG+37Sny+I8JoCH2M47jePMfi1pbDI2w7AaXUkDHNEkHbceHdpJDHIDjkkGR51OmqSfYYHQb+ugAZSIG9Lp8HOKhmGMg4rieIKpGaplVH2xKCbMdFnG8b2omVkkanJHEE7Xv8pbbKV3Fuo6tc1s3bcluxAsgA

// https://blog.csdn.net/banxia_frontend/article/details/134588123
