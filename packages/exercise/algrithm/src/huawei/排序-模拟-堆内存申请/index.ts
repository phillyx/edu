/**
 * 有一个总空间为100字节的堆，现要从中新申请一块内存，内存分配原则为优先紧接着前一块已使用内存分配空间足够且最接近申请大小的空闲内存。
输入描述:
输入:
第1行是1个整数，表示期望申请的内存字节数;第2到N行是用空格分割的两个整数，表示当前已分配的内存的情况，每一行表示一块已分配的连续内存空间，每行的第1和第2个整数分别表示偏移地州和内存块大小，如:
0 1
3 2
表示0偏移地址开始的1个字节和3偏移地址开始的2个字节已被分配，其余内存空闲.
输出描述:
输出:若申请成功，输出申请到内存的偏移:若申请失败，输出-1。
备注:
1.若输入信息不合法或无效，则申请失败。
2.若没有足够的空间供分配，则申请失败。
3.堆内存信息有区域重叠或有非法值等都是无效输入
示例1
输入
1
0 1
3 2
输出 
1
说明
堆中已使用的两块内存是偏移从0开始1字节和信移从3开始的2字节，空闲的两块内存是偏移从1开始2个字节和信移从5开始95字节，根据分配原则新申请的内存应从1开始分配1个字节，所以输出偏移为1.
 */

function resolve(requestLength: number, usedCaches: number[][]) {
  const FAILED_VALUE = -1
  const STORAGE_LENGTH = 100

  if (requestLength >= STORAGE_LENGTH) return FAILED_VALUE

  if (usedCaches.reduce((a, b) => a + b[1], 0) >= STORAGE_LENGTH)
    return FAILED_VALUE

  const arr = new Array(100).fill(0)

  for (let i = 0; i < usedCaches.length; i++) {
    const [index, len] = usedCaches[i]
    for (let j = index; j < index + len; j++) {
      arr[j] = 1
    }
  }
  let beginIndex = 0
  let tag = false

  for (let i = 0; i < STORAGE_LENGTH; i++) {
    if (tag === true) {
      if (arr[i] === 1) {
        tag = false
      } else if (i - beginIndex >= requestLength) {
        return beginIndex
      }
    }
    if (tag === false && arr[i] === 0) {
      tag = true
      beginIndex = i
    }
  }

  return FAILED_VALUE
}

console.log(
  resolve(1, [
    [0, 1],
    [3, 2],
  ]),
)
console.log(
  resolve(5, [
    [0, 1],
    [3, 2],
  ]),
)
console.log(
  resolve(5, [
    [0, 1],
    [3, 2],
    [8, 4],
  ]),
)
console.log(
  resolve(5, [
    [0, 1],
    [8, 4],
  ]),
)
//https://www.typescriptlang.org/play?#code/PQKhCgAIUxIc0ADlBUcobgNBeXoF9TBccgRgAy8HVtQIKDAQt0DANQGH-AG50EDIwOblBaOUAbTQZldB36PkHV1QUMVANbQr6AwJUCyiYHzlQJhKmQBjygCUVA5L6BS40AC7oFklLoCfdQP7ygClchwjIGbYwPiagFDlAAOYLAi-HtA5JqB4HRKpAT6l9AQAzhAyfGBTRUDzxoAf4gC5PLyDAGm9sQBkIwHozbERAF1NAB1MKQAsIwC5PQHxzQGxzdhI+YgSAblCAJkAGJQA5aO1UQB4LQUAnJRJAEjl4pLTAZX0VdRFc3hJAUYNAVsUKQHnreAi0jR7APfjAW78+DFGIknDAGJUS1sFAaiU0wHkFQG-PQAZ1QD3dVb5OewpAIM0g3EhscABmSGLwNNwDw8ABdUAAfUBpzRIsWIq0en1+AOKiGI6kA1REiCiAN0VAJryCycADpPIAvxX8QQ8mICgFOg9iABCNAPlKFDx7FKfBIB0J7EAjJqAUliKZiALTYdyAcE1ABc2QWwaIJ3kAh-KAewNALBygAgVQCrNoA0I0AB6aACVMKOJGUz3MVBYBCm1gxkc6EA2fLw1VsZnuR5osh8MWwQBcyoB99UAs4mAA+VZbBAHrp0sAPAqASW9AL8JUSV3nAqUA0fIPYMPO4PZ6vPGQcAPQAv0YA4M3AZAYWm0zR4vCiBzouH+2GBwv2dEe-xIxWIFGcOb4+fL2H+kNL5YArP8AJwd2uATgtAHbGIgkrDYvUAKXp0Ft-ERAogUQACRoBTuTxBxwGOgwHA4AAZgBXAB2AGMAC4ASwA9ofIAAnACmAGdLwAbABu94AFA+AI77p+ngAMveh4AOangAFgEkCHvuAC2ABG963gANJA+6PveAAmADCACGx4QU+0GwYhyEANoALpUQAlJAADeUCQMxx7Xo+p6QAAYgAggAkoBACiAAiAD6ABq3GAQAqgJkAALyQByBRMSxbEcQAygAKgA8gAStxADiAkiYJ5QGZpAAS8n3PgykqZA567pA373n+AHAWBkGQAAfApWl6YZxmmeZFl0Q+p77reN48fxwniZJMl2cxzGOc5GHYfhhFPmiD5Yfux5fp+eFoQhdFyd5kB4ZAADUkAIeR2CUWhuB0b5kD+fpRkmQJZmWWF94RVFXF8YJokSdJAlJclrGHuxlW3re1mHveADukDcQteEAJ6fngLVoru54vi+n4tVNzG7pei2fi+A0OdZuAFPdAA86GYbhBFEY+aK3Z5EFPee1XVXRjHJWDkAzXN5HnoeWH3gAHmhv2UdZ6UfVlj7Q5R9lg5d123RxABW1kw3D8NPcTr2kwjNWQL9FNAyDOPg8xeELeRhMowpDws8xAC+9kC2DBN1feoEw7xsM0wpj32SLp54aB1m7nhL6YedkB485Ivng9AOQK9HWBd1vUWQDjMMczKVOZ+CtK3JDuQKet7-kzvPg6lRXs+eXOO9gbvu7znu62yovi4ektkz5Cm-v+7EeeBEEB4HgfhZFN5IeHkcI1bgdCyn4N28rqvq7nYN85A95q-elsFx7Nsh2HEtS-D0d3q5cdASBifJ3X4Np0NmfN2TZe8-nKcC7n4-185RcOwpKvV5AABky-zbeWPyY7LW1wXc9Oy797KXXQ8Ry3JPH2PO7l9fyUD9FI1xeNiXgJPkOvveP2XqBLnPu+X7YDQuRciuA0KNSAY8NCxRKKURojRcA79bpfx-g+P+H5PwdiASAsBTVIDkUgS8GBcCEFsQ-sg3+r50GYLwdg+4uD8FQKauRAAHChAALEQ+BiDP4vm-hQ-+GCsGgLoUA1hHDYHwKAA
