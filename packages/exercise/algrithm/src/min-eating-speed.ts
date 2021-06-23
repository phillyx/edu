export function minEatingSpeed(piles: number[], h: number) {
  var check = (k: number) => {
    let count = 0
    piles.forEach((x) => {
      if (x <= k) count++
      else count += Math.ceil(x / k)
      if (count > h) return false
    })
    return count <= h
  }
  // const min = Math.min(...piles)
  const max = Math.max(...piles)
  let left = 1
  let right = max + 1
  //边界条件
  if (piles.length === 1) {
    return Math.ceil(piles[0] / h)
  }
  while (left < right) {
    let mid = left + ((right - left) >> 1)
    if (check(mid)) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
}
