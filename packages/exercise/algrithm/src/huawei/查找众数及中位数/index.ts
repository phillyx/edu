/*
 * https://blog.csdn.net/banxia_frontend/article/details/134451242
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
function resolve(str: string) {
    const arr: number[] = str.split(' ').map(Number)
    const map = new Map()

    // 查找每个数出现的次数
    arr.forEach((x) => {
        if (map.get(x)) {
            map.set(x, map.get(x) + 1)
        } else {
            map.set(x, 1)
        }
    })

    let cursor = 0
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
        return Math.floor((list[mid - 1] + list[mid]) / 2)
    }
    const _mid = Math.ceil(mid) - 1 // 数组从0开始
    return list[_mid]
}

console.log(resolve('10 11 21 19 21 17 21 16 21 18 15'))
console.log(resolve('2 1 5 4 3 3 3 3 9 2 7 4 6 2 15 4 2 4'))
console.log(
    resolve('5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39'),
)


// https://www.typescriptlang.org/play/?#code/PQKgUABCEBYC5wA4GcBcxgCMA2B7A5gHQDGyAJgHaEUCmcWAhhQB4CWDA+gGYBOuFcGhTLAGPOK2LYawMnQatsyYAEYAzABYNAVhUAmDXsjRAp+aA-I0Do8oAdTQFPKgWjlAsvJXjEa4HozQODGgADlAI35XAdsZ2gF+KgA3OgITWVoDziYBYmoAhboDFCYBUclaAMP-WgPfKgKdybtGJADQQjlaegFFGvgGAc3KA8DqADEqA5JqAScaA6EopgADmdoAvqQnJLoBBmoA55oCb8X7+sclugOKaqfHtHUmAjDpuRSkDwwFjVoBccoBuCtPzJZ2xgCRyyYDScoAxKoAmaZl6KYACRoDp+rGAy379i0Uu5oAupoDR6lY+dkAwoqAAl9YtZAG56PkACEZeRKABtNYv8UoAhGzh-1iHygEEAyfGAU0VAPPGgAf41AQHG42FeQAvfr8kf86lVAGvKgB4FQDAwYAXtQgAAYADwAOW5Kk5QpS-zsgHnrRIg5nsrncgCiAqFnJc2KCRJJOKC1mhsTRPgxThcgC5PQDR8ipAFj-Ktx5oggttKggegdKgAnI7nQB2d22gBs3pUAA5bdoVUEbU7jMaTXpLVi8eHbRBtBANBA1GmIG69BAvam-dmVMnU9mNKGbWpI1jTWpY9B40nE8n08ns8nk16-V7016VA6vdp25nM0G3SovaPk27R2mXWWc8ZgGAuABXCjECT8CA8GjIXDYABuNAAFMg4DwSaeeKwKPgAJQQADekFJEGI-FPEDE54gFGXAFtMBoHgAG0AF0IAAXggS9CGQRBsFYOAjwAcggZDb0IP8GEQI9eX-QCeFvZ9STfCgPywxBIJ-GgAHcIAAWWwo8iOIiAMAgcwJSsUJYgiViv0ILhcB4OUGGIGAjyPZh7wggA+R9WJfCBWC4CAjwowh8DoKTb3vJ8lIMl8NOQbTmAKDStKQ6SIAAaltIjDNJABfCAaCUGgFMcgzjNMgoVAcxynNYpyWKU6Q4FfZceF3HgqOVJTSI-BCPygsDWPYwB24IZax-lYoTYqPRKIoAaxoABPCBcFUjTSrK5BmL0xSXyK19cFXCKoIs7TaoCwyVLUt92ogeTiCimLGq8sLWFPQhpBvOAYDiprDOSuBCEQZdkAknrloM0bouEqjBoEXaXLckzlNUwq2oESCIKg-bxs8ybSVW9bNu28reoMs73Oel7SIkX8aFO4KwFYt6YqQo8GAKTAZPkhgIAAWggeHWMSvcaFmggj1W76Wr-VgyCot65vwBa2MdcGlP6vHprW8nKYAUkdO6oM5CbHO3OAoooBiGAWwS8GEyTVuAomSdRlRwLs8XJdA+9gEdb6goS98Io4SWqMYoXiBoRR1OJ+9pbY5X-gqTlAAB9QBpzVYnm+YgcWteJ0CwCCsBMekHH8CPbddwPY9kLtXt-SzT1-XzZ0g0LdCiK97G8F9-290PFCCwbVN02zjMsxzFMIHzYMC5LOPPffLGfaPe2d1ToPkwdJsG1bBsO3z7t7Xzgd86nEdbXHYup0TNQXXQvIwCIoA