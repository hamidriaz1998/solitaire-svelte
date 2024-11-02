<script lang="ts">
    import { onDestroy } from "svelte";
    import { gameStore } from "../stores/gameStore";
    import Card from "./Card.svelte";
    import type { Game } from "../gameLogic/Game.ts";

    let game: Game | null = null;

    const unsubscribe = gameStore.subscribe((value) => {
        game = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    let draggedCardIndex: { pileIndex: number; cardIndex: number } | null =
        null;

    function handleDragStart(
        event: DragEvent,
        pileIndex: number,
        cardIndex: number,
    ) {
        draggedCardIndex = { pileIndex, cardIndex };
        event.dataTransfer?.setData(
            "application/json",
            JSON.stringify(draggedCardIndex),
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

        const data = event.dataTransfer?.getData("application/json");
        if (data) {
            const { pileIndex: fromPileIndex, cardIndex: fromCardIndex } =
                JSON.parse(data);
            try {
                game?.moveCardToFoundation(
                    fromPileIndex,
                    fromCardIndex,
                    targetPileIndex,
                );
                gameStore.set(game);
                draggedCardIndex = null;
            } catch (error) {
                console.error("Invalid move to foundation", error);
            }
        } else {
            console.log("No drag data found.");
        }
    }
</script>

<div class="foundation">
    {#if game}
        {#each game.foundation.piles as pile, i}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="pile"
                on:dragover={handleDragOver}
                on:dragleave={handleDragLeave}
                on:drop={(event) => handleDrop(event, i)}
            >
                {#if pile.isEmpty()}
                    <div class="placeholder"></div>
                {:else}
                    <div class="card">
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
        gap: 16px; /* Adjust gap between foundation piles */
    }
    .pile {
        position: relative;
        width: 109px;
        height: 150px;
        border: 1px solid transparent;
    }
    .pile.drag-over {
        border: 2px dashed #000;
    }
    .card {
        width: 109px;
        height: 150px;
    }
    .placeholder {
        width: 109px;
        height: 150px;
        border: 2px dashed #ffd700;
        background: linear-gradient(135deg, #e0eafc, #cfdef3);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pile {
        position: relative;
        width: 109px;
        min-height: 150px;
    }
    .card {
        position: absolute;
        width: 109px;
        height: 150px;
        transition: transform 0.2s ease;
    }
    .card.dragging {
        opacity: 0.5;
        transform: scale(1.1);
    }
    .placeholder {
        width: 109px;
        height: 150px;
        border: 1px dashed #ccc;
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>
