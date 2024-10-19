import Queue from "../DataStructures/Queue.ts";
import { Card } from "./Card.ts";

export class Stockpile {
  cards: Queue<Card>;

  constructor(cards: Card[]) {
    this.cards = new Queue<Card>();
    cards.forEach((card) => this.addCardToStockpile(card));
  }

  drawCard(): Card | undefined {
    return this.cards.dequeue();
  }

  addCardToStockpile(card: Card) {
    this.cards.enqueue(card);
  }
}
