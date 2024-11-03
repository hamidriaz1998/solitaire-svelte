<script lang="ts">
    import { onDestroy } from "svelte";
    import { gameStore } from "../stores/gameStore";
    import Card from "./Card.svelte";
    import type { Game } from "../gameLogic/Game.ts";
    import { flip } from "svelte/animate";

    let game: Game | null = null;

    const unsubscribe = gameStore.subscribe((value) => {
        game = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    let draggedCardIndex: {
        pileIndex: number;
        cardIndex: number;
        source: string;
    } | null = null;

    function handleDragStart(
        event: DragEvent,
        pileIndex: number,
        cardIndex: number,
    ) {
        draggedCardIndex = { pileIndex, cardIndex, source: "tableau" };
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
        (event.currentTarget as HTMLElement).classList.remove("drag-over");

        const json = event.dataTransfer?.getData("application/json");
        if (!json) {
            console.error("No data found in drop event");
            return;
        }
        const data = JSON.parse(json);
        if (!data?.source) {
            console.error("Invalid data found in drop event", data);
            return;
        }
        if (data.source === "foundation") {
            const { pileIndex: foundationPileIndex } = data;
            try {
                game?.moveCardFromFoundationToTableau(
                    foundationPileIndex,
                    targetPileIndex,
                );
                gameStore.set(game!);
                draggedCardIndex = null;
            } catch (error) {
                console.error("Invalid move", error);
            }
        } else if (data.source === "tableau") {
            const { pileIndex: fromPileIndex, cardIndex: fromCardIndex } = data;
            try {
                game?.moveCardBetweenTableauPiles(
                    fromPileIndex,
                    targetPileIndex,
                    fromCardIndex,
                );
                gameStore.set(game!);
                draggedCardIndex = null;
            } catch (error) {
                console.error("Invalid move", error);
            }
        } else if (data.source === "waste") {
            try {
                game?.moveCardFromWasteToTableau(targetPileIndex);
                gameStore.set(game!);
                draggedCardIndex = null;
            } catch (error) {
                console.error("Invalid move", error);
            }
        }
    }
</script>

<div class="tableau">
    {#if game}
        {#each game.tableau.piles as pile, i}
            <div
                class="pile"
                role="list"
                on:dragover={handleDragOver}
                on:dragleave={handleDragLeave}
                on:drop={(event) => handleDrop(event, i)}
            >
                {#if pile.isEmpty()}
                    <div class="placeholder"></div>
                {:else}
                    <div class="cards-container">
                        {#each pile.toArray() as card, j (card.id())}
                            <div
                                role="listitem"
                                class="card"
                                style="top: {j * 40}px;"
                                draggable="true"
                                animate:flip={{ delay: 1000 }}
                                on:dragstart={(event) =>
                                    handleDragStart(event, i, j)}
                                on:dragend={handleDragEnd}
                            >
                                <Card {card} />
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    {/if}
</div>

<style>
    .tableau {
        display: flex;
        justify-content: center;
        gap: 32px;
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
        top: calc(var(--card-index) * 30px);
    }
    .card.dragging {
        opacity: 0.5;
        transform: scale(1.1);
    }
    .pile.drag-over {
        border: 2px dashed #000;
        background-color: #e0e0e0;
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
    .cards-container {
        position: relative;
    }
</style>
