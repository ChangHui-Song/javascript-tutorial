const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
let timeoutId;
const records = [];

$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) {
    event.target.classList.replace('waiting', 'ready');
    $screen.textContent = '초록색이 되면 클릭하세요.';
    timeoutId = setTimeout(() => {
      $screen.classList.replace('ready', 'now');
      $screen.textContent = '클릭하세요!';
      startTime = new Date();
    }, Math.floor((Math.random() * 1000) + 2000));
  } else if (event.target.classList.contains('ready')) {
    clearTimeout(timeoutId);
    $screen.classList.replace('ready', 'waiting');
    $screen.textContent = '너무 성급하시군요! 다시 시작하세요.';
  } else if (event.target.classList.contains('now')) {
    endTime = new Date();
    const myResponseSpeed = endTime - startTime;
    records.push(myResponseSpeed);
    records.sort((a, b) => a - b);
    const average = records.reduce((a, c) => a + c) / records.length;
    startTime = null;
    endTime = null;
    $result.textContent = `현재 : ${myResponseSpeed}ms 평균 : ${parseInt(average)}ms`;
    const topFive = records.slice(0, 5);
    topFive.forEach((value, index) => {
      $result.append(
        document.createElement('br'),
        `${index + 1}등 : ${value}ms`,
        );
    });
    $screen.classList.replace('now', 'waiting');
    $screen.textContent = '클릭해서 시작하세요.';
  }
});
