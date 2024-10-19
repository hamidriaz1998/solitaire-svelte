import {
  assertEquals,
  assertThrows,
} from "@std/assert";
import { Foundation } from "../gameLogic/Foundation.ts";
import { Card, Rank, Suit } from "../gameLogic/Card.ts";

Deno.test("Foundation should initialize with 4 empty piles", () => {
  const foundation = new Foundation();
  assertEquals(foundation["piles"].length, 4);
  foundation["piles"].forEach((pile) => {
    assertEquals(pile.isEmpty(), true);
  });
});

Deno.test("Foundation should add a card to an empty pile if it is an Ace", () => {
  const foundation = new Foundation();
  const aceOfSpades = new Card(Suit.Spades, Rank.Ace, true);
  foundation.addCardToPile(aceOfSpades, 0);
  assertEquals(foundation["piles"][0].peek(), aceOfSpades);
});

Deno.test("Foundation should not add a card to an empty pile if it is not an Ace", () => {
  const foundation = new Foundation();
  const twoOfSpades = new Card(Suit.Spades, Rank.Two, true);
  assertThrows(
    () => foundation.addCardToPile(twoOfSpades, 0),
    Error,
    "Invalid move",
  );
});

Deno.test("Foundation should add a card to a pile if it is the next rank and same suit", () => {
  const foundation = new Foundation();
  const aceOfSpades = new Card(Suit.Spades, Rank.Ace, true);
  const twoOfSpades = new Card(Suit.Spades, Rank.Two, true);
  foundation.addCardToPile(aceOfSpades, 0);
  foundation.addCardToPile(twoOfSpades, 0);
  assertEquals(foundation["piles"][0].peek(), twoOfSpades);
});

Deno.test("Foundation should not add a card to a pile if it is not the next rank", () => {
  const foundation = new Foundation();
  const aceOfSpades = new Card(Suit.Spades, Rank.Ace, true);
  const threeOfSpades = new Card(Suit.Spades, Rank.Three, true);
  foundation.addCardToPile(aceOfSpades, 0);
  assertThrows(
    () => foundation.addCardToPile(threeOfSpades, 0),
    Error,
    "Invalid move",
  );
});

Deno.test("Foundation should not add a card to a pile if it is not the same suit", () => {
  const foundation = new Foundation();
  const aceOfSpades = new Card(Suit.Spades, Rank.Ace, true);
  const twoOfHearts = new Card(Suit.Hearts, Rank.Two, true);
  foundation.addCardToPile(aceOfSpades, 0);
  assertThrows(
    () => foundation.addCardToPile(twoOfHearts, 0),
    Error,
    "Invalid move",
  );
});

Deno.test("Foundation should remove a card from a pile", () => {
  const foundation = new Foundation();
  const aceOfSpades = new Card(Suit.Spades, Rank.Ace, true);
  foundation.addCardToPile(aceOfSpades, 0);
  const removedCard = foundation.removeCardFromPile(0);
  assertEquals(removedCard, aceOfSpades);
  assertEquals(foundation["piles"][0].isEmpty(), true);
});
