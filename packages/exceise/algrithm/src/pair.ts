type Fn = (x: number) => (y: number) => number
type Pair = (fn: Fn) => number

type CreatePair = (a:number) => (b:number) => Pair
const createPair: CreatePair = a => b => fn => fn(a)(b)

type First = (pair: Pair) => number
const first: First = pair => pair(x => y => x)

type Second = (pair: Pair) => number
const second: Second = pair => pair(x => y => y)