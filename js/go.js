// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function Go (board, players) {
  var self = this;
  this.board = this.Boards[board] || this.Boards['19x19'];
  this.players = (players || ['human', 'bot']).map(function (player) {
    var workerUrl = self.Players[player];
    return workerUrl ? new Worker(workerUrl) : null;
  });
  this.stones = [];
}

window.Go = Go;

window.addEventListener('hashchange', function () {
  if (window.location.hash !== '#go') return;

  var game = new Go();
  game.render(document.querySelector('#go'));
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

Go.prototype.Colors = [
  'black',
  'white'
];

Go.prototype.Players = {
  'human': null,
  'bot': '/js/workers/go-bot.js'
};

Go.prototype.onclick = function (event) {
  var tileElement = event.target;
  if (!tileElement.classList.contains('tile')) {
    return;
  }
  if (tileElement.firstChild) {
    return;
  }
  this.play(tileElement);
};

Go.prototype.play = function (tileElement) { // TODO rules.play(this.stones, x, y), this.render(.board-go parent)
  var stone = {
    color: this.stones.length % this.players.length
  };
  this.stones.push(stone);
  var stoneElement = document.createElement('span');
  stoneElement.classList.add(this.Colors[stone.color]);
  stoneElement.classList.add('stone');
  tileElement.appendChild(stoneElement);
};

Go.prototype.render = function (viewElement) {
  var boardElement = viewElement.querySelector('.board-go');
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
  boardElement.onclick = this.onclick.bind(this);
  var boardFragment = document.createDocumentFragment();
  for (var x = 0; x < this.board.Rows; x++) {
    var rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (var y = 0; y < this.board.Columns; y++) {
      var tileElement = document.createElement('div');
      tileElement.classList.add('tile');
      tileElement.dataset.x = x;
      tileElement.dataset.y = y;
      rowElement.appendChild(tileElement);
    }
    boardFragment.appendChild(rowElement);
  }
  boardElement.appendChild(boardFragment);
};
