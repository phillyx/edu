// https://blog.csdn.net/banxia_frontend/article/details/134908319
// https://blog.csdn.net/m0_73659489/article/details/135011388

const EDGE = 18

function getQI(whites: number[], blacks: number[]) {

    const counting = (alias: number[], enimies: number[]) => {
        let count = new Set()

        for (let i = 0; i < alias.length; i += 2) {
            let x = alias[i]
            let y = alias[i + 1]

            let pos = `${x}_${y}`
            count.add(pos) // 将己方棋子添加到集合中

            // 分别检查四个方向，存在气则添加到集合中
            if (x > 0) {
                count.add(`${x - 1}_${y}`)
            }
            if (x < EDGE) {
                count.add(`${x + 1}_${y}`)
            }
            if (y > 0) {
                count.add(`${x}_${y - 1}`)
            }
            if (y < EDGE) {
                count.add(`${x}_${y + 1}`)
            }
        }
        // 计算得到的气数（Set去重）
        let res = count.size - alias.length / 2

        // 减去敌方棋子占据的点
        for (let i = 0; i < enimies.length; i += 2) {
            let x = enimies[i]
            let y = enimies[i + 1]

            let pos = `${x}_${y}`
            if (count.has(pos)) {
                res--
            }
        }
        return res
    }

    console.log(counting(whites,blacks),counting(blacks,whites))
}

getQI('0 5 8 9 9 10'.split(' ').map(Number),'5 0 9 9 9 8'.split(' ').map(Number))

// https://www.typescriptlang.org/play/?target=99#code/MYewdgzgLgBAogEQOJxgXhgRgBwFgBQBAZgK5jBQCW4MA5gKZQCKAkgBQDuAFpVPRAC4YYEgFsARvQBOAbQC6AGhjiANgENgAa0HCxk2XICUMAN4ECMSzFCRYoMlTC10MNmpWU1OkROnyl9GCUopT8Qj768sZoAHymFlaJKozWIA4uYPQcMADKjGyG5viJiUQgUq7JsJQuAAwA3DA1ADww7p4QAHTJTlBcjTUA1BgATMZmxSVTVTAAHi7tXjKUcglTSSkAngseS0NYq4ST61YzAA4gEC4ABgAkJrMAvgD695uP12snqQ6dagAm-zYFwgxgA9GCYIAwHUAj7qATtNANMWgAVtQDftoACpUADEqAMbTABAqgFo5IrfKwQmCAMCVANRKgAGLQCn5oBttUAVHJwwCIKoAYf8AGtqACnVACg2gEwldHY-FfE6UIiueZxWrjIVEn5gKB-QFsO4PGAAWiwLzeH0Kx2+j2lUxFYpgrUQKCluplsvlAKByvmgw1rxM72uOqt+st6yNbG2EotVsS9jlCrt9yezu26sw2oNJU9Vp921NyDgAcDlmDNsV9s1LpgjpjbrjiQT6zLUxJgELowDp3oB0-QxgBC3LmAB1NABD-eSggG7lQCziYBIf7jMyk-BcWc6EEoAC96Gq2rsuj1aH0YJCRoT1iTAPOKXcAMqaIpGAA2VAHbGjcAnQ5xsoVNgzGoYBpNE0wQLBUILwJL-oP4YwMbxL3TFJ5gwZ8Qn4ZZDitGZtmAoJQIgZYCwOdciXOS4bnDPNXRLKwfTHLgvGBS5DHTDNhwgVVVWwywK3jONhygEgpDAGAyK+T0vhsCAQGSboQFoNgs0oJxOB4PgIAUVQNG0QwFEE4TJK0cTuF4fhiIIdj8AYZh2AAclqGAAFYYGwGAAE4zKwWodPHM4PCgNgdJgHTDE6UQ1DONgADk9GkGSdKM-TzKC4zrIgWzeAcpyXLcjzvN8KRiKAA