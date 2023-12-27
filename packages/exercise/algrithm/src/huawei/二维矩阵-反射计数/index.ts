/**
 * 1 -1 ==> Y === 0 && X !==0 =>(1,1)  ELSE Y !==0 && X==W-1 => (-1,-1) ELSE (-1,1)
 * 1 1  ==> Y === H -1 && X !== W-1 => (1,-1) ELSE Y !== H-1 && X=== W-1 => (-1,1) ELSE (-1,-1)
 * -1 1 ==> X==0 && Y!== H-1 => (1,1) ELSE X!==0 && Y == H-1 => (-1,-1) ELSE (1,-1)
 * -1 -1 ==> Y==0 && X!==0  => (-1,1) ELSE X===0 && Y!==0 => (1,-1) ELSE (1,1)
 * 
 * 边缘碰撞条件
 * x == 0 || x === W -1 || y === 0 || y === H - 1
 * 镜像判断
 * 
 * i = 0
 * while(i < T){
 *  [x,y] = point
 *  i++
 * }
 * 
 * 注意 根据题目 X Y  在二位矩阵中是反着的
 */

function getReflactCounts(W: number, H: number, X: number, Y: number, SX: number, SY: number, T: number, arr: number[][]) {

    let i = 0;
    let count = 0;
    if (arr[Y][X] === 1) count++;


    while (i < T) {
        debugger
        X += SX
        Y += SY
        console.log(X, Y, arr[Y][X])
        if (arr[Y][X] === 1) count++;

        if (SX == 1 && SY === -1) {
            if (X !== 0 && Y === 0) {
                SX = 1
                SY = 1
            } else if (X == W - 1 && Y !== 0) {
                SX = -1
                SY = -1
            } else if (X === W - 1 && Y === 0) {
                SX = -1
                SY = 1
            }
        } else if (SX == 1 && SY === 1) {
            //  1 1  ==> Y === H -1 && X !== W-1 => (1,-1) ELSE Y !== H-1 && X=== W-1 => (-1,1) ELSE (-1,-1)
            if (X !== W - 1 && Y === H - 1) {
                SX = 1
                SY = -1
            } else if (X == W - 1 && Y !== H - 1) {
                SX = -1
                SY = 1
            } else if (X == W - 1 && Y == H - 1) {
                SX = -1
                SY = -1
            }
        } else if (SX == -1 && SY === 1) {
            // -1 1 ==> X==0 && Y!== H-1 => (1,1) ELSE X!==0 && Y == H-1 => (-1,-1) ELSE (1,-1)
            if (X === 0 && Y !== H - 1) {
                SX = 1
                SY = 1
            } else if (X !== 0 && Y == H - 1) {
                SX = -1
                SY = -1
            } else if (X === 0 && Y == H - 1) {
                SX = 1
                SY = -1
            }
        } else if (SX === -1 && SY == -1) {
            // -1 -1 ==> Y==0 && X!==0  => (-1,1) ELSE X===0 && Y!==0 => (1,-1) ELSE (1,1)
            if (X !== 0 && Y === 0) {
                SX = -1
                SY = 1
            } else if (X === 0 && Y !== 0) {
                SX = 1
                SY = -1
            } else if (X === 0 && Y === 0) {
                SX = 1
                SY = 1
            }
        }

        i++
    }

    return count
}
function resolve() {
    const [W, H, X, Y, SX, SY, T] = '12 7 2 1 1 -1 13'.split(' ').map(Number);
    const arr2 = new Array(7).fill('001000010000'.split('').map(Number))
    return getReflactCounts(W, H, X, Y, SX, SY, T, arr2)
}
console.log(resolve())