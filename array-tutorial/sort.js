// 요소 내림차순 정렬
const arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);
console.log(arr);

// 배열을 복사해 정렬
const arr2 = ['HTML', "JavaScript", 'CSS'];
let sorted = arr2.slice().sort();

console.log(arr2, sorted);

//객체가 담긴 배열을 age를 활용해서 오름차순 정렬하는 함수 구현
const john = {name: 'John', age: 25};
const pete = {name: 'pete', age: 30};
const mary = {name: 'Mary', age: 28};
const users = [john, pete, mary];
const usersSort = sortByAge(users);

console.log(usersSort);

function sortByAge(users) {
  return users.slice().sort((objA, objB) => objA.age - objB.age);
}