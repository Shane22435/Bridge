class Trick {
  constructor() {
    this.cards = [];
    this.trumpSuit = null;
    this.highestBidder = null;
  }

  addCard(player, card) {
    this.cards.push({ player, card });
  }

  determineWinner(trumpSuit) {
    let winningCard = this.cards[0];

    for (const play of this.cards) {
      const { card } = play;
      if (card.suit === trumpSuit && winningCard.card.suit !== trumpSuit) {
        winningCard = play;
      } else if (
        card.suit === winningCard.card.suit &&
        card.rank > winningCard.card.rank
      ) {
        winningCard = play;
      }
    }

    playTrick();{
        // play trick
        // determine winner
        // update scores
    }

    return winningCard.player;
  }
}

module.exports = Trick;
