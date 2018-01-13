// Copyright © 2018 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function Scrabble (board) {
  this.board = this.Boards[board] || this.Boards['fr'];
}

window.Scrabble = Scrabble;

window.addEventListener('hashchange', function () {
  if (window.location.hash !== '#scrabble') return;

  var game = new Scrabble();
  game.render(document.querySelector('#scrabble'));
});

Scrabble.prototype.Boards = {};

Scrabble.prototype.Boards['en'] = {
  Layout:
    'TW .  .  DL .  .  .  TW .  .  .  DL .  .  TW\n' +
    '.  DW .  .  .  TL .  .  .  TL .  .  .  DW .\n' +
    '.  .  DW .  .  .  DL .  DL .  .  .  DW .  .\n' +
    'DL .  .  DW .  .  .  DL .  .  .  DW .  .  DL\n' +
    '.  .  .  .  DW .  .  .  .  .  DW .  .  .  .\n' +
    '.  TL .  .  .  TL .  .  .  TL .  .  .  TL .\n' +
    '.  .  DL .  .  .  DL .  DL .  .  .  DL .  .\n' +
    'TW .  .  DL .  .  .  DW .  .  .  DL .  .  TW\n' +
    '.  .  DL .  .  .  DL .  DL .  .  .  DL .  .\n' +
    '.  TL .  .  .  TL .  .  .  TL .  .  .  TL .\n' +
    '.  .  .  .  DW .  .  .  .  .  DW .  .  .  .\n' +
    'DL .  .  DW .  .  .  DL .  .  .  DW .  .  DL\n' +
    '.  .  DW .  .  .  DL .  DL .  .  .  DW .  .\n' +
    '.  DW .  .  .  TL .  .  .  TL .  .  .  DW .\n' +
    'TW .  .  DL .  .  .  TW .  .  .  DL .  .  TW',
  Tiles: {
    ' ': {
      Quantity: 2,
      Value: 0
    },
    E: {
      Quantity: 12,
      Value: 1
    },
    A: {
      Quantity: 9,
      Value: 1
    },
    I: {
      Quantity: 9,
      Value: 1
    },
    O: {
      Quantity: 8,
      Value: 1
    },
    R: {
      Quantity: 6,
      Value: 1
    },
    N: {
      Quantity: 6,
      Value: 1
    },
    T: {
      Quantity: 6,
      Value: 1
    },
    L: {
      Quantity: 4,
      Value: 1
    },
    S: {
      Quantity: 4,
      Value: 1
    },
    U: {
      Quantity: 4,
      Value: 1
    },
    D: {
      Quantity: 4,
      Value: 2
    },
    G: {
      Quantity: 3,
      Value: 2
    },
    B: {
      Quantity: 2,
      Value: 3
    },
    C: {
      Quantity: 2,
      Value: 3
    },
    M: {
      Quantity: 2,
      Value: 3
    },
    P: {
      Quantity: 2,
      Value: 3
    },
    F: {
      Quantity: 2,
      Value: 4
    },
    H: {
      Quantity: 2,
      Value: 4
    },
    V: {
      Quantity: 2,
      Value: 4
    },
    W: {
      Quantity: 2,
      Value: 4
    },
    Y: {
      Quantity: 2,
      Value: 4
    },
    K: {
      Quantity: 1,
      Value: 5
    },
    J: {
      Quantity: 1,
      Value: 8
    },
    X: {
      Quantity: 1,
      Value: 8
    },
    Q: {
      Quantity: 1,
      Value: 10
    },
    Z: {
      Quantity: 1,
      Value: 10
    },
  }
};

Scrabble.prototype.Boards['fr'] = {
  Layout: Scrabble.prototype.Boards['en'].Layout,
  Tiles: {
    ' ': {
      Quantity: 2,
      Value: 0
    },
    E: {
      Quantity: 15,
      Value: 1
    },
    A: {
      Quantity: 9,
      Value: 1
    },
    I: {
      Quantity: 8,
      Value: 1
    },
    N: {
      Quantity: 6,
      Value: 1
    },
    O: {
      Quantity: 6,
      Value: 1
    },
    R: {
      Quantity: 6,
      Value: 1
    },
    S: {
      Quantity: 6,
      Value: 1
    },
    T: {
      Quantity: 6,
      Value: 1
    },
    U: {
      Quantity: 6,
      Value: 1
    },
    L: {
      Quantity: 5,
      Value: 1
    },
    D: {
      Quantity: 3,
      Value: 2
    },
    M: {
      Quantity: 3,
      Value: 2
    },
    G: {
      Quantity: 2,
      Value: 2
    },
    B: {
      Quantity: 2,
      Value: 3
    },
    C: {
      Quantity: 2,
      Value: 3
    },
    P: {
      Quantity: 2,
      Value: 3
    },
    F: {
      Quantity: 2,
      Value: 4
    },
    H: {
      Quantity: 2,
      Value: 4
    },
    V: {
      Quantity: 2,
      Value: 4
    },
    J: {
      Quantity: 1,
      Value: 8
    },
    Q: {
      Quantity: 1,
      Value: 8
    },
    K: {
      Quantity: 1,
      Value: 10
    },
    W: {
      Quantity: 1,
      Value: 10
    },
    X: {
      Quantity: 1,
      Value: 10
    },
    Y: {
      Quantity: 1,
      Value: 10
    },
    Z: {
      Quantity: 1,
      Value: 10
    }
  }
};

Scrabble.prototype.Boards['de'] = {
  Layout: Scrabble.prototype.Boards['en'].Layout,
  Tiles: {
    ' ': {
      Quantity: 2,
      Value: 0
    },
    E: {
      Quantity: 15,
      Value: 1
    },
    N: {
      Quantity: 9,
      Value: 1
    },
    S: {
      Quantity: 7,
      Value: 1
    },
    I: {
      Quantity: 6,
      Value: 1
    },
    R: {
      Quantity: 6,
      Value: 1
    },
    T: {
      Quantity: 6,
      Value: 1
    },
    U: {
      Quantity: 6,
      Value: 1
    },
    A: {
      Quantity: 5,
      Value: 1
    },
    D: {
      Quantity: 4,
      Value: 1
    },
    H: {
      Quantity: 4,
      Value: 2
    },
    G: {
      Quantity: 3,
      Value: 2
    },
    L: {
      Quantity: 3,
      Value: 2
    },
    O: {
      Quantity: 3,
      Value: 2
    },
    M: {
      Quantity: 4,
      Value: 3
    },
    B: {
      Quantity: 2,
      Value: 3
    },
    W: {
      Quantity: 1,
      Value: 3
    },
    Z: {
      Quantity: 1,
      Value: 3
    },
    C: {
      Quantity: 2,
      Value: 4
    },
    F: {
      Quantity: 2,
      Value: 4
    },
    K: {
      Quantity: 2,
      Value: 4
    },
    P: {
      Quantity: 1,
      Value: 4
    },
    Ä: {
      Quantity: 1,
      Value: 6
    },
    J: {
      Quantity: 1,
      Value: 6
    },
    Ü: {
      Quantity: 1,
      Value: 6
    },
    V: {
      Quantity: 1,
      Value: 6
    },
    Ö: {
      Quantity: 1,
      Value: 8
    },
    X: {
      Quantity: 1,
      Value: 8
    },
    Q: {
      Quantity: 1,
      Value: 10
    },
    Y: {
      Quantity: 1,
      Value: 10
    }
  }
};

Scrabble.prototype.render = function (viewElement) {
  var boardElement = viewElement.querySelector('.board-scrabble');
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
  var boardFragment = document.createDocumentFragment();
  this.board.Layout.split('\n').forEach(function (row, x) {
    var rowElement = document.createElement('div');
    rowElement.classList.add('row');
    row.split(/\s+/).forEach(function (tile, y) {
      var tileElement = document.createElement('div');
      tileElement.classList.add('tile');
      switch (tile.toUpperCase()) {
        case 'DL':
          tileElement.classList.add('double-letter');
          break;
        case 'DW':
          tileElement.classList.add('double-word');
          break;
        case 'TL':
          tileElement.classList.add('triple-letter');
          break;
        case 'TW':
          tileElement.classList.add('triple-word');
          break;
      }
      rowElement.appendChild(tileElement);
    });
    boardFragment.appendChild(rowElement);
  });
  boardElement.appendChild(boardFragment);
};
