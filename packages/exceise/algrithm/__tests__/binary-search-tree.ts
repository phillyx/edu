import { TreeNode, BSTIterator,createBinaryTreeByArray } from '../src/binary-search-tree';

describe('binary-search-tree', () => {
  it('create a binary tree with array',()=>{
    const arr = [3,2,3,null,3,null,1]
    const trees = createBinaryTreeByArray(arr)
    console.log(trees);
    
    const root = trees[0]
    expect(root.left?.left?.val).toEqual(0)
  })
  it('create a binary search tree', () => {
    let _treeNode = new TreeNode(
      7,
      new TreeNode(3),
      new TreeNode(15, new TreeNode(9), new TreeNode(20))
    );

    let bst = new BSTIterator(_treeNode);

    expect((bst.List.toString() === [3, 7, 9, 15, 20].toString())).toBeTruthy();
  });
});
