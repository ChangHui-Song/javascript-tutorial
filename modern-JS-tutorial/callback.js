// anonymous callback function
let arr = [1, 2, 3, 4, 5];

arr.forEach((value) => {
  console.log(value);
});

// naming callback function
let printNumber = (value) => {
  console.log(value);
};

arr.forEach(printNumber);

// callback hell
function add(number, callback) {
  let result = number + number;
  console.log(result);
  callback(result);
}

add(2, function (result) {
  add(result, function (result) {
    add(result, function () {
      console.log('done!');
    });
  });
});
