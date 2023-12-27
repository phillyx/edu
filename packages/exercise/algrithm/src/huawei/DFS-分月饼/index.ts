function distributeMoonCakes(m: number, n: number) {
    let res = 0;
    // 可行的排列方案
    const sumsTypes: number[][] = [];
    /**
     * @param userIndex 分配到第u个人
     * @param remains 分配到第u个人时剩余的月饼数量
     * @param min 第u各人应该获得月饼数量的最小值
     * @param max 第u各人应该获得月饼数量的最大值
     */
    const dfs = (userIndex: number, remains: number, min: number, max: number, nums: number[]) => {

        if (userIndex === m) { // 如果分配到最后一个人
            if (remains === 0) { // 剩余数量为0，分配完毕
                res++
                sumsTypes.push(nums)
            }
            return
        }

        if (min > remains || remains < 0 || min > max) {
            return;
        }

        // 假设第u个人获得的月饼数量x,那么第u+1个人获得的月饼数量的x1的范围一定是x<=x1<=min(remains-x,x+3)
        for (let i = min; i <= max; i++) { // 遍历min到max之间的值
            dfs(userIndex + 1, remains - i, i, Math.min(remains - i, i + 3), [...nums, i])
        }
    }

    dfs(0, n, 1, n, [])
    // console.log(sumsTypes)
    return res;
}

function resolve(line: string) {
    const [m, n] = line.trim().split(' ').map(Number)
    console.log(distributeMoonCakes(m, n))
}

// resolve('3 5')
// resolve('2 4')
resolve('3 12')
// https://www.typescriptlang.org/play?target=99#code/GYVwdgxgLglg9mABAExgZygJxgIxFAUwFk4EBhAQwGsC0AKAWwC5EwQGcDMAaVltjlwCUiAN4AoRFMQAbAlESZaiALyIADAG5J0gPS7Ege+VAMhGAQt0BJxoHQlQJ2mgCQsdUiAgyI07NABUAngAda-dk5MAG0AXTDVRDDtaURdACp4hyl4xAABHwpMCgZEEDQuAEkwZAIAD0RAMCVAWUTABiVAGm8QQCo5QC65ZMRUjKycxQIGChgwNCq6xtbAN9NASyVATXlTQAhzQB9MwAdTQHnE9s7M7NyGQcRGwBAVFsAUvUBT6MB24MB0-UXV00AAc0B4HUAeBXX0zZ7+ioPj86vllbvAOSaz1iHV0yScQwUyGAwzUdHyRRK5QCgh4vX6gzQKKCvB2YGxXFxFDKBLRAixrECXDCIhUAD4xOJ2tIYMBEPCCphiqUKio+YgGCJRHEDIAgzUAOeY1Wq3QBwKoAAOVazJBiFZ7KUGKGqn56iFIsQM1WgC45dSAGH+aoAY7UAq9ZK5XSJRoADUDptttc7m8fjQADofPkABZ0clCF3SAC+IakSigIEwYBt4ZtqsYuwZ6oGmoAPhn0enhgAeDSILMClMC4lCiO9aOxmK2hOu-SIQAFSoBFvMATkFjFqXeZ-MrcQDFCYAJOUaDoAjK1u9d-mVR6ZAMDBgBe1OWALO1APRmZTzKhnm7xdDTmIAtH2yg6AMzB13AOCYdlyBQwSJ4zQqxCbstlZ8wJ26xuAWQTAGHKeK1B8gDScoAL6mmMCrrSNC9AIlySIVA6iCjrw+6ageKq8DAvBEBQUB+l6u7ocMmE4S+yHnrwwRerR5LYaEF51sk9YwTCdDqLwYC8KhrDUYxySNhCaBwHIXoyHAADmdBuAwni+LQTGRvIMZIPa2gJqAkCwAgvQiTIABuBB0DIgwECwGDYGAkkVrEwkKMEDBcaEkSmWABBelgMAMHQQhemgPimVAdAAOSICFfn9D4dAAHJUpgSmIMJokeRJ0moJZuD4MQpBgJQND0E5rBCMGCaNvaolGaFp6IAArBF4jlbQlXGSFABMiAACwNRVhmtTVo5tRFQA

// https://blog.csdn.net/m0_73659489/article/details/134802773?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522170341443716800186596583%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=170341443716800186596583&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-134802773-null-null.nonecase&utm_term=%E6%9C%88%E9%A5%BC&spm=1018.2226.3001.4450