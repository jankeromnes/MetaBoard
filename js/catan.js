// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function Catan (board) {
  this.board = this.Boards[board] || this.Boards['3-4p'];
}

window.Catan = Catan;

window.addEventListener('hashchange', function () {
  if (window.location.hash !== '#catan') return;

  var game = new Catan();
  game.render(document.querySelector('#catan'));
});

Catan.prototype.Boards = {};

Catan.prototype.Boards['3-4p'] = {
  Terrain: {
    Desert: 1,
    Hills: 3,
    Fields: 4,
    Forest: 4,
    Mountains: 3,
    Pasture: 4
  },
  DevelopmentCards: {
    Knights: 14,
    Monopoly: 2,
    RoadBuilding: 2,
    YearOfPlenty: 2,
    VictoryPoints: 5
  }
};

Catan.prototype.Boards['5-6p'] = {
  Terrain: {
    Desert: 2,
    Hills: 5,
    Fields: 6,
    Forest: 6,
    Mountains: 5,
    Pasture: 6
  },
  DevelopmentCards: {
    Knights: 20,
    Monopoly: 3,
    RoadBuilding: 3,
    YearOfPlenty: 3,
    VictoryPoints: 5
  }
};

Catan.prototype.render = function () {

}
