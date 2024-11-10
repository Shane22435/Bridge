class Team {
  constructor(players, number) {
    this.players = players; // Two players
    this.tricksWon = 0;
    this.players[0].team = this;
    this.players[1].team = this;
  }
  
  addTrick() {
    this.tricksWon++;
  }
}

module.exports = Team;
