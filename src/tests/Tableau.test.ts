import { assertEquals, assertThrows } from "@std/assert";
import { Tableau } from "../gameLogic/Tableau.ts";
import { Card } from "../gameLogic/Card.ts";
import { Deck } from "../gameLogic/Deck.ts";

Deno.test("Tableau should initialize with 7 piles", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  assertEquals(tableau.piles.length, 7);
});

Deno.test("Tableau should initialize with correct number of cards in each pile", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  for (let i = 0; i < 7; i++) {
    assertEquals(tableau.piles[i].size, i + 1);
  }
});

Deno.test("Tableau should flip the top card in each pile", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  for (let i = 0; i < 7; i++) {
    const topCard = tableau.piles[i].getTail();
    assertEquals(topCard?.faceUp, true);
  }
});

Deno.test("Tableau should add a King to an empty pile", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  tableau.piles[0].deleteTail();
  const kingCard = new Card("Hearts", 13);
  tableau.addCardToPile(kingCard, 0);
  assertEquals(tableau.piles[0].getTail(), kingCard);
});

Deno.test("Tableau should not add a non-King card to an empty pile", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  const nonKingCard = new Card("Hearts", 12);
  assertThrows(
    () => {
      tableau.addCardToPile(nonKingCard, 0);
    },
    Error,
    "Invalid move",
  );
});

Deno.test("Tableau should add a card to a non-empty pile if the move is valid", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  const card = new Card("Hearts", 5);
  card.canPlaceOn = () => true;
  tableau.addCardToPile(card, 1);
  assertEquals(tableau.piles[1].getTail(), card);
});

Deno.test("Tableau should not add a card to a non-empty pile if the move is invalid", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  const card = new Card("Hearts", 5);
  card.canPlaceOn = () => false;
  assertThrows(
    () => {
      tableau.addCardToPile(card, 1);
    },
    Error,
    "Invalid move",
  );
});

Deno.test("Tableau should move cards between piles if the move is valid", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  const fromPile = 0;
  const toPile = 1;
  const cardIndex = 0;
  const fromCard = tableau.piles[fromPile].getHead();
  fromCard!.canPlaceOn = () => true;
  tableau.moveCardBetweenPiles(fromPile, toPile, cardIndex);
  assertEquals(tableau.piles[toPile].getTail(), fromCard);
});

Deno.test("Tableau should not move cards between piles if the move is invalid", () => {
  const deck = new Deck();
  deck.shuffle();
  const tableau = new Tableau(deck);
  const fromPile = 0;
  const toPile = 1;
  const cardIndex = 0;
  const fromCard = tableau.piles[fromPile].getHead();
  fromCard!.canPlaceOn = () => false;
  assertThrows(
    () => {
      tableau.moveCardBetweenPiles(fromPile, toPile, cardIndex);
    },
    Error,
    "Invalid move",
  );
});
