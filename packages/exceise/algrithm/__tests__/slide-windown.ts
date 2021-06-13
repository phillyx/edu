import { minWindow } from "../src/slide-window";
describe('mininum-window-substring',()=>{
  it('S = \'ADOBECODEBANC\', T= \'ABC\'',()=>{
      const res = minWindow('ADOBECODEBANC','ABC')
      expect(res).toEqual('BANC')
  })
})