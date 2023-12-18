/**
 * 这是一个编程问题，需要编写一个程序来生成测试用例的执行顺序。根据题目描述，我们可以知道以下信息：

- 当前迭代周期内有N个特性。
- 设计了M个测试用例，每个用例对应了一个覆盖特性的集合。
- 测试用例使用其ID作为下标进行标识。
- 测试用例的优先级定义为其覆盖的特性的优先级之和。

我们需要按照以下规则生成执行顺序：

1. 优先级大的用例先执行。
2. 如果存在优先级相同的用例，则用例ID小的先执行。

现在我们来看一下示例1：

输入：
```
5 4
1
1
2
3
5
1 2 3
1 4
3 4 5
2 3 4
```

输出：
```
3
4
1
2
```

说明：
测试用例的优先级计算如下：
```
T_1 = F_{F_1} + F_{F_2} + F_{F_3} = 1 + 1 + 2 = 4
T_2 = F_{F_1} + F_{F_4} = 1 + 3 = 4
T_3 = F_{F_3} + F_{F_4} + F_{F_5} = 2 + 3 + 5 = 10
T_4 = F_{F_2} + F_{F_3} + F_{F_4} = 1 + 2 + 3 = 6
```

按照优先级从小到大，以及相同优先级，ID小的先执行的规则，执行顺序为T_3, T_4, T_1, T_2。
 * @param {*} featureProperties 
 * @param {*} TestCaseFeatures 
 * @returns 
 */
const resolve = (featureProperties, TestCaseFeatures) => {
  const arr = TestCaseFeatures.map((x, index) => {
    return {
      index: index + 1,
      value: x.reduce((pre, cur) => {
        const arr = pre + featureProperties[cur - 1]
        return arr
      }, 0),
    }
  })
  return arr.sort((a, b) => b.value - a.value).map((x) => x.index)
}

console.log(
  resolve(
    [1, 1, 2, 3, 5],
    [
      [1, 2, 3],
      [1, 4],
      [3, 4, 5],
      [2, 3, 4],
    ],
  ),
)
