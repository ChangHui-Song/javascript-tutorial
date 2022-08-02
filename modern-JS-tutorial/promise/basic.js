// basic structure
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log('result=>', result);
    return result * 2;
  })
  .then(function (result) {
    console.log('result=>', result);
    return result * 2;
  })
  .then(function (result) {
    console.log('result=>', result);
    return result * 2;
  });

// Is not Promise chaining
let isNotChaining = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

isNotChaining.then((result) => {
  console.log(result);
  return result * 2;
});

isNotChaining.then((result) => {
  console.log(result);
  return result * 2;
});

isNotChaining.then((result) => {
  console.log(result);
  return result * 2;
});
