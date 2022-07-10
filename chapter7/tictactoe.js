const $table = document.createElement('table');
const $result = document.createElement('div');
const board = [];
let turn = 'O';
for(let i = 0; i < 3; i++) {
  board.push([]);
}

document.body.append($table);
document.body.append($result);

const checkWinner = (target) => {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let hasWinner = false;
  
  if (
    board[rowIndex][0].textContent === turn &&
    board[rowIndex][1].textContent === turn &&
    board[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    board[0][cellIndex].textContent === turn &&
    board[1][cellIndex].textContent === turn &&
    board[2][cellIndex].textContent === turn 
  ) {
    hasWinner = true;
  }
  if (
    board[0][0].textContent === turn &&
    board[1][1].textContent === turn &&
    board[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    board[2][0].textContent === turn &&
    board[1][1].textContent === turn &&
    board[0][2].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
}

const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(randomCell);
  if (hasWinner) {
    $result.textContent = `${turn}님의 승리!`;
  }
  const draw = board.flat().every(cell => cell.textContent);
  if (draw) {
    $result.textContent = '무승부';
    return ;
  }
  turn = turn === 'X' ? 'O' : 'X';
}

const callback = (event) => {
  if ($result.textContent) {
    return ;
  }
  if (event.target.textContent) return ;
  event.target.textContent = turn;
  if (checkWinner(event.target)) {
    $result.textContent = `${turn}님의 승리!`;
    return ;
  }
  let draw = true;
  draw = board.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = '무승부!';
    return ;
  }
  // turn = turn === 'X' ? 'O' : 'X';
  if (turn === 'O') {
    turn = 'X';
  } else if (turn === 'X') {
    turn = 'O';
  }
  if (turn === 'X') {
    const emptyCells = board.flat().filter(v => !v.textContent);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'X';
    const hasWinner = checkWinner(randomCell);
    if (hasWinner) {
      $result.textContent = `${turn}님의 승리!`;
    }
    const draw = board.flat().every(cell => cell.textContent);
    if (draw) {
      $result.textContent = '무승부';
      return ;
    }
    turn = turn === 'X' ? 'O' : 'X';
  }
};

for (let i = 0; i < board.length; i++) {
  const $tr = document.createElement('tr');
  $table.append($tr);
  for (let j = 0; j < board.length; j++) {
    const $td = document.createElement('td');
    $tr.append($td);
    board[i].push($td);
  }
  $table.addEventListener('click', callback);
}