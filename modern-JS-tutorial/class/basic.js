'use strict';

class User {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log('이름이 짧습니다.');
      return;
    }
    this._name = value;
  }

  sayHi() {
    console.log(this.name);
  }
}

let user = new User('Hi');
console.log(user.name);

// example 1
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
    return this.timer;
  }
}

let clock = new Clock({ template: 'h:m:s' });
let clockID = clock.start();

setTimeout(() => {
  clearInterval(clockID);
}, 5000);
