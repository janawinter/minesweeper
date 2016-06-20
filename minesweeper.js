document.addEventListener('DOMContentLoaded', startGame);

function startGame() {
  var childElements = document.getElementsByClassName('hidden');
  //console.log (childElements);
  for (var i = 0 ; i < childElements.length; i++) {
    addListeners(childElements.item(i));
  }
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

var board = {
  cells: []
}

function getRow(element) {
  var childElements = document.getElementsByClassName('hidden');
  for (var i = 0 ; i < childElements.length; i++) {
    for (var j=0; j < childElements[i].classList.length; j++) {
      var boxes= childElements[i].classList[j];
      if (boxes.indexOf("row") > -1) {
        var number = boxes.split("-");
        //console.log (number[1]);
        return number[1];
      }
    }
  }
}