// map 선언
let map = new Map();

// set을 이용하여 key, value를 넣음
// 객체와 달리 key는 모든 자료형이 될 수 있음
map.set('1', 'str1');
map.set(1, 'num1');
map.set(true, 'bool1');
// map은 객체를 key로 사용할 수 있다.
let john = { name: 'john'};
map.set(john, 123);

// key의 자료형에 따라 value도 다르게 저장 가능
// console.log(map.get(1));
// console.log(map.get('1'));
// console.log(map.size);

// console.log(map);

// Object.entries를 이용한 객체를 맵으로 바꾸기
let obj = {
  name: 'john',
  age: 30,
}

let objToMap = new Map(Object.entries(obj));
// console.log(obj, objToMap);

// Object.fromEntries를 이용한 맵을 객체로 바꾸기
let fromEntriesMap = new Map();
fromEntriesMap.set('banana', 1);
fromEntriesMap.set('orange', 2);
fromEntriesMap.set('meat', 3);

let fromEntriesObj = Object.fromEntries(map.entries());

// console.log(fromEntriesMap);
// console.log(fromEntriesObj);


// set => 중복을 허용하지 않는 컬렉션 
let basicSet = new Set();

let setJohn = { name: 'John'};
let setPete = { name: 'Pete'};
let setMary = { name: 'Mary'};

basicSet.add(setJohn);
basicSet.add(setMary);
basicSet.add(setPete);
basicSet.add(setJohn);

// console.log(basicSet);
// console.log(basicSet.size);

// for (let user of basicSet) {
//   console.log(user);
// }

let forEachSet = new Set(['orange', 'apple', 'banana']);

// for (let value of forEachSet) {
//   console.log(value);
// }

// forEachSet.forEach((value, valueAgain, set) => {
//   console.log(value, valueAgain);
// });


// problem 1 배열 중복 제거
function unique(arr) {
  return Array.from(new Set(arr));
}

let values = ['hare', 'krishna', 'hare', 'krishna', 'krishna', ':-O'];
// console.log(unique(values));


// problem 2 anagram 걸러내기
function aclean(arr) {
  let map = new Map();
  for (let value of arr) {
    let sorted = value
      .toLowerCase()
      .split('')
      .sort()
      .join('');
    map.set(sorted, value);
  }
  return Array.from(map.values());
}

let arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares'];
// console.log(aclean(arr));

// problem 3 반복 가능 객체의 키
let problemap = new Map();

problemap.set('name', 'John');

let problemKeys = Array.from(problemap.keys());
problemKeys.push('more');
console.log(problemKeys);
