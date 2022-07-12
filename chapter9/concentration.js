const $wrapper = document.querySelector('#wrapper');

const total = 12;
const shuffled = [];
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
const colorCopy = colors.concat(colors);


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

const startGame = () => {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(shuffled[i]);
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
  }, 5000);
};

startGame();