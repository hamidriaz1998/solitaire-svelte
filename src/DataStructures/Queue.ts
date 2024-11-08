import LinkedList from "./LinkedList.ts";

export default class Queue<T> {
  private items: LinkedList<T>;

  constructor() {
    this.items = new LinkedList<T>();
  }

  enqueue(item: T) {
    this.items.append(item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.items.getHead();
    this.items.removeAt(0);
    return value || undefined;
  }

  peek(): T | undefined {
    return this.items.getHead() || undefined;
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  size(): number {
    return this.items.size;
  }

  clear() {
    this.items = new LinkedList<T>();
  }

  print() {
    console.log(this.items.toArray().toString());
  }

  clone(): Queue<T> {
    const newQueue = new Queue<T>();
    newQueue.items = this.items.clone();
    return newQueue;
  }
}
