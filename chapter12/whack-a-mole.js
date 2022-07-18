const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $start = document.querySelector('#start');
const $life = document.querySelector('#life');
const $$cells = document.querySelectorAll('.cell');

let holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let tickId;
let timerId;
let score = 0;
let time = 60;
let gopherPercent = 0.3;
let bombPercent = 0.5;
let life = 3;

const tick = () => {
  holes.forEach((hole, index) => {
    if (hole) return ;
    const randomValue = Math.random();
    if (randomValue < gopherPercent) {
      const $target = $$cells[index].querySelector('.gopher');
      holes[index] = setTimeout(() => {
        $target.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $target.classList.remove('hidden');
    } else if (randomValue < bombPercent) {
      const $target = $$cells[index].querySelector('.bomb');
      holes[index] = setTimeout(() => {
        $target.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $target.classList.remove('hidden');
    } 
  });

  $$cells.forEach(($cell, index) => {
    $cell.querySelector('.gopher').addEventListener('click', (event) => {
      if (!event.target.classList.contains('dead')) {
        score += 1;
        $score.textContent = score;
      }
      event.target.classList.add('dead');
      event.target.classList.add('hidden');
      clearTimeout(holes[index]);
      setTimeout(() => {
        holes[index] = 0;
        event.target.classList.remove('dead');
      }, 1000);
    });
    $cell.querySelector('.bomb').addEventListener('click', (event) => {
      if (!event.target.classList.contains('boom')) {
        life--;
        $life.textContent = life; 
        if (life === 0) {
          setTimeout(() => {
            clearInterval(timerId);
            clearInterval(tickId);
            alert(`게임 오버! ${score}점 달성!`);
          }, 100);
        }
      }
      event.target.classList.add('boom');
      event.target.classList.add('hidden');
      clearTimeout(holes[index]);
      setTimeout(() => {
        holes[index] = 0;
        event.target.classList.remove('boom');
      }, 1000);
    });
  });
};

$start.addEventListener('click', () => {
  if (started) return ;
  started = true;
  tickId = setInterval(tick, 1000);
  timerId = setInterval(() => {
    time = (time * 10 - 1) / 10;
    $timer.textContent = time
    if (time === 0) {
      setTimeout(() => {
        clearInterval(timerId);
        clearInterval(tickId);
        alert(`게임 오버! ${score}점 달성!`);
      }, 100);
    }
  }, 100);
  tick();
});
