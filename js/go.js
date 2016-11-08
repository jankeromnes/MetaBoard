// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function Go (board) {
  this.board = this.Boards[board] || this.Boards['19x19'];
  this.blacks = [];
  this.whites = [];
}

window.Go = Go;

var link = document.querySelector('a[href="#go"]');
link.addEventListener('click', function () {
  var game = new Go();
  var view = document.querySelector('#go');
  game.render(view);
});

Go.prototype.Boards = {
  '19x19': {
    Rows: 19,
    Columns: 19
  },
  '13x13': {
    Rows: 13,
    Columns: 13
  },
  '9x9': {
    Rows: 9,
    Columns: 9
  }
};

Go.prototype.render = function (viewElement) {
  var boardElement = viewElement.querySelector('.board-go');
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
  var boardFragment = document.createDocumentFragment();
  for (var x = 0; x < this.board.Rows; x++) {
    var rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (var y = 0; y < this.board.Columns; y++) {
      var tileElement = document.createElement('div');
      tileElement.classList.add('tile');
      rowElement.appendChild(tileElement);
    }
    boardFragment.appendChild(rowElement);
  }
  boardElement.appendChild(boardFragment);
};
