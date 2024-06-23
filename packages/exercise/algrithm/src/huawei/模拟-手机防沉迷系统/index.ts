/**
 * 智能手机防沉迷系统
 * https://blog.csdn.net/banxia_frontend/article/details/135163227
 */

function App(name: string, priority: string, startTime: string, endTime: string) {

    const _priority = +priority

    return {
        name,
        priority: _priority,
        startTime: convertTime(startTime),
        endTime: convertTime(endTime)
    }
}

function convertTime(time: string) {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

function getPriorityAppName(queryTime: string, lines: string[]) {
    const N = lines.length
    const qtime = convertTime(queryTime)
    const apps = [] as ReturnType<typeof App>[]

    lines.forEach(line => {
        const [appName, appPriority, appStartTime, appEndTime] = line.split(' ')
        apps.push(App(appName, appPriority, appStartTime, appEndTime))
    })

    // 对于每个app，检查它的时间段是否与已注册的app的时间段重叠。如果有重叠，比较优先级，注销低优先级的app.
    const registeredApps = []
    for (const app of apps) {
        if (app.startTime > app.endTime) continue // 过滤初始时间大于结束时间的app

        for (let i = registeredApps.length - 1; i >= 0; i--) {
            const tmp = registeredApps[i]
            // 如果存在时间冲突
            if(Math.max(app.startTime,tmp.startTime) <Math.min(app.endTime,tmp.endTime)){
                if(app.priority > tmp.priority){
                    registeredApps.splice(i,1) // 注销低优先级的app
                }else{
                    continue
                }
            }
        }
        registeredApps.push(app)

    }


    let res = 'NA'

    for (const app of registeredApps) {
        if (app.startTime <= qtime && qtime <= app.endTime) {
            res = app.name
            break
        }
    }

    return res
}

console.log(getPriorityAppName('09:30',['App1 1 09:00 10:00']))
console.log(getPriorityAppName('09:20',['App1 1 09:00 10:00','App2 2 09:10 09:30']))
console.log(getPriorityAppName('09:50',['App1 1 09:00 10:00','App2 2 09:10 09:30']))

// https://www.typescriptlang.org/play/?target=99#code/PQKhFgCgAIWwvM0L8BhpI0FzmgmNMJE2h3+MN8+h9vylmCigDMBXAOwGMAXASwHsroBBABw4AoqBDALYBTAFzQAznQBODKgHMANNA4ymMugE8xkmfKWS+UugBUGw7dNmLoQqgBNT5iZfkBKaAG9SMaL5otJaAB9FWZ1DWgAXmgAalC1Bk1vX18pIToKKVYvHxSU-mEFIjyU+PCxENVwotySgyNHUWh-KgA3IQazIW56ky7XGpKU2wcusRb2zuFuEcbXYt8AXyhlyHJqemZWCY6+6cYnHSt3HLyWwIBtAAsmTPElAVkKOiFxAF0o6AOhADpxDgANoluAByEQg1w-AR8HgAOQoAgARh15rU0hkstAbndYNAAGwABli0EeVGerxW3kotEYLGgcnSAAUqokNJwOLDBN0AI4UDoaRoWXTWIFUV5CqwXN4nBbNAJ0aCwz6i14-AG2OR0K6y84K7nfT47KY8vlSAX9HXy6AwjjiT5S612gBK6UyVGMGg4QgAPJovUwyOwuAA+KXJFIq8Q-MhqACifBoV24Kqiwc8srOVouNs5hWtXGZYVZShtAGU6IY9kIS1xY-ZGh9oiq-oDgSDoBCMykbVGOBRxEn2dwc1yaxxCwlNGPy5XGmO66NhK5UXlFqjZcBgNBAJ-agDi5QDz1oAqORtgBh-wADFoBT80AwdqAELdAG+mgBfUwCt1oB6M0AZCqAODlAE+6gAubQAxijeNr3s+gCziYAB8qAEAMgBBmoAOeaAJDm4EnoAK9aAMHxgAY8oAEoqAOV+J4-oAAKmAHLymFYYBXA-JaVCBGkcgMJIHRCHY7J2tEYa1DGUjQNwur5hw0ABjx4gyrUeQMIGw5kb0jTQGmNo-LM-RylQjBkkI0CbtAgDj8YAJ3aALhKgDTmo+gDkmrugDLfoA+uaPqRHDhkM7GceqCoMJ81G0S8aSMVwUbqvIWrQAAtNAACMADc0BOcG0QEqFDB+X5QlDEM3F0AIvHRC5dHuUxFwMG8XZDOpsGABragAU6o+gBNioAgV55SUoncAAsnwWpQnwAAe4kcH8FbGgoyUdZJCneg1TWku1cn1l0PUpWNi5CMupwJQttWyWUrLSV8U0rZorjzQtu3QOlbkMUxLZAjQ3QMAogXuOp+FEdhVnVQtixCAC4hCDte0JS0yl8o9CWrJ90AA-91UHfRHm2j8fYDu1661KsNnQA5+2vJ8IKwmwIKI3ZXFWjafGBmDmWefFCWiZxsn9cI0DetE+pdNAABkjPQPT1O0zx01zOmwkJWkzGcwUQh-b4iJpHwADW1XA0siPom6KPiJSayQOcTDqmqTByNwDJ0BO4Tsrm3QggSACcIgAMwEiCCgXCC7KBUF0BmyIBJEoFBKu9b0qomrGsAlrOtMiymiG1yoIuwATNbtv21wjuOy7btBZ7bs23HHCR9AWcux7zvm1bII+1Afu-AH2u6-rrJh9MJvmwArDHdsO07Sfu6nMcZ1nOfm3nLuFz7QA