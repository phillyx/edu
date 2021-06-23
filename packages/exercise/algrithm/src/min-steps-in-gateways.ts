function Solution(S) {
  var len = S.length
  var i = 0
  var res = 0
  while (i < len) {
    var v = S[i]
    if (v == 0 && i === len - 1) return Infinity
    i !== len - 1 && res++
    var max = 0
    var j = 0
    for (; j < v; j++) {
      if (max < j + S[i + j + 1]) {
        max = j + S[i + j + 1]
      }
    }
    console.log(i, j, v)
    i += j
  }

  if (res == 0) return Infinity
  return res
}
