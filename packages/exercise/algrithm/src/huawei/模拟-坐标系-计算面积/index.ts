// https://blog.csdn.net/m0_73659489/article/details/134498091
function getMatrixArea(N: number, endX: number, lines: string[]) {
    const matrix = lines.map(x => {
        return x.split(' ').map(Number)
    })

    let lastX = 0
    let y = 0
    let area = 0
    let count = N
    let i = 0
    while (i < N) {
        const [x, distance] = matrix[i]
        area += (x - lastX) * Math.abs(y) // 计算执行第i个指令后的增量面积
        console.log('x', x, 'lastX', lastX, 'y', y, 'area', (x - lastX) * y)

        y += distance // 更新纵坐标
        lastX = x // 更新横坐标
        i++
    }
    area += (endX - lastX) * Math.abs(y) // 计算终点的增量面积
    console.log('x', endX, 'lastX', lastX, 'y', y, 'area', (endX - lastX) * y)

    return area;
}

// console.log(getMatrixArea(4, 10, ['1 1', '2 1', '3 1', '4 -2']))
console.log(getMatrixArea(2,4, ['0 1','2 -2']))


// https://www.typescriptlang.org/play/?target=99#code/PTAEAsBdIBwZwFwgEYBsD2BzAdAYzgCYB22RAppMALYAMA+gOwDMAbAKwCcALABwfABDAE6QAlrlRlgBCgNGo4wAIxMuXDjxoclAWABQAMwCuRXGPRFQmCgFkBkIaIAeAQSFkBACgByCUESMqZDIhABpQMiICAA0-AKCQ8NRRckRQOAcUzABtAF0ASlAAb31QMtBcCwzQKntHJ1AAXlBk1OxamE8GxoA+YtLywfdIIyFLJ2w4GGTITwByUDn89oFO70DgoXyBsoBfbb0dlooWgQzoptAaI8lIUABPS+u9QdvQYQ8nm5PKkzvm7zfO6iL4vcoAd3A8jIoE8IIAPKBvIUSmDBmVKkRqtknOECKIMgJTGRcpdapknNlRLkjoMPgJQABqZpdUAAWlO50KACpQHZIOBsAJkHBPPdCiBQIBC6MA6d6AcyNADIRgBpvUSAKjlAODGgBO5QBwKoAQt0AeRqAecTAEbpgHvPWnlTFwdCSbAYTDzJxzcK4xaoM6QaLOzme8Jze7e+5++ne1kc91c0C88X6C1lR7M0D4wnE0CSwAvZoAG00ArX6ABXVAOAWcZ9F2aDQzmcAVFYFouiRmMo67I70pksyIxdnFnl8+yC4Wi8VpsCywATfoBOhwNJvNaIqVRtZDtWEd3rb0T9Ec93vXq8WAfCQcWIfCnhXHa3XZjh2nw1GlnpAG59I3L5KrXOFw7rJB+fU3B5PFxwiUGhwmyOYlFAJRvTmAAmCCoKYOC-S4dloLmAoDlfW17U8T9v2cX8vGg0IANAUCaEQmCULQ-J8iAA