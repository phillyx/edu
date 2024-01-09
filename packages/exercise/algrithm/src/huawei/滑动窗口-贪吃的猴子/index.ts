/**
 * 贪吃的猴子
 * 猴子能获得的最大香蕉数 = 总和 - 最小窗口和
 */
function getMaxBananas1(N: number, str: string, K: number) {
    const arr = str.split(' ').map(Number)
    let total = arr.reduce((a, b) => a + b, 0)

    if (K === N) {
        return total
    }
    const windowSize = N - K // 计算最小窗口
    let minWindowSum = Number.MAX_SAFE_INTEGER
    let currentWindowSum = 0

    for (let i = 0; i < windowSize; i++) {
        currentWindowSum += arr[i]
    }
    minWindowSum = currentWindowSum // 将当前窗口的和赋值给最小窗口

    for (let i = windowSize; i < N; i++) {
        // 窗口滑动，加上新进入窗口的元素，减去离开窗口的元素
        currentWindowSum += arr[i] - arr[i - windowSize]
        minWindowSum = Math.min(minWindowSum, currentWindowSum)
    }
    // 猴子能获得的最大香蕉数 = 总和 - 最小窗口和
    return total - minWindowSum
}
/**
 * 每次只能从左边或右边取
 * 各取两边半拉窗口
 */
function getMaxBananas2(N: number, str: string, K: number) {
    const arr = str.split(' ').map(Number)
    let total = arr.reduce((a, b) => a + b, 0)

    if (K === N) {
        return total
    }

    let currentWindowSum = arr.slice(0, K).reduce((a, b) => a + b, 0)
    let maxWindowSum = currentWindowSum

    let left = K - 1, right = N - 1

    while (left >= 0) {
        currentWindowSum -= arr[left]
        currentWindowSum += arr[right]
        maxWindowSum = Math.max(currentWindowSum, maxWindowSum)
        right--
        left--
    }

    return maxWindowSum

}

console.log(getMaxBananas1(7,'1 2 2 7 3 6 1',3))
console.log(getMaxBananas2(7,'1 2 2 7 3 6 1',3))

console.log(getMaxBananas1(3,'1 2 3',3))
console.log(getMaxBananas2(3,'1 2 3',3))

console.log(getMaxBananas1(4,'4 2 2 3',2))
console.log(getMaxBananas2(4,'4 2 2 3',2))


// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWwqWMMAqgQt0CzOgFbSraHC-AYduDB0-WUABzQck1BMzMElQwB1NoBeaQbgNAYlWgFpoTB4HUHSvQY+UWWEMCgAzAK4A7AMYAXAJYB7KdADmAUzkBZAIYAPAEK6pJ3QGcAjAAoAcgC5oUiQFsARhoBOAGmjm5no7+ngpSar4A0o7O7l4AlNAA3ljQqTIq-tC6np4MfgEAdOYADgA2CnLWAOTQVXEFLrrFdq4ennEpqaVa0HJKcrqledmeBZ4aACYSMhrW1rq+bgn0AHxZ0ADU0G6+AAwdkJ3QCmLQ1hEM9Iy2CckwqQ+p43ISnqp9A6VHAL5H6VKZADuoQmSkBAGUFAAvDR5WwcaAXYDAaCAQujAOnePAER26cmgLlCAHUQWDwa44a0vAVtABBAAaAH1wTSAGIAUQZAElbAAVNkAcTZACUcT0ZK9xlI5MSpKCIeTGLsoEcxEpctZccc8rsANxagA80GBstJ0I0eoUGw2tyOj3FOQ0UplcrJLk2jBGAG0FABdH5HAlSZ2khXQe2S6Uk+Vu5HQQBgOoBlfUAskoCZAsQDSsYAeBUAm35Y-jK+6pVXqzUKPLGl1mi3QQ22C1Wm2Fx7QWMCQCLdoAKpUAMP+AAqVAFBygAbTQDb8YBTRVTgGFFQAEvl3APOKgG7lQDdnoAAfQnk9tD3DjsjJuj7qyOW9PoRXrLnArpphfqbj0Dwd3jD0cgAFg1QtZb1HXb5N07P64Do8vxNrGeBEKQlC0HkrAInmQhNs8rzvP0gwIh+O6ulAQGgBAMBwIA89aAITWgBXyrggBzcoAZ7qAJ3xgBoRoAz8qUYAa8rCNAgAgKgxgAkcpRgBSyoAk0bYrhoiQJIsiKCo6haHoRhmKY5gAEx2NElI+PkgQqaE4SIopsTtEkfwZHiIx5MERRlBU1S1PUjTNLYSkAQ8mofChHo5GMkzTLM8yLMsay6Js2x7AcRwnGcFxXNcjbNg8CFvL0yFfE2QGiniP7bi6oYjEU5QzNYuyRPU4xTNlnnbN56xbDs0D7El+IGHerp5CldWuAWjyat0Yh4owFycJYvghGoT6ddA8I9S1DyAk+CjdGc7V4isioRZFYYSluTVuuwzmeJ6s1Xkty0Or+6Hkhsm2ev1g27UtjT6GteSPi+13WI1f4uL411rXZkXnXI7DsOuXQaB1v3+oc8FaIhNU3S9BaJZA-zmEo3QFKUShqNYmg6AYximDJNgAOzeFUljQLJJPQHj0AAMzQAAbNAlhVN4lNxAc8OIxoyOo+jElY9JFjyQTRNk6TFPU3TDNMyzBZs0jKNoxjknY2YVjWJThPE6TlOM8zrMZOznPyzzUk4-zqvq2TWuS4FcN67LXMK7zJsqwALITzvC1TjOyVLNsAvrcvc5jxvK-JrtVO7pOa17LNAA