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

  addCardToPile(card: Card, pileIndex: number) {
    if (pileIndex >= 0 && pileIndex < this.piles.length) {
      // If the pile is empty, and the card is a King, add the card
      if (this.piles[pileIndex].isEmpty() && card.rank === 13) {
        this.piles[pileIndex].append(card);
        return;
      } else {
        const topCard = this.piles[pileIndex].getTail();
        if (!topCard) {
          throw new Error("No card to place on");
        }
        if (card.canPlaceOn(topCard)) {
          this.piles[pileIndex].append(card);
          return;
        } else {
          throw new Error("Invalid move");
        }
      }
    } else {
      throw new Error("Invalid pile index");
    }
  }

  moveCardBetweenPiles(fromPile: number, toPile: number, cardIndex: number) {
    const fromPileList = this.piles[fromPile];
    const toPileList = this.piles[toPile];
    const size = fromPileList.size;

    if (cardIndex < 0 || cardIndex >= size) {
      throw new Error("Invalid card index");
    }

    // Cut the moving cards from the source pile
    const movingCards = fromPileList.cutFromIndex(cardIndex);

    const fromCard = movingCards.getHead();
    const toCard = toPileList.getTail();

    if (!fromCard) {
      throw new Error("No card to move from the source pile");
    }

    if (toCard) {
      if (fromCard.canPlaceOn(toCard)) {
        // Append the moving cards to the destination pile
        toPileList.concat(movingCards);
        if (!fromPileList.getTail()?.faceUp)
          fromPileList.getTail()?.flip();
      } else {
        // Move cards back to the source pile
        fromPileList.concat(movingCards);
        throw new Error("Invalid move");
      }
    } else {
      // Handle the case where the destination pile is empty
      if (fromCard.rank === 13) {
        toPileList.concat(movingCards);
        if (!fromPileList.getTail()?.faceUp)
          fromPileList.getTail()?.flip();
      } else {
        // Move cards back to the source pile
        fromPileList.concat(movingCards);
        throw new Error("Only a King can be moved to an empty pile");
      }
    }
  }
}
