<script lang="ts">
  import { onDestroy } from "svelte";
  import { gameStore } from "../stores/gameStore";
  import Card from "./Card.svelte";
  import type { Game } from "../gameLogic/Game.ts";
  import { fly, scale } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  let game: Game | null = null;

  const unsubscribe = gameStore.subscribe((value) => {
    game = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  let draggedCardIndex: {
    pileIndex: number;
    source: string;
  } | null = null;

  function handleDragStart(event: DragEvent, pileIndex: number) {
    draggedCardIndex = { pileIndex, source: "foundation" };
    event.dataTransfer?.setData(
      "application/json",
      JSON.stringify(draggedCardIndex)
    );
    (event.currentTarget as HTMLElement).classList.add("dragging");
  }

  function handleDragEnd(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove("dragging");
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.add("drag-over");
  }

  function handleDragLeave(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove("drag-over");
  }

  function handleDrop(event: DragEvent, targetPileIndex: number) {
    event.preventDefault();
    (event.currentTarget as HTMLElement)?.classList.remove("drag-over");

    const json = event.dataTransfer?.getData("application/json")!;
    if (!json) {
      console.error("No data found in drop event");
      return;
    }
    const data = JSON.parse(json);
    if (!data.source) {
      console.error("Invalid data format in drop event");
      return;
    }
    if (data.source === "tableau") {
      const { pileIndex: fromPileIndex, cardIndex: fromCardIndex } = data;
      try {
        game?.moveCardFromTableauToFoundation(
          fromPileIndex,
          fromCardIndex,
          targetPileIndex
        );
        gameStore.set(game!);
        draggedCardIndex = null;
      } catch (error) {
        console.error("Invalid move to foundation", error);
      }
    } else if (data.source === "waste") {
      try {
        game?.moveCardWasteToFoundation(targetPileIndex);
        gameStore.set(game!);
        draggedCardIndex = null;
      } catch (error) {
        console.error("Invalid move to foundation", error);
      }
    }
  }

  function getRandomRotation() {
    return Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
  }
</script>

<div class="foundation">
  {#if game}
    {#each game.foundation.piles as pile, i}
      <div
        class="pile"
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
        on:drop={(event) => handleDrop(event, i)}
      >
        {#if pile.isEmpty()}
          <div
            class="placeholder"
            in:scale={{
              duration: 200,
              easing: elasticOut,
              opacity: 0.5,
            }}
          >
            {#if pile.suit === "Hearts"}
              ♥️
            {:else if pile.suit === "Diamonds"}
              ♦️
            {:else if pile.suit === "Clubs"}
              ♣️
            {:else if pile.suit === "Spades"}
              ♠️
            {/if}
          </div>
        {:else}
          <div
            class="card"
            draggable="true"
            on:dragstart={(event) => handleDragStart(event, i)}
            on:dragend={handleDragEnd}
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            in:fly={{
              y: -100,
              duration: 500,
              easing: elasticOut,
              delay: 100,
            }}
            style="transform: rotate({getRandomRotation()}deg)"
          >
            <Card card={pile.peek()} />
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  .foundation {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
  .pile {
    position: relative;
    width: 109px;
    height: 150px;
    border: 1px solid transparent;
  }
  .pile.drag-over {
    border: 2px dashed #000;
    background-color: #e0e0e0;
  }
  .card {
    width: 109px;
    height: 150px;
  }
  .card {
    position: absolute;
    width: 109px;
    height: 150px;
    transition: all 0.3s ease;
    transform-origin: center center;
  }
  .card.dragging {
    opacity: 0.5;
    transform: scale(1.1);
  }
  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    color: #555;
    width: 109px;
    height: 150px;
    border: 2px dashed #bbb;
    border-radius: 8px;
    background-color: #f0f0f0;
    transition:
      background-color 0.3s,
      border-color 0.3s;
  }

  .placeholder:hover {
    background-color: #e0e0e0;
    border-color: #999;
  }

  .card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
</style>
