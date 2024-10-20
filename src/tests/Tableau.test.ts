import { assertEquals, assertThrows } from "@std/assert";
import { Tableau } from "../gameLogic/Tableau.ts";
import { Deck } from "../gameLogic/Deck.ts";

Deno.test("Tableau should initialize with 7 piles and 28 cards", () => {
  const deck = new Deck();
  const initialDeckSize = deck.cards.length;
  const tableau = new Tableau(deck);

  assertEquals(tableau.piles.length, 7);
  assertEquals(deck.cards.length, initialDeckSize - 28);
});

Deno.test("Tableau should move card between piles", () => {
  const deck = new Deck();
  const tableau = new Tableau(deck);

  const fromPileIndex = 0;
  const toPileIndex = 1;

  const fromCard = tableau.piles[fromPileIndex].getTail();
  const toCard = tableau.piles[toPileIndex].getTail();

  if (fromCard && toCard && fromCard.canPlaceOn(toCard)) {
    tableau.moveCardBetweenPiles(fromPileIndex, toPileIndex);
    assertEquals(tableau.piles[toPileIndex].getTail(), fromCard);
    assertEquals(tableau.piles[fromPileIndex].getTail(), null);
  } else {
    assertThrows(
      () => {
        tableau.moveCardBetweenPiles(fromPileIndex, toPileIndex);
      },
      Error,
      "Invalid move",
    );
  }
});

Deno.test("Last card in pile should be flipped", () => {
  const deck = new Deck();
  const tableau = new Tableau(deck);

  for (let i = 0; i < tableau.piles.length; i++) {
    const lastCard = tableau.piles[i].getTail();
    if (lastCard) {
      assertEquals(lastCard.faceUp, true);
    }
  }
});
