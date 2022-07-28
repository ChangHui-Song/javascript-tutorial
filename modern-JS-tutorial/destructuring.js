// destructuring assignment problem1
let user = {
  name: 'John',
  years: 30,
};

let { name, years: age, isAdmin = false } = user;

console.log(name, age, isAdmin);

// destructuring assignment problem2
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

console.log(topSalary(salaries));

function topSalary(salaries) {
  let maxSalary = -1;
  let maxUser = null;

  Object.entries(salaries).forEach(([name, salarie]) => {
    if (maxSalary < salarie) {
      maxSalary = salarie;
      maxUser = name;
    }
  });

  return maxUser;
}
