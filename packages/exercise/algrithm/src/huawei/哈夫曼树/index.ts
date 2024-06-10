class TNode {
    public value: number
    public left: TNode | null
    public right: TNode | null
    constructor(value: number) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class MinPriorityTree {
    public elements: TNode[]
    constructor() {
        this.elements = []
    }

    enqueue(element: TNode) {
        this.elements.push(element)
        this.elements.sort((a, b) => (a.value - b.value))
    }
    dequeue() {
        return this.elements.shift()
    }
    isEmpty() {
        return this.elements.length === 0
    }
}

function buildHuffmanTree(values: number[]) {
    const priorityTree = new MinPriorityTree()
    values.forEach(x => priorityTree.enqueue(new TNode(x)))

    while (priorityTree.elements.length > 1) {
        const left = priorityTree.dequeue() as TNode
        const right = priorityTree.dequeue() as TNode
        const parent = new TNode(left.value + right.value)
        parent.left = left
        parent.right = right

        priorityTree.enqueue(parent)
    }
    const root = priorityTree.dequeue()
    return root as TNode
}

function inorder(node: TNode, result: number[]) {
    if (node) {
        node.left && inorder(node.left, result)
        result.push(node.value)
        node.right && inorder(node.right, result)
    }
}

function resolve(values: number[]) {
    const root = buildHuffmanTree(values)
    const result = [] as number[]
    inorder(root,result)
    return result
}

console.log(resolve([5,15,40,30,10]))