let animal = {
  eats: true,
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true,
  },
});

// add toString to obj
let dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join();
    },
  },
});

dictionary.apple = 'Apple';
dictionary.__proto__ = 'test';

for (let key in dictionary) {
  console.log(key);
}

console.log(dictionary.toString());

// what is show?
function TestRabbit(name) {
  this.name = name;
}

TestRabbit.prototype.sayHi = function () {
  console.log(this.name);
};

let testRabbit = new TestRabbit('rabbit');

testRabbit.sayHi();
TestRabbit.prototype.sayHi();
Object.getPrototypeOf(testRabbit).sayHi();
testRabbit.__proto__.sayHi();
