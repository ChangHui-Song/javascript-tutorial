// setInterval
function printNumber(from, to) {
  let current = from;
  let intervalID = setInterval(() => {
    if (current === to) {
      clearInterval(intervalID);
    }
    console.log(current);
    current++;
  }, 1000);
}

// setTimeout
function printNumber(from, to) {
  let current = from;

  setTimeout(function go() {
    console.log(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

printNumber(3, 5);

// what is show?
let i = 0;
setTimeout(() => console.log(i), 100);

for (let j = 0; j < 10000000; j++) {
  i++;
}
