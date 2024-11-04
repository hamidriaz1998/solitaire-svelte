import { assertEquals, assertInstanceOf } from "@std/assert";
import { Stockpile } from "../gameLogic/StockPile.ts";
import { Card } from "../gameLogic/Card.ts";

Deno.test("Stockpile should draw a card from the stockpile", () => {
  const cards = [
    new Card("Spades", 1),
    new Card("Hearts", 2),
    new Card("Diamonds", 3),
  ];
  const stockpile = new Stockpile(cards);

  const drawnCard = stockpile.drawCard();
  assertInstanceOf(drawnCard, Card);
  assertEquals(stockpile.cards.size(), cards.length - 1);
});

Deno.test("Stockpile should peek at the top card of the stockpile", () => {
  const cards = [
    new Card("Spades", 1),
    new Card("Hearts", 2),
    new Card("Diamonds", 3),
  ];
  const stockpile = new Stockpile(cards);

  const topCard = stockpile.peek();
  assertInstanceOf(topCard, Card);
  assertEquals(topCard, cards[0]);
});
