function balancedStringSpit(str: string) {
    let numX = 0
    let numY = 0
    let cnt = 0;
    let res = 0

    // for (let i = 0; i < str.length; i++) {
    //     if (str.charAt(i) === 'X') {
    //         numX++;
    //     } else {
    //         numY++;
    //     }

    //     if (numX === numY) {
    //         res++;
    //         numX = 0;
    //         numY = 0;
    //     }
    // }


    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === 'X') {
            cnt++
        } else {
            cnt--;
        }
        if (cnt === 0) {
            res++
        }
    }
    return res;
}

console.log(balancedStringSpit('XXYYXY'))

// https://www.typescriptlang.org/play?target=99#code/GYVwdgxgLglg9mABAIwIYBtWQKYBMDKUATjGAOb4AOMUAFAM7EBcijJ5AlIgN4BQiAxOmxREYEAFsAGogC8iAAz9Bw0eIkBNOYuUDViCGFHyFAbl1CRiItnralFgPSPEwOEUS19Me6cQ+AHlZiADphcigACz8YAGpYrj5BRGdk-2BPNhCISNQiAEE6GC5ZUsQAcilyxKcXNMF1KXjzZNTkgF9EbHR6bB5a+obJDWaBjt4xwRgM2ka5MvUNGta6wZt6UZXBgTmTFsE2wcXfSYF2gfOJ5LcPLysfPf9EIKzwsiiY+OXB6czQnLyhVoxXm8kq1X622Shig8QsHS6PT6SShAhhAFp0ft6udtr9aDDQYpvqj1nDtrjBJSBDYoCAiEh1uZLhAEPQ4MIwnAyLQ0JgcARiKQKNQ6JUpBoNBLqhwgA