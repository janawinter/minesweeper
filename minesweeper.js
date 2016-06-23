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
//define the listeners for clicks
function addListeners(element) {
//console.log (element);
  element.addEventListener('click', showCell);
  element.addEventListener('contextmenu', markCell);
}
//define click function
function showCell(evt) {
  evt.target.classList.remove('hidden');
  showSurrounding(evt.target)
  //add a function call to checkForWin.
checkForWin();
}
//create right click function
function markCell(evt) {
//prevents context menu
  evt.preventDefault();
//turn on marked class
  evt.target.classList.toggle('marked');
//turn off hidden class
  evt.target.classList.toggle('hidden');
// set a property called isMarked on it to true.
  cell=setMarked(evt.target)
  //add a function call to checkForWin.
checkForWin();
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
//1.checks each cell in the global object for the right row and column.
function setMarked (element) {
// loop through the board cells
  for (var i = 0; i < board.cells.length; i++) {
//checking if the current cell has the same row and col of the element that was clicked
    if (board.cells[i].row === getRow(element)
    && board.cells[i].col === getCol(element)) {
//this current cell is marked
      board.cells[i].isMarked=true
    }
  }
}


//define a checkForWin function. It should loop through all of board.cells.
function checkForWin() {
  var won = false;
  var childElements = document.getElementsByClassName('board')[0].children;
  for (var j = 0; j < childElements.length; j++) {
    if (childElements.item(j).classList.contains("hidden")) {
      return;
    }
  }
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && board.cells[i].isMarked) {
      won = true;
    }
  }
  if (won === true) {
    alert("You're a winner!");
  }
}

/*For each cell, check to see if both .isMine and .isMarked are true.
If any mine still exists that isn't marked,
the player hasn't won yet and you can return out of the function.
If every mine is marked, find a way to check all the elements in the DOM
 to be sure that there are no elements with class 'hidden' still set.
 If both these criteria pass, the player has won!
 Find a way to tell them: an alert is probably the simplest.
*/
