export type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;

  constructor(suit: Suit, rank: Rank, faceUp: boolean = false) {
    this.suit = suit;
    this.rank = rank;
    this.faceUp = faceUp;
  }

  flip() {
    this.faceUp = !this.faceUp;
  }

  isOppositeColor(card: Card): boolean {
    const redSuits: Suit[] = ["Hearts", "Diamonds"];
    const blackSuits: Suit[] = ["Clubs", "Spades"];
    return (
      (redSuits.includes(this.suit) && blackSuits.includes(card.suit)) ||
      (blackSuits.includes(this.suit) && redSuits.includes(card.suit))
    );
  }
  canPlaceOn(card: Card): boolean {
    return this.rank === card.rank - 1 && this.isOppositeColor(card);
  }
}
