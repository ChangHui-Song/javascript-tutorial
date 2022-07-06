const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');
const candidate = Array(45).fill().map((v, i) => i + 1);
const shuffle = [];

while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length);
  const spliceArray = candidate.splice(random, 1);
  const value = spliceArray[0];
  shuffle.push(value);
}
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];

const colorize = (number, $ball) => {
  if (!(number > 10 && number < 30)) {
    $ball.style.color = 'white';
  }
  if (number < 10) {
    $ball.style.backgroundColor = 'red';
  } else if (number < 20) {
    $ball.style.backgroundColor = 'orange';
  } else if (number < 30) {
    $ball.style.backgroundColor = 'yellow';
  } else if (number < 40) {
    $ball.style.backgroundColor = 'green';
  } else {
    $ball.style.backgroundColor = 'blue';
  }
}

const showBall = (number, $target) => {
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = number;
  colorize(number, $ball);
  $target.appendChild($ball);
}

for (let i = 0; i <= winBalls.length; i++) {
  let number;
  let $target;
  if (i === 6) {
    number = bonus;
    $target = $bonus;
  } else {
    number = winBalls[i];
    $target = $result;
  }
  setTimeout(() => showBall(number, $target), 1000 * (i + 1));  
}
