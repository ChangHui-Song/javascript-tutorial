const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$cell = document.querySelectorAll('.cell');

let started = false;
$start.addEventListener('click', (event) => {
  if (started) return ;
})