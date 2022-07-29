// What will it Show: John or Pete?
let name = 'John';

function sayHi() {
  console.log(`Hi, ${name}`);
}

name = 'Pete';
sayHi();

// What will it Show2: John or Pete?
function makeWorker() {
  let name2 = 'Pete';

  return function () {
    console.log(name2);
  };
}

// let name2 = 'John';
let work = makeWorker();
work(); // what will it show?

// What will it show3?
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log('counter', counter()); // ?
console.log('counter', counter()); // ?

console.log('counter2', counter2());
console.log('counter2', counter2());

// what will it show4?
function Counter() {
  let count = 0;

  this.up = function () {
    return ++count;
  };
  this.down = function () {
    return --count;
  };
}

let objCounter = new Counter();

console.log('counter.up()', objCounter.up());
console.log('counter.up()', objCounter.up());
console.log('counter.down()', objCounter.down());

// Summary using closures
function sum(firstNumber) {
  return function (secondNumber) {
    return firstNumber + secondNumber;
  };
}

console.log('sum(1)(2)', sum(1)(2));
console.log('sum(5)(1)', sum(5)(-1));

// Filter out only the values you want using a function
let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.filter(inBetween(3, 6)));
console.log(arr.filter(inArray([1, 2, 10])));

function inBetween(before, after) {
  return function (value) {
    return value >= before && value <= after;
  };
}

function inArray(subArray) {
  return function (value) {
    return subArray.includes(value);
  };
}

// sort by field
let users = [
  { name: 'John', age: 20, surname: 'Johnson' },
  { name: 'Pete', age: 18, surname: 'Peterson' },
  { name: 'Ann', age: 19, surname: 'Hathaway' },
];

console.log("users.sort(byField('name'))", users.sort(byField('name')));
console.log("users.sort(byField('age'))", users.sort(byField('age')));

function byField(category) {
  return (a, b) => (a[category] > b[category] ? 1 : -1);
}

// Build an army using function
function makeArmy() {
  let shooters = [];

  for (let i = 0; i < 10; i++) {
    let shooter = function () {
      console.log(i);
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();
army[0]();
army[5]();
