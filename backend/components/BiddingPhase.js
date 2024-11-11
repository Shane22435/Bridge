const Player = require('./Player');
const Deck = require('./Deck');
const Team = require('./Team');
const Trick = require('./Trick');

class BiddingPhase {
    constructor(game) {
        this.game = game;
        this.players = game.players;
        this.playerCount = game.playerCount; // inheritance?
        this.currentBid = null;
        this.currentBidder = 0; // index of current bidder
        this.highestBidder = null;
        this.highestBid = null;
        this.passCount = 0;
        this.continue = true;
    }

    startBiddingPhase() {
        this.players[this.currentBidder].takeBid();
    }

    takeBid() {
        // take bid from current bidder, not entirely sure on how to implement this
        // cards have been ranked in numerical order, so we can use that to determine the highest bid
        // update currentBid and currentBidder

        if (this.currentBid > this.highestBid) {
            this.highestBid = this.currentBid;
            this.highestBidder = this.currentBidder;
        }
        else{
            console.log("Invalid bid");
        }

        if (this.currentBid === 'pass') {
            this.passCount++;
        }
        else {
            this.passCount = 0;
            this.highestBid = this.currentBid;
            this.highestBidder = this.currentBidder;
        }
        if (this.continue) {
            this.nextTurn();
        }
        else {
            this.startTrick();
        }
    }

    startTrick() {
        for (let i = 0; i <= 13;) {
            this.trick = new Trick();
            this.trick.trumpSuit = this.highestBid;
            this.currentBidder = this.highestBidder;
            i++;
        }
    }

    nextTurn() {
        if (this.passcount !== this.playerCount - 1) {
            if (this.currentBidder > this.playerCount - 1) {
                this.currentBidder = 0;
            }
            else {
                this.currentBidder++;
            }
            if (this.currentBidder === this.highestBidder) {
                this.trick.trumpSuit = this.highestBid;
                this.continue = false;
            }
            else {
                this.players[this.currentBidder].takeBid();
            }
        } 
        else {
            this.trick.trumpSuit = this.currentBid;
            this.continue = false;
        }
    }
}

module.exports = BiddingPhase;