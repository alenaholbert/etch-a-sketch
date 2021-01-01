page = document.querySelector("body");

board = document.createElement("div");
board.classList.add("board");

slider = document.querySelector(".sizeSelector");
slider.addEventListener('mouseup', changeBoardSize);


page.appendChild(board);

function changeBoardSize() {
    cells.forEach(cell => cell.remove());
    buildBoard(slider.value, slider.value);
}

function buildBoard(numRows, numCols) {
    for (r = 0; r < numRows; r++) {
        row = document.createElement("div");
        row.classList.add("row");
        for (c = 0; c < numCols; c++) {
            cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute('style', `width: ${500/numRows}px; height: ${500/numRows}px;`);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    cells = document.querySelectorAll(".cell");
    penOn = true;
    activatePen();
}

function colorCell() {
    this.style.background = 'black';
}

function togglePen() {
    if (penOn) {
        deactivatePen();
        penOn = false;
    }
    else {
        activatePen();
        penOn = true;
    }
}

function activatePen() {
    cells.forEach(cell => cell.addEventListener('mousemove', colorCell));
}

function deactivatePen() {
    cells.forEach(cell => cell.removeEventListener('mousemove', colorCell));
}

function clearBoard() {
    cells.forEach(cell => cell.style.background = 'white');
}

buildBoard(16,16);

clearButton = document.querySelector(".clearButton");
clearButton.addEventListener('click', clearBoard);

board.addEventListener('click', togglePen);