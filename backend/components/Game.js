const Deck = require("./Deck");
const Team = require("./Team");

class Game {
  constructor(gameId, playerList) {
    this.gameId = gameId;
    this.players = playerList;
    this.teams = [
      new Team([playerList[0], playerList[2]]),
      new Team([playerList[1], playerList[3]]),
    ];
    this.deck = new Deck();
    this.trumpSuit = null;
  }

  startBidding() {
    // bidding logic needs to be implemented
  }

  startPlayPhase() {
    this.deck.shuffle();
    const hands = this.deck.deal(this.players.length);
    this.players.forEach((player, i) => {
      player.receiveHand(hands[i]);
    });
  }

  // add any more stuff we need here
}

module.exports = Game;
