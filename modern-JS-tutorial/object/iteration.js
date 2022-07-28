// sum value of object
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250,
};

console.log(sumSalaries(salaries));

function sumSalaries(salaries) {
  let totalSalarie = 0;
  Object.values(salaries).forEach(value => totalSalarie += value);
  return totalSalarie;
}

// count property of object
let user = {
  name: 'John',
  age: 30
};

console.log(count(user));

function count(user) {
  return Object.keys(user).length;
}