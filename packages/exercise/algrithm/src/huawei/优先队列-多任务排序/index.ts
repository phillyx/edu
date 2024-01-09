/**
 * https://blog.csdn.net/qq_34064803/article/details/97621692
 */
class taskNode {
    value: string
    next: Array<taskNode> = []
    visited = false
    parents: taskNode[] = []
    constructor(value: string, nextNode?: taskNode, parent?: taskNode) {
        this.value = value
        if (nextNode) {
            this.addNext(nextNode)
        }
        if (parent) {
            this.parents.push(parent)
        }
    }
    addNext(node: taskNode) {
        if (!this.has(node)) {
            this.next.push(node)
        }
    }
    has(node: taskNode) {
        return this.next.some(x => x.value === node.value)
    }
    setParent(node: taskNode) {
        this.parents.push(node)
    }
}
class taskTree {
    nodes: taskNode[] = []
    constructor(line: string) {
        this.setTasks(line)
        // console.log(this.getNode('D').parents.map(x => x.value))
    }
    includes(node: taskNode) {
        return this.nodes.some(x => x.value === node.value)
    }
    add(value: string) {
        let node = this.getNode(value);
        if (!node) {
            node = new taskNode(value)
            this.nodes.push(node)
        }
        return node
    }

    getNode(v: string) {
        return this.nodes.find(x => x.value === v)
    }

    setTasks(line: string) {
        const arr = line.split(' ');
        arr.forEach(x => {
            const [left, right] = x.split('->')
            const leftNode = this.add(left)
            const rightNode = this.add(right)
            leftNode.setParent(rightNode)
            rightNode.addNext(leftNode)
        })
    }
    sort() {
        const arr: taskNode[] = []
        const dfs = (node: taskNode) => {
            if (!node.parents.length) {
                if (!node.visited) {
                    node.visited = true
                    arr.push(node)
                }
                return
            }
            node.parents.forEach(x => dfs(x))

        }
        for (let i = 0; i < this.nodes.length; i++) {

            dfs(this.nodes[i])
        }

        const queue = arr
        const res = arr.map(x => x.value)
        while (queue.length > 0) {
            const tmp = queue.pop()!;
            if (tmp.next.length > 0) {
                tmp.next.forEach(x => {
                    if (x.parents.every(p => p.visited)) {
                        if (!x.visited) {
                            x.visited = true
                            res.push(x.value)
                        }
                    }
                })
                queue.push(...tmp!.next)
            }
        }
        return res
    }
}

console.log(new taskTree('B->A C->A D->B D->C D->E').sort())
console.log(new taskTree('B->A C->A D->B').sort())
console.log(new taskTree('A->B C->B').sort())
console.log(new taskTree('A->B C->B A->C').sort())

// https://www.typescriptlang.org/play?target=99#code/MYGwhgzhAEAukGsByB7AJgU2gbwLAChojoA3MEAVwwC5oJYAnASwDsBzA46FjAD1loBBBgzABPADzwIydBgB80ALzQA2gF1OxEkwhNYGNMugAzchAxaiABzAMMLWBFrTZmDcY1XowFC3oMFMCwKAwAFGSUNHSMrGwANNx8sKiYAPwuiKkYibb2jhlwWXIAlDjeXLAAFroAdJFUxg2WhFzETCbQYTz82WV4rW1t1XVgaGhIyd3JfRXEAL5zRB1deQ6w-UvDNRC1a4671hQQVWH7G1uLg9BXXGMTUyxymTJ95ddcK2EAhCO7VZBuqVNh8hnAdrUerA9sdTk9MCVLt5bsQARAgZgXm4MCCwdB7LAKAwWOC6lDahAUABbDBhXjKRS8erkRpKNncOTMqKI64oogWWAABTs6wx0VcbwGeL+exFBxhJzFPK4VyuoEgMFcABV7FgpcR4RhnEVXnIPCovNdfP5GEEQuEQKxogE4riwTKBVrEOjHTxlWCAPQBnx+SkgDC1EAoNhhGVsDApORhADkABFkyVZfknLUqWBrHSGdAmc0Sv6iHzoKxQBRMOjDVjJVsCUSSTLDbtKTTC0pGVzWezDf2ccjvPcIiznbF2G6huHYBzMMY4wnshPuQBuLZfb6G2d4xdYFQ8ADuJux66o5YP7bkh1hSqRoKILeJh9H+G88cTmAitBdM7vHir5thCHa1CYrBoD2fbNMo7IkNeVzeJ63phL6U7MIB+pDNa9DQHYDDGBhFLWI6sAptAGZbs+BEiBBoQAKJgMApz0r2QEHkQeELqo4YmLAiTMGwVSwOoxhMhAZH6CmAC08gZlsXA8dA-E-kepK7OOanXniKnCaJ2TLhC44GRctFcGp2QUgmwrZmEZmzBZxCOZy9yTPw6EYAJTl4vMSEoaEFH7spoYLoRjZmuJFqaLRKloCYMAqGKkUIkWOEHjuQ7nLs4bsNUIVcVWnQ-EOOh6AYaCFUVBqcuV+iGMugQtDVeKEQqcKlEpYKVjVIHdRWA2Hlm6y7CYTEsWxRYJeivBlgQT54uNRFeQuTDGAADBuVbQBImmQnekYOGw1TbUwADU50gkNM2xmBd6qEw6i6QsC1xWF0AAI5UKydEMFs+lGsY7V5gW7GwZOL1ECeNThl030YFQR35VU0CKBt1VtCpsBUtYxgI0j1goAWJTfDRNVfDj1iQskyMnaj6OY9KuM0-wDEMMxrEwZxrVtF8TI5bUGAkBgDBiGcRbU-VlVljzvNgjuJa6A1VVy-LB5KxVjUqLaLXq0V9j3oqJaQ0NNW9fLFtcf5ZvEATEZHIqtTO1T3ys+Z5uLWCIH4kaH7IfgeEoOGkbRtMZ7arqKYAELyYI0AAMJx9AqbydHKfyQnGfyIxGYUkFYTzYHobBxGUYxqe546hgtLJrH8jx0nDfZ9HeeUgwwU8kHIfl+HVdR8mghp4nadtwXRfd2XYeV5HNcpkP8jp036cLwnY8d4XJRAA