import { Deck } from "./Deck.ts";
import { Tableau } from "./Tableau.ts";
import { Foundation } from "./Foundation.ts";
import { Stockpile } from "./StockPile.ts";
import WastePile from "./WastePile.ts";
import { Card } from "./Card.ts";

export class Game {
  deck: Deck;
  tableau: Tableau;
  foundation: Foundation;
  stockpile: Stockpile;
  wastePile: WastePile;

  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();

    this.tableau = new Tableau(this.deck);

    this.foundation = new Foundation();

    const remainingCards: Card[] = [];
    let card = this.deck.draw();
    while (card) {
      remainingCards.push(card);
      card = this.deck.draw();
    }
    this.stockpile = new Stockpile(remainingCards);

    this.wastePile = new WastePile();
  }

  drawFromStockpile() {
    const card = this.stockpile.drawCard();
    if (card) {
      card.flip();
      this.wastePile.addCard(card);
    } else {
      // Reset the stockpile from the waste pile
      while (this.wastePile.getTopCard()) {
        const wasteCard = this.wastePile.removeCard();
        if (wasteCard) {
          wasteCard.flip();
          this.stockpile.addCardToStockpile(wasteCard);
        }
      }
    }
  }

  moveCardBetweenTableauPiles(
    fromPile: number,
    toPile: number,
    cardIndex: number,
  ) {
    this.tableau.moveCardBetweenPiles(fromPile, toPile, cardIndex);
  }

  moveCardFromWasteToTableau(tableauIndex: number) {
    const card = this.wastePile.getTopCard();
    if (card) {
      try {
        this.tableau.addCardToPile(card, tableauIndex);
        this.wastePile.removeCard();
      } catch (_error) {
        throw new Error("Invalid move");
      }
    }
  }

  moveCardFromTableauToFoundation(
    fromPileIndex: number,
    cardIndex: number,
    targetPileIndex: number,
  ) {
    let card: Card | undefined;

    if (fromPileIndex < this.tableau.piles.length) {
      const fromPile = this.tableau.piles[fromPileIndex];
      card = fromPile.getAt(cardIndex);
      if (!card) {
        throw new Error("Card not found in Tableau pile");
      }
      this.foundation.addCard(card, targetPileIndex);
      fromPile.removeAt(cardIndex);
      const newTail = fromPile.getTail();
      if (newTail && !newTail.faceUp) {
        newTail.flip();
      }
    } else {
      const wasteCard = this.wastePile.getTopCard();
      if (!wasteCard) {
        throw new Error("No card to move from WastePile");
      }
      this.foundation.addCard(wasteCard, targetPileIndex);
      this.wastePile.removeCard();
    }
  }

  isGameWon(): boolean {
    return this.foundation.piles.every((pile) => pile.size() === 13);
  }
  moveCardFromFoundationToTableau(
    foundationPileIndex: number,
    tableauPileIndex: number,
  ) {
    const foundationPile = this.foundation.piles[foundationPileIndex];
    const card = foundationPile.pop();
    if (card) {
      try {
        this.tableau.addCardToPile(card, tableauPileIndex);
      } catch (_error) {
        foundationPile.push(card);
        throw new Error("Invalid move from foundation to tableau");
      }
    } else {
      throw new Error("No card to move from foundation");
    }
  }
  moveCardWasteToFoundation(foundationPileIndex: number) {
    const card = this.wastePile.getTopCard();
    if (card) {
      try {
        this.foundation.addCard(card, foundationPileIndex);
        this.wastePile.removeCard();
      } catch (_error) {
        throw new Error("Invalid move from waste to foundation");
      }
    } else {
      throw new Error("No card to move from waste to foundation");
    }
  }


}
