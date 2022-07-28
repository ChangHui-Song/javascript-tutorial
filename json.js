// JSON problem 1
let user = {
  name: 'John Smith',
  age: 35
}
let copyUser = JSON.parse(JSON.stringify(user));
// console.log(copyUser);

// JSON problem 2
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: 'John'}, {name: 'Alice'}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

console.log(room);
console.log(meetup);

let jsonMeetup = JSON.stringify(meetup, function replacer(key, value) {
  return (key !== '' && value === meetup) ? undefined : value;
});

console.log(jsonMeetup);