// function makeCounter() {
//   function counter() {
//     return counter.count;
//   }
//   counter.count = 0;
//   counter.set = (value) => (counter.count = value);
//   counter.decrease = () => counter.count--;
//   return counter;
// }

function makeCounter() {
  let count = 0;
  function counter() {
    return count;
  }
  counter.set = (value) => (count = value);
  counter.decrease = () => count--;
  return counter;
}

let counter = makeCounter();
counter.set(10);
counter.decrease();
console.log(counter());
