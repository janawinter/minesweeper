document.addEventListener('DOMContentLoaded', startGame);

var board = {
  cells: []
}

function startGame() {
  console.log (board);
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
  if (evt.target.classList.contains('mine')) {
showAllMines()
alert('You lose! try again!')

  resetGame()
}
  else {
  showSurrounding(evt.target)
  }
  //add a function call to checkForWin.
  checkForWin();

}
//create showAllMines function
function showAllMines () {
//search the child elements
var childElements = document.getElementsByClassName('board')[0].children;
//loop through childelements
for(var i = 0; i < childElements.length; i++) {
  //check if contains mine
if (childElements[i].classList.contains('mine')) {
  //if contains mine - remove hidden class
 childElements[i].classList.remove('hidden')
  }
 }
}

function resetGame () {
 var childElements = document.getElementsByClassName('board')[0].children;
 for (var i = 0; i < childElements.length; i++){
 childElements[i].innerHTML = '';
 childElements[i].classList.add('hidden')
  //if contains mine - remove hidden class
}
board.cells=[]
  startGame ()
}

//
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
  //to make alert only who once:
  var won = false;
  //search the board for child element with a class of hidden
  var childElements = document.getElementsByClassName('board')[0].children;
  //loop through the elements
  for (var j = 0; j < childElements.length; j++) {
    // if contains hidden-return
    if (childElements.item(j).classList.contains("hidden")) {
      return;
    }
  }
  //loop through the cell objects
  for (var i = 0; i < board.cells.length; i++) {
    //if isMine and isMarked true
    if (board.cells[i].isMine === true && board.cells[i].isMarked === true) {
      //set won to be true
      won = true;
    }
  }
  //if won = true
  if (won === true) {
    //alert winner
    alert("You're a winner!");
  }
}

//After a win or loss, give players a chance to try again by resetting the board to its default state.
//You'll need to put classes back the way they were at the start, and re-initialise the global board object.