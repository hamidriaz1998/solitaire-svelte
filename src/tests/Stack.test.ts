import Stack from "../DataStructures/Stack.ts";
import {
  assertEquals,
} from "@std/assert";

Deno.test("Stack should push elements", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.push(3);

  assertEquals(stack.size(), 3);
  assertEquals(stack.peek(), 3);
});

Deno.test("Stack should pop elements", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.push(3);

  const popped = stack.pop();
  assertEquals(popped, 3);
  assertEquals(stack.size(), 2);
  assertEquals(stack.peek(), 2);
});

Deno.test("Stack should peek at the top element", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);

  assertEquals(stack.peek(), 2);
});

Deno.test("Stack should check if it is empty", () => {
  const stack = new Stack<number>();
  assertEquals(stack.isEmpty(), true);

  stack.push(1);
  assertEquals(stack.isEmpty(), false);
});

Deno.test("Stack should return the correct size", () => {
  const stack = new Stack<number>();
  assertEquals(stack.size(), 0);

  stack.push(1);
  stack.push(2);
  assertEquals(stack.size(), 2);
});

Deno.test("Stack should clear all elements", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.clear();

  assertEquals(stack.size(), 0);
  assertEquals(stack.isEmpty(), true);
});

Deno.test("Stack should print elements", () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);

  console.log = (output) => {
    assertEquals(output, "1,2");
  };
  stack.print();
});
