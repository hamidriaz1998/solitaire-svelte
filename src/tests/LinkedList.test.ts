import LinkedList from "../DataStructures/LinkedList.ts";
import { assertEquals, assertNotEquals } from "@std/assert";

const list = new LinkedList<number>();
assertEquals(list.size, 0);
assertEquals(list.isEmpty(), true);
assertEquals(list.getHead(), null);
assertEquals(list.getTail(), null);

Deno.test("LinkedList should append elements to the list", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  assertEquals(list.size, 3);
  assertEquals(list.isEmpty(), false);
  assertEquals(list.getHead(), 1);
  assertEquals(list.getTail(), 3);
  assertEquals(list.toArray(), [1, 2, 3]);
});

Deno.test("LinkedList should prepend elements to the list", () => {
  const list = new LinkedList<number>();
  list.prepend(1);
  list.prepend(2);
  list.prepend(3);

  assertEquals(list.size, 3);
  assertEquals(list.isEmpty(), false);
  assertEquals(list.getHead(), 3);
  assertEquals(list.getTail(), 1);
  assertEquals(list.toArray(), [3, 2, 1]);
});

Deno.test("LinkedList should delete the head element", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  list.deleteHead();

  assertEquals(list.size, 2);
  assertEquals(list.getHead(), 2);
  assertEquals(list.toArray(), [2, 3]);
});

Deno.test("LinkedList should delete the tail element", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  list.deleteTail();

  assertEquals(list.size, 2);
  assertEquals(list.getTail(), 2);
  assertEquals(list.toArray(), [1, 2]);
});

Deno.test("LinkedList should delete a specific element", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  list.delete(2);

  assertEquals(list.size, 2);
  assertEquals(list.toArray(), [1, 3]);
});

Deno.test("LinkedList should find an element", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  const node = list.find(2);

  assertNotEquals(node, null);
  assertEquals(node?.data, 2);
});

Deno.test("LinkedList should get an element by index", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  assertEquals(list.get(0), 1);
  assertEquals(list.get(1), 2);
  assertEquals(list.get(2), 3);
  assertEquals(list.get(3), null);
});

Deno.test("LinkedList should set an element by index", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  list.set(1, 4);

  assertEquals(list.get(1), 4);
  assertEquals(list.toArray(), [1, 4, 3]);
});

Deno.test("LinkedList should insert an element at a specific index", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(3);

  list.insert(1, 2);

  assertEquals(list.size, 3);
  assertEquals(list.toArray(), [1, 2, 3]);
});

Deno.test("LinkedList should remove an element by index", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  list.remove(1);

  assertEquals(list.size, 2);
  assertEquals(list.toArray(), [1, 3]);
});

Deno.test("LinkedList should convert the list to an array", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  assertEquals(list.toArray(), [1, 2, 3]);
});

Deno.test("LinkedList should return the list as a string", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  assertEquals(list.toString(), "1, 2, 3");
});

// Additional tests
Deno.test("LinkedList should handle deleting from an empty list", () => {
  const list = new LinkedList<number>();
  list.deleteHead();
  list.deleteTail();
  list.delete(1);

  assertEquals(list.size, 0);
  assertEquals(list.isEmpty(), true);
});

Deno.test("LinkedList should handle inserting at the head and tail", () => {
  const list = new LinkedList<number>();
  list.insert(0, 1);
  list.insert(1, 2);

  assertEquals(list.size, 2);
  assertEquals(list.getHead(), 1);
  assertEquals(list.getTail(), 2);
  assertEquals(list.toArray(), [1, 2]);
});

Deno.test("LinkedList should handle setting an element out of bounds", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.set(1, 2);

  assertEquals(list.size, 1);
  assertEquals(list.get(1), null);
  assertEquals(list.toArray(), [1]);
});

Deno.test("LinkedList should handle removing an element out of bounds", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.remove(1);

  assertEquals(list.size, 1);
  assertEquals(list.toArray(), [1]);
});
