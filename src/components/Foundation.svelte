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

<div class="flex justify-center gap-4">
  {#if game}
    {#each game.foundation.piles as pile, i}
      <div
        class="relative w-[109px] h-[150px] border border-transparent hover:border-2 hover:border-dashed hover:border-black hover:bg-gray-200"
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
        on:drop={(event) => handleDrop(event, i)}
      >
        {#if pile.isEmpty()}
          <div
            class="flex justify-center items-center text-5xl text-gray-600 w-[109px] h-[150px] border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:border-gray-600"
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
            class="absolute w-[109px] h-[150px] transition-all duration-300 origin-center hover:-translate-y-1 hover:scale-102 hover:shadow-lg hover:z-10"
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
