// 배열의 요소 중 특정 법위에 속하지 않는 요소 삭제
const arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4)
console.log(arr);

function filterRangeInPlace(arr, min, max) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min || arr[i] > max) {
      arr.splice(i, 1);
      i--;
    }
  }
}