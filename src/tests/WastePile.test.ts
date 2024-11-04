import { assertEquals, assertStrictEquals } from "@std/assert";
import WastePile from "../gameLogic/WastePile.ts";
import { Card } from "../gameLogic/Card.ts";

Deno.test("WastePile should add a card to the waste pile", () => {
  const wastePile = new WastePile();
  const card1 = new Card("Hearts", 1);
  wastePile.addCard(card1);
  assertStrictEquals(wastePile.getTopCard(), card1);
});

Deno.test("WastePile should remove a card from the waste pile", () => {
  const wastePile = new WastePile();
  const card1 = new Card("Hearts", 1);
  const card2 = new Card("Spades", 13);
  wastePile.addCard(card1);
  wastePile.addCard(card2);
  const removedCard = wastePile.removeCard();
  assertStrictEquals(removedCard, card2);
  assertStrictEquals(wastePile.getTopCard(), card1);
});

Deno.test("WastePile should get the top card from the waste pile", () => {
  const wastePile = new WastePile();
  const card1 = new Card("Hearts", 1);
  const card2 = new Card("Spades", 13);
  wastePile.addCard(card1);
  wastePile.addCard(card2);
  assertStrictEquals(wastePile.getTopCard(), card2);
});

Deno.test("WastePile should return undefined when removing a card from an empty waste pile", () => {
  const wastePile = new WastePile();
  assertEquals(wastePile.removeCard(), undefined);
});

Deno.test("WastePile should return undefined when getting the top card from an empty waste pile", () => {
  const wastePile = new WastePile();
  assertEquals(wastePile.getTopCard(), undefined);
});
