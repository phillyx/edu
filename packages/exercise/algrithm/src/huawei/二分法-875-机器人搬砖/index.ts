// https://blog.csdn.net/m0_73659489/article/details/134633931
// https://leetcode.cn/problems/koko-eating-bananas/solutions/
const E_LIMIT = 8
function getMinPowerCount(bricks: number[]) {
    const N = bricks.length
    if (N > E_LIMIT) return -1

    const check = (k: number) => {
        let res = 0
        for (const x of bricks) {
            res += Math.ceil(x / k)
            if (res > E_LIMIT) {
                return false
            }
        }

        return true
    }

    let left = 1
    let right = Math.max(...bricks) + 1 // 左闭右开
    
    while (left < right) {
        const mid = left + ((right - left) >> 1)
        if (check(mid)) {
            right = mid
        } else {
            left = mid + 1
        }
    }

    return left
}

console.log(getMinPowerCount('30 12 25 8 19'.split(' ').map(Number)))

// https://www.typescriptlang.org/play/?target=99#code/MYewdgzgLgBAogfQDIEkCyKAqMC8MAcAsAFABmArmMFAJbgwDmAplGjWAAogDuTATgGEQlKAAoARnxrAA1hABcMMOQC24-gG0AugEoYAbxIxjMUJFgA5XDEnS5AOgA2TMAygALIyZqkYoqwB88MjoWHp8LOR8YDAAtACMJF7GZtCm7kyy1qIyispq-Ho4QYbEJuUwzrARENYADMkVpCB8fqmwAB4wIL62shB6pRXDMDUwANR4aACGHvbATDSOol0A9DAyOo0jMD5+Y0GIqBiYg9s7JhFQUTGk044QTOfDAL7PMG-E71c3MFB85CeZRMn0aVUqTFIsDwiWBxnBUgY7mhMBmcxU0w6onsOL6cj04xg8Rgq3WgDPdQC3qYBn5UAAPqNRrcdxLJh+ZxQmAAHlGNCRUDOcIq7RgKhoABNrGzYITRKJEci4hCoXoAkF4lsBeU9qJgBlZKIRaKdPyLpcefK8Ab3i8YEwHiyhibFSiDRMiVbGqCBT9ok6SJ7UiBnE4QAxRMxWOwuLxBMIwGIAOQAZjqRIATDBUwBWAhEgCc8fsEAADo4aAmYPGdPYMUX-Kp1HwjTogA