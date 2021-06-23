function swap<T>(list: Array<T>, a: number, b: number) {
  if (a !== b) {
    [list[a], list[b]] = [list[b], list[a]];
  }
}
function randomNum(minNum: number, maxNum: number) {
  var Range = maxNum - minNum;
  var Rand = Math.random();
  var num = minNum + Math.round(Rand * Range); //四舍五入
  return num;
}

function partition<T>(
  list: Array<T>,
  startIndex: number,
  endIndex: number
): number {
  // 以最左边的数为基准
  // 也可以随机选择一个元素作为坐标点
  const randomIndex = randomNum(startIndex, endIndex);
  // 让基准元素与数列首元素交换位置
  swap(list, startIndex, randomIndex);

  let privot = list[startIndex];
  let left = startIndex;
  let right = endIndex;
  while (left !== right) {
    // 控制right指针比较并左移
    while (left < right && list[right] > privot) {
      right--;
    }
    // 控制left指针比较并右移
    while (left < right && list[left] <= privot) {
      left++;
    }
    // 交换left和right指针所指向的元素
    if (left < right) {
      swap(list, left, right);
    }
  }
  // privot 和指针重合点交换
  swap(list, startIndex, left);
  return left;
}
export function quikSort<T>(
  list: Array<T>,
  left: number,
  right: number
): void {
  // 左下标一定小于右下标，否则就越界了
  if (left < right) {
    let privotIndex = partition(list, left, right);
    console.log(privotIndex, left, right);
    quikSort(list, left, privotIndex - 1);
    quikSort(list, privotIndex + 1, right);
  }
}

export function findKthLargest(nums: number[], k: number): number {
  const len = nums.length;
  let left = 0;
  let right = len - 1;

  // 转换一下，第 k 大元素的索引是 len - k
  let target = len - k;

  while (true) {
    const index = partition(nums, left, right);
    if (index == target) {
      return nums[index];
    } else if (index < target) {
      left = index + 1;
    } else {
      right = index - 1;
    }
  }
}

// 函数式编程

/*1*/ const quickSortFP = (array: number[]): number[] => {
  /*2*/ if (array.length <= 1) {
    return array;
  }
  /*3*/ let [pivot, ...rest] = array;
  /*4*/ let small = rest.filter((i: number) => i <= pivot);
  /*5*/ let big = rest.filter((i: number) => i > pivot);
  /*6*/ return [...quickSortFP(small), pivot, ...quickSortFP(big)];
  /*7*/
};
const quickSortFP2 = (array: number[], next: Function) => {
  if (array.length <= 1) {
    return next(array); // 當只有一個元素，執行傳入的callback
  }
  const [pivot, ...rest] = array;
  const small = rest.filter((i) => i <= pivot);
  const big = rest.filter((i) => i > pivot);
  quickSortFP2(small, (sortedSmall: any) => {
    quickSortFP2(big, (sortedBig: any) => {
      next([...sortedSmall, pivot, ...sortedBig]); // 合併2個陣列
    });
  });
};
