const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the value of n: ', (n) => {
  const nums = [];
  rl.question('Enter the values of nums: ', (values) => {
    nums.push(...values.split(' ').map(Number));
    const leftGreater = new Array(n).fill(0);
    const leftSmaller = new Array(n).fill(0);
    const rightGreater = new Array(n).fill(0);
    const rightSmaller = new Array(n).fill(0);

    for (let j = 1; j < n - 1; j++) {
      for (let i = 0; i < j; i++) {
        if (nums[i] > nums[j]) {
          leftGreater[j]++;
        } else if (nums[i] < nums[j]) {
          leftSmaller[j]++;
        }
      }

      for (let k = j + 1; k < n; k++) {
        if (nums[k] > nums[j]) {
          rightGreater[j]++;
        } else if (nums[k] < nums[j]) {
          rightSmaller[j]++;
        }
      }
    }

    let ans = 0;
    for (let j = 1; j < n - 1; j++) {
      ans += leftGreater[j] * rightSmaller[j];
      ans += leftSmaller[j] * rightGreater[j];
    }

    console.log(ans);
    rl.close();
  });
});

