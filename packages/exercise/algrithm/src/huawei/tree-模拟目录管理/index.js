/**
 * https://blog.csdn.net/m0_73659489/article/details/134793044
 */
class Node {
    constructor(path, fa) {
      this.path = path;
      this.next = new Map();
      this.next.set('..', fa);
    }
  }
  
  function newNode(path, fa) {
    return new Node(path, fa);
  }
  
  function check1(s) {
    return /^[a-z]+$/.test(s);  // 检查字符串是否为小写字母
  }
  
  function check2(s) {
    return s === '..' || /^[a-z]+$/.test(s);  // 检查字符串是否为小写字母或者".."
  }
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let tree = newNode('/', null);  // 创建根节点
  let nowNode = tree;  // 当前所在节点
  let result = '';  // 存储结果的字符串
  
  rl.on('line', (input) => {
    const s = input.split(' ');  // 按空格分割指令和参数
  
    if (s[0] === 'mkdir') {  // 创建文件夹指令
      if (s.length !== 2 || !check1(s[1]) || nowNode.next.has(s[1])) {
        result += '\n';
      } else {
        nowNode.next.set(s[1], newNode(nowNode.path + s[1] + '/', nowNode));  // 创建新文件夹节点
        result += '\n';
      }
    } else if (s[0] === 'cd') {  // 切换目录指令
      if (s.length !== 2 || !check2(s[1]) || s[1].includes('/') || !nowNode.next.has(s[1]) || nowNode.next.get(s[1]) === null) {
        result += '\n';
      } else {
        nowNode = nowNode.next.get(s[1]);  // 切换到目标文件夹
        result += '\n';
      }
    } else {
      if (s.length !== 1) {
        result += '\n';
      } else {
        result += nowNode.path + '\n';  // 输出当前所在文件夹路径
      }
    }
  });
  
  rl.on('close', () => {
    const resArray = result.split('\n').filter(Boolean);
    console.log(resArray[resArray.length - 1]);  // 输出最终结果
  });
  