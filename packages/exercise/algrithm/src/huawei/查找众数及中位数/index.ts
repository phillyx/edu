/*
     * 查找众数及中位数
     * 众数是指一组数据中出现次数量多的那个数，众数可以是多个, 中位数是指把一组数据从小到大排列，最中间的那个数
     * 如果这组数据的个数是奇数，那最中间那个就是中位数，如果这组数据的个数为偶数，那就把中间的两个数之和除以2，所得的结果就是中位数
     * 查找整型数组中元素的众数并组成一个新的数组，求新数组的中位数
     * 输入描述:  输入一个一维整型数组，数组大小取值范围 0<N<1000，数组中每个元素取值范围 0<E<1000
     * 输出描述:  输出众数组成的新数组的中位数
     * 示例1：
     * 输入： 10 11 21 19 21 17 21 16 21 18 15
     * 输出： 21
     * 
     * 示例2：
     * 输入： 2 1 5 4 3 3 9 2 7 4 6 2 15 4 2 4
     * 输出： 3
     * 
     * 示例3：
     * 输入： 5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39
     * 输出： 7
     */
function resolve(str:string) {
    
    const arr: number[] = str.split(' ').map(Number)
    const map = new Map();

    // 查找每个数出现的次数
    arr.forEach(x => {
        if (map.get(x)) {
            map.set(x, map.get(x) + 1)
        } else {
            map.set(x, 1)
        }
    })

    let cursor = 0;
    const list = []
    // 获取众数数组
    for (const key of map.keys()) {
        const count = map.get(key)
        if (count > cursor) {
            list.length = 0
            list.push(key)
            cursor = count
        } else if (count === cursor) {
            list.push(key)
        } else {
            continue
        }
    }

    list.sort((a, b) => a - b)
    console.log(list)
    const mid = list.length / 2

    if (list.length % 2 === 0) {
        return Math.floor((list[mid -1] + list[mid]) / 2)
    }
    const _mid = Math.round(mid) -1 
    return list[_mid]

}

console.log(resolve('10 11 21 19 21 17 21 16 21 18 15'))
console.log(resolve('2 1 5 4 3 3 9 2 7 4 6 2 15 4 2 4'))
console.log(resolve('5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39'))
// https://www.typescriptlang.org/play?#code/PQKgUABFUhin5oPyNDo8oB1NBTyoWjlCy8iy0KyqD0ZoODGgAHKAjfioHbGGgX4qANzoITWKg84mBYmoCFugxQmBUcioBh-1IHvlQKdyRdrwA0EbClKAoo0o1Ac3KB4HUAMSoHJNQEnGgdCUBgAHMMgF9Se-PNFiAgzUA55oE34qtU78igcU1B3Yyb6BGHSJyAnaONC4ogFxygG4Knr4KppyAJHL8gNJygDEqgCZpogBMAoACRoDp+pyAy362-nKWMPAIgC6mgNHqKBQYgMKKgAS+nKiAbnoUgAhGZLyADaacDQKAQjb9DZzl+AQQgMnxgKaKgPPGgA-xAFxQC31kgC9+dcMNWmqAa8qAPAqAwMGAL2oQAAwAPABytwCM168CDRiA89a8raeXN7cAKLPV7XCozWZ0FbrOZ0VA9TjjCiTHDg2CALk9ANHyT0AWP9oubzHEQF7Ep4QLJkp4ATnJlIA7LTiQA2RlPAAcxIArPjIUSKfj8VisnjprAFnziRBORAACwQADMCogNKyEAZcpZqqe0rlqplPLoRPlAtFECx8pF+DFhKlkuliulqul0oZLIZioZTzJDM5LuVyo5NKeDKD0ppQYVVINRLpaOAYAAZgBXAB2AGMAC4ASwA9imIAAnACmAGccwAbABuRYAFCWMwXVvWC1mUwBzACUEAA3hUKmm8-WIABDAuNiAppMAWwARkWCwBtAC6EAAvBBmwA6EsAB3LWYzNYA5BAjx3N1Phzua-dp3OCx3+4OMxBLzu1xOiwB3CAAWSvNYdgA3GAFTAMAVTfCgjCcCwFSjgWm4JjmBaAsOaYABY1gAHmuAB8PbgtAWYJhANZvpubZFoe2Edl2vbTIxr5Xtu1E4TIFFUTRXYANTEo+TEQAAvhARbliWRaEYJ+AURJNEyE8AlMUJFRCY+FTltREBpkmBZlgWH7XCB+ADimQ77kO67LmBEGAO3BRyoA0FTIQZNamUOADWRYAJ4QDmpEUV53kloB9FEVA7kvgOqYvuunFsUFSmMSRZHRSmL4ETpekoWF0nQBZGabpp7YZhhhnhdMBWbjuSYllhiUVSZun6R+aUZhVIliRJEApW5OYxWuq7rll+m5XlEBVTVdU1g1gmdeJkkMeNpnZpORYdapoH4FV+mHjWw4yDOXargRw4QAAtBAR1PmZFZFkVOZtjWBVJdpz6vlmAAmH5VcVbalRAEFZFtxGkc9Wb1kVRYlWVACk5KDeu1xjYxxYZrp+b-qVSHljmKE1uD9YLlOX0XU8K58QVxNfUuXZA69Kkme9AD6JPfeuWMYZuBb9Smn3kV9XbnWSFRoxjE0QxmC6szToEqWA7l3Q9T3FmWVa1keJJeqyKr0qymqUhy2pno+iuacrNaqxW1bHlqtpyoqioqmqsoQJqXKu3qJsK4OSu4yrpbWxr0pkvatpOraroux6pIu76LvhoGxIhh74aSvKVIm0AA