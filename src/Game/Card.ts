export default class Card {
    private value: number;
    private suit: string;
    private color: "red" | "black";
    constructor(value: number, suit: string) {
        this.value = value;
        this.suit = suit;
        if (suit === "hearts" || suit === "diamonds") {
            this.color = "red";
        }
        else {
            this.color = "black";
        }
    }
    getValue() {
        return this.value;
    }
    getSuit() {
        return this.suit;
    }
    getColor() {
        return this.color;
    }
    toString() {
        return `${this.value} of ${this.suit}`;
    }
}