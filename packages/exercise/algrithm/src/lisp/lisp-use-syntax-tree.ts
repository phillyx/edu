
enum E_CALCTYPES {
  ADD = 'add',
  SUB = 'sub',
  MUL = 'mul',
  DIV = 'div',
  NUM = 'number',
  EXP = 'Exp',
}
export class SyntaxNode {
  type: E_CALCTYPES
  children: SyntaxNode[]
  value: string | null
  constructor(type: E_CALCTYPES) {
    this.type = type
    this.children = []
    this.value = null
  }
  addNext(x: any) {
    if (x instanceof SyntaxNode) {
      this.children.push(x)
    } else {
      let numNode = new SyntaxNode(E_CALCTYPES.NUM)
      // numNode.children.push(x);
      numNode.value = x
      this.children.push(numNode)
    }
  }
  process(): number {
    let vals = this.children
    let type = this.type
    switch (type) {
      case E_CALCTYPES.EXP:
        return vals[0].process()
      case E_CALCTYPES.ADD:
        return vals.map((val) => val.process()).reduce((a, b) => a + b, 0)
      case E_CALCTYPES.SUB:
        const tmp = vals.shift()?.process() ?? 0
        return vals.map((val) => val.process()).reduce((a, b) => a - b, tmp)!
      case E_CALCTYPES.MUL:
        return vals.map((val) => val.process()).reduce((a, b) => a * b, 1)
      case E_CALCTYPES.DIV:
        let arr = vals.map((val) => val.process())
        let ret = arr[0]
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] === 0) throw new Error('mod can not be ZERO')
          ret /= arr[i]
        }
        return ret
      case E_CALCTYPES.NUM:
        return parseInt(this.value as string)
    }
  }
}

function generateSyntaxTree(
  exp: string,
  k: number,
  node: SyntaxNode | null = null,
) {
  let syntax = ''
  // ,
  // node: SyntaxNode | null = null;
  while (k < exp.length) {
    switch (exp[k]) {
      case '(':
        let tmpNode = node
        // adapter  non-standard grammar
        if (syntax && ['add', 'sub', 'mul', 'div'].includes(syntax)) {
          tmpNode = new SyntaxNode(syntax as E_CALCTYPES)
          syntax = ''
        }

        const ret = generateSyntaxTree(exp, k + 1, tmpNode)
        if (node) {
          let tmp = new SyntaxNode(E_CALCTYPES.EXP)
          tmp.addNext(ret.node)
          node.addNext(tmp)
          k = ret.k + 1
        } else {
          node = new SyntaxNode(E_CALCTYPES.EXP)
          node.addNext(ret.node)
          k = ret.k
        }
        break
      case ' ':
        if (!syntax) {
          ++k
          break
        }
        switch (syntax) {
          case E_CALCTYPES.ADD:
            node = new SyntaxNode(E_CALCTYPES.ADD)
            break
          case E_CALCTYPES.SUB:
            node = new SyntaxNode(E_CALCTYPES.SUB)
            break
          case E_CALCTYPES.MUL:
            node = new SyntaxNode(E_CALCTYPES.MUL)
            break
          case E_CALCTYPES.DIV:
            node = new SyntaxNode(E_CALCTYPES.DIV)
            break
          default:
            node?.addNext(syntax)
            break
        }
        syntax = ''
        ++k
        break
      case ')':
        if (syntax && node) node.addNext(syntax)
        return {node, k}
      default:
        syntax += exp[k++]
        break
    }
  }
  if (!node) throw new Error('parsing fail.')
  return {node, k}
}

/**
 * https://leetcode-cn.com/problems/parse-lisp-expression/solution/jie-xi-qi-by-user8973/
 * https://leetcode-cn.com/problems/parse-lisp-expression/solution/dai-ma-ji-shu-ju-by-xxleyi/
 * BAD: code => interpret(code) => result
 * code => scanner(code) => tokens => parser(tokens) => bytes => vm(bytes) => result
 * parser(tokens) => ast => compile(ast) => bytes
 */

 export function evaluate(expression: string) {
  const root = generateSyntaxTree(expression, 0).node
  try {
    return root?.process()
  } catch (error) {
    return 'error'
  }
}