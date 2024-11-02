import Stack from "../DataStructures/Stack.ts";
import { Card } from "./Card.ts";

export class Foundation {
  piles: Stack<Card>[];

  constructor() {
    this.piles = [];
    for (let i = 0; i < 4; i++) {
      this.piles.push(new Stack<Card>());
    }
  }

  addCardToPile(card: Card, pileIndex: number) {
    if (
      pileIndex >= 0 && pileIndex < this.piles.length &&
      this.canPlaceOn(card, pileIndex)
    ) {
      this.piles[pileIndex].push(card);
    } else {
      throw new Error("Invalid move");
    }
  }
  // Function to check if the card can be placed on the foundation pile
  canPlaceOn(card: Card, pileIndex: number): boolean {
    const pile = this.piles[pileIndex];
    if (pile.isEmpty()) {
      return card.rank === 1;
    }
    const topCard = pile.peek();
    return topCard !== undefined && card.rank === topCard.rank + 1 &&
      card.suit === topCard.suit;
  }

  removeCardFromPile(pileIndex: number): Card | undefined {
    return this.piles[pileIndex].pop();
  }
}
