// WeakSet을 활용하여 읽음 상태인 메시지 저장하기
let setMessage = [
  {test: "Hello" , from: "John"},
  {test: "How goes" , from: "John"},
  {test: "See you soon" , from: "Alice"},
];

let readMessages = new WeakSet();

readMessages.add(setMessage[0]);
readMessages.add(setMessage[1]);

// set 자료형과 같이 중복을 제거함
readMessages.add(setMessage[0]);

setMessage.forEach((message, index) => {
  console.log(`message ${index}는 읽은 상태인가요? `+ readMessages.has(message))
});

// WeakMap을 활용하여 읽은 날짜 저장하기
let mapMessage = [
  {test: "Hello" , from: "John"},
  {test: "How goes" , from: "John"},
  {test: "See you soon" , from: "Alice"},
];

let dateOfReadMessage = new WeakMap();

dateOfReadMessage.set(mapMessage[0], new Date());

mapMessage.forEach((message, index) => {
  // 값이 없는데 접근하면 undefined를 반환함
  console.log(`mapMessage ${index}: ${dateOfReadMessage.get(message)}`);
});