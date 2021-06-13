class ListNode {
  val: number
  next: ListNode | null
  constructor(_val: number) {
    this.val = _val
    this.next = null
  }
}
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1: ListNode, l2: ListNode): ListNode {
  var sumNode = new ListNode(0) // 预定义一个对象
  var tmpNode = sumNode // 定义一个临时计算对象
  var carry = 0
  while (!isNullOrUndefined(l1) || !isNullOrUndefined(l2)) {
    // 空位补零，保证l1 和 l2 长度一致
    var x = isNullOrUndefined(l1) ? 0 : l1.val
    var y = isNullOrUndefined(l2) ? 0 : l2.val

    // 最大19
    var sum = x + y + carry
    carry = sum > 9 ? 1 : 0 // 大于等于10 进位1
    sum = sum % 10 // 余数为当前位 数字
    tmpNode.next = new ListNode(sum)

    // 链表继续向前，刷新临时指针对象
    tmpNode = tmpNode.next

    if (!isNullOrUndefined(l1)) {
      l1 = l1.next
    }
    if (!isNullOrUndefined(l2)) {
      l2 = l2.next
    }
  }

  // 判断最后是否需要补位补位
  if (carry == 1) {
    tmpNode.next = new ListNode(1)
  }

  return sumNode.next
};

function isNullOrUndefined(o) {
  return o == null || o == undefined
}