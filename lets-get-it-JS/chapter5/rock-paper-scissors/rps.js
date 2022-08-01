const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $scissors = document.querySelector('#scissors');
const $rock = document.querySelector('#rock');
const $paper = document.querySelector('#paper');
const IMG_URL = './rsp.png';
const rspX = {
  scissors: '0px',
  rock: '-220px',
  paper: '-440px',
};
const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: 2,
};

let computerChoice = 'scissors';
const computerHandChoice = () => {
  if (computerChoice === 'scissors') {
    computerChoice = 'rock';
  } else if (computerChoice === 'rock') {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = 'auto 200px';
}

const checkCompare = (id) => {
  const myChoice = id;
  const myScore = scoreTable[myChoice];
  const computerScore = scoreTable[computerChoice];
  const diff = myScore - computerScore;

  if ([2, -1].includes(diff)) {
    return 1;
  } else if ([-2, 1].includes(diff)) {
    return -1;
  } else if (diff === 0) {
    return 0;
  }
};

let intervalId = setInterval(computerHandChoice, 50);
let clickable = true;
let score = 0;
const clickButton = (event) => {
  let message;

  if (clickable) {
    clearInterval(intervalId);
    clickable = false
    const result = checkCompare(event.target.id);
    if (result === 1) {
      score++;
      message = '승리';
    } else if (result === 0) {
      message = '무승부';
    } else if (result === -1) {
      score--;
      message = '패배';
    }
    $score.textContent = `${message} 총: ${score}점`
    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(computerHandChoice, 50);
    }, 1000);
  }
};

$rock.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);