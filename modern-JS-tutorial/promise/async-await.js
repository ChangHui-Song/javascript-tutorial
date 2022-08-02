// // 기본 구조
// async function f() {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('완료'), 1000);
//   });
//   let result = await promise;
//   console.log(result);
// }

// f();

// // await with global anonymous function
// (async () => {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('완료'), 1000);
//   });
//   let result = await promise;
//   console.log(result);
// })();

// // await with thenable
// class Thenable {
//   constructor(number) {
//     this.number = number;
//   }
//   then(resolve, reject) {
//     console.log(this.number);
//     setTimeout(() => resolve(this.number * 2), 1000);
//   }
// }

// async function thenableFunc() {
//   let thenable = await new Thenable(2);
//   console.log(thenable);
// }

// thenableFunc();

// // async class method
// class Waiter {
//   async wait() {
//     return await Promise.resolve(1);
//   }
// }

// new Waiter().wait().then(console.log);

// error handling
async function f() {
  try {
    throw new Error('throw Error');
  } catch {
    throw new Error('catch block Error');
  }
}

f().catch(console.log);
console.log('continue');

// problem 1
function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}
loadJson('no-such-user.json').catch(console.log);

async function loadJson(url) {
  let response = await fetch(url);

  if (response.status === 200) {
    let json = response.json();
    return json;
  } else {
    throw new Error(response.status);
  }
}
loadJson('no-such-user.json').catch(console.log);

// problem 2
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpsError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
}

function demoGithubUser() {
  let name = prompt('Github username을 입력하세요.', 'iliakan');

  return loadJson(`https://api.github.com/users/${name}`)
    .then((user) => {
      console.log(`name: ${user.name}`);
      return user;
    })
    .catch((error) => {
      if (error instanceof HttpError && error.response.status === 404) {
        console.log('Unkown User');
        return demoGithubUser();
      } else {
        throw error;
      }
    });
}
demoGithubUser();

async function loadJson(url) {
  let response = await fetch(url);

  if (response.status === 200) {
    let json = await response.json();
    return json;
  } else {
    throw new HttpError(response);
  }
}

async function demoGithubUser() {
  let name;
  while (true) {
    name = prompt('Github Username을 입력하세요.', 'iliakan');
    let user = await loadJson(`https://api.github.com/users/${name}`);
    try {
      console.log(`name: ${user.name}`);
      break;
    } catch {
      if (error instanceof HttpError && error.response === 404) {
        console.log('Unkown User');
      } else {
        throw error;
      }
    }
  }
  console.log(`name: ${user.name}`);
  return user;
}
