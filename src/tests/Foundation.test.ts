import { Foundation } from "../gameLogic/Foundation.ts";
import { Card, type Rank } from "../gameLogic/Card.ts";
import { assertEquals, assertThrows } from "@std/assert";

Deno.test("Foundation should initialize with four empty piles", () => {
  const foundation = new Foundation();
  assertEquals(foundation.piles.length, 4);
  foundation.piles.forEach((pile) => {
    assertEquals(pile.isEmpty(), true);
  });
});

Deno.test("Foundation should add a card to the correct pile", () => {
  const foundation = new Foundation();
  const card = new Card("Hearts", 1);
  foundation.addCard(card, 0);
  assertEquals(foundation.getTopCard(0), card);
});

Deno.test("Foundation should throw an error when adding an invalid card", () => {
  const foundation = new Foundation();
  const card = new Card("Hearts", 1);
  foundation.addCard(card, 0);
  const invalidCard = new Card("Hearts", 3);
  assertThrows(() => foundation.addCard(invalidCard, 0), Error, "Invalid move");
});

Deno.test("Foundation should remove a card from the correct pile", () => {
  const foundation = new Foundation();
  const card = new Card("Hearts", 1);
  foundation.addCard(card, 0);
  const removedCard = foundation.removeCard(0);
  assertEquals(removedCard, card);
  assertEquals(foundation.getTopCard(0), undefined);
});

Deno.test("Foundation should return the top card of a pile", () => {
  const foundation = new Foundation();
  const card1 = new Card("Hearts", 1);
  const card2 = new Card("Hearts", 2);
  foundation.addCard(card1, 0);
  foundation.addCard(card2, 0);
  assertEquals(foundation.getTopCard(0), card2);
});

Deno.test("Foundation should return true if all piles are complete", () => {
  const foundation = new Foundation();
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      foundation.addCard(new Card(foundation.piles[i].suit, j as Rank), i);
    }
  }
  assertEquals(foundation.isComplete(), true);
});

Deno.test("Foundation should return false if not all piles are complete", () => {
  const foundation = new Foundation();
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 12; j++) {
      foundation.addCard(new Card(foundation.piles[i].suit, j as Rank), i);
    }
  }
  assertEquals(foundation.isComplete(), false);
});
