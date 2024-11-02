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
  prepend(data: T) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.head) {
        newNode.next = this.head;
        this.head = newNode;
      }
    }
    this.count++;
  }
  deleteHead() {
    if (!this.head) {
      return;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      if (this.head.next) {
        this.head = this.head.next;
      }
    }
    this.count--;
  }
  deleteTail() {
    if (!this.tail) {
      return;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      if (this.head) {
        let current = this.head;
        while (current.next !== this.tail) {
          if (current.next) {
            current = current.next;
          } else {
            break;
          }
        }
        current.next = null;
        this.tail = current;
      }
    }
    this.count--;
  }
  delete(data: T) {
    if (!this.head) {
      return;
    }
    if (this.head.data === data) {
      this.deleteHead();
    } else {
      if (this.tail && this.tail.data === data) {
        this.deleteTail();
      } else {
        let current = this.head;
        while (current.next) {
          if (current.next.data === data) {
            current.next = current.next.next;
            this.count--;
            break;
          }
          current = current.next;
        }
      }
    }
  }
  find(data: T) {
    if (!this.head) {
      return null;
    }
    let current = this.head;
    while (current && current.data !== data) {
      current = current.next!;
    }
    return current;
  }
  get size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
  print() {
    if (!this.head) {
      console.log("Empty list");
    } else {
      let current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next!;
      }
    }
  }
  toString() {
    return this.toArray().join(", ");
  }
  get(index: number): T | null {
    if (index < 0 || index >= this.count) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (current) {
        current = current.next;
      }
    }
    return current ? current.data : null;
  }
  set(index: number, data: T) {
    if (index < 0 || index >= this.count) {
      return;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (current) {
        current = current.next;
      }
    }
    if (current) {
      current.data = data;
    }
  }
  insert(index: number, data: T) {
    if (index < 0 || index > this.count) {
      return;
    }
    if (index === 0) {
      this.prepend(data);
      return;
    }
    if (index === this.count) {
      this.append(data);
      return;
    }
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (current) {
        current = current.next;
      }
    }
    if (current) {
      const newNode = new Node(data);
      newNode.next = current.next;
      current.next = newNode;
      this.count++;
    }
  }
  remove(index: number) {
    if (index < 0 || index >= this.count) {
      return;
    }
    if (index === 0) {
      this.deleteHead();
      return;
    }
    if (index === this.count - 1) {
      this.deleteTail();
      return;
    }
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (current) {
        current = current.next;
      }
    }
    if (current && current.next) {
      current.next = current.next.next;
      this.count--;
    }
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
      // Move all nodes to the new list
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
    // Clear the concatenated list
    list.head = null;
    list.tail = null;
    list.count = 0;
  }
}
