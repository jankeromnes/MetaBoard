// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function Splendor (board) {
  this.board = this.Boards[board] || this.Boards['2p'];
  this.tokens = {};
  this.nobles = [];
  this.initialize();
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
  Nobles: [
    {
      Points: 3,
      Requirements: {
        Diamond: 4,
        Sapphire: 4
      }
    },
    {
      Points: 3,
      Requirements: {
        Diamond: 3,
        Onyx: 3,
        Ruby: 3
      }
    },
    {
      Points: 3,
      Requirements: {
        Emerald: 3,
        Onyx: 3,
        Ruby: 3
      }
    },
    {
      Points: 3,
      Requirements: {
        Emerald: 4,
        Ruby: 4
      }
    },
    {
      Points: 3,
      Requirements: {
        Emerald: 4,
        Sapphire: 4
      }
    },
    {
      Points: 3,
      Requirements: {
        Onyx: 4,
        Ruby: 4
      }
    },
    {
      Points: 3,
      Requirements: {
        Diamond: 4,
        Onyx: 4
      }
    },
    {
      Points: 3,
      Requirements: {
        Emerald: 3,
        Diamond: 3,
        Sapphire: 3
      }
    },
    {
      Points: 3,
      Requirements: {
        Emerald: 3,
        Sapphire: 3,
        Ruby: 3
      }
    },
    {
      Points: 3,
      Requirements: {
        Diamond: 3,
        Sapphire: 3,
        Onyx: 3
      }
    }
  ],
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

Splendor.prototype.initialize = function () {
  console.log('initialize');
  var tokens = this.board.Tokens;
  for (var tokenName in tokens) {
    this.tokens[tokenName] = tokens[tokenName];
  }
  var noblesDeck = this.board.Nobles.slice();
  for (var i = 0; i < this.board.NoblesToReveal; i++) {
    var randomIndex = Math.floor(Math.random() * noblesDeck.length);
    var randomNoble = noblesDeck.splice(randomIndex, 1)[0];
    this.nobles.push(randomNoble);
  }
};

Splendor.prototype.render = function (viewElement) {
  console.log('render', this.tokens, this.nobles);
  var tokens = this.tokens;
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

  var nobles = this.nobles;
  var noblesElement = viewElement.querySelector('.splendor-nobles');
  while (noblesElement.firstChild) {
    noblesElement.removeChild(noblesElement.firstChild);
  }
  var noblesFragment = document.createDocumentFragment();
  for (var i = 0; i < nobles.length; i++) {
    var noble = nobles[i];
    var nobleElement = document.createElement('div');
    nobleElement.classList.add('tile');
    var noblePointsElement = document.createElement('div');
    noblePointsElement.classList.add('splendor-points');
    noblePointsElement.textContent = noble.Points;
    nobleElement.appendChild(noblePointsElement);
    var nobleValueElement = document.createElement('div');
    nobleValueElement.classList.add('splendor-value');
    var requiredCards = noble.Requirements;
    for (var card in requiredCards) {
      var nobleValueItemElement = document.createElement('div');
      nobleValueItemElement.classList.add('value-card');
      nobleValueItemElement.classList.add(card.toLowerCase());
      nobleValueItemElement.textContent = requiredCards[card];
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
