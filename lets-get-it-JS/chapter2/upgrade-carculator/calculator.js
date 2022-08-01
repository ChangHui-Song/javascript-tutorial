const $result = document.querySelector('#result');
const $operator = document.querySelector('#operator');

let numOne = '';
let numTwo = '';
let operator = '';

const onClickNumber = (number) => () => {
  if (!operator) {
    numOne += number;
    $result.value += number;
    return ;
  }
  if (!numTwo) {
    $result.value = '';
  }
  numTwo += number;
  $result.value += number;
};

document.querySelector('#num-0').addEventListener('click', onClickNumber('0'));
document.querySelector('#num-1').addEventListener('click', onClickNumber('1'));
document.querySelector('#num-2').addEventListener('click', onClickNumber('2'));
document.querySelector('#num-3').addEventListener('click', onClickNumber('3'));
document.querySelector('#num-4').addEventListener('click', onClickNumber('4'));
document.querySelector('#num-5').addEventListener('click', onClickNumber('5'));
document.querySelector('#num-6').addEventListener('click', onClickNumber('6'));
document.querySelector('#num-7').addEventListener('click', onClickNumber('7'));
document.querySelector('#num-8').addEventListener('click', onClickNumber('8'));
document.querySelector('#num-9').addEventListener('click', onClickNumber('9'));

const onClickOperator = (op) => () => {
  if (!numOne) {
    alert('첫 번째 숫자를 먼저 입력해주세요.');
    return ;
  }
  if (numOne && numTwo) {
    numOne = operate();
    numTwo = '';
    $result.value = numOne;
  }
  operator = op;
  $operator.value = op;
}

const operate = () => {
  let result;

  if (operator === '+') {
    result = parseInt(numOne) + parseInt(numTwo);
  } else if (operator === '-') {
    result = parseInt(numOne) - parseInt(numTwo);
  } else if (operator === '*') {
    result = parseInt(numOne) * parseInt(numTwo);
  } else if (operator === '/') {
    result = parseInt(numOne) / parseInt(numTwo);
  }

  return result
};

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#calculate').addEventListener('click', () => {
  if (!numTwo) {
    alert("제대로 된 계산식을 입력해주세요.");
    return ;
  }
  let result = operate();
  $result.value = result;
  numTwo = '';
  $operator.value = '';
  numOne = result;
});
document.querySelector('#reset').addEventListener('click', () => {
  $result.value = '';
  $operator.value = '';
  numOne = '';
  numTwo = '';
  operator = '';
});