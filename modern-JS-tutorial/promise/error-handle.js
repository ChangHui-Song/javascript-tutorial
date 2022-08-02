// // 기본 문법
// new Promise((resolve, reject) => {
//   throw new Error('에러입니다.');
// }).catch(console.log);

// new Promise((resolve, reject) => {
//   reject(new Error('에러입니다.'));
// }).catch(console.log);

// new Promise((resolve, reject) => {
//   resolve('OK');
// })
//   .then((result) => {
//     isNotDefine();
//   })
//   .catch(console.log);

// // 에러 처리 후 계속 실행
// new Promise((resolve, reject) => {
//   throw new Error('Error');
// })
//   .catch(() => {
//     console.log('error handling');
//   })
//   .then(() => {
//     console.log('continue');
//   });

// // 처리하지 못한 에러 발생
// new Promise((resolve, reject) => {
//   throw new Error('Error');
// })
//   .catch((error) => {
//     if (error instanceof URIError) {
//       console.log('URIError');
//     } else {
//       throw new Error('Unkown Error');
//     }
//   })
//   .then(() => {
//     console.log('ignore');
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// // global error handler
process.on('uncaughtException', (error) => {
  console.log('에러 발생', error);
});

// new Promise(() => {
//   throw new Error('Global Error');
// });

// How does it work?

new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error('Error');
  }, 1000);
})
  .then(() => console.log('??'))
  .catch(() => console.log('error'));
