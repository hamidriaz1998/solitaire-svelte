export default class Queue<T> {
    private items: T[];
    constructor() {
        this.items = [];
    }
    enqueue(item: T) {
        this.items.push(item);
    }
    dequeue(): T | undefined {
        return this.items.shift();
    }
    peek(): T | undefined {
        return this.items[0];
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    size(): number {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
    print() {
        console.log(this.items.toString());
    }
}
