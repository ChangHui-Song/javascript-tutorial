// rest parameters example
console.log(sum(1, 2, 3, 4, 5));
console.log(sumAll(1, 2, 3));

function sum(a, b) {
  return a + b;
}

function sumAll(...args) {
  let sum = 0;

  for (let arg of args) {
    sum += arg;
  }
  return sum;
}

// arguments example (old way)
showName('Changhui', 'Song');

function showName() {
  console.log('arguments.length :', arguments.length);
  Array.from(arguments).forEach((value, index) => {
    console.log(`arguments[${index}] : ${value}`);
  });
}

// spread arguments example
let arr = [3, 5, 1];
console.log(Math.max(...arr));

let subArray = [8, 9, 15];
let merged = [...arr, ...subArray];
console.log('merged', merged);

// string to array using spread arguments
let str = 'String';
console.log('[...str]', [...str]);
