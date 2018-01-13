// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function Splendor (board) {
  this.board = this.Boards[board] || this.Boards['2p'];
}

window.Splendor = Splendor;

window.addEventListener('hashchange', function () {
  if (window.location.hash !== '#splendor') return;

  var game = new Splendor();
  game.render(document.querySelector('#splendor'));
});

Splendor.prototype.Boards = {};

Splendor.prototype.Boards['2p'] = {
  Tokens: {
    Emerald: 4,
    Diamond: 4,
    Sapphire: 4,
    Onyx: 4,
    Ruby: 4,
    GoldJoker: 5
  },
  DevelopmentCards: {
    Level1: 40,
    Level2: 30,
    Level3: 20
  },
  Nobles: {
    length: 10
  },
  NoblesToReveal: 3
};

Splendor.prototype.Boards['3p'] = {
  Tokens: {
    Emerald: 5,
    Diamond: 5,
    Sapphire: 5,
    Onyx: 5,
    Ruby: 5,
    GoldJoker: 5
  },
  DevelopmentCards: Splendor.prototype.Boards['2p'].DevelopmentCards,
  Nobles: Splendor.prototype.Boards['2p'].Nobles,
  NoblesToReveal: 4
};

Splendor.prototype.Boards['4p'] = {
  Tokens: {
    Emerald: 7,
    Diamond: 7,
    Sapphire: 7,
    Onyx: 7,
    Ruby: 7,
    GoldJoker: 5
  },
  DevelopmentCards: Splendor.prototype.Boards['2p'].DevelopmentCards,
  Nobles: Splendor.prototype.Boards['2p'].Nobles,
  NoblesToReveal: 5
};
