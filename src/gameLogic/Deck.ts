import { Card, Rank, Suit } from "./Card.ts";

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  initializeDeck() {
    for (const suit in Suit) {
      if (isNaN(Number(suit))) continue; // Skip string representations of the enum
      for (const rank in Rank) {
        if (isNaN(Number(rank))) continue;
        this.cards.push(
          new Card(
            Suit[suit as keyof typeof Suit],
            Rank[rank as keyof typeof Rank],
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
