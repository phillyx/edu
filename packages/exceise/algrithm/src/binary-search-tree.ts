/**
 * https://leetcode-cn.com/problems/binary-search-tree-iterator/
 */

export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
export function createBinaryTreeByArray(nums: Array<number | null>) {
  const n = nums.length
  const trees = []
  for (let i = 0; i < n; i++) {
    trees.push(new TreeNode(nums[i] || undefined))
  }
  for (let i = 0; i < n / 2 - 1; i++) {
    if (2 * i + 1 < n) {
      trees[i].left = trees[2 * i + 1]
    }
    if (2 * (i + 1) < n) {
      trees[i].right = trees[2 * (i + 1)]
    }
  }
  return trees
}
export class BSTIterator {
  public List: Array<number> = []
  constructor(root: TreeNode | null) {
    if (root !== null) {
      this.reorder(root)
    }
    console.log(JSON.stringify(this.List))
  }
  private reorder(root: TreeNode) {
    if (root.left) {
      this.reorder(root.left)
    }
    if (root) this.List.push(root.val)
    if (root.right) {
      this.reorder(root.right)
    }
  }
  next(): number {
    return this.hasNext() ? this.List.splice(0, 1)[0] : NaN
  }

  hasNext(): boolean {
    return this.List.length > 0
  }
}
