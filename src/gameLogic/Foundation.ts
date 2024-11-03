import Stack from "../DataStructures/Stack.ts";
import { Card, type Suit } from "./Card.ts";

class Pile {
  pile: Stack<Card>;
  suit: Suit;

  constructor(suit: Suit) {
    this.pile = new Stack<Card>();
    this.suit = suit;
  }

  push(card: Card): void {
    if (
      card.suit === this.suit &&
      (this.pile.isEmpty() && card.rank === 1 ||
        !this.pile.isEmpty() && this.pile.peek() &&
          card.rank === this.pile.peek()!.rank + 1)
    ) {
      this.pile.push(card);
    } else {
      throw new Error("Invalid move");
    }
  }
  pop(): Card | undefined {
    return this.pile.pop();
  }
  peek(): Card | undefined {
    return this.pile.peek();
  }
  isEmpty(): boolean {
    return this.pile.isEmpty();
  }
  size(): number {
    return this.pile.size();
  }
}
export class Foundation {
  piles: Pile[];

  constructor() {
    this.piles = [];
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    suits.forEach((suit) => {
      this.piles.push(new Pile(suit as Suit));
    });
  }

  addCard(card: Card, pileIndex: number): void {
    this.piles[pileIndex].push(card);
  }

  removeCard(pileIndex: number): Card | undefined {
    return this.piles[pileIndex].pop();
  }

  getTopCard(pileIndex: number): Card | undefined {
    return this.piles[pileIndex].pile.peek();
  }

  isComplete(): boolean {
    return this.piles.every((pile) => pile.pile.size() === 13);
  }
}
