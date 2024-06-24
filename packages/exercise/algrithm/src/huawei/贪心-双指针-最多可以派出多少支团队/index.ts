/**
 * https://blog.csdn.net/m0_73659489/article/details/134873761
 */
function getTeamCount(minAbility: number, abilitys: number[]) {
    const N = abilitys.length
    abilitys.sort((a, b) => a - b)
    let left = 0, right = N - 1
    let teamsCount = 0
    while (left < right) {
        if (abilitys[right] >= minAbility) {
            console.log('right >',right)
            teamsCount++
            right--
        } else if (abilitys[left] + abilitys[right] >= minAbility) {
            console.log('sum',left,right)
            left++
            right--
            teamsCount++
        } else {
            console.log('---',left)
            left++
        }
    }
    console.log(left,right)
    if(left === right && abilitys[left] >=minAbility){
        teamsCount++
    }

    return teamsCount
}


// console.log(getTeamCount(8,[3,1,5,7,9]))
// console.log(getTeamCount(8,[3,1,5,7,9,2,6]))
console.log(getTeamCount(8,[1,1,9]))