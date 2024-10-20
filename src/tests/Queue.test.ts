import Queue from "../DataStructures/Queue.ts";
import { assertEquals } from "@std/assert";

Deno.test("Queue should enqueue elements", () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  assertEquals(queue.size(), 3);
  assertEquals(queue.peek(), 1);
});

Deno.test("Queue should dequeue elements", () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  const dequeued = queue.dequeue();
  assertEquals(dequeued, 1);
  assertEquals(queue.size(), 2);
  assertEquals(queue.peek(), 2);
});

Deno.test("Queue should peek at the front element", () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);

  assertEquals(queue.peek(), 1);
});

Deno.test("Queue should check if it is empty", () => {
  const queue = new Queue<number>();
  assertEquals(queue.isEmpty(), true);

  queue.enqueue(1);
  assertEquals(queue.isEmpty(), false);
});

Deno.test("Queue should return the correct size", () => {
  const queue = new Queue<number>();
  assertEquals(queue.size(), 0);

  queue.enqueue(1);
  queue.enqueue(2);
  assertEquals(queue.size(), 2);
});

Deno.test("Queue should clear all elements", () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.clear();

  assertEquals(queue.size(), 0);
  assertEquals(queue.isEmpty(), true);
});

Deno.test("Queue should print elements", () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);

  console.log = (output) => {
    assertEquals(output, "1,2");
  };
  queue.print();
});
