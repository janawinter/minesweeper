document.addEventListener('DOMContentLoaded', startGame);

var board = {
  cells: []
}

function startGame() {
  var childElements = document.getElementsByClassName('board')[0].children;
  //console.log (childElements);
  for (var i = 0; i < childElements.length; i++) {
    addListeners(childElements.item(i));
    addCellToBoard(childElements.item(i));
  }
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

function countSurroundingMines(element) {
  var surroundingCells = getSurroundingCells(element.row, element.col);
  var mines = 0;
  for (var i = 0; i < surroundingCells.length; i++) {
    //console.log (surroundingCells[i])
    if (surroundingCells[i].isMine === true) {
      mines++;
    }
  }
  return mines;
}

function addListeners(element) {
  //console.log (element);
  element.addEventListener('click', showCell);
  element.addEventListener('contextmenu', markCell);
}

function showCell(evt) {
  evt.target.classList.remove('hidden');
  showSurrounding(evt.target)
}

function markCell(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
  evt.target.classList.toggle('hidden');
  switchClick (evt.target).isMarked =true
}

function getRow(element) {
    for (var i =0; i < element.classList.length; i++) {
    var boxes = element.classList[i];
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
function switchClick (element) {
var block
  for (var i = 0; i< board.cells.length; i++) {
      if (board.cells[i].row === getRow(element)
      && board.cells[i].col === getCol(element)){
     block = board.cells[i]
    }
  }
  return block
}
