/**
 * 给定一个二义树，每个节点上站着一个人，节点数字表示父节点钊该节点传递悄悄话需要花费的时间。
初始时，根节点所在位置的人有一个悄悄话想要传递给其他人，求二叉树所有节点上的人都接收到悄悄话花费的时间.
输入描述:
给定二叉树
0 9 20 -1 -1 15 7 -1 -1 -1 -1 32
注: -1表示空节点

输出描述
返回所有节点都接收到悄悄话花费的时间38

 */


const PLACEHOLDER_VALUE = -1

class TreeNode {
    value: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.value = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
    public isLeafNode() {
        return !this.left && !this.right
    }
}

class BinaryTree {

    root: TreeNode

    private nodes: TreeNode[]

    constructor(nums: Array<number>) {
        this.nodes = this.createBinaryTreeByArray(nums)
        this.root = this.nodes[0]
    }

    private createBinaryTreeByArray(nums: Array<number>) {
        const n = nums.length
        const trees = []
        for (let i = 0; i < n; i++) {
            trees.push(new TreeNode(nums[i]))
        }
        // 1 12 13 121 122 131 132
        const mid = n >> 1 //  (n/2 -1)=> 7/2 -1 = 2.5

        for (let i = 0; i < mid; i++) {

            if (trees[i].value === PLACEHOLDER_VALUE) continue

            const leftIndex = 2 * i + 1
            const rightIndex = 2 * (i + 1)

            if (leftIndex < n) {
                const leftNode = trees[leftIndex];
                if (leftNode.value !== PLACEHOLDER_VALUE) {
                    trees[i].left = leftNode
                }
            }

            if (rightIndex < n) {
                const rightNode = trees[rightIndex]
                if (rightNode.value !== PLACEHOLDER_VALUE) {
                    trees[i].right = rightNode
                }
            }
        }

        return trees.filter(x => x.value !== PLACEHOLDER_VALUE)
    }
    public getMaxDegree() {
        let maxDgree = 0;
        // 前序遍历
        const func = (node: TreeNode, degree: number) => {
            const depth = degree + node.value
            if (node.isLeafNode()) {
                maxDgree = Math.max(depth, maxDgree)
                return
            }
            node.left && func(node.left, depth)
            node.right && func(node.right, depth)

        }

        // func(this.root, 0)
        // return maxDgree

        // 问题分解
        const func2 = (node: TreeNode) => {
            if (node.isLeafNode()) return node.value
            let leftDepth = 0, rightDepth = 0
            if (node.left) {
                leftDepth = func2(node.left)
            }
            if (node.right) {
                rightDepth = func2(node.right)
            }
            return node.value + Math.max(leftDepth, rightDepth)
        }

        return func2(this.root)
    }

    static resolve(str: string) {
        const arr = str.split(' ').filter(x => x.length > 0).map(Number)
        return new BinaryTree(arr).getMaxDegree()
    }

}
console.log(BinaryTree.resolve('0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2'))
console.log(BinaryTree.resolve('0 100 20 -1 -1 15 7 -1 -1 -1 -1 3 2'))
console.log(BinaryTree.resolve('0 9 20 -1 -1 15 30 -1 -1 -1 -1 3 2'))


// https://www.typescriptlang.org/play/?#code/PQKhCgAIUxNv0LO1AAcoKjlAxcoSTlCIFoGH-Dz1swIKDBOh0Cg5QTa9ABdxUC65bYwB1NB1bUAsIwLk9A2J2MCiUwU+jjACeUBICYBCDYYF3owADpgQMjAjUGBOWMAhboDfTQC+pgIAZwgXCVA05pLsgTgtigASNAFOqBZeUB2-guqBIcxSixgZ4MpQ2IDdFQGtytQEI2qQJPKmEY2xCTWgL8JgKXGgGymgAxKDvLKKgB04IDJ8YCmioDzxoAP8QBc4Aj+mOAADJAAnJAATGUAtACMkA2Q9QCskADsTY3NvY0AzFXggBc2ud1sgF5exOBpgF+KOeCAK-GAe2pBxJGx8Yqq-QAcM9DAM+AAxgD2AHYAzgAukAAKADIAggDCAKIAEgDyjwAi7wASgB9ABqz0eAFV3pAALzdGYnAA2AEMrldIAAVABOAFNcQA5M4AE1xkAA3lBINSAG4opEAV1xYwuDIAtgAjXHYqnUpG4gBmNzGOPxRNJkAAPpBWUikbzINiAJYAcwAFsKsXjCSSydLZfLqdTztcbtiGScbmdsQAKOlIgD8LPZXOxABpIPyhU6tWLdVKZQy5R7leqbj7RTqJfqg0iAJQUhVGyA3NVKq5Je1MuGQe1w2HwhkXUkCpUXXHEyAOyBlMb2pNG1PppJeu7w1v5wvFwVlitVwNyyBjVsN6lNjOhjU5ydtguQIsl3uV6sGoeK1UahUAXwVAAcGRykUqTpB049cSiBeLcTaE5Tk8m8TcGdiLpAAITjluCu4AMl-H5fjO27gDupyouikAAEJlii2IAJ6RomCrYmcZyapG14HEau7KnSNxkhcupXCK2rXgA2gAuthxqXLc5qWtaNqsmyJGQM82LYii8EADwsa6AB8d6jimaYZkRpIYvCX4nHiKIETBFxwYh2pQfBHFcfBzHslccYiUBaFtqJzYSbiVzkSU1HJmBya4Uq+FkrJF4KbBCGRmpGncdprFjJ5vH8dyQmJg+RomrcMo5ixGb8hcKqpiJYV3Ga+JSZAVEiQK1qQDa-J3EqOYlAA3KekA8TKxVKgA1JVwkhSFyVmUk+5XGqzG4gA7r6UY3lF5FKpRcZ6XVkA7sNwDAC0LRVC0-RTY09RVNN9T9PNgwJXRdxskqlbwm+AkCZN43UsxwDTQ0cawgdHSnd0OZVEkrQ0Q+mXYtluUlfCRUlWVW3EhV1XCSJyZKgK2UNeZ-WZvS2YFvCTxvF8vwAiC4JQu8CYmjcZZMk9w2JZ6P4AJLdgAHnd0AlZVLRA6FG3rmGxOkmT8LTTANr5VT9R6TT1Ig29ROk6VMq1cNdX462145uD5GtozuIk5RhU8w+fM5T+15Q4yZLvnO8MfD8-xAmCELQiLoui9LkMdu26u6sr1nKzZ5unqDNoznLZNlRcZvO7Rpr0xqkvSdq5nu6TVm+0aqszhrWba7rLz60jRuo6bwWR-VId9ZRSQztOG43FhGfUqNzulyFTshU+L5vuDSSlkiBG2szB0k5r2Y63DieI4bKMm+jIG2QeR4niquI3AAsiiJN-LiKrare6che9bLT388-4gVStjRNgCySoA8XqALIJgBhyut-sCkWJ7wsxuqkX6pIeqSG-MoGnLcgml1L6L+OkruqY5k-bUkAqamXbriZWqtQFngvFeXUt4fa+1XjPZ+OYp6piSEgm0v9UweiQevbUQ1i7V1fI7ZWoCOz-kgBfC4Jwb6km-EKR+uI-5qkIebUBedKHUNoRwguTCWHc2GpXB8R1uE2gMuhD0JQ2EiImsQt8eDn64yNEdQAd6mAAyMwAYEqAGPIs+4VuHTWvqZO+3UP4HXvM7SBuokjQMvNeeBipx41xlNYuOyt3qtlniwgqIYC5eP-p9CBrtyE-gQc7TxzCAlUMvlUOhuIGE3BkUIoJ2VeFhjCebGc-i1Q5gMXE3OBckl1XLqLeRLj6Fx2AZANBaoMHTzVkKbJviwzZKKSXZR1Iyl5IkYkkCCpbjyWPI4q4ZwkQ0hvPRMY9EywqgyZAfGcFXrwnokkK4u4jw3BtAAckgFsuM9clSN25DaFukA24xTijkg60i6m7htASF078RJlPLJ1RSylIw2kWfssek815zwXjIsCO4wqjPiUiM4KobTvLctqXOZlRnjO2WUSoNRbrNDaJ0dFPQcWQFmlUPZelQX8hbJC6FrkVL4nhSMsZN4tllHqCUMoaK+gtHaF0VlrL8WEtOHRMFpKoUwspfEvENKkX0oqNUOouLMX9Gldi263LBpAA