// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

var Boards = {};

// Settlers of Catan boards.
Boards.Catan = {};

Boards.Catan['3-4p'] = {
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

Boards.Catan['5-6p'] = {
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

// Chess boards.
Boards.Chess = {};

Boards.Chess['classic'] = {};
Boards.Chess['keragbe'] = {};

// Gobans.
Boards.Go = {};

Boards.Go['19x19'] = {};
Boards.Go['13x13'] = {};
Boards.Go['9x9'] = {};

// Splendor boards.
Boards.Splendor = {};

Boards.Splendor['2p'] = {
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

Boards.Splendor['3p'] = {
  Tokens: {
    Emerald: 5,
    Diamond: 5,
    Sapphire: 5,
    Onyx: 5,
    Ruby: 5,
    GoldJoker: 5
  },
  DevelopmentCards: Boards.Splendor['2p'].DevelopmentCards,
  Nobles: Boards.Splendor['2p'].Nobles,
  NoblesToReveal: 4
};

Boards.Splendor['4p'] = {
  Tokens: {
    Emerald: 7,
    Diamond: 7,
    Sapphire: 7,
    Onyx: 7,
    Ruby: 7,
    GoldJoker: 5
  },
  DevelopmentCards: Boards.Splendor['2p'].DevelopmentCards,
  Nobles: Boards.Splendor['2p'].Nobles,
  NoblesToReveal: 5
};
