document.addEventListener('DOMContentLoaded', startGame);

var board = {
  cells: []
}

function startGame() {
  var childElements = document.getElementsByClassName('board')[0].children;
  //console.log (childElements);
  for (var i = 0 ; i < childElements.length; i++) {
    addListeners(childElements.item(i));
    addCellToBoard(childElements.item(i));
  }
  for(var i=0 ; i < board.cells.length; i++) {
    countSurroundingMines(board.cells[i]);
  }
}

function countSurroundingMines(element) {
  var result = getSurroundingCells(element.row, element.col);
  board.cells.element.surroundingMines = result;
}

function addListeners(element) {
  //console.log (element);
  element.addEventListener('click', showCell);
  element.addEventListener('contextmenu', markCell);
}

function showCell(evt) {
  evt.target.classList.remove('hidden');
}

function markCell(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
}

function getRow(element) {
    for (var i=0; i < element.classList.length; i++) {
      var boxes= element.classList[i];
      if (boxes.indexOf("row") > -1) {
        var number = boxes.split("-");
        //console.log (number[1]);
        return parseInt(number[1]);
    }
  }
}

function getCol(element) {
    for (var i=0; i < element.classList.length; i++) {
      var boxes= element.classList[i];
      if (boxes.indexOf("col") > -1) {
        var number = boxes.split("-");
        //console.log (number[1]);
        return parseInt(number[1]);
    }
  }
}

function addCellToBoard(element) {
  var newCell = {
    row: getRow(element),
    col: getCol(element),
    isMine:element.classList.contains("mine")
  }
  board.cells.push(newCell)
}

