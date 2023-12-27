function getMaxLand(land: number[][]) {
    // 存储每个数字的最小位置    
    let minPos = new Map<number,[number,number]>();
    // 存储每个数字的最大位置
    let maxPos = new Map<number,[number,number]>();
    // 初始化最大面积为1
    let maxArea = 1;

    const m = land.length;
    const n = land[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const num = land[i][j];

            if (num === 0) continue;

            if (!minPos.has(num)) {
                minPos.set(num, [i, j])
                maxPos.set(num, [i, j])
            } else {
                // 更新当前数字的最小和最大位置
                minPos.set(num,
                    [
                        Math.min(
                            minPos.get(num)![0],
                            i
                        ),
                        Math.min(
                            minPos.get(num)![1],
                            j)
                    ])

                maxPos.set(num,
                    [
                        Math.max(
                            maxPos.get(num)![1],
                            i
                        ),
                        Math.max(
                            maxPos.get(num)![1],
                            j)
                    ])
            }

        }
    }

    for (let num of minPos.keys()) {
        // 计算面积
        let area = (maxPos.get(num)![0] - minPos.get(num)![0] + 1) * (maxPos.get(num)![1] - minPos.get(num)![1] + 1)
        // 更新最大面积
        maxArea = Math.max(maxArea, area)
    }

    return maxArea
}

console.log(getMaxLand([
    [1, 2, 1],
    [3, 1, 3],
    [1, 1, 1]
]))
// https://blog.csdn.net/banxia_frontend/article/details/134677846
// https://www.typescriptlang.org/play?target=99#code/GYVwdgxgLglg9mABAcwKZQLIEMAeAZLMAEwAoAbQogLkTBAFsAjVAJwG0BdTgSkQG8AUImGIA9KMSANbUAVCoHnrQFRygB1NA6tqAQt0AA5oHgdQLLygO38RiISLLpE9GGAAKcAM6IAvLVQB3RNgAOAHjpNWAGjYfZhY-INYOAD4SbgBuI2FxKTklNXVAck09eMQTKDNcaztHMBc3LC8wkMCGYNDq8KjYrMTAXCVAac1ANGV0wCN0wHvPQC45AEYsnLycAEEWVCwHRAG4rIgEG1z6GYpiADoTMGQoAAs4g0WwZdo1yjYABg4t1B39+YNgOBZEclMYGcuYxE-PMx+MAA1EDeIIDE8Xm8RgArL4-OH-MAIkFgrIQkTHU4+c7ENgwLgwjiPDEQmDAN44+zUxCXXjHWB0VAk0kiclvACE5istg2eywNhIPm4aNZrO5BQ2NnQQoYfkQ+PlRO46LFwno+V50qgsvo8sViGVqoxAF9EKgyNL+MaxYlAC9mgAbTQDK+oBZJRUGk0gBiVdKZNUYiVamU+Pw2v0K0NhkTYfYbbkkCORiEBmwbNA64Ucq4cEOJxMwBOR7g53Os6N7WMWeMlsPJ1NBhjcTMDbMFkswlXVkQcFWtkQanCS7W64udti9tVl2O4KudsX9yVp3WNtjNkezjH59cGIvjsWT-szrdJzUpxcZlcto8Y9u7gzdgsmgQ2x8GR9ZZ6vd65HFwCm1gDWqAAJ6CiK1qsokgCF0YA6d69DaIxYJM0yOCQ868meDaZtciAALRmBYC71vQy7YUCsy8AAVG8aGnkRy7Nrh+E8rR6aYReiBkQMHakvaDrdD0Nr9hMUwzPu05CUh8qIVM3HCG+BiTFAIAsEgElTAIb5YnAJhbHAyAkGm2D4JQJBjgYK7ygATPKq5ZGwADMNnyvZl4iBZsw2RwAjdtwQA