// return Promise
new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  });

// thenable
class Thenable {
  constructor(number) {
    this.number = number;
  }
  then(resolve, reject) {
    console.log(this.number);
    setTimeout(() => resolve(this.number * 2), 1000);
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result);
  })
  .then(console.log);
