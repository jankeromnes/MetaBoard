// Copyright © 2020 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

function TerraformingMars (board) {
  this.board = this.Boards[board] || this.Boards['Mars'];
  this.globalParameters = {};
  this.initialize();
}

window.TerraformingMars = TerraformingMars;

window.addEventListener('hashchange', function () {
  if (window.location.hash !== '#terraforming-mars') return;

  var game = new TerraformingMars();
  game.render(document.querySelector('#terraforming-mars'));
});

TerraformingMars.prototype.Boards = {};

TerraformingMars.prototype.Boards['Mars'] = {
  GlobalParameters: {
    Temperature: {
      Start: -30,
      Step: 2,
      Goal: 8,
    },
    Oxygen: {
      Start: 0,
      Step: 1,
      Goal: 14,
    },
    Ocean: {
      Start: 0,
      Step: 1,
      Goal: 9,
    },
  },
};

TerraformingMars.prototype.initialize = function () {
  var globalParameters = this.board.GlobalParameters;
  for (var parameter in globalParameters) {
    this.globalParameters[parameter] = globalParameters[parameter].Start;
  }
};

TerraformingMars.prototype.render = function (viewElement) {
  console.log('render', this.globalParameters);
};
