import { Card, type Rank, type Suit } from "./Card.ts";

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  initializeDeck() {
    const suits: Suit[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
    for (let i = 0; i < suits.length; i++) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(
          new Card(
            suits[i] as Suit,
            rank as Rank,
          ),
        );
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card | null {
    return this.cards.pop() || null;
  }
}
