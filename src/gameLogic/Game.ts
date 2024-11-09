import { Deck } from "./Deck.ts";
import { Tableau } from "./Tableau.ts";
import { Foundation } from "./Foundation.ts";
import { Stockpile } from "./StockPile.ts";
import WastePile from "./WastePile.ts";
import { Card } from "./Card.ts";
import { score } from "../shared/shared.svelte.ts";
import { SCORE_RULES } from "../shared/Score.svelte.ts";
export class Game {
  tableau: Tableau;
  foundation: Foundation;
  stockpile: Stockpile;
  wastePile: WastePile;

  constructor(game?: Game) {
    if (game) {
      this.tableau = game.tableau.clone();
      this.foundation = game.foundation.clone();
      this.stockpile = game.stockpile.clone();
      this.wastePile = game.wastePile.clone();
    } else {
      const deck = new Deck();
      deck.shuffle();

      this.tableau = new Tableau(deck);

      this.foundation = new Foundation();

      const remainingCards: Card[] = [];
      let card = deck.draw();
      while (card) {
        remainingCards.push(card);
        card = deck.draw();
      }
      this.stockpile = new Stockpile(remainingCards);

      this.wastePile = new WastePile();
    }
  }
  clone(): Game {
    return new Game(this);
  }

  drawFromStockpile() {
    const wasEmpty = this.stockpile.isEmpty();
    const card = this.stockpile.drawCard();
    if (card) {
      card.flip();
      this.wastePile.addCard(card);
      score.incrementMoves();
    } else if (wasEmpty) {
      // Reset the stockpile from the waste pile
      while (this.wastePile.getTopCard()) {
        const wasteCard = this.wastePile.removeCard();
        if (wasteCard) {
          wasteCard.flip();
          this.stockpile.addCardToStockpile(wasteCard);
        }
      }
      score.addPoints(SCORE_RULES.RECYCLE_WASTE);
      score.incrementMoves();
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
        score.addPoints(SCORE_RULES.WASTE_TO_TABLEAU);
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
        score.addPoints(SCORE_RULES.TURN_OVER_TABLEAU_CARD);
      }
      score.addPoints(SCORE_RULES.TABLEAU_TO_FOUNDATION);
    }
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
        score.addPoints(SCORE_RULES.FOUNDATION_TO_TABLEAU);
      } catch (_error) {
        foundationPile.push(card);
        throw new Error("Invalid move from foundation to tableau");
      }
    }
  }

  moveCardWasteToFoundation(foundationPileIndex: number) {
    const card = this.wastePile.getTopCard();
    if (card) {
      try {
        this.foundation.addCard(card, foundationPileIndex);
        this.wastePile.removeCard();
        score.addPoints(SCORE_RULES.WASTE_TO_FOUNDATION);
      } catch (_error) {
        throw new Error("Invalid move from waste to foundation");
      }
    }
  }

  isGameWon(): boolean {
    return this.foundation.piles.every((pile) => pile.size() === 13);
  }
}
