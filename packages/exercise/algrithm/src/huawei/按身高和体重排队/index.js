/**
 * 某学校举行运动会，学生们技编号(1、2、3..)进行标识，现需要按照身高由低到高排列，对身高相同的人，按体重由轻到重排列;对于身高体重都相同的人，维持原有的编号顺序关系。请输出排列后的学生编号。
输入描述:
两个序列，每个序列由n个正整数组成(0< n <= 100)。第一个序列中的数值代表身高，第二个序列中的数值代表体重.
输出描述:
排列结果，每个数值都是原始序列中的学生编号，编号从1开始
示例1
输入
4
100 100 120 130
40 30 60 50
输出
2 1 3 4
明
输出的第一个数字2表示此人原始编号为2，即身高为100，体重为30的这个人。由于他和编号为1的人身高一样，但体重更轻，因此要排在1前面.
 */
function solve() {
  let n = Number(readline())
  let heights = readline().split(' ').map(Number)
  let weights = readline().split(' ').map(Number)

  let students = Array.from({length: n}, (_, index) => ({
    height: heights[index],
    weight: weights[index],
    id: index + 1,
  }))

  students.sort(
    (a, b) => a.height - b.height || a.weight - b.weight || a.id - b.id,
  )

  return students.map((student) => student.id).join(' ')
}

print(solve())
