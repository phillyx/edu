/**
 * 根据IP地址查找城市
 * 1.解析输入的IP地址池字符串，将其转换为每个城市对应的IP范围列表的映射
 * 2.解析输入的查询IP字符串，将其分割成单独的IP地址。
 * 3.对于每个查询IP地址，将其转换为长整型数值以便比较
 * 4.遍历每个城市的IP范围列表，检查查询IP是否落在某个范围内。
 * 5.如果查询IP落在某个范围内，计算该范围的大小，并与当前已知的最小范围进行比较。
 * 6.如果当前范围更小，更新最佳匹配城市和最小范围。
 * 7.将最佳匹配城市添加到结果字符串中
 */

function ip2Long(ip: string) {
    return ip.split('.').reduce((a, b) => (a << 8) + parseInt(b, 10), 0)
}
type T_CityIpRangs = Map<string, { start: number, end: number }[]>

function parseIpPool(ipPool: string) {
    const cityIpRanges: T_CityIpRangs = new Map()
    ipPool.split(';').forEach(cityRange => {
        const [city, range] = cityRange.split('=')
        const [startIp, endIp] = range.split(',')
        const start = ip2Long(startIp)
        const end = ip2Long(endIp)
        if (!cityIpRanges.has(city)) {
            cityIpRanges.set(city, [])
        }
        cityIpRanges.get(city)!.push({ start, end })
    })
    return cityIpRanges
}

function matchCites(ipPool: string, queryIps: string) {
    const cityIpRanges = parseIpPool(ipPool)
    return queryIps.split(',').map(ip => {
        const ipNum = ip2Long(ip)
        let bestMatchCity = ''
        let minRange = Number.MAX_SAFE_INTEGER
        for (const [city, ranges] of cityIpRanges) {
            ranges.forEach(({ start, end }) => {
                if (ipNum >= start && ipNum <= end) {
                    const rangeSize = end - start
                    if (rangeSize < minRange) {
                        bestMatchCity = city
                        minRange = rangeSize
                    }
                }
            })
        }
        return bestMatchCity
    }).join(',')
}

console.log(matchCites('City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City3=3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6', '1.1.1.15,3.3.3.5,2.2.2.3'))


// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUxOC0O2MCSAFQDOqAF1Qp+aD8jQc+qCA9KGARgDpBjyMATzQZPjBTRUBC3FDQAxtB1bUDJvQJjlAYf8DAdQN0VANvGAjY0BccoHnrQFRyBQJ-agFL1GyQMDBgF7VA6EqALCPqACM0AgOkUgAmCjQaZAR9EoOPAYDAlQE5KgBCNAqsqAbp0UZAQAwGAzKRmAcXJSFkzofEJigP6pgC6mgNHqgA6mgDwKgKdygP3ygCvWgMHxBgAspICyCYBhylIEiqqa3IADFpghyID0ZoBkKoC8IYAU6oAL5pKqgKGK3tCQAKykgEGagDnmta0d3dyAhdGA6d6Ap9Gq9IDkmoDwOtyAbnqAcHKAyvqAskqAT7qAp+70gADmq6qA2-GAMhFZvTAAbMMj+6qAL2brb4ANpqeAzvKAnMqAWUSCIAYlXOqnukAA7KReH8gQRAN+2gAKlQAMSoBlvxG1kAtHJEYDgcAAMwArgA7ADGABcAJYAe1JkGpAAdDAAZekAcwAFMyAFyQADOlIATtTSRyAJSQADeUEg8uFAFNKcThQzmaQBUyADbUylcgDkpANEtISoAJsTyYquVyAIYAGkgACMpQBeAB8kHtkAAPL7IAAOKUAakgTLtwoFisQpP1zqdxAADBKnSnwABfcCUgCeTMVkAAKgB9ADCepziCZACU7eKBZA3ZAALJ2pm+oWi8VO6WCymRyn80nEgC2zsVwqditJ5qHo-HwsgGYA2gBdD0EkkUmn08OR6NV5C02nanlMo8n-mdsWSmVy+Xk+lCyDkitV2vixUC-kl8u5991hyDZNqSioAO4tm2XISvejLnse2qajqeqGgA3CapCErSwoAKJ2uSAAWXKvrmH4cgWnp3vK1HUY+pLPsuJE5k6wqAYqq6Ni+FZkYqSG6vqBpuiasE0XRDFCgOVZTjOVYcU2rGfnxKEGg6wk0aJT6Un2A6ccybKclyEnCpSVYweptGaZA07mrpLLsuKXLWaZInUdShLegAhExAGfgKpAEXaArERWEpSrK5nmd5NZsX50b6kxTprmZEVZhFXH-tFvmkOR8UhR5pBMsSApEb2RmUtJNkZsl8pVbBSoqmq6WVpl5ECpmm5klSdIMiOdqUoRf5fmeF7aleIo3k6ACOxITs1359l2t7hRZ9FaVFPHAXuUYxvBJ7DQh1WQPVqoMtNs1VrFyECappq9UyZ6Nl6y2RZZzIAHKjrZ+kOcyh00dqyoul+lKtv1BF-jmnEGgaLnygDWkjmKPGcR9Y4TqQzYAIIABrFgAypjABiOHFogb2FjhADiOHVrDkBYYuxGWYxFYsTFHG0u560xWFdM0QprWYdheGEbapX9sZFVLu6T18xFbneu9n0ek2ZWQAAZOrcGo36TbWbzaWGytz4C4qePUgAXhRVkzpAAC02nGXLRsK1ypvm1bfqQIjpI8QbRsB-K45CqDA0VpxTHO4H3tI2xnHu5bipR2lqXRzVUe1SndPHY1wcg31Ye5rBVWkAAVrSYqGjd7XgGJJ68dqtLcr1YODUFBoQ8QbpkD3pDEA6vdkIYqGd93ffj8Q-eD33DwjxWPhun4S8Onkq+kDkc+5gvxg76QhgOk8h+kA8KmQAa0-EP0DpL6QfhX7vxg+CaEpAA

// https://blog.csdn.net/banxia_frontend/article/details/135095983