const Card = require("./Card");

class Deck {
  constructor() {
    this.cards = [];
    const suits = ["clubs", "diamonds", "hearts", "spades"]; // 1 - 4 represent clubs, diamonds, hearts, spades, in that specific order
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // 11 - 14 represent J, Q, K, A

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        if (suit === "diamonds") {
          let value = rank * 10;
        }
        else if (suit === "hearts") {
          let value = rank * 100;
        }
        else if (suit === "spades") {
          let value = rank * 1000; // using orders of magnitude can give us an easy determined order of winning cards
        }
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
