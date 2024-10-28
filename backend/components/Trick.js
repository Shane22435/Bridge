class Trick {
  constructor() {
    this.cards = [];
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

    return winningCard.player;
  }
}

module.exports = Trick;
