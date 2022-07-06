const $form = document.querySelector('#form');
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
const bonus = shuffle[winBalls.length];
console.log(winBalls, bonus);
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

const drawBall = (number, $target) => {
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = number;
  colorize(number, $ball);
  $target.appendChild($ball);
}

const showBall = () => {
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
    setTimeout(() => drawBall(number, $target), 1000 * (i + 1));
  }
}

const checkInputValue = (inputArray) => {
  let value;

  if (inputArray.length !== new Set(inputArray).size) {
    return false;
  }

  for (let i = 0; i < inputArray.length; i++) {
    value = inputArray[i];
    if (!(value && (value >= 1 && value <= 45 ))) {
      return false;
    }
  }
  return true;
};

const compareLottoNumber = (inputArray) => {
  let count = 0;
  let bonusCheck = 0;

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray.includes(winBalls[i])) {
      count++;
    }
  }
  if (inputArray.includes(bonus)) {
    bonusCheck++;
  }
  return [count, bonusCheck];
};

const showResult = (count) => {
  if (count[0] < 3) {
    alert('당첨되지 못했습니다.');
  } else if (count[0] === 3) {
    alert('축하합니다. 5등에 당첨되셨습니다.');
  } else if (count[0] === 4) {
    alert('축하합니다. 4등에 당첨되셨습니다.');
  } else if (count[0] === 4) {
    alert('축하합니다. 3등에 당첨되셨습니다.');
  } else if (count[0] === 5 && count[1]) {
    alert('축하합니다. 2등에 당첨되셨습니다.');
  } else {
    alert('축하합니다. 1등에 당첨되셨습니다.');
  }
}

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $inputNodeList = document.querySelectorAll('form input');
  let inputArray = Array.prototype.slice.call($inputNodeList);
  inputArray = inputArray.map((v, i) => parseInt(v.value));

  if (!checkInputValue(inputArray)) {
    alert("1 ~ 45의 숫자를 중복되지 않게 입력해주세요.");
    return ;
  }
  const collectCount = compareLottoNumber(inputArray);
  showBall();
  setTimeout(() => showResult(collectCount), 7500);
});
