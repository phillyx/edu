// https://blog.csdn.net/banxia_frontend/article/details/134622503
// https://blog.csdn.net/m0_73659489/article/details/134872966
function mininumHouseholdWealth(wealths: number[], releations: number[][]) {
    let res = 0
    const N = wealths.length
    const matrix = Array.from({ length: N + 1 }, () => new Array<number>(N + 1).fill(0))
    for (let i = 1; i <= N; i++) {
        matrix[i][i] = wealths[i - 1]
    }

    releations.forEach(([x, y]) => {
        matrix[x][y] = wealths[y-1]
    })
    
    for(let i =1;i<=N;i++){
        let sum = 0
        for(let j =1;j<=N;j++){
            sum += matrix[i][j]
        }
        res = Math.max(res,sum)
    }
    return res
}
console.log(mininumHouseholdWealth([100, 200, 300, 500], [[1, 2], [1, 3], [2, 4]]))
console.log(mininumHouseholdWealth([100, 200, 300, 500], [[1, 2], [1, 3], [1, 4]]))

// https://www.typescriptlang.org/play/?target=99#code/PTAEAsBdIBwZwFwgEYBsD2BzAdAYzgCYB22RAppMMgIZEAeAltQPoBmATukZGUQcNXaQGuVGWAEK1BqjjAAjAGYALADYATOoCsABkUBYAFAgI0eEioYc+YqQrAAtjuYB2Raq0BOZQA5PAoRExCSkZOSVfF3VPVVUjVgBXIlxhLlAHBiJMhIcACXQEuDJwdFQCAHUyalRIcAAKAHcqmvBEUCIc5DJ2AG0AXQAaUHYyMWpUojaOhy7evv6ASlAAbyNQddAxSGGyOFAAXlAdNY3cLjhtgDkD0Cbq2rhsMSJMWpP1s8nth3H2BjobgBBdjsagAT2wHHQDjqy02vFe4AQoGuAGpQPJQABfIZ1Jb7AB87TIDVAwNBYIAPNNZgS6miMQtITJUHUdAsFu9QKx0OxQHUtqAGDd5ABuIWgSmHS7ihio1FLVaGDYq9K-f49BjzLU3O4tOCa0AAWgxfS5WKMXJGYwmjx57AAotRcPU6j06EMwX18USlaqNj9IH86O75l7dc0Hj0wUb5GblRssZyE+sufaBRQJfsxQwpTK5Qq-f74ds4DkbscU6r04KAFYHMW1vOi2vyhZF4sbMsOUCow6B4Oa+a1+Odi1VlUjPaHACy43A2B+dDqU4G3eTKvHk4oCXYRB2cCM48+cFKZCeWDqGSy03yhWKpQqkfqPXkOh0Q3U76Gim-oF0OiDKAPSvp+QGgaAijgeoQzKH03rJieZ4XpgV6ZNkeQFEUJRlJU9wvm+H6gF+RG-kRAHgRB6jgfIP40bB8EckAA