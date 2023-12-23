class TreeNode {
    value: number
    left?: TreeNode | null
    right?: TreeNode | null
    sum: number
    constructor(val: number, left?: TreeNode, right?: TreeNode) {
        this.sum = 0
        this.value = val
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
    isLeafNode() {
        return !this.left && !this.right
    }
}

class BinaryTree {
    root: TreeNode
    constructor(inorder: number[], preOrder: number[]) {
        this.root = this.buildTree(inorder, preOrder) as TreeNode
        this.setSum(this.root)
    }
    /**
     * @param {number[]} inorder
     * @param {number[]} preOrder
     * @return {TreeNode}
     */
    buildTree(inorder: number[], preOrder: number[]) {
        if (inorder.length === 0 || preOrder.length === 0) return null;
        let root = new TreeNode(preOrder[0]);
        let index = inorder.indexOf(root.value);
        // console.log(inorder, preOrder, index)

        root.left = this.buildTree(inorder.slice(0, index), preOrder.slice(1, index + 1));
        root.right = this.buildTree(inorder.slice(index + 1), preOrder.slice(index + 1));
        return root;
    }

    setSum(root: TreeNode) {
        if (root.isLeafNode()) {
            root.sum = 0
            return root.value
        } else {
            if (root.left) {
                root.sum += this.setSum(root.left)
            }
            if (root.right) {
                root.sum += this.setSum(root.right)
            }
            return root.sum + root.value
        }
    }

    printMid() {
        const arr:number[] = []
        const func = (node: TreeNode) => {
            if (node.left) {
                func(node.left)
            }
            arr.push(node.sum)
            if (node.right) {
                func(node.right)
            }
        }
        func(this.root)
        return arr.join(' ')
    }
}


console.log(new BinaryTree([7, -2, 6, 6, 9], [6, 7, -2, 9, 6]).printMid())


