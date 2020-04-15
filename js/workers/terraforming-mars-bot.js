// Copyright © 2020 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

importScripts('./terraforming-mars-rules.js');

// Inspired by https://boardgamegeek.com/thread/1847708/quantified-guide-tm-strategy/page/1
function evaluateCardScore(card, game) {
  var score = 0;
  score -= card.cost;
  score += 5 * card.victoryPoints;
  // TODO: evaluate card.effects
  // TODO: evaluate card.immediateEffects
  // TODO: evaluate card.requirements
  // TODO: evaluate card.tags
  return score;
}
