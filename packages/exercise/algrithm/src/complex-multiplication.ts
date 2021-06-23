/**
 * @param {string} s1
 * @param {string} s2
 * @return {string}
 */
var complexNumberMultiply = function(s1, s2) {
  const reg = /\s/, reg2 = /\+|i/ ;
  if(reg.test(s1) || reg.test(s2)) {
      console.error('input error, include space')
      return ''
  }
  const arr1 = s1.split(reg2)
  const arr2 = s2.split(reg2)
  const a = arr1[0]
  const b = arr1[1]
  const x = arr2[0]
  const y = arr2[1]
  if([a,b,x,y].some(t => t>100)){
      console.error('input error , a and b must in [-100, 100]')
      return ''
  }
  // (a+bi)*(x+yi) = ax+by*i^2+i(bx+ay) = ax−by+i(bx+ay)

  return `${a*x-b*y}+${b*x+a*y}i`
};