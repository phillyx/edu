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

        const mid = n / 2 - 1

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
        
        const func = (node: TreeNode, degree: number) => {
            const tmp = degree + node.value
            if (!node.isLeafNode()) {
                node.left && func(node.left, tmp)
                node.right && func(node.right, tmp)
            } else {
                if (tmp > maxDgree) {
                    maxDgree = tmp
                }
            }
        }

        func(this.root, 0)

        return maxDgree
    }

    static resolve(str: string) {
        const arr = str.split(' ').filter(x => x.length > 0).map(Number)
        return new BinaryTree(arr).getMaxDegree()
    }

}
console.log(BinaryTree.resolve('0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2'))
console.log(BinaryTree.resolve('0 100 20 -1 -1 15 7 -1 -1 -1 -1 3 2'))
console.log(BinaryTree.resolve('0 9 20 -1 -1 15 30 -1 -1 -1 -1 3 2'))

// https://www.typescriptlang.org/play?#code/PQKhCgAIUxNv0LO1AAcoKjlAxcoSTlCIFoGH-Dz1swIKDBOh0Cg5QTa9ABdxUC65bYwB1NB1bUAsIwLk9A2J2MCiUwU+jjACeUBICYBCDYYF3owADpgQMjAjUGBOWMAhboDfTQC+pgIAZwgXCVA05pLsgTgtigASNAFOqBZeUB2-guqBIcxSixgZ4MpQ2IDdFQGtytQEI2qQJPKmEY2xCTWgL8JgKXGgGymgAxKDvLKKgB04IDJ8YCmioDzxoAP8QBc4Aj+mOAADJAAnJAATGUAtACMkA2Q9QCskADsTY3NvY0AzFXggBc2ud1sgF5exOBpgF+KOeCAK-GAe2pBxJGx8Yqq-QAcM9DAM+AAxgD2AHYAzgAukAAKADIAggDCAKIAEgDyjwAi7wASgB9ABqz0eAFV3pAALzdGYnAA2AEMrldIAAVABOAFNcQA5M4AE1xkAA3lBINSAG4opEAV1xYwuDIAtgAjXHYqnUpG4gBmNzGOPxRNJkAAPpBWUikbzINiAJYAcwAFsKsXjCSSydLZfLqdTztcbtiGScbmdsQAKOlIgD8LPZXOxABpIPyhU6tWLdVKZQy5R7leqbj7RTqJfqg0iAJQUhVGyA3NVKq5Je1MuGQe1w2HwhkXUkCpUXXHEyAOyBlMb2pNG1PppJeu7w1v5wvFwVlitVwNyyBjVsN6lNjOhjU5ydtguQIsl3uV6sGoeK1UahUAXwVAAcGRykUqTpB049cSiBeLcTaE5Tk8m8TcGdiLpAAITjluCu4AMl-H5fjO27gDupyouikAAEJlii2IAJ6RomCrYmcZyapG14HEau7KnSNxkhcupXCK2rXgA2gAuthxqXLc5qWtaNqsmyJGQM82LYii8EADwsa6AB8d6jimaYZkRpIYvCX4nHiKIETBFxwYh2pQfBHFcfBzHslccYiUBaFtqJzYSbiVzkSU1HJmBya4Uq+FkrJF4KbBCGRmpGncdprFjJ5vH8dyQmJg+RomrcMo5ixGb8hcKqpiJYV3Ga+JSZAVEiQK1qQDa-J3EqOYlAA3KekA8TKxVKgA1JVwkhSFyVmUk+5XGqzG4gA7r6UY3lF5FKpRcZ6XVkA2XViWQGySqVvCb7ANUTQtDRD6Zdi2W5SV8JFSVZWTcSFXVcJInJkqArZQ15n9Zm9LZgW8JPG8Xy-ACILglC7wJiaNxlkyS3DeNrYAJLdgAHjmVTQCVlWLcNybjTOQOkqD8LgzANr5VD9R6UdRonWtP4I7ioNlRctUwyF-0-teObneRgMg5RhXYyFuM5ZTupXYyZLvnO90fD8-xAmCELQqTZPDTTl0du2bOkkzD47mLI2-XVLPwyDpUyqLiuQHDG43FT0nauZauI1Z2vUqrevXhz2bc3dLx809guvSLwXmw+EuUUkM7Tlbupy9ZcsK3Vo0hU+L5vudSSlkiBG2kjAmQMDNtczzDuPQLL3C+9IG2QeR4niquI3AAsiiwN-LiKrarebshetbLl381f4gVjMJXRdwCkWJ7wsxuqkX6pIeqSLfMoGnLcgmsKJ-eYvjTcbK7jmo-apAUOmSncss++m9nheV66reWuK5vHb-pA3cXCc-ekt+Qoeovu5De7m8+xfV832-euP0vL9k1uSAuIkRXDJHPc2LMn6QETo3CuY8T7u1gc3Ne0kl4ByNMHABIlQ7LR7jaAy6EPQlCxsNcOr4JpNzHiBBUtx5LHkVGZM4SIaQ3nomMeiZYVQINoqaSAcFVrwnokkK4u4jw3BtAAckgBIuM0clSx25DaBOSdvyxVTNAmssjG67htASF0U8RJkLfOWTqillKRhtPw2RRdS5NyrjXf+StQKnDokw3ELYzgqhtGYty2pvaMOYTeCRZRKg1G6OEtonRwl9HCf0aoMi9JhTcR4rxPiVL4n8VcJhLDJFlHqCUMoYSYmRK6DEmJcSqgJJcdcZJSJPHeNcuk9xeIsmBNyRUaodQeiNEif0Lp0TumQAqQkoAA