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
        // Initialize and shuffle the deck
        this.deck = new Deck();
        this.deck.shuffle();

        // Initialize the tableau with cards from the deck
        this.tableau = new Tableau(this.deck);

        // Initialize the foundation
        this.foundation = new Foundation();

        // Initialize the stockpile with remaining cards
        const remainingCards: Card[] = [];
        let card = this.deck.draw();
        while (card) {
            remainingCards.push(card);
            card = this.deck.draw();
        }
        this.stockpile = new Stockpile(remainingCards);

        // Initialize the waste pile
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

    // Method to move cards between tableau piles
    moveCardBetweenTableauPiles(fromPile: number, toPile: number, cardIndex: number) {
        this.tableau.moveCardBetweenPiles(fromPile, toPile, cardIndex);
    }

    moveCardFromWasteToTableau(tableauIndex: number) {
        const card = this.wastePile.getTopCard();
        if (card) {
            // Attempt to add the card to the tableau
            try {
                this.tableau.addCardToPile(card, tableauIndex);
                this.wastePile.removeCard();
            } catch (_error) {
                throw new Error("Invalid move");
            }
        }
    }

    moveCardToFoundation(fromPileIndex: number, cardIndex: number, targetPileIndex: number) {
        let card: Card | undefined;

        if (fromPileIndex < this.tableau.piles.length) {
            const fromPile = this.tableau.piles[fromPileIndex];
            card = fromPile.getAt(cardIndex);
            if (!card) {
                throw new Error("Card not found in Tableau pile");
            }
            this.foundation.addCardToPile(card, targetPileIndex);
            fromPile.removeAt(cardIndex);
            // Attempt to add to foundation
            // Flip the next card in Tableau if necessary
            const newTail = fromPile.getTail();
            if (newTail && !newTail.faceUp) {
                newTail.flip();
            }
        } else {
            const wasteCard = this.wastePile.getTopCard();
            if (!wasteCard) {
                throw new Error("No card to move from WastePile");
            }
            this.foundation.addCardToPile(wasteCard, targetPileIndex);
            this.wastePile.removeCard();
        }
    }

    isGameWon(): boolean {
        return this.foundation.piles.every((pile) => pile.size() === 13);
    }
}