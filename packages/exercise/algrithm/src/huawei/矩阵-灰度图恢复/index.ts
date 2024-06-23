// https://blog.csdn.net/m0_73659489/article/details/135169079

function recoverGrayImage(input: string, position: string) {
    const arr = input.split(' ').map(Number)
    const [x, y] = position.split(' ').map(Number)
    const N = arr[0]
    const M = arr[1]

    const matrix = Array.from({ length: N }, () => new Array<number>(M).fill(0))

    let index = 2

    let i = 0, j = 0
    while (index < arr.length) {
        // 填充矩阵
        for (let k = 0; k < arr[index + 1]; k++) {
            if (j >= M) {
                // 横向已填充满，进入下一行从col0开始填充
                j -= M
                i++
            }
            matrix[i][j] = arr[index]
            j++
        }
        index += 2
    }
    
    return matrix[x][y]
}

console.log(recoverGrayImage('10 10 255 34 0 1 255 8 0 3 255 6 0 5 255 4 0 7 255 2 0 9 255 21', '3 5'))


// https://www.typescriptlang.org/play/?target=99#code/GYVwdgxgLglg9mABAJwKYTgN1cg4sgQwE8BJAWwIHNUAKGMABxCgC5EBnKZeygGkQZx2MWAjaduYSgEpEAbwCwAKESrEGMJ0QFkyRAF5E9JlAB07BgBsRNAOSJb00xQY0AciDIAjHNOVr1BC0AbQAPfiIAXQMBIRF4MHMrG3tHZwJXD29ffzUNLTcYnWRggAZI3NV8qEQAWSLdYIBGCqVKwM0aii4YUJiAQV1iU2BkODIaOURLVCkoAAs2QoBffhpZfQA+RDBUAHdEQcIiAB4wTx9kTZpap2AYS0saUuk-NpU1GZr6ABNUPsMACZlO0vkYYqV+AArCHtPbzB6oRB0MB-PonbS6UwzObzWSKD4BVQAemJiEA1hqAUUVAJfugFY09oBYBwPQ0MEAawhAG5EByMcVgr9-ogANSIFrctnC4X4hlE1QwYDImGbQy3eSyuUBUmIQBUVoBEFUAT7pUwCHdoAYf8A2-GAU0VANBygAA5QAyEYA5uQwllKgAB9QDTmlSNZrVDCALSqn2+mBS4NqZbh1TdbihAWRYJQ6KGfmC0KtX0BKFhwlEyO5gJpkVA9r5gLtNBQEDIJAx3phBNRZT55T5OAzbFwSg0NAYbB4Y7kKi0WxNUpi8eAgCsU8QAGYACyIcdNRDT2cADmX87XM8QADZt7P14gl+OAOy74-bgCcV7XTVs-Fsc8QU8c0iAA