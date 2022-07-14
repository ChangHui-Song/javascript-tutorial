const $form = document.querySelector('#form');
const $timer = document.querySelector('#timer');
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
const CODE = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0,
};
let data;
let row;
let cell;
let mine;
let interval;
let openCount = 0;
let firstClick = true;
let normalCellFound = false;
let searched = [];

// 첫 번째 클릭시 지뢰면 바꾸는 함수
function transferMine(rI, cI) {
  if (normalCellFound) return ;
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return ;
  if (searched[rI][cI]) return ;
  if (data[rI][cI] === CODE.NORMAL) {
    data[rI][cI] = CODE.MINE;
    normalCellFound = true;
  }
  if (data[rI][cI] === CODE.MINE) {
    searched[rI][cI] = true;
    transferMine(rI - 1, cI - 1);
    transferMine(rI - 1, cI);
    transferMine(rI - 1, cI + 1);
    transferMine(rI, cI - 1);
    transferMine(rI, cI + 1);
    transferMine(rI + 1, cI - 1);
    transferMine(rI + 1, cI);
    transferMine(rI + 1, cI + 1);
  }
}

// 지뢰 밟았을 때 나머지 지뢰 표시 함수
function showMines() {
  const mines = [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE];
  data.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      if (mines.includes(cell)) {
        $tbody.children[rI].children[cI].textContent = 'X';
      }
    });
  });
}

function plantMine() {
  const candidate = Array(row * cell).fill().map((arr, i) => i);
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
    data.push(rowData);
  }

  while (Array.isArray(shuffle) && shuffle.length !== 0) {
    const index = shuffle.pop();
    const ver = Math.floor(index / cell);
    const hor = index % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

function onRightClick(event) {
  event.preventDefault();
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];
  if (cellData === CODE.MINE) {
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION_MINE) {
    data[rowIndex][cellIndex] = CODE.FLAG_MINE;
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE;
    target.className = '';
    target.textContent = 'X';
  } else if (cellData === CODE.NORMAL) {
    data[rowIndex][cellIndex] = CODE.QUESTION;
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION) {
    data[rowIndex][cellIndex] = CODE.FLAG;
    target.className = 'flag';
    target.textContent = '!';
  } else {
    data[rowIndex][cellIndex] = CODE.NORMAL;
    target.className = '';
    target.textContent = '';
  }
}

function countMine(rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}

function open(rI, cI) {
  if (data[rI]?.[cI] >= CODE.OPENED) return ;
  const target = $tbody.children[rI]?.children[cI];
  if (!target) return ;
  const count = countMine(rI, cI);
  target.textContent = count || '';
  target.className = 'opened';
  data[rI][cI] = count;
  openCount++;
  if (openCount === row * cell - mine) {
    setTimeout(() => {
      alert(`축하합니다. 지뢰를 모두 찾았습니다.`);
      clearInterval(interval);
      openCount = 0;
      $tbody.removeEventListener('contextmenu', onRightClick);
      $tbody.removeEventListener('click', onLeftClick);
    }, 100);
  }
  return count;
}

function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0);
}

function onLeftClick(event) {
  const { target } = event;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];
  if (firstClick) {
    firstClick = false;
    searched = Array(row).fill().map(() => []);
    if (cellData === CODE.MINE) {
      transferMine(rowIndex, cellIndex);
      data[rowIndex][cellIndex] = CODE.NORMAL;
      cellData = CODE.NORMAL;
    }
  }
  if (cellData === CODE.NORMAL) {
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    showMines();
    target.textContent = '펑';
    target.className = 'opened';
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    clearInterval(interval);
    return ;
  }
}

function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      // if (cell === CODE.MINE) {
      //   $td.textContent = 'X';
      // }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  });
}

function onSubmit(event) {
  event.preventDefault();
  row = parseInt(event.target.row.value);
  cell = parseInt(event.target.cell.value);
  mine = parseInt(event.target.mine.value);
  clearInterval(interval);
  $tbody.innerHTML = '';
  $timer.textContent = '0초';
  firstClick = true;
  normalCellFound = false;
  drawTable();
  const startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time}초`;
  }, 1000);
}

$form.addEventListener('submit', onSubmit);