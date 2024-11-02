<script lang="ts">
    import Card from "./Card.svelte";
    import { Tableau } from "../gameLogic/Tableau";
    export let tableau: Tableau;

    let draggedCardIndex: { pileIndex: number; cardIndex: number } | null =
        null;

    function handleDragStart(
        event: DragEvent,
        pileIndex: number,
        cardIndex: number,
    ) {
        draggedCardIndex = { pileIndex, cardIndex };
        event.dataTransfer?.setData(
            "text/plain",
            JSON.stringify(draggedCardIndex),
        );
        (event.currentTarget as HTMLElement)?.classList.add("dragging");
    }

    function handleDragEnd(event: DragEvent) {
        (event.currentTarget as HTMLElement)?.classList.remove("dragging");
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        (event.currentTarget as HTMLElement)?.classList.add("drag-over");
    }

    function handleDragLeave(event: DragEvent) {
        (event.currentTarget as HTMLElement)?.classList.remove("drag-over");
    }

    function handleDrop(event: DragEvent, targetPileIndex: number) {
        event.preventDefault();
        (event.currentTarget as HTMLElement)?.classList.remove("drag-over");
        if (draggedCardIndex) {
            const { pileIndex: fromPileIndex, cardIndex: fromCardIndex } =
                draggedCardIndex;
            try {
                tableau.moveCardBetweenPiles(
                    fromPileIndex,
                    targetPileIndex,
                    fromCardIndex,
                );
                tableau = tableau;
                draggedCardIndex = null;
            } catch (error) {
                console.error("Invalid move", error);
            }
        }
    }
</script>

<div class="tableau">
    {#each tableau.piles as pile, i}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="pile"
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            on:drop={(event) => handleDrop(event, i)}
        >
            {#if pile.isEmpty()}
                <div class="placeholder" on:dragend={handleDragEnd}></div>
            {:else}
                {#each pile.toArray() as card, j}
                    <div
                        class="card"
                        style="--card-index: {j};"
                        draggable="true"
                        on:dragstart={(event) => handleDragStart(event, i, j)}
                        on:dragend={handleDragEnd}
                    >
                        <Card {card} />
                    </div>
                {/each}
            {/if}
        </div>
    {/each}
</div>

<style>
    .tableau {
        display: flex;
        justify-content: center;
        gap: 16px; /* Adjust gap between piles */
    }
    .pile {
        position: relative;
        width: 109px;
        /* Remove fixed height to allow pile to grow with number of cards */
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
    }
    .placeholder {
        width: 109px;
        height: 150px;
        border: 2px dashed #ffd700;
        background: linear-gradient(135deg, #e0eafc, #cfdef3);
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .placeholder::after {
        content: "Drop Here";
        font-size: 16px;
        color: #555;
        font-weight: bold;
    }
</style>
