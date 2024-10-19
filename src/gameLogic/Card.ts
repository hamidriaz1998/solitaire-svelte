export enum Suit {
  Hearts,
  Diamonds,
  Clubs,
  Spades,
}

export enum Rank {
  Ace = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

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
    const redSuits = [Suit.Hearts, Suit.Diamonds];
    const blackSuits = [Suit.Clubs, Suit.Spades];
    return (
      (redSuits.includes(this.suit) && blackSuits.includes(card.suit)) ||
      (blackSuits.includes(this.suit) && redSuits.includes(card.suit))
    );
  }
  canPlaceOn(card: Card): boolean {
    return this.rank === card.rank - 1 && this.isOppositeColor(card);
  }
}
