/**
 * https://leetcode.cn/problems/permutations-ii/submissions/321588746/
 * https://blog.csdn.net/banxia_frontend/article/details/134911010
 */
function permuteUnique(n: number, line: string) {
    const chars = line.split(' ').sort();
    const res: string[][] = []
    const queue: string[] = []
    const used: boolean[] = []

    if (n === 0) return []

    const backtrack = () => {
        if (queue.length === n) {
            res.push([...queue])
            return
        }

        let prechar = ''
        for (let i = 0; i < n; i++) {
            const cur = chars[i]
            if (used[i]) continue
            // 当出现重复元素时，比如输入 nums = [1,2,2',2'']，2' 只有在 2 已经被使用的情况下才会被选择，同理，2'' 只有在 2' 已经被使用的情况下才会被选择，这就保证了相同元素在排列中的相对位置保证固定
            // if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue
            if(prechar === cur) continue
            prechar = cur
            
            queue.push(cur)
            used[i] = true

            backtrack()
            
            queue.pop()
            used[i] =false
        }
    }

    backtrack()
    return res
}

function resolve(){
    const n  = 3 ;
    const line = 'a b c'
    const arr = permuteUnique(n,line)

    arr.forEach(row=>{
        console.log(row.join(''))
    })
}

// https://www.typescriptlang.org/play?target=99#code/PQKhCgAIUgLAXeAHAzgLmMANgUx-AYwHsATHAOgIDtgkAnIgI1wFsVac6WBXeAQ3gBLIlRQBaQYOApujFoJQpho4AGYATAEYArAA5dAdgAsANmBQYCZOkzMiAc0ooSVclXzBGfKgA9BfAH0AMwYqeBwqEmA+OiECXGAyfkEsdk1VIwBOTU0ABjyLcyDuKgIhEUgkTh5wgFUqQQBHbhwACio0SCpuFkZOABpILEF3TpR4OhH7AEpIAG8oSCXiUXhIAlgYlEgAXiGRihQkYfhWgHJIM+nyFCJY1umAbkXlkXHIOhx0SHHJqnsANoAXWBu0gwJe6zea2aOBaYwmU1BewhS1eq0g3BQOBInUYRCIuG8yPBQPAkMEQUg7V2Oz2uVmn3g3DoVFJ5LRUIxXgIAGsJnw+WCHrsAHzzSGcynU2Etci4f7wWC0vZUWYLTmatGfFDkJBY2CtAHkE2ynBA6aSrUffAsqhWpYAXw51twa3oOA2MTBZzODsgQTu1LdkEEYNyj1DkAAPF1I4IANQJ9X+zkrd4EFlgr10FAAwRk62a6WtLE4-MWrlCbo4VNozCQQDK+oAvxUADc6AWcTALCagGFFQAEvoA300AMP+AFetAEGagGT4wCmil0etsUZp+upF2dl2cgYP1BdAFfKgEhzQAU6pB1JBAE+6gHm-QDVEYB-eUAFK6AELdAKMGgFbFQDQcoBZI0AWPLnwCQCYBLo0HgBgVQAwFw3X1IF3A9NxPC8bwfF8P2-P9AE34wBGHUAXflAEHowAwuUAD7d-z7PdACTjQB0JUAWjlb2wwBP7UAWXlADt-DDAC+1QAs7TrJYGxLMNxVySAADJuPWTZcwrFV+K2fNIDESBNCBHi+IAQjLEgxIkqTZhWasWhY0MglaD0c2EzM6FUkR1NrItOV0gTsxZTTNLNPUDVaAzLTMtEFKEvYJg0zSeX5OhBV5B4bJcpY7KQIgkEC4LMWxRSC12II+FSUzrWdTlnUhHyBT5SLtVtVkbRQcB0uKUpyjZHVCQANzaaYNTRdM1jZMFVEgZ402hfZ3B9PhIEYdY-XajEYjoMEqi4XgcHqJoWnafphncS1IWG8hAzoABRQVDQYAB3HZRTqrV00JCgsAcVodvIAArIgRnOK5nLRR1LWdCqsGqh4gA