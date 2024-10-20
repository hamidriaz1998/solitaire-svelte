import { Deck } from "../gameLogic/Deck.ts";
import { assertEquals, assertNotEquals } from "@std/assert";

Deno.test("Deck should initialize with 52 cards", () => {
  const deck = new Deck();
  assertEquals(deck.cards.length, 52);
});

Deno.test("Deck should draw a card", () => {
  const deck = new Deck();
  const initialSize = deck.cards.length;
  const drawnCard = deck.draw();

  assertNotEquals(drawnCard, null);
  assertEquals(deck.cards.length, initialSize - 1);
});

Deno.test("Deck should return null when drawing from an empty deck", () => {
  const deck = new Deck();
  // Draw all cards
  for (let i = 0; i < 52; i++) {
    deck.draw();
  }
  const drawnCard = deck.draw();
  assertEquals(drawnCard, null);
});

Deno.test("Deck should shuffle cards", () => {
  const deck = new Deck();
  const originalOrder = [...deck.cards];
  deck.shuffle();
  const shuffledOrder = deck.cards;

  // Ensure the deck is shuffled
  let isShuffled = false;
  for (let i = 0; i < originalOrder.length; i++) {
    if (originalOrder[i] !== shuffledOrder[i]) {
      isShuffled = true;
      break;
    }
  }
  assertEquals(isShuffled, true);
});

Deno.test("Deck should contain all unique cards after initialization", () => {
  const deck = new Deck();
  const cardSet = new Set(
    deck.cards.map((card) => `${card.suit}-${card.rank}`),
  );
  assertEquals(cardSet.size, 52);
});
