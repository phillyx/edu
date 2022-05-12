import {TreeNode} from '../../binary-search-tree'

/**
 * https://leetcode-cn.com/problems/house-robber-iii/solution/san-chong-fang-fa-jie-jue-shu-xing-dong-tai-gui-hu/
 * 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 */

type treeNode = TreeNode | null

/**
 * 暴力递归 - 最优子结构
 * 1.相邻的节点不能偷，也就是偷爷爷节点，儿子节点不能偷，但是孙子节点可以偷
 * 2.二叉树只有左右两个子节点
 * 4 个孙子偷的钱 + 爷爷的钱 VS 两个儿子偷的钱 哪个组合钱多，就当做当前节点能偷的最大钱数。这就是动态规划里面的最优子结构
 */
export const rob = (root: treeNode): number => {
  if (!root) return 0

  // 选择当前节点
  let money = root.val || 0
  // 不能选择孩子节点，可以选择孙子节点
  if (root.left) {
    money += rob(root.left.left) + rob(root.left.right)
  }
  if (root.right) {
    money += rob(root.right.left) + rob(root.right.right)
  }
  // 不选择当前节点，选择孩子节点
  let compare = rob(root.left) + rob(root.right)

  return Math.max(money, compare)
}
/**
 * 记忆化 解决重复子问题
 * ，经过分析其实现，我们发现爷爷在计算自己能偷多少钱的时候，同时计算了 4 个孙子能偷多少钱，也计算了 2 个儿子能偷多少钱。这样在儿子当爷爷时，就会产生重复计算一遍孙子节点
 * 使用哈希表来存储结果，TreeNode 当做 key，能偷的钱当做 value
 */
export function robGood(root: treeNode): number {
  const memo = new Map<treeNode, number>()
  return robInternal(root, memo)
}
function robInternal(root: treeNode, memo: Map<treeNode, number>): number {
  if (!root) return 0
  if (memo.has(root)) return memo.get(root)!

  let money = root.val
  if (root.left) {
    money +=
      robInternal(root.left.left, memo) + robInternal(root.left.right, memo)
  }
  if (root.right) {
    money +=
      robInternal(root.right.left, memo) + robInternal(root.right.right, memo)
  }

  const compare = robInternal(root.left, memo) + robInternal(root.right, memo)
  const res = Math.max(money, compare)

  memo.set(root, res)

  return res
}

interface robType {
  select: number
  unSelect: number
}
export function robBetter(root: treeNode): number {
  const {select, unSelect} = robBetterInternal(root)
  return Math.max(select, unSelect)
}
/**
 * 上面两种解法用到了孙子节点，计算爷爷节点能偷的钱还要同时去计算孙子节点投的钱，虽然有了记忆化，但是还是有性能损耗
 * 我们换一种办法来定义此问题
 * 每个节点可选择偷或者不偷两种状态，根据题目意思，相连节点不能一起偷
 * 当前节点选择偷时，那么两个孩子节点就不能选择偷了
 * 当前节点选择不偷时，两个孩子节点只需要拿最多的钱出来就行(两个孩子节点偷不偷没关系)
 */
function robBetterInternal(root: treeNode): robType {
  if (!root) return {select: 0, unSelect: 0}
  const left = robBetterInternal(root.left)
  const right = robBetterInternal(root.right)
  // 当前节点选择偷：当前节点能偷到的最大钱数 = 左孩子选择自己不偷时能得到的钱 + 右孩子选择不偷时能得到的钱 + 当前节点的钱数
  const select = left.unSelect + right.unSelect + root.val

  // 当前节点选择不偷：当前节点能偷到的最大钱数 = 左孩子能偷到最大钱数 + 右孩子能偷到最大钱数
  const unSelect =
    Math.max(left.select, left.unSelect) + Math.max(right.unSelect, right.select)
  return {
    select,
    unSelect,
  }
}
