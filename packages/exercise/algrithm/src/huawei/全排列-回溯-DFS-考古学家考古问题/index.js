function permuteUnique(nums) {
    nums = nums.sort((a, b) => a - b);
    const res = [];
    const queue = [];
    const used = [];
    const len = nums.length;
    if (len === 0)
        return res;
    const backtrack = () => {
        if (queue.length === len) {
            res.push([...queue]);
            return;
        }
        let prevNum = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < len; i++) {
            if (used[i])
                continue;
            // 当出现重复元素时，比如输入 nums = [1,2,2',2'']，2' 只有在 2 已经被使用的情况下才会被选择，同理，2'' 只有在 2' 已经被使用的情况下才会被选择，这就保证了相同元素在排列中的相对位置保证固定
            // if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue
            if (prevNum === nums[i])
                continue;
            prevNum = nums[i];
            queue.push(nums[i]);
            used[i] = true;
            backtrack();
            queue.pop();
            used[i] = false;
        }
    };
    backtrack();
    return res;
}
;