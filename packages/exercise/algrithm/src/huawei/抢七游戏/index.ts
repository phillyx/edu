/**
 * https://blog.csdn.net/m0_47384542/article/details/135236801
 */
function winGame(M: number) {
    let count = 0
    for (let i = 10; i <= M; i++) {
        if (i % 7 === 0) continue // A WIN
        for (let j = 1; j <= 3; j++) {
            if ((i - j) % 7 === 0) {
                count++
                break;
            }
        }
    }

    return count
}

console.log(winGame(20))

// https://www.typescriptlang.org/play?target=99#code/PQKhFgCgAIWgLALogDgZwFzGAIwDYD2A5gHQDGaAJgHYnUCmiwAtgAwD6ALAOwDMAHJwCsnAEzAAhgCdEASzJ56wSowmy8aYAEZeQ0bwBs-VlqixgUAGYBXamTkFq0AO6zqAcQnN6ACgCyGNDU1sw49FIAlNAA3mbQ8YqI0GQEtkkAvNCscfGWBFLQPonQstCZWqwA3CXQADyZftWyANTNUbEw8V3xspaFpQCk0Nxl6ZmsUSnUcsH00NjQAILQAOoAkgByOd3QeQVFjNAAVmXQWtUn9dC8F63t2ztdvYU+pQC0x1FDI2Pj952PQHJVLTVoPIFdHBSegSADWlXBjwAvojoCiAWioNtoYhrFInCk0lB0VApmgCIoSIQiD5XB4vL5RBMIkA