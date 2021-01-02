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
    eraserOn = false;
    penMode = true;
    eraserMode = false;
    activatePen();
}

function colorCell() {
    this.style.background = 'black';
}

function clearCell() {
    this.style.background = 'white';
}

function togglePen() {
    if (penOn) {
        deactivatePen();
    }
    else {
        activatePen();
    }
}

function activatePen() {
    cells.forEach(cell => cell.addEventListener('mousemove', colorCell));
    penOn = true;
}

function deactivatePen() {
    cells.forEach(cell => cell.removeEventListener('mousemove', colorCell));
    penOn = false;
}

function toggle(){
    console.log("eraser mode: " + eraserMode);
    console.log("pen mode: " + penMode);
    if (eraserMode) {
        toggleEraser();
    }
    else if (penMode) {
        togglePen();
    }
}

function toggleEraser() {
    if (eraserOn) {
        deactivateEraser();
    }
    else {
        activateEraser();
    }
}

function switchEraser() {
    // TURN OFF ERASER MODE/RELEASE BUTTON
    if (eraserMode) {
        deactivateEraser();
        eraserButton.removeAttribute('style');
        eraserMode = false;
        penMode = true;
    }
    // TURN ON ERASER MODE/PRESS BUTTON
    else {
        eraserButton.style.shadow = '5px';
        eraserButton.style.backgroundColor = 'gray';
        eraserMode = true;
        penMode = false;
    }
}

function activateEraser() {
    deactivatePen();
    cells.forEach(cell => cell.addEventListener('mousemove', clearCell));
    eraserOn = true;
}

function deactivateEraser() {
    cells.forEach(cell => cell.removeEventListener('mousemove', clearCell));
    eraserOn = false;
}

function clearBoard() {
    cells.forEach(cell => cell.style.background = 'white');
}

buildBoard(16,16);

clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', clearBoard);

eraserButton = document.querySelector(".eraser");
eraserButton.addEventListener('click', switchEraser);

board.addEventListener('click', toggle);