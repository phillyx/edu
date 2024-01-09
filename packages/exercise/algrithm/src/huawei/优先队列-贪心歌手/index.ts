/**
 * 1. 总天数减去路上花费的时间
 * 2. 剩余天数 计算每个城市带的天数的各自总花费
 * 3. 取{{a(0,0),b{1,n)}},{a(1,1),b(2,n)},{a(1,2),b(3,n)}....{a(2,n),b(1,1)}和的最大值
 */


/**
 * process.stdin.resume();
process.stdin.setEncoding('utf-8');
let input = '';
process.stdin.on('data', (data) => {
    input += data;
});
process.stdin.on('end', () => {
    const lines = input.trim().split('\n');
    var [t , n] = lines[0].split(" ").map(Number);
    const a = lines[1].split(" ").map(Number);
    for (var x of a) t -= x; // 先减去路上开销的天数
    const b = [];
    var val = [];
    for (var i = 1 ; i <= n ; i++){
        var [m , d] = lines[i + 1].split(" ").map(Number);
        for (var j = 1 ; j <= t && m > 0; j++){ // 把第i天的价格序列模拟加到val里
            val.push(m);
            m -= d;
        }
    }
    val.sort((a , b) => b - a); // 对val排序取前t大的数。
    var ans = 0;
    for (var i = 0 ; i < t ; i++) ans += val[i];
    console.log(ans);
});

 */