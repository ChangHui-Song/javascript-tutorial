window.onload = function () {
  const number = parseInt(prompt('참가자가 몇 명인가요?'), 10);
  const $button = document.querySelector('button');
  const $input = document.querySelector('input');
  const $word = document.querySelector('#word');
  const $order = document.querySelector('#order');
  let word;
  let newWord;

  $button.addEventListener('click', onClick);
  $input.addEventListener('input', onInput);
  $input.addEventListener('keyup', pressedEnter);
  $input.focus();

  function pressedEnter(event) {
    if (window.event.keyCode === 13) {
      onClick();
    }
  }

  function onClick() {
    const order = parseInt($order.textContent);
    if (!word || word[word.length - 1] === newWord[0]) {
      word = newWord;
      $word.textContent = word;
      if (order + 1 > number) {
        $order.textContent = 1;
      } else {
        $order.textContent = order + 1;
      }
    } else {
      alert("올바르지 않은 단어입니다.");
      // location.reload();
    }
    $input.value = '';
  }

  function onInput(event) {
    newWord = event.target.value;
  }
}
