// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function Chess (board) {
  this.board = this.Boards[board] || this.Boards['classic'];
  this.whites = [];
  this.blacks = [];
  this.rows = [];
  this.moves = [];
  this.score = 0;
  this.initialize();
}

window.Chess = Chess;

var link = document.querySelector('a[href="#chess"]');
link.addEventListener('click', function () {
  var game = new Chess();
  game.render(document.querySelector('#chess'));
});

Chess.prototype.Boards = {
  'classic': {
    Layout:
      'r n b q k b n r\n' +
      'p p p p p p p p\n' +
      '. . . . . . . .\n' +
      '. . . . . . . .\n' +
      '. . . . . . . .\n' +
      '. . . . . . . .\n' +
      'P P P P P P P P\n' +
      'R N B Q K B N R',
    Pieces: {
      K: {
        Symbol: '♚',
        Value: 1000
      },
      Q: {
        Symbol: '♛',
        Value: 9
      },
      B: {
        Symbol: '♝',
        Value: 3
      },
      N: {
        Symbol: '♞',
        Value: 3
      },
      R: {
        Symbol: '♜',
        Value: 5
      },
      P: {
        Symbol: '♟',
        Value: 1
      }
    }
  },
  'keragbe': {
    Layout: '',
    Pieces: {}
  }
};

Chess.prototype.initialize = function () {
  var pieces = this.board.Pieces;
  var self = this;

  // Parse the board layout bottom up, and fill rows with pieces or `null`.
  var layoutLines = this.board.Layout.split('\n').reverse();
  this.rows = layoutLines.map(function (line, x) {
    return line.split(/\s*/).map(function (letter, y) {
      var pieceType = letter.toUpperCase();

      // No piece ('.') or unknown type.
      console.log(pieceType, 'in', pieces);
      if (!pieces[pieceType]) {
        return null;
      }

      // Create a new piece.
      var piece = {
        type: pieceType,
        white: pieceType === letter,
        x: x,
        y: y
      };

      // Add the piece to the whites/blacks list and update the initial score.
      if (piece.white) {
        self.whites.push(piece);
        self.score += pieces[piece.type].Value;
      } else {
        self.blacks.push(piece);
        self.score -= pieces[piece.type].Value;
      }

      return piece;
    });
  });
  console.log(this.rows);
};

Chess.prototype.render = function (viewElement) {
  var pieces = this.board.Pieces;
  var boardElement = viewElement.querySelector('.board-chess');
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
  var boardFragment = document.createDocumentFragment();
  for (var x = 0; x < this.rows.length; x++) {
    var rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (var y = 0; y < this.rows[x].length; y++) {
      var tileElement = document.createElement('div');
      tileElement.classList.add('tile');
      var piece = this.rows[x][y];
      if (piece) {
        var pieceElement = document.createElement('span');
        pieceElement.classList.add(piece.white ? 'white' : 'black');
        pieceElement.classList.add('piece');
        pieceElement.textContent = pieces[piece.type].Symbol;
        tileElement.appendChild(pieceElement);
      }
      rowElement.appendChild(tileElement);
    }
    boardFragment.appendChild(rowElement);
  }
  boardElement.appendChild(boardFragment);
};
