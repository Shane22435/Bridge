const Card = require("./Card");

class Deck {
  constructor() {
    this.cards = [];
    const suits = ["clubs", "diamonds", "hearts", "spades"]; // 1 - 4 represent clubs, diamonds, hearts, spades, in that specific order
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // 11 - 14 represent J, Q, K, A

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        let value = suits.indexOf(suit) + rank;
        this.cards.push(new Card(suit, rank, value));
      });
    });
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(numPlayers) {
    const hands = [];
    const cardsPerPlayer = Math.floor(this.cards.length / numPlayers);

    for (let i = 0; i < numPlayers; i++) {
      hands.push(this.cards.splice(0, cardsPerPlayer));
    }

    return hands;
  }
}

module.exports = Deck;
