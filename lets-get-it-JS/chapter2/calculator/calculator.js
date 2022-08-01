const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

let numOne = '';
let numTwo = '';
let operator = '';

// 일반 함수 사용
const onClickNumber = (event) => {
  if (!operator) {
    numOne += event.target.textContent;
    $result.value += event.target.textContent;
    return ;
  }
  if (!numTwo) {
    $result.value = '';
  }
  numTwo += event.target.textContent;
  $result.value += event.target.textContent;
};

// // 고차 함수
// const onClickNumber = (number) => () => {
//   if (!operator) {
//     numOne += number;
//   } else {
//     numTwo += number;
//   }
//   $result.value += number;
// };

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);
// // 일반 함수
// const onClickOperator = (event) => {
//   if (numOne) {
//     operator = event.target.textContent;
//     $operator.value = event.target.textContent;
//   } else {
//     alert("첫 번째 숫자를 먼저 입력해주세요.");
//   }
// }

const onClickOperator = (op) => () => {
  if (numOne) {
    operator = op;
    $operator.value = op;
  } else {
    alert("첫 번째 숫자를 먼저 입력해주세요.");
  }
};

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#calculate').addEventListener('click', () => {
  if (!numTwo) {
    alert("두 번째 숫자를 입력해주세요.");
    return ;
  }
  let tmpOne = parseInt(numOne);
  let tmpTwo = parseInt(numTwo);
  // switch 버전
  switch (operator) {
    case '+':
      $result.value = tmpOne + tmpTwo;
      break ;
    case '-':
      $result.value = tmpOne - tmpTwo;
      break ;
    case '*':
      $result.value = tmpOne * tmpTwo;
      break ;
    case '/':
      $result.value = tmpOne / tmpTwo;
      break ;
    default:
      break ;
  }
  // // if 버전
  // if (operator === '+') {
  //   $result.value = tmpOne + tmpTwo;
  // } else if (operator === '-') {
  //   $result.value = tmpOne - tmpTwo;
  // } else if (operator === '*') {
  //   $result.value = tmpOne * tmpTwo;
  // } else {
  //   $result.value = tmpOne / tmpTwo;
  // }
});
document.querySelector('#clear').addEventListener('click', () => {
  $result.value = '';
  $operator.value = '';
  numOne = '';
  numTwo = '';
  operator = '';
});
