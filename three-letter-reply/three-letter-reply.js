const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word = document.querySelector('#word');
const $player = document.querySelector('#player');

let number = prompt("참가자는 몇 명입니까?");
let word;
let newWord;
let player;

const onClick = (event) => {
  const player = parseInt($player.textContent);
  if (newWord.length === 3 && (!word || newWord[0] === word[word.length - 1])) {
    word = newWord;
    $word.textContent = word;
    $player.textContent = player % number + 1;
  } else {
    alert('틀렸습니다! 다시 입력하세요.');
  }
  $input.value = '';
};

const pressedEnter = (event) => {
  if (window.event.keyCode === 13) {
    onClick();
  }
};

const onInput = (event) => {
  newWord = event.target.value;
};

if (number) {
  if (isNaN(number)) {
    alert("숫자가 아닙니다. 다시 입력해주세요.");
    location.reload();
  }
  number = parseInt(number);
  $input.focus();
  $input.addEventListener('keydown', pressedEnter);
  $button.addEventListener('click', onClick);
  $input.addEventListener('input', onInput);
}