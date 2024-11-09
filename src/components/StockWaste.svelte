<script lang="ts">
  import { onDestroy } from "svelte";
  import { gameStore } from "../stores/gameStore";
  import Card from "./Card.svelte";
  import { Game } from "../gameLogic/Game.js";
  import { fly, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { timer } from "../stores/timerStore";

  let game: Game | null = null;

  const unsubscribe = gameStore.subscribe((value) => {
    game = value.currentGame;
  });

  onDestroy(() => {
    unsubscribe();
  });

  function handleStockClick() {
    game?.drawFromStockpile();
    gameStore.set(game!);
  }

  function handleDragStart(event: DragEvent) {
    const dragData = {
      source: "waste",
    };
    event.dataTransfer?.setData("application/json", JSON.stringify(dragData));
    (event.currentTarget as HTMLElement).classList.add("dragging");
  }

  function handleDragEnd(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove("dragging");
  }

  let isDraggable: boolean;

  timer.subscribe((state) => {
    isDraggable = state.isDraggable;
  });
</script>

<div class="flex gap-4 justify-center items-center">
  <button
    class="relative w-[109px] h-[150px] rounded-lg flex items-center justify-center cursor-pointer group"
    on:click={handleStockClick}
    disabled={!isDraggable}
  >
    {#if game && !game.stockpile.isEmpty()}
      <div
        class="w-full h-full transition-all duration-300 origin-center group-hover:scale-105"
        in:scale={{
          duration: 200,
          easing: cubicOut,
        }}
      >
        <Card card={game.stockpile?.peek()} />
      </div>
    {:else}
      <div
        class="flex justify-center items-center text-base text-gray-600 w-full h-full border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:border-gray-600 hover:scale-105"
        in:scale={{
          duration: 200,
          easing: cubicOut,
        }}
      >
        Empty Stock
      </div>
    {/if}
  </button>
  <div
    class="relative w-[109px] h-[150px] rounded-lg flex items-center justify-center cursor-pointer"
  >
    {#if game && !game.wastePile.pile.isEmpty()}
      <div
        class="absolute w-full h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:z-10"
        draggable={isDraggable}
        role="list"
        on:dragstart={(event) => isDraggable && handleDragStart(event)}
        on:dragend={(event) => handleDragEnd(event)}
        in:fly={{
          x: -200,
          y: 0,
          duration: 500,
          easing: cubicOut,
        }}
      >
        <Card card={game.wastePile.getTopCard()} />
      </div>
    {:else}
      <div
        class="flex justify-center items-center text-base text-gray-600 w-full h-full border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:border-gray-600"
        in:scale={{
          duration: 200,
          easing: cubicOut,
        }}
      >
        Empty Waste
      </div>
    {/if}
  </div>
</div>
