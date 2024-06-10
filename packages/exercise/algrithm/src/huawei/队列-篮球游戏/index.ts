/**
* https://www.typescriptlang.org/zh/play/?target=99#code/GYVwdgxgLglg9mABAcwKZQEIEMDOBrdbAGyIHkQoBFEVGgChjGtQC5EwQBbAI1QCcA2gF0ANIjgVmbDj37CAlIgDeAKETrERdIj6ociALyIA5MbUaICHFEQBHGocTDEudl16Ch59ZbDXEAHKOjMwAdFpgyFAAFireiADu0TBaiAxMNOGokTGIAHyIAAyKqhpldpkADiA40elhtTDAUHTyAITy8WVJKahp9qhZOdH5RSVd5T5WNlCclY4SVJlYLcUTk77+Ws2LjgMChV6TG9M6MMjRULtGA6ErdAC0AIyd6+VNadtXFIYGRrOVcbHYHiSSZRrNVpvYG3CEtTog466fQAaiMxgAMmZoRoAL6IVBEHB9D50PjnS7XP6IAFAxHlRYNZKQhH0sq3SpwSpQtllZGINEmABKZjZ+MJxOUOMm3F0WDwcTFiuOuOV6lV8V0UBAfCQQT+RmRQyiIwA-Do9Ig2MYAqQzBrNnAtOE4Mg6GhMLgCJ6SOQlrRUHQBAAWEQAVhEADYRAB2ESFERPEQAJlEAmjoYTSeT4djQnknUdzqIrvdhC95d9YIDQdDEejcazKbT0YTEezIlDMfzhasTsGJbdHuw+ErZGr9AEHYAzJ20zPwz2gA
 */
function getBasketBallOutQueue(inQue: number[], outQue: number[]) {
    let res = ''
    const que = [] as number[]
    const N = inQue.length

    while (inQue.length > 0) {
        que.push(inQue.shift()!)
        while (que.length > 0) {
            const tmp = outQue.at(0)
            const leftout = que[0]
            const rightout = que.at(-1)

            if (leftout === tmp) {
                outQue.shift()
                que.shift()
                res += 'L'

            } else if (rightout === tmp) {
                outQue.shift()
                que.pop()
                res += 'R'
            } else {
                break

            }

        }

    }

    return N === res.length ? res : 'NO'
}

console.log(getBasketBallOutQueue([4,5,6,7,0,1,2],[6,4,0,1,2,5,7]))
console.log(getBasketBallOutQueue([4,5,6,7,0,1,2],[6,0,5,1,2,4,7]))
console.log(getBasketBallOutQueue([1,2,3,4],[1,2,3,5]))