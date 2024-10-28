class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.hand = [];
  }

  receiveHand(hand) {
    this.hand = hand;
  }

  playCard(card) {
    const cardIndex = this.hand.findIndex(
      (c) => c.suit === card.suit && c.rank === card.rank
    );
    if (cardIndex !== -1) {
      return this.hand.splice(cardIndex, 1)[0];
    }
    return null;
  }
}

module.exports = Player;
