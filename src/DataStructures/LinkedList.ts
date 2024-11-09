// deno-lint-ignore-file no-explicit-any
class Node<T> {
  data: T;
  next: Node<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export default class LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  append(data: T) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this.count++;
  }

  isEmpty() {
    return this.count === 0;
  }

  get size() {
    return this.count;
  }

  toArray() {
    const array: T[] = [];
    let current = this.head;
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }

  getHead() {
    return this.head ? this.head.data : null;
  }

  getTail() {
    return this.tail ? this.tail.data : null;
  }

  private getNodeAtIndex(index: number): Node<T> | null {
    if (index < 0 || index >= this.count) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (current) {
        current = current.next;
      }
    }
    return current;
  }

  cutFromIndex(index: number): LinkedList<T> {
    if (index < 0 || index >= this.count) {
      throw new Error("Invalid index");
    }

    const newList = new LinkedList<T>();
    if (index === 0) {
      newList.head = this.head;
      newList.tail = this.tail;
      newList.count = this.count;

      this.head = null;
      this.tail = null;
      this.count = 0;
    } else {
      const prevNode = this.getNodeAtIndex(index - 1);
      if (prevNode && prevNode.next) {
        newList.head = prevNode.next;
        newList.tail = this.tail;
        newList.count = this.count - index;

        prevNode.next = null;
        this.tail = prevNode;
        this.count = index;
      }
    }

    return newList;
  }

  concat(list: LinkedList<T>) {
    if (list.isEmpty()) {
      return;
    }
    if (this.isEmpty()) {
      this.head = list.head;
      this.tail = list.tail;
      this.count = list.count;
    } else if (this.tail) {
      this.tail.next = list.head;
      this.tail = list.tail;
      this.count += list.count;
    }
    list.head = null;
    list.tail = null;
    list.count = 0;
  }

  getAt(index: number): T | undefined {
    let current = this.head;
    let i = 0;
    while (current && i < index) {
      current = current.next;
      i++;
    }
    return current ? current.data : undefined;
  }

  removeAt(index: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }
    if (index === 0) {
      this.head = this.head?.next || null;
      if (!this.head) {
        this.tail = null;
      }
    } else {
      let current = this.head;
      let prev: Node<T> | null = null;
      let i = 0;
      while (current && i < index) {
        prev = current;
        current = current.next;
        i++;
      }
      if (prev && current) {
        prev.next = current.next;
        if (!prev.next) {
          this.tail = prev;
        }
      }
    }
    this.count--;
  }
  clone(): LinkedList<T> {
    const newList = new LinkedList<T>();
    let current = this.head;
    while (current) {
      const data = (current.data as any).clone ? (current.data as any).clone() : current.data;
      newList.append(data);
      current = current.next;
    }
    return newList;
  }
}
