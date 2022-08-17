'use strict';

let animal = {
  eat: true,
};

let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal;

let animal2 = {
  eat: true,
  walk() {
    console.log('walk');
  },
};

let rabbit2 = {
  jumps: true,
  __proto__: animal2,
};

let longEar = {
  earLength: 10,
  __proto__: rabbit2,
};

let user = {
  name: 'John',
  surname: 'Smith',

  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

admin.fullName = 'Alice Cooper';

let animal3 = {
  walk() {
    if (!this.isSleeping) {
      console.log('walk');
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

let rabbit3 = {
  name: 'White Rabbit',
  __proto__: animal3,
};

rabbit3.sleep();

let animal4 = {
  eats: true,
};

let rabbit4 = {
  jumps: true,
  __proto__: animal,
};

// console.log(Object.keys(rabbit4));
// for (let prop in rabbit4) console.log(prop);

// for (let prop in rabbit4) {
//   if (rabbit4.hasOwnProperty(prop)) {
//     console.log(prop);
//   }
// }

// what is show?
let testAnimal = {
  jumps: null,
};

let testRabbit = {
  __proto__: testAnimal,
  jumps: true,
};

console.log(testRabbit.jumps);
delete testRabbit.jumps;
console.log(testRabbit.jumps);
delete testAnimal.jumps;
console.log(testRabbit.jumps);

// what is fast?
let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};

// console.time('head');
// console.log(head.glasses);
// console.timeEnd('head');

// console.time('pockets');
// console.log(pockets.glasses);
// console.timeEnd('pockets');

let testAnimal2 = {
  eat() {
    this.full = true;
  },
};

let testRabbit2 = {
  __proto__: testAnimal2,
};

testRabbit2.eat();

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach = [food];
  },
};

let speedy = {
  __proto__: hamster,
};

let lazy = {
  __proto__: hamster,
};

speedy.eat('apple');
console.log(speedy.stomach);
console.log(lazy.stomach);
