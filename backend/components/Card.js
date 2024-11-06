class Card {
  constructor(suit, rank, value) {
    this.suit = suit; // hearts, spades, diamonds, clubs
    this.rank = rank; // 2 to Ace
    this.value = value;
  }

  displayCard() {
    return `${this.rank} of ${this.suit}`;
  }
}

module.exports = Card;
