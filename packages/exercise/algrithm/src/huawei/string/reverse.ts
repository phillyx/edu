/**
 * 给定一段英文文章片段，由若干单词组成，单词间以空格间隔，单词下标从0开始。
请翻转片段中指定区间的单词顺序并返回翻转后的内容。

例如给定的英文文章片段为"I am a developer"，翻转区间为[0,3]，则输出"developer a am I"。

String reverseWords(String s, int start, int end)
输入描述:
使用换行隔开三个参数，第一个参数为英文文章内容即英文字符串，第二个参数为待翻转内容起始单词下标，第三个参数为待翻转内容最后一个单词下标。

输出描述:
翻转后的英文文章片段所有单词之间以一个半角空格分隔进行输出

下标小于0时，从第一个单词开始

下标大于实际单词个数，则按最大下标算
 */

export function reverseWords(s: string, start: number, end: number) {
    const arr = s.split(' ')
    const len = arr.length
    const before: string[] = [], after: string[] = [], mid: string[] = []
    if (start < 0) start = 0
    if (end >= len) end = len - 1

    arr.forEach((x, i) => {
        if (i < start) before.push(x)
        else if (i > end) after.push(x)
        else if (i >= start && i <= end) mid.push(x)
    })

    mid.reverse()

    const res = [...before, ...mid, ...after]

    return res.join(' ')
}