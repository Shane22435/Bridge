class Team {
  constructor(players) {
    this.players = players; // Two players
    this.tricksWon = 0;
  }

  addTrick() {
    this.tricksWon++;
  }
}

module.exports = Team;
