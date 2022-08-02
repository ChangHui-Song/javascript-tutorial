// Promise.all 기본 구조
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
]).then(console.log);

// Promise.allSettled
Promise.allSettled([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Error')), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000)),
]).then(console.log);

// Promise.race
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Error')), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000)),
]).then(console.log);
