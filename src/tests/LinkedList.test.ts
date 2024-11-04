import LinkedList from "../DataStructures/LinkedList.ts";
import { assertEquals } from "@std/assert";

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

Deno.test("LinkedList should cut and concat lists", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  const newList = list.cutFromIndex(1);
  assertEquals(list.toArray(), [1]);
  assertEquals(newList.toArray(), [2, 3]);

  list.concat(newList);
  assertEquals(list.toArray(), [1, 2, 3]);
  assertEquals(newList.isEmpty(), true);
});

Deno.test("LinkedList should get and remove elements at index", () => {
  const list = new LinkedList<number>();
  list.append(1);
  list.append(2);
  list.append(3);

  assertEquals(list.getAt(1), 2);

  list.removeAt(1);
  assertEquals(list.toArray(), [1, 3]);
  assertEquals(list.size, 2);
});
