let animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit('buddy');

// console.log(rabbit.eats);

function Unkown(name) {
  this.name = name;
  console.log(name);
}

// let john = new Unkown('John');
// let micle = new john.constructor('Micle');

// change prototype
function Rabbit1() {}
Rabbit1.prototype = {
  eats: true,
};

let rabbit1 = new Rabbit1();
// rabbit1.prototype = {};
// Rabbit1.prototype.eats = false;
// delete rabbit1.eats;
delete Rabbit1.prototype.eats;
console.log(rabbit1.eats);

function Fruit(fruit) {
  this.fruit = fruit;
  console.log(this.fruit);
}

Fruit.prototype = {};

let fruit = new Fruit('apple');
let fruit2 = new fruit.constructor('banana');
