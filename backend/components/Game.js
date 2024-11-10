const Deck = require("./Deck");
const Team = require("./Team");
const BiddingPhase = require("./BiddingPhase");

class Game {
  constructor(gameId, playerList) {
    this.gameId = gameId;
    this.players = playerList;
    this.playerCount = playerList.length;
    this.teams = [
      new Team([playerList[0], playerList[2]]),
      new Team([playerList[1], playerList[3]]),
    ];
    this.deck = new Deck();
    this.trumpSuit = null;
  }

  startBidding() {
    const biddingPhase = new BiddingPhase(this);
    biddingPhase.startBiddingPhase();
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
