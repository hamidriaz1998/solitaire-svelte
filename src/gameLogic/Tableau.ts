import Stack from "../DataStructures/Stack.ts";
import { Card } from "./Card.ts";
import { Deck } from "./Deck.ts";

export class Tableau {
  piles: Stack<Card>[];
  constructor(deck: Deck) {
    this.piles = [];
    for (let i = 0; i < 7; i++) {
      this.piles.push(new Stack<Card>());
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        const card = deck.draw();
        if (!card) {
          throw new Error("Not enough cards in deck");
        }
        if (j === i) {
          card.flip();
        }
        this.piles[i].push(card);
      }
    }
  }
  private addCardToPile(card: Card, pileIndex: number) {
    if (pileIndex >= 0 && pileIndex < this.piles.length) {
      this.piles[pileIndex].push(card);
    } else {
      throw new Error("Invalid pile index");
    }
  }
  moveCardBetweenPiles(fromPile: number, toPile: number) {
    const fromCard = this.piles[fromPile].peek();
    const toCard = this.piles[toPile].peek();

    if (!fromCard) {
      throw new Error("No card to move from the source pile");
    }

    if (toCard) {
      if (fromCard.canPlaceOn(toCard)) {
        this.addCardToPile(fromCard, toPile);
        this.piles[fromPile].pop();
        this.piles[fromPile].peek()?.flip();
      } else {
        throw new Error("Invalid move");
      }
    } else {
      // Handle the case where the destination pile is empty
      if (fromCard.rank === 13) {
        this.addCardToPile(fromCard, toPile);
        this.piles[fromPile].pop();
        this.piles[fromPile].peek()?.flip();
      } else {
        throw new Error("Only a King can be moved to an empty pile");
      }
    }
  }
}
