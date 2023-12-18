/**
 * 106
 * 从中序与后序遍历序列构造二叉树
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/solutions/50561/tu-jie-gou-zao-er-cha-shu-wei-wan-dai-xu-by-user72/
 * 首先来看题目给出的两个已知条件 中序遍历序列 和 后序遍历序列 根据这两种遍历的特性我们可以得出两个结论
 * 在后序遍历序列中,最后一个元素为树的根节点
 * 在中序遍历序列中,根节点的左边为左子树，根节点的右边为右子树
 * 根据中序遍历和后续遍历的特性我们进行树的还原过程分析
 * 树的还原过程描述
 * 首先在后序遍历序列中找到根节点(最后一个元素)
 * 根据根节点在中序遍历序列中找到根节点的位置
 * 根据根节点的位置将中序遍历序列分为左子树和右子树
 * 根据根节点的位置确定左子树和右子树在中序数组和后续数组中的左右边界位置
 * 递归构造左子树和右子树
 * 返回根节点结束
 * 
 * 
 * 中序数组大小一定是和后序数组的大小相同的（这是必然）。

中序数组我们都切成了左中序数组和右中序数组了，那么后序数组就可以按照左中序数组的大小来切割，切成左后序数组和右后序数组
*/

 // Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    if (inorder.length === 0 || postorder.length === 0) return null;
   
       let root = new TreeNode(postorder[postorder.length - 1]);
       let index = inorder.indexOf(root.val);
   
       root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index));
       root.right = buildTree(inorder.slice(index + 1), postorder.slice(index, postorder.length - 1));
   
       return root;
   }; 


/**
 * 有一棵二又树，每个节点由一个大写字母标识(最多26个节点)。现有两组字母，分别表示后序遍历(左孩子->右孩子>父节点)和中序遍(左孩子->父节点->右孩子) 的结果，请输出层次遍历的结果。
输入描述:
输入为两个字符串，分别是二叉树的后续遍历和中序遍历结果。
输出描述:
输出二叉树的层次遍历结果.
示例1
输入
CBEFDA CBAEDF
输出
ABDCEF
说明
二叉树为:A
BD
CEE
 */

function levelOrderTraversal(root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
      let currentLevel = queue.length;
      let temp = [];

      for (let i = 0; i < currentLevel; i++) {
        let node = queue.shift();
        temp.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      result.push(temp.join(''));
    }

    return result.join('');
  }