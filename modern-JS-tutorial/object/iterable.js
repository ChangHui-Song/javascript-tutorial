let range = {
  from: 1,
  to: 5,
};

// 객체는 일반적으로 반복이 불가
//Symbol.iterator을 객체에 만들어 주면서 iterable가능
range[Symbol.iterator] = function() {
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

for (let num of range) {
  console.log(num);
}
console.log(range[Symbol.iterator]());

let string = 'string';
console.log(string[Symbol.iterator]());

let arrayLike = {
  0: 'hello',
  1: 'world',
  length: 2,
};

// Array.from함수로 유사배열객체를 배열로 만들 수 있다.
// 배열의 모든 매서드를 사용 가능
let arr = Array.from(arrayLike);
console.log(arrayLike, arr);