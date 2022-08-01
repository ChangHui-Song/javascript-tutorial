const $wrapper = document.querySelector('#wrapper');

const total = parseInt(prompt('카드 개수를 짝수로 입력하세요(최대 20).'));
const colors = [
  'red', 'orange', 'yellow', 'green', 'white',
  'pink', 'cyan', 'violet', 'gray', 'black',
];
let shuffled = [];
let colorSlice = colors.slice(0, total / 2);
let colorCopy = colorSlice.concat(colorSlice);
let completed = [];
let clicked = [];
let clickable = false;

const resetGame = () => {
  $wrapper.innerHTML = '';
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  startGame();
};

const shuffle = () => {
  let randomIndex;
  while (Array.isArray(colorCopy) && colorCopy.length !== 0) {
    randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled.push(colorCopy.splice(randomIndex, 1)[0]);
  }
};

const createCard = (cardColor) => {
  const card = document.createElement('div');
  card.className = 'card';
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.style.backgroundColor = cardColor;
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
};

function onClickCard() {
  if (!clickable || this === clicked[0]) {
    return ;
  }
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return ;
  }
  clickable = false;
  const first = clicked[0].querySelector('.card-back').style.backgroundColor;
  const second = clicked[1].querySelector('.card-back').style.backgroundColor;
  if (first === second) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked[0].removeEventListener('click', onClickCard);
    clicked[1].removeEventListener('click', onClickCard);
    clicked = [];
    clickable = true;
    if (completed.length === total) {
      setTimeout(() => {
        let endTime = new Date();
        alert(`정답입니다. 축하합니다! ${(endTime - startTime) / 1000}초 걸렸습니다!`);
        resetGame();
      }, 500);
    }
    return ;
  }
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
    clickable = true;
  }, 1000);
}

const startGame = () => {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(shuffled[i]);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    clickable = true;
  }, 5000);
};

startGame();
let startTime = new Date();