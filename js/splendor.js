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

Splendor.prototype.render = function (viewElement) {
  var tokens = this.board.Tokens;
  var tokensElement = viewElement.querySelector('.splendor-tokens');
  while (tokensElement.firstChild) {
    tokensElement.removeChild(tokensElement.firstChild);
  }
  var tokensFragment = document.createDocumentFragment();
  for (var tokenName in tokens) {
    var tokenElement = document.createElement('div');
    tokenElement.classList.add('tile');
    tokenElement.classList.add('splendor-value');
    tokenElement.classList.add(tokenName.toLowerCase());
    tokenElement.textContent = tokens[tokenName];
    tokensFragment.appendChild(tokenElement);
  }
  tokensElement.appendChild(tokensFragment);

  var nobles = this.board.Nobles;
  var noblesElement = viewElement.querySelector('.splendor-nobles');
  while (noblesElement.firstChild) {
    noblesElement.removeChild(noblesElement.firstChild);
  }
  var noblesFragment = document.createDocumentFragment();
  for (var i = 0; i < this.board.NoblesToReveal; i++) {
    var nobleElement = document.createElement('div');
    nobleElement.classList.add('tile');
    var noblePointsElement = document.createElement('div');
    noblePointsElement.classList.add('splendor-points');
    noblePointsElement.textContent = '3';
    nobleElement.appendChild(noblePointsElement);
    var nobleValueElement = document.createElement('div');
    nobleValueElement.classList.add('splendor-value');
    for (var j = 0; j < 3; j++) {
      var nobleValueItemElement = document.createElement('div');
      nobleValueItemElement.classList.add('value-card');
      nobleValueItemElement.classList.add(['ruby','onyx','sapphire'][j]);
      nobleValueItemElement.textContent = '3';
      nobleValueElement.appendChild(nobleValueItemElement);
    }
    nobleElement.appendChild(nobleValueElement);
    noblesFragment.appendChild(nobleElement);
  }
  noblesElement.appendChild(noblesFragment);

  var cards = this.board.DevelopmentCards;
  var cardsElement = viewElement.querySelector('.splendor-cards');
  while (cardsElement.firstChild) {
    cardsElement.removeChild(cardsElement.firstChild);
  }
  var cardsFragment = document.createDocumentFragment();
  for (var cardLevel in cards) {
    var rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (var i = 0; i < 5; i++) {
      var cardElement = document.createElement('div');
      cardElement.classList.add('tile');
      if (i === 0) {
        cardElement.textContent = cardLevel;
      } else {
        var cardPointsElement = document.createElement('div');
        cardPointsElement.classList.add('splendor-points');
        cardPointsElement.textContent = '4';
        cardElement.appendChild(cardPointsElement);
        var cardValueElement = document.createElement('div');
        cardValueElement.classList.add('splendor-value');
        for (var j = 0; j < 3; j++) {
          var cardValueItemElement = document.createElement('div');
          cardValueItemElement.classList.add('value-token');
          cardValueItemElement.classList.add(['ruby','onyx','sapphire'][j]);
          cardValueItemElement.textContent = '2';
          cardValueElement.appendChild(cardValueItemElement);
        }
        cardElement.appendChild(cardValueElement);
      }
      rowElement.appendChild(cardElement);
    }
    cardsFragment.appendChild(rowElement);
  }
  cardsElement.appendChild(cardsFragment);
};
