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
      this.piles[pileIndex].append(card);
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
        fromPileList.getTail()?.flip();
      } else {
        // Move cards back to the source pile
        fromPileList.concat(movingCards);
        throw new Error("Only a King can be moved to an empty pile");
      }
    }
  }
}

// Ensure this method exists in LinkedList
// removeAt is assumed to remove a card at a specific index
