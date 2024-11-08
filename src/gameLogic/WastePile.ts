import { Card } from "./Card.ts";
import Stack from "../DataStructures/Stack.ts";

export default class WastePile {
  pile: Stack<Card>;

  constructor() {
    this.pile = new Stack<Card>();
  }
  addCard(card: Card) {
    this.pile.push(card);
  }
  removeCard(): Card | undefined {
    return this.pile.pop();
  }
  getTopCard(): Card | undefined {
    return this.pile.peek();
  }
  clone(): WastePile {
    const wastePile = new WastePile();
    wastePile.pile = this.pile.clone();
    return wastePile;
  }
}
