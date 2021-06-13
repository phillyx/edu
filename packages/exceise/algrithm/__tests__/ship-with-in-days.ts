import { shipWithinDays, shipWithinDaysWithBinarySearch} from "../src/ship-with-in-days";

describe('船只最低承重',()=>{
  it('test1',()=>{
    const ret = shipWithinDays([3,2,2,4,1,4],3)
    expect(ret).toEqual(6)
  })
  it('test2',()=>{
    const ret = shipWithinDays([1,2,3,4,5,6,7,8,9,10],5)
    expect(ret).toEqual(15)
  })
  it('test3',()=>{
    const ret = shipWithinDays([1,2,3,1,1],4)
    expect(ret).toEqual(3)
  })
})
describe('船只最低承重 use binary search',()=>{
  it('test1',()=>{
    const ret = shipWithinDaysWithBinarySearch([3,2,2,4,1,4],3)
    expect(ret).toEqual(6)
  })
  it('test2',()=>{
    const ret = shipWithinDaysWithBinarySearch([1,2,3,4,5,6,7,8,9,10],5)
    expect(ret).toEqual(15)
  })
  it('test3',()=>{
    const ret = shipWithinDaysWithBinarySearch([1,2,3,1,1],4)
    expect(ret).toEqual(3)
  })
})