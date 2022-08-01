const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $back = document.querySelector('#back');
let data = [];
const history = [];

function put2ToRandomCell() {
  const emptyCells = [];
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j];
      if (cellData > 0) {
        $target.textContent = cellData;
        $target.className = 'color-' + cellData;
      } else {
        $target.textContent = '';
        $target.className = '';
      }
    });
  })
}

function startGame() {
  const $fragment = document.createDocumentFragment();
  [1, 2, 3 ,4].forEach(() => {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
      const $td = document.createElement('td');
      $tr.append($td);
    });
    $fragment.append($tr);
  });
  $table.append($fragment);
  put2ToRandomCell();
  draw();
}

function moveCells(direction) {
  history.push({
    table: JSON.parse(JSON.stringify(data)),
    score: $score.textContent,
  });
  const newData = [[], [], [], []];

  if (direction === 'left') {
    data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        if (cellData) {
          const currentRow = newData[i];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === cellData) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
          } else {
            newData[i].push(cellData);
          }
        }
      });
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[i][j] = Math.abs(newData[i][j]) || 0;
      }
    }
  } else if (direction === 'right') {
    data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        if (rowData[3 - j]) {
          const currentRow = newData[i];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === rowData[3 - j]) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
          } else {
            newData[i].push(rowData[3 - j]);
          }
        }
      });
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[i][3 - j] = Math.abs(newData[i][j]) || 0;
      }
    }
  } else if (direction === 'up') {
    data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        if (cellData) {
          const currentRow = newData[j];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === cellData) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
          } else {
            newData[j].push(cellData);
          }
        }
      });
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[j][i] = Math.abs(newData[i][j]) || 0;
      }
    }
  } else if (direction === 'down') {
    data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        if (data[3 - i][j]) {
          const currentRow = newData[j];
          const prevData = currentRow[currentRow.length - 1];
          if (prevData === data[3 - i][j]) {
            const score = parseInt($score.textContent);
            $score.textContent = score + currentRow[currentRow.length - 1] * 2;
            currentRow[currentRow.length - 1] *= -2;
          } else {
            newData[j].push(data[3 - i][j]);
          }
        }
      });
    });
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[3 - j][i] = Math.abs(newData[i][j]) || 0;
      }
    }
  }
  if (data.flat().includes(2048)) {
    draw();
    setTimeout(() => {
      alert('클리어하셨습니다. 축하합니다!');
    }, 0);
  } else if (!data.flat().includes(0)) {
    alert(`패배! ${$score.textContent}점 달성!`);
  } else {
    put2ToRandomCell();
    draw();
  }
}

window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'ArrowRight') {
    moveCells('right');
  }
});

let startCoord;
window.addEventListener('mousedown', (event) => {
  startCoord = [event.clientX, event.clientY];
});
window.addEventListener('mouseup', (event) => {
  const endCoord = [event.clientX, event.clientY];
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('left');
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('right');
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('down');
  } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('up');
  }
});

$back.addEventListener('click', (event) => {
  const prevData = history.pop();
  if (!prevData) return ;
  $score.textContent = prevData.score;
  data = prevData.table;
  draw();
});

startGame();

// data = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];
// draw();