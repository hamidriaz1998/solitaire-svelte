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
                tableau.moveCardBetweenPiles(fromPileIndex, targetPileIndex);
                tableau = tableau;
                draggedCardIndex = null;
            } catch (error) {
                console.error("Invalid move", error);
            }
        }
    }
</script>

<div class="tableau flex justify-center content-center">
    {#each tableau.piles as pile, i}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="pile"
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            on:drop={(event) => handleDrop(event, i)}
        >
            {#each pile.toArray() as card, j}
                <div
                    class="card"
                    style="top: {j * 30}px;"
                    draggable="true"
                    on:dragstart={(event) => handleDragStart(event, i, j)}
                    on:dragend={handleDragEnd}
                >
                    <Card {card} />
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .pile {
        margin: 60px;
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
    .pile.drag-over {
        border: 2px dashed #000;
    }
</style>
