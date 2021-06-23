import { quikSort, findKthLargest } from '../src/quik-sort';

describe('quik sort', () => {

  it('sort',()=>{
    function reSort(s: string) {
      let t = s.split('');
      quikSort(t, 0, s.length - 1);
      console.log(t);
      return t.join('');
    }
    const s= reSort('dependency');
    expect(s.endsWith('y')).toBeTruthy()
    expect(s.startsWith('c')).toBeTruthy()
  })

  it('findKthLargest', () => {
    const ret = findKthLargest([3, 2, 1, 5, 6, 4], 2);
    expect(ret === 5).toBeTruthy()
  });
  
});
