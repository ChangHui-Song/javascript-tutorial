//특정 법위에 속하는 요소 반환
const arr = [5, 3, 8, 1];
const filtered = filterRange(arr, 1, 4);

console.log(arr, filtered);

function filterRange(arr, min, max) {
  return arr.filter(value => (min <= value && value <= max));
}