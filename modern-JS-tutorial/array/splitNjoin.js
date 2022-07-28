// 케밥 표기법을 카멜 표기법으로 바꾸기
const arr = ['background-color', 'list-style-image', '-webkit-transition'];
const camelizeArr = arr.map(string => camelize(string));

console.log(camelizeArr);
function camelize(string) {
  return string
    .split('-')
    .map((word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1))
    .join('');
}