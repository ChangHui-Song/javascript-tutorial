'use strict';

let animal1 = {
  eats: true,
  walk() {
    console.log('걷는다.');
  },
};

let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal1;

rabbit.walk = function () {
  console.log('깡총깡총');
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

let animal2 = {
  walk() {
    if (!this.isSleeping) {
      console.log('걷는다.');
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

let rabbit = {
  name: 'rabbit',
  __proto__: animal2,
};

rabbit.sleep();

let animal3 = {
  eats: true,
};

let rabbit = {
  jumps: true,
  __proto__: animal3,
};

console.log(Object.keys(rabbit));
for (let prop in rabbit) console.log(prop);

for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    console.log(`rabbit prop: ${prop}`);
  } else {
    console.log(`animal prop: ${prop}`);
  }
}

// what is show?
let animal4 = {
  jumps: null,
};

let rabbit = {
  __proto__: animal4,
  jumps: true,
};

console.log(rabbit.jumps);
delete rabbit.jumps;
console.log(rabbit.jumps);
delete animal4.jumps;
console.log(rabbit.jumps);

// search algorithm
let head = {
  glasses: 1,
};

let table = {
  __proto__: head,
  pen: 3,
};

let bed = {
  __proto__: table,
  sheet: 1,
  pillow: 2,
};

let pockets = {
  __proto__: bed,
  money: 2000,
};

console.time('head');
console.log(`head: ${head.glasses}`);
console.timeEnd('head');

console.time('pockets');
console.log(`pockets: ${pockets.glasses}`);
console.timeEnd('pockets');

let hamster = {
  stomach: [],

  eat(food) {
    if (this.stomach.length) {
      this.stomach.push(food);
    } else {
      this.stomach = [food];
    }
  },
};

let speedy = {
  __proto__: hamster,
};

let lazy = {
  __proto__: hamster,
};

speedy.eat('peanut');
speedy.eat('apple');
console.log(speedy.stomach);
console.log(lazy.stomach);
