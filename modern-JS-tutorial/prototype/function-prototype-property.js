let animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name = name;
  console.log(name);
}

let rabbit1 = new Rabbit('black rabbit');

Rabbit.prototype = animal;

let rabbit2 = new Rabbit('white rabbit');

let rabbit3 = new rabbit1.constructor('yellow rabbit');

Rabbit.prototype.jumps = true;

let rabbit4 = new Rabbit('grey rabbit');

// Change prototype

function Rabbit() {}
Rabbit.prototype = {
  eats: true,
};

let rabbit = new Rabbit();

delete Rabbit.prototype.eats;

console.log(rabbit.eats);
