// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUxjyMMe1D1ToK39BvpoF9SowEwAYBcAjNoOn6gDEp755TjYDM+ArAJznbZXY3FMAc5hRkULdeTUmUJjGjGvXFsGjOjVzMiAdnJqizVRvy5+ZI4dxZg4cADMArgDsAxgBcAlgHt7kACYBTR+5+ACquALa+ABRu4fiQAM7OAE6u9gDmAJSQAN5QkHkANr7OkAD60b6QALyQ5QB0cQAO+a7OEQDk+G3pANy5eQH2CZAAEsNVpeUA2rgAun2QA0MAskvjZWG+k4Rzef2eQwCGiYnjk6MANJArO7uLxeUAMq4JsQnJaZMzp3Pzd5CpRSWKRC4XGEUylQAfNl5rsFvt7uMlgdnAALWqhFIRWo4x7PZwYg4NCIAOVsoQARr5Eul0rDdokirZEl5igAeSCEXCQAD8kAABrgACRZZwAX35kFiBOc7gAykkUqlwfMxfN5tZ3CcIoViq5xrhupB9Ry6oU0mija4ANTWzI5OFw1zWSBRDaTVxfSreyAdLrw+xuey2Xz0vKa7W6yAAKwNRtjpo2tXNqUtMdt9rDjudrqm0a9Pr9mQGQZDWbhf2coQacXG-JFU09Yob7vzEvLuxzEQAhHiErUUo58rY-HEotW4rSYY6Z46+wSGrY4qjxzW6bPHWqN1vdmr5vP6lrWhEDpcKRDodaDpAALSQa3n377dyFZPuZXz9e7KPWfIHVLjNYBz5HEoZwhGrpRqEkDuC6n7TrOXZXscWxfBy1rQQAZJh97QRyABsuCZhucJHIkqHjKEHbhn+AHVEkZYkbsFKMgcADWWY7nke5Oi6Pa-v+xGzhBOpFJAqIwXBGxPAkQlMUhZHTGh94SdhKmQBy2AACxyUxuyKbM4yotRjqKds4wAs4QL2CCkRfnpuwCXRNSJIxDnMaxHEOVxm6qlYvGut2Tm6aRKGGdUlnWbZKobmZXr-ICwIbDFu7+QyTIspAZG1NG7hYkW4B7sAwABnEL6+G+yp+AEwTJW0lDEF0dLFaV5WVRE1WBL40VtDwjC8E14CLG1+Tvh1-hdT18gsE1QA

/**
 * https://blog.csdn.net/SD_JZZ/article/details/132666591
 * 
 * 解密犯罪时间
 * 20:12得到20:20
 
23:59得到22:22
 
12:58得到15:11
 
18:52得到18:55
 
23:52得到23:53
 
09:17得到09:19
 
07:08得到08:00
 */
/**
 * 解密的规则
 * 先找出时间的所有排列组合
 * 1. 如果取得到最近的分钟M，则时钟保持不变 MM <RESM<60 更新分钟
 * 2. 未取到最近的分钟，能取到最近的时钟  HH<RESH<24  更新时钟，分钟取队列最小值
 * 3. 未取到时钟，分钟和时钟都使用队列最小值
 */
function decodeTime(time: string) {
  let _time = time.split(':')
  const HH = _time[0]
  const MM = _time[1]
  const arr = [HH, MM]
  const timeList: string[] = []

  const getMinTime = () => {
    const t = Math.min(...timeList.map(Number))
    return t < 10 ? `0${t}` : t.toString()
  }

  // 找出时间的所有排列组合
  for (let i = 0; i < time.length; i++) {
    if (time[i] === ':') continue
    for (let j = 0; j < time.length; j++) {
      if (time[j] === ':') continue
      const tmps = `${time[i]}${time[j]}`
      if (!timeList.includes(tmps)) {
        timeList.push(tmps)
      }
    }
  }
  // 升序排序
  timeList.sort((a, b) => +a - +b)
  console.log(timeList)

  let flag = false
  for (let m of timeList) {
    if (+arr[1] < +m && +m < 60) {
      arr[1] = m
      flag = true
      break
    }
  }

  if (!flag) {
    for (let h of timeList) {
      if (+arr[0] < +h && +h < 24) {
        arr[0] = h
        arr[1] = getMinTime()
        flag = true
        break
      }
    }
  }

  if (!flag) {
    arr[0] = getMinTime()
    arr[1] = getMinTime()
  }

  return arr.join(':')
}

// console.log(decodeTime('20:12'))
// console.log(decodeTime('12:58'))
console.log(decodeTime('23:59'))
