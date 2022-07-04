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

$form.addEventListener('submit', (event) => {
  const value = $input.value;
  event.preventDefault();
  $input.value = '';
  console.log(answer);
  if (!checkInput(value)) {
    return ;
  }
  if (answer.join('') === value) {
    $logs.textContent = '홈런!';
  }
});