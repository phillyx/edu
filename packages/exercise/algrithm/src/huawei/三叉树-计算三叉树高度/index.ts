class TriangleTreeNode<T> {
    value: T
    height: number
    left: TriangleTreeNode<T> | null
    right: TriangleTreeNode<T> | null
    mid: TriangleTreeNode<T> | null
    constructor(value: T) {
        this.value = value
        this.height = 0
        this.left = null
        this.right = null
        this.mid = null
    }
}

function TriangleTree(values: number[]) {
    let maxDepth = 0
    const insert = (node: TriangleTreeNode<number> | null, value: number, depth = 1) => {
        maxDepth = Math.max(maxDepth, depth)
        if (node == null) {
            return new TriangleTreeNode<number>(value)
        }
        depth++
        if (value < node.value - 500) {
            node.left = insert(node.left, value, depth)
        } else if (value > root.value + 500) {
            node.right = insert(node.right, value, depth)
        } else {
            node.mid = insert(node.mid, value, depth)
        }
        return node
    }

    // const root = insert(null, values[0])

    // for (let i = 1; i < values.length; i++) {
    //     insert(root, values[i])
    // }

    // 层序遍历
    let root: TriangleTreeNode<number>;
    const add = (value: number) => {
        const node = new TriangleTreeNode<number>(value)
        if (!root) {
            node.height = 1
            root = node
            return;
        }

        let cur = root

        while (true) {
            node.height = cur.height + 1
            maxDepth = Math.max(node.height, maxDepth)

            if (value < cur.value - 500) {
                if (cur.left === null) {
                    cur.left = node
                    break
                } else {
                    cur = cur.left
                }
            } else if (value > cur.value + 500) {
                if (cur.right === null) {
                    cur.right = node
                    break
                } else {
                    cur = cur.right
                }
            } else {
                if (cur.mid === null) {
                    cur.mid = node
                    break
                } else {
                    cur = cur.mid
                }
            }
        }
    }

    values.forEach(add)
    
    return maxDepth

}


console.log(TriangleTree([5000, 2000, 5000, 8000, 1800]))
console.log(TriangleTree([5000, 2000, 5000, 8000, 1800, 7500, 4500, 1400, 8100]))

// https://www.typescriptlang.org/play/?target=99#code/MYGwhgzhAEAqBOBLMA7A5iApgzmByA9gCaYA8sAfNAN4CwAUNE9AG5ggCumAXHA89AAWmRGkEAXXig4BbAEaZ4-ZlgBmkuElQZs8XIRLkqAH2jSQIZUyRiNCZOiw58xMpWinzlxsxmIivPbaTnouhu6eHBZW0MAEKBDi8BzA4gTwABRsnDxwAJQ0MQLigogQAHTZXNAAvKzsXEXMJWXlwqIStdAADE1MLRVq4l1efdAD5TaddaM+Av2lFX5EI1HeAgC+DFv0DKocKKmI8ZoOOs5ZDZgQUrIK8ADaALoFdHPQWMMyYAAeACKYAAOJS6vXecQSw0QCUUwzqGRQrkCWkcun0rlI0nkihMZjWABp6jlbtj4ISSMDBF0AIwFGpUN7zXy-AGUroAWTAJXK3x+GV5rJK5KBJTyY0QqmgCNctRma1eYwEenEHHgKDMmAA7qdgmiwmQsfcKJccmL3psxhSSgBqa3iyUm6qkMyuSpXaAAWmgAFZut0FeamS6SOUhl1oRBYdKQ0NCVVMMLKWag9ANtBMCBI9AJVL49AqPACARxG6ctBrT6-QGUwJESGpnDszD4OJo5hJh1xHGronRWM0xms4ya0w6+3luHm62xzz-N2cr3BMmgzsU8rVeqxzEdjEAPS72LxRLQQvFyeRlsIglErgQB7dF4MPcH1TpKWfbM0gDcn+d8cGmDoCUP6ILa1bMPu8wRlGp5dje1wPIgj7vJBO4oQegBCOoA8XqALIJgBhyjEH6wciZwhOihiGjiX4xBCx5gEQKzwvGJL3HSDJjLRwxjiMWo6qizgGAadw4o6mDLkyOYZAAhLB4EjjO7S2DSirMLBIyuCp1iYCqarUYGTBoSmH7AKqXSwU++nQJqpRYFKSRcHJNYKSISl1CZ8BtC5nQVtSmnQAKIpUnUnLcrybaeZ2hIBUmFkjkwkl5s67mltUXq+v6hSWSmknJWGNT5XiFiOXF8y5Zg6jqSQfkpnIehgAA1tVzADpmmCZSVKbuV0ZXqE1Bl+S1WYJe6VDJXmFbpcVcU5aqHauQVXhTR1sSzQ2lWYH18y1ZgDWbYNbXDstAhdW5q2dntA3pq17VHTNHkTvlcpFTdR3MMlD3BhtWVxdtu3fUy+0va9K3wN1s3LBd-2pv226xcw-7lK+8AAKJgMAggZPRRDidAMTrmq-ksoFFloQwtEEFgoYEGgGRBPxoQZA86XdISABMfos5WfqEgAHBzhLUnzD55Ga5OUyA1O0yi5wM0z-PQOz3Nc5zQuc4LSsAOzpYSAAs2vQNSOtKzz1J+i8eRAA

// https://blog.csdn.net/m0_73659489/article/details/136562265