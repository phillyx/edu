/**
 * 
 * https://www.typescriptlang.org/zh/play/?#code/MYewdgzgLgBAQgSzAQwE4E8DKJVQLwwAUaqAXGAK4C2ARgKaoDaAugDQAWdCA5u1OdXqoAlHgB8AbwBQUmHJgAbOrCUAzWAQAMrVDz4wCJAHRKw3KO1lyrcgO7sESwmtgAeXbyjDp83zFCQsFQIACYGinTqMADURIQe+gC0LsIwYmIwAIzCNn4BECBKJiDczpFQOnoVwSE5fvIIqsSoTDXMMK4wnFXeufVyLuE10Zl98gC+dAoQdDA+-b6NhDWJmWKaMABkmzAkjCuZzK7dnr0LC6jKFKhgMMOj5xNj9Qkad6HPMOO53365l1BrrdVrkpN98oU6MVSogUBhsLhCIwAJwAZlYyIArBiAOysLKabSZTQAJlYmRJ6MymMxbEyxOEwiAA
 */

const BinarySort= (arr:number[],height:number)=>{

    let left = 0,right = arr.length
   
    while(left <right){
        const mid = left + ((right -left) >> 1)
        // console.log(left,right,mid)
        if(arr[mid] < height){
            left = mid+1
        }else {
            if(mid-1>0 && arr[mid-1]<height){
                return mid+1
            }
            right = mid
        }
    }
     
    return -1
    
}
console.log(BinarySort([93,95,97, 100,102,123,155],110))


