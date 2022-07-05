const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $logs = document.querySelector('#logs');

const numbers = [];
const answer = [];
const tries = [];
let index;

for (let i = 0; i < 9; i++) {
  numbers.push(i + 1);
}

while (answer.length !== 4) {
  index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

const checkInput = (input) => {
  if (input.length !== 4) {
    return alert('4자리 숫자를 입력해주세요.');
  }
  if (new Set(input).size !== 4) {
    return alert('중복된 숫자를 입력했습니다.');
  }
  if (tries.includes(input)) {
    return alert('이미 입력한 적 있는 숫자입니다.');
  }
  return true;
};
let out = 0;
$form.addEventListener('submit', (event) => {
  const value = $input.value;
  let strike = 0;
  let ball = 0;
  event.preventDefault();
  $input.value = '';
  console.log(answer);
  if (!checkInput(value)) {
    return ;
  }
  if (answer.join('') === value) {
    $logs.textContent = '홈런!';
    return ;
  }
  if (tries.length >= 9) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
    $logs.appendChild(message);
    return ;
  }

  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike += 1;
        continue ;
      }
      ball += 1;
    }
  }
  let message2 = '';
  if (strike === 0 && ball === 0) {
    out++;
    message2 = `${value}: OUT!`;
  } else {
    message2 = `${value}: ${strike}s ${ball}b`;
  }
  if (out === 3) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
    $logs.appendChild(message);
    return ;
  }
  $logs.append(message2, document.createElement('br'));
  tries.push(value);
});
