function loadScript(src, callback) {
  let script = document.createElement('script');

  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오지 못했습니다.`));
  document.head.append(script);
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.j',
  (error, script) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`${script.src}가 로드되었습니다.`);
    }
  }
);
