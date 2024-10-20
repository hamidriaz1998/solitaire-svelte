import LinkedList from "../DataStructures/LinkedList.ts";
import { Card } from "./Card.ts";
import { Deck } from "./Deck.ts";

export class Tableau {
  piles: LinkedList<Card>[];
  constructor(deck: Deck) {
    this.piles = [];
    for (let i = 0; i < 7; i++) {
      this.piles.push(new LinkedList<Card>());
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
        this.piles[i].append(card);
      }
    }
  }
  private addCardToPile(card: Card, pileIndex: number) {
    if (pileIndex >= 0 && pileIndex < this.piles.length) {
      this.piles[pileIndex].append(card);
    } else {
      throw new Error("Invalid pile index");
    }
  }
  moveCardBetweenPiles(fromPile: number, toPile: number) {
    const fromCard = this.piles[fromPile].getTail();
    const toCard = this.piles[toPile].getTail();
    if (fromCard && toCard && fromCard.canPlaceOn(toCard)) {
      this.addCardToPile(fromCard, toPile);
      this.piles[fromPile].deleteTail();
      this.piles[fromPile].getTail()?.flip();
    } else {
      throw new Error("Invalid move");
    }
  }
}
