class Card {
  constructor(suit, rank) {
    this.suit = suit; // hearts, spades, diamonds, clubs
    this.rank = rank; // 2 to Ace
  }

  displayCard() {
    return `${this.rank} of ${this.suit}`;
  }
}

module.exports = Card;
