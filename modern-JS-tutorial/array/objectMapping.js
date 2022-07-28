// 세 개의 프로퍼티가 담긴 객체에서 firstName과 LastName을 조합하여 name을 만들고,
// 이를 이용하여 id와 fullName을 가진 객체를 반환하는 함수 구현

const john = {name: 'John', surname: 'Smith', id: 1};
const pete = {name: 'pete', surname: 'Hunt', id: 2};
const mary = {name: 'Mary', surname: 'Key', id: 3};
const users = [john, pete, mary];

const usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id,
}));

console.log(usersMapped);