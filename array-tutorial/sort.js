// 요소 내림차순 정렬
const arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);
console.log(arr);

// 배열을 복사해 정렬
const arr2 = ['HTML', "JavaScript", 'CSS'];
let sorted = arr2.slice().sort();

console.log(arr2, sorted);