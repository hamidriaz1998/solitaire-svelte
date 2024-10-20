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
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
    }

    function handleDrop(event: DragEvent, targetPileIndex: number) {
        event.preventDefault();
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
            on:drop={(event) => handleDrop(event, i)}
        >
            {#each pile.toArray() as card, j}
                <div
                    class="card"
                    style="top: {j * 30}px;"
                    draggable="true"
                    on:dragstart={(event) => handleDragStart(event, i, j)}
                >
                    <Card {card} />
                </div>
            {/each}
        </div>
    {/each}
</div>

<!-- <button on:click={moveCard}>Click this</button> -->

<style>
    .pile {
        margin: 60px;
    }
    .card {
        position: absolute;
    }
</style>
