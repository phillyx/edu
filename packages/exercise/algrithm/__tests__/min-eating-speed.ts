import {minEatingSpeed} from '../src/min-eating-speed'

describe('min-eating-speed', () => {
  it('piles = [3,6,7,11], H = 8',()=>{
    const piles = [3,6,7,11], H = 8
     const ret= minEatingSpeed(piles,H)
     expect(ret).toEqual(4)
  })
  it(' piles = [30,11,23,4,20], H = 5',()=>{
    const  piles = [30,11,23,4,20], H = 5
     const ret= minEatingSpeed(piles,H)
     expect(ret).toEqual(30)
  })
  it('piles = [30,11,23,4,20], H = 6',()=>{
    const piles = [30,11,23,4,20], H = 6
     const ret= minEatingSpeed(piles,H)
     expect(ret).toEqual(23)
  })
  it('piles = [5], H = 3',()=>{
    const piles = [5], H = 3
     const ret= minEatingSpeed(piles,H)
     expect(ret).toEqual(2)
  })
  it('piles = [5], H = 6',()=>{
    const piles = [5], H = 6
     const ret= minEatingSpeed(piles,H)
     expect(ret).toEqual(1)
  })

  it('piles = [332484035,524908576,855865114,632922376,222257295,690155293,112677673,679580077,337406589,290818316,877337160,901728858,679284947,688210097,692137887,718203285,629455728,941802184],H = 823855818', () => {
    const piles = [
        332484035,
        524908576,
        855865114,
        632922376,
        222257295,
        690155293,
        112677673,
        679580077,
        337406589,
        290818316,
        877337160,
        901728858,
        679284947,
        688210097,
        692137887,
        718203285,
        629455728,
        941802184,
      ],
      H = 823855818
    const ret = minEatingSpeed(piles, H)
    expect(ret).toEqual(14)
  })
})
