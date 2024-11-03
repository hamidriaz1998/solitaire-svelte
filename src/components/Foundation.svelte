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

    let draggedCardIndex: {
        pileIndex: number;
        foundationToTableau: boolean;
    } | null = null;

    function handleDragStart(event: DragEvent, pileIndex: number) {
        draggedCardIndex = { pileIndex, foundationToTableau: true };
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
                game?.moveCardFromTableauToFoundation(
                    fromPileIndex,
                    fromCardIndex,
                    targetPileIndex,
                );
                gameStore.set(game!);
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
                    <div class="placeholder">
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
        transition: transform 0.2s ease;
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
</style>
