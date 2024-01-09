/**
 * https://blog.csdn.net/m0_73659489/article/details/135328004
 */
function getTransportTime(m: number, n: number, carSpeeds: number[]) {
    const carsCount = m;
    const roadLength = n;
    let maxTime = 0
    for (let i = 0; i < carsCount; i++) {
        // 计算每辆车按照当前速度心事到达终点所需要的时间
        const time = roadLength / carSpeeds[i]

        if (i === 0) {
            // 如果是第一辆车，初始化最大花费时间
            maxTime = time;
        }
        // 如果车速较慢，追不上前一辆车
        if (time >= maxTime - 1) {
            maxTime = time
        }

        if (time < maxTime - 1) {
            // 如果追上了前车，更新最大花费时间
            maxTime -= 1
        }
    }

    return maxTime
}
// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAIwDYD2A5gHQDGaAJgHYnUCmiwAtgAwD6A7AMwBsArAE4ALAA5BwAIYAnRAEsyeesEqNJcvGmABGbv24AmUa1bCosYFABmAV2pl5BatCKMAKtMnU0KArLdyzPQAFMwY0NQ2zDj00gA0EeGR0bEJZDIAyij09JSYEVEx0gDaALoAlNAA3ubQdWROaIjQ6dJoAMIEds0AvNDMANy19Y3N0gSSlAAy9NREiPDQfdRDMHXQSs3MkgAeAUFL0KzD0FZ+0MGb0HKHrAPX0AA8LTIdXdSI93IA1N+VNWt1utsNBAIXRgHTvQDz1oAw+MAZvGASGNAOaOgGV9QCySoB8BMAZXqAYf1ANFygAYlQB98YAJv0AnQ6AASNAADpgEDIwAhboA300AL6knIENbzNeQHPrjSYzOYLaDAF7SLI5PLFOSlKAs9ZyKwXG49JVHf4yoF1EGAIM1ADnmgHozQA03oAAOThgBh-wC4SoBpzUAaMqAAHNAOSagEagwCcsUy1ertntAvRDpz6Kt1esAL5urXa2HowDB8YAjQxNgF-4wCwcoAoOVRxthbrlF190AAfH0PftvQBaaDaVWAgPrfNen1et3ByDp+XBLPPKsHYul6puoGh2OJwBhcqjYSbAC9mgAbTe3O13liv9XYF6CFvraOsnesnaSMGzSZxt+hQQNAA