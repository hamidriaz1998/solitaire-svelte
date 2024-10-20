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

  private getStackOfCardsToMove(
    pileIndex: number,
    cardIndex: number,
  ): Stack<Card> {
    const stack = new Stack<Card>();
    const tempStack = new Stack<Card>();

    const pileArray = this.piles[pileIndex].toArray();

    for (let i = cardIndex; i < pileArray.length; i++) {
      tempStack.push(pileArray[i]);
    }

    while (!tempStack.isEmpty()) {
      stack.push(tempStack.pop()!);
    }

    return stack;
  }

  moveCardBetweenPiles(fromPile: number, toPile: number, cardIndex: number) {
    const stack = this.getStackOfCardsToMove(fromPile, cardIndex);
    const fromCard = stack.peek();
    const toCard = this.piles[toPile].peek();

    if (!fromCard) {
      throw new Error("No card to move from the source pile");
    }

    if (toCard) {
      if (fromCard.canPlaceOn(toCard)) {
        while (!stack.isEmpty()) {
          this.addCardToPile(stack.pop()!, toPile);
        }
        this.removeCardsFromPile(fromPile, cardIndex);
        const nextCard = this.piles[fromPile].peek();
        if (nextCard && !nextCard.faceUp) {
          nextCard.flip();
        }
      } else {
        throw new Error(
          "Invalid move. The card cannot be placed on the destination pile.",
        );
      }
    } else {
      if (fromCard.rank === 13) {
        while (!stack.isEmpty()) {
          this.addCardToPile(stack.pop()!, toPile);
        }
        this.removeCardsFromPile(fromPile, cardIndex);
        const nextCard = this.piles[fromPile].peek();
        if (nextCard && !nextCard.faceUp) {
          nextCard.flip();
        }
      } else {
        throw new Error("Only a King can be moved to an empty pile.");
      }
    }
  }

  private removeCardsFromPile(pileIndex: number, cardIndex: number) {
    const pileArray = this.piles[pileIndex].toArray();
    const newStack = new Stack<Card>();
    for (let i = 0; i < cardIndex; i++) {
      newStack.push(pileArray[i]);
    }
    this.piles[pileIndex] = newStack;
  }
}
