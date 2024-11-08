import LinkedList from "./LinkedList.ts";

export default class Stack<T> {
  private items: LinkedList<T>;

  constructor() {
    this.items = new LinkedList<T>();
  }

  push(item: T) {
    this.items.append(item);
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.items.getTail();
    this.items.removeAt(this.items.size - 1);
    return value || undefined;
  }

  peek(): T | undefined {
    return this.items.getTail() || undefined;
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

  toArray(): T[] {
    return this.items.toArray();
  }

  clone(): Stack<T> {
    const newStack = new Stack<T>();
    newStack.items = this.items.clone();
    return newStack;
  }
}
