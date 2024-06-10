/**
 * https://labuladong.online/algo/data-structure/monotonic-stack/#%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E7%8E%AF%E5%BD%A2%E6%95%B0%E7%BB%84
 * https://www.typescriptlang.org/play/?target=99#code/G4QwTgBAdgpgHgFwDIwM6oKIBsYFsZQIQC8EAZgK5QDGCAlgPZQQAUUFuqAXNBwEYwwAbQC6ASggBvAFAQ5EUJGal2nAHQ4oAcwQALANyz51JqiK6YWAA6CSrCcQB8Uo-PkB6dxEAa2oD5TQCregBIWgCFugA6mgCN+rm4K4BBgaHawAO4QAIJgYCAAnmxiamR0WFgsAAxihtHyihBmINQA1naiECCovLgCwiIVlRCeEIBICoAC7oAB+oAQFoAzib5Rbv1kDJAs1XSJEAC0EACM+hArjqQlO3RraxIyvX1ebkm6hTCstQ0aBDq6EABk7zUIdfVqIAgWGtNmIAIQQfbtVBCOjiFwXfoXR5-KwMKwscozDxXeQAXyxckR2KhMJEEEA1XGAOBVgoAXs0A5JqAYUVAAS+BMu0WRaisFFQujYHGhsMxCK8+OFEBMUFQDBwGgYWhYyLErP6-QigEhzQD1zoAYf8AsJqANiVAABygEJrLWAWMUjYBzI0AMhHKrzzRbLVYbba7CEHI4nM626I3O4PH5PTSvD5fDkAoEg8GQ1QCuHnXpEyoc1HooUJnFyUXp6L9GOkinU+nM71ueKxuwcoN6CAAfm+v3+gOBEh4hxLxlM0pgsvlZbUACsGHQoBilWK3Mnuby84KepVE+LOzKsHKFQG-oPh6PvfjWfbWI7SAAmABUzGdRzdEEOu098Iu8l9OH9Darb0+9ae4ebUZU-JhEAAKTQHGrJIuunJohic4PlmD5sjOZJUrSjIsvBchlgBwFQGSpCVi81Z1mGTYghArYwRcEpSsuq59puI5iGO6GTjyfKcFhIFpvBVFdj2a4NvR24XLulFLt2K7yoqrI8TRvZoExlTxAgFBgMwZYwbuURUUQODoHYFjWIIGJRP0gA28YAaMqAAhGgAEZoAIDqAFj-zIQHA6zOC5wSANByBqAFRygDwOoAcXLBMWbjaRAumoAAsiAViJDAKRRamMH7iwOBECs7qugAPNARwANS5V6FzhQlaioDAgKIQANGFaCxgpEAiR2kpEGWsUpOkmQ5FAeQFEUpT1clqWuhlKzZVAeUFfeiloPmf7sbCEC5TV6AlVo5VsXVURwYukq8RJLBlvVSkqWpaDSLihiwIgKDoNgeAEICQgAMzVZsACs1UAGyvQALOIQA
 * https://blog.csdn.net/m0_73659489/article/details/134610765 
*/

var nextLessElement = function (nums: number[]) {
    var n = nums.length;
    const helper = () => {
        // 存放答案的数组
        var res = new Array(n).fill(0);
        var stack = [] as number[];
        // 倒着往栈里放
        // for (var i = n - 1; i >= 0; i--) {
        //     while (stack.length && stack.at(-1)! >= nums[i]) {
        //         stack.pop();
        //     }
        //     // nums[i] 身后的更大元素
        //     stack.push(nums[i]);
        // }
        // console.log(stack)
        // // 数组有环，复制一次，再次执行
        // for (var i = n - 1; i >= 0; i--) {
        //     while (stack.length && stack.at(-1)! >= nums[i]) {
        //         stack.pop();
        //     }
        //     // nums[i] 身后的更小元素
        //     res[i] = stack.length ? stack.at(-1) : 0;
        //     console.log(res.join())
        //     stack.push(nums[i]);
        //     console.log(stack.join())
        // }

        for (var i = 2*n - 1; i >= 0; i--) {
            while (stack.length && stack.at(-1)! >= nums[i % n]) {
                stack.pop();
            }
            // nums[i] 身后的更小元素
            res[i % n] = stack.length ? stack.at(-1) : 0;
            console.log(res.join())
            stack.push(nums[i % n]);
            console.log(stack.join())
        }

        console.log(stack)
        console.log(res)
        return res;
    }


    const less = helper()
    // 转化成映射：元素 x -> x 的下一个小于的元素
    const lessMap = new Map();
    for (let i = 0; i < n; i++) {
        lessMap.set(nums[i], less[i])
    }

    const res = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        res[i] = nums[i] + lessMap.get(nums[i])
    }
    console.log(res)
    return res
};
nextLessElement([3, 15, 6, 14])
