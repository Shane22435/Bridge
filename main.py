import random
from collections import defaultdict

"""
this is our Cards class, here we define our suits and ranks for the cards
we use the rank_values dictionary to map the rank of the card to its value in the game
"""
class Card:
    suits = ["Clubs", "Diamonds", "Hearts", "Spades"]
    ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"] # no 1 here as Ace is considered as 14 in this game???
    
    # dictionary to map the rank of the card
    rank_values = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, "Jack": 11, "Queen": 12, "King": 13, "Ace": 14}

    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank

    def rank_value(self):
        return self.rank_values[self.rank]

    def __repr__(self):
        return f"{self.rank} of {self.suit}"


"""
this is our Deck class, here we define the deck of cards, players, teams, bids, tricks, and scores
we shuffle the deck of cards and deal them to the players at the start of the game
the bidding phase is where players place their bids for the number of tricks they think they can win
"""

# Deck class to represent the deck of cards
class Deck:
    def __init__(self):
        self.cards = [Card(suit, rank) for suit in Card.suits for rank in Card.ranks]
        random.shuffle(self.cards) # Shuffle the deck of cards randomly

    def deal(self, num_cards):
        dealt_cards = self.cards[:num_cards]
        self.cards = self.cards[num_cards:]
        return dealt_cards

# represnt each player in the below Player class
class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []

    def receive_cards(self, cards):
        self.hand = cards

    def bid(self, bid_amount, suit):
        return Bid(self, bid_amount, suit)

    def play_card(self, card):
        self.hand.remove(card)
        return card

    def __repr__(self):
        return f"Player({self.name})"

# represent team of two players in the below Team class
class Team:
    def __init__(self, player1, player2):
        self.players = [player1, player2]
        self.tricks_won = 0

    def add_trick(self):
        self.tricks_won += 1

# Bid class to store the player's bid
class Bid:
    def __init__(self, player, bid_amount, suit):
        self.player = player
        self.bid_amount = bid_amount
        self.suit = suit
        self.doubled = False
        self.redoubled = False

    # methods to double or redouble the bid if needed
    def double(self):
        self.doubled = True

    def redouble(self):
        self.redoubled = True

# BiddingPhase class to manage the bidding process
class BiddingPhase:
    def __init__(self, players):
        self.players = players
        self.current_bid = None
        self.passed_players = []

    def place_bid(self, player, bid):
        if not self.current_bid or self.is_higher_bid(bid):
            self.current_bid = bid
        else:
            raise ValueError("Bid must be higher than the current highest bid.")

    def pass_bid(self, player):
        self.passed_players.append(player)

    def is_higher_bid(self, bid):
        if self.current_bid.bid_amount < bid.bid_amount:
            return True
        if self.current_bid.bid_amount == bid.bid_amount:
            return Card.suits.index(bid.suit) > Card.suits.index(self.current_bid.suit)
        return False

    def all_passed(self):
        return len(self.passed_players) == 3

# Trick class to manage one trick in the game
class Trick:
    def __init__(self, trump_suit):
        self.cards_played = []
        self.trump_suit = trump_suit

    def play_card(self, player, card):
        self.cards_played.append((player, card))

    def determine_winner(self):
        if len(self.cards_played) == 0:
            raise ValueError("No cards have been played yet in this trick")

        lead_suit = self.cards_played[0][1].suit
        highest_card = None # Highest card played in the trick so far (None means no card played yet)
        highest_player = None # Player who played the highest card so far (None means no card played yet)

        for player, card in self.cards_played:
            if card.suit == self.trump_suit:
                if highest_card is None or card.rank_value() > highest_card.rank_value():
                    highest_card = card
                    highest_player = player
            elif card.suit == lead_suit:
                if highest_card is None or (card.rank_value() > highest_card.rank_value() and highest_card.suit == lead_suit):
                    highest_card = card
                    highest_player = player
        return highest_player

# Score class to keep track of the scores
class Score:
    def __init__(self):
        self.team_scores = defaultdict(int)

    def update_score(self, team, points):
        self.team_scores[team] += points

# Game class to manage the flow of the game
class Game:
    def __init__(self, teams):
        self.teams = teams
        self.trump_suit = None
        self.current_trick = None

    def start_trick(self, trump_suit):
        self.trump_suit = trump_suit
        self.current_trick = Trick(trump_suit)

    def play_card(self, player, card):
        self.current_trick.play_card(player, card)

    def finish_trick(self):
        winner = self.current_trick.determine_winner()
        for team in self.teams:
            if winner in team.players:
                team.add_trick()
        return winner

# BridgeGame class to run the overall game
class BridgeGame:
    def __init__(self, player_names):
        self.players = [Player(name) for name in player_names]
        self.teams = [Team(self.players[0], self.players[2]), Team(self.players[1], self.players[3])]
        self.deck = Deck()
        self.score = Score()

    def deal_cards(self):
        for player in self.players:
            player.receive_cards(self.deck.deal(13))

    def start_bidding_phase(self):
        return BiddingPhase(self.players)

    def start_game(self):
        # Deal cards
        self.deal_cards()

        # Bidding Phase
        bidding_phase = self.start_bidding_phase()
        
        """
        the below code simulates the bidding phase where each player passes their bid for the round,
        we can change this logic later on to make it more complex, but for now we are just passing the bid for each player 
        """
        for player in self.players:
            # again, we can change this logic later on to make it more complex, for now its very simple and just passes the big phase for simplicity
            print(f"{player} passes.")
            bidding_phase.pass_bid(player)

        if bidding_phase.all_passed():
            print("All players passed the bidding.")

        # Trick taking Phase
        game = Game(self.teams)

        # Example of starting a trick with a trump suit
        game.start_trick(trump_suit="Spades")

        # Simulate players playing cards
        for player in self.players:
            # Each player plays their first card in hand
            card_to_play = player.hand[0]
            print(f"{player} plays {card_to_play}")
            game.play_card(player, card_to_play)

        # Now finish the trick and determine the winner
        winner = game.finish_trick()

        print(f"{winner} won the trick!")
        # Continue until all tricks are played, then score, etc.

"""
thats my understading of this game, I'll push this code for now so everyone can have a look and then we can change it 
later on as needed, but guess this is a good starting point for PoC.
"""

# ths is an example of how to start the game
bridge_game = BridgeGame(["Abbie", "John", "Laura", "Sam"])
bridge_game.start_game()
