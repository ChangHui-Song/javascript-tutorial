const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');

let holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;

const tick = () => {
  holes.forEach((hole, index) => {
    if (hole) return ;
    const $gopher = $$cells[index].querySelector('.gopher');
    holes[index] = setTimeout(() => {
      $gopher.classList.add('hidden');
      holes[index] = 0;
    }, 1000);
    $gopher.classList.remove('hidden');
  });
};

$start.addEventListener('click', () => {
  if (started) return ;
  started = true;
  const tickId = setInterval(tick, 1000);
  tick();
});
