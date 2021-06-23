/**
 Do not return anything, modify nums1 in-place instead.
 */
 function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i= m - 1
    let j= n - 1
    let t = m + n -1
    while(i >= 0 && j >= 0) {
      if(nums1[i] >= nums2[j]) {
        nums1[t] = nums1[i]
        t--
        i--
      }else {
        nums1[t] = nums2[j]
        t--
        j--
      }
    }
    while(j >= 0) {
      nums1[j] =nums2[j]
      j--
    }
  };