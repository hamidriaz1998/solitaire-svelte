<script lang="ts">
    import Card from "./Card.svelte";
    import { Foundation } from "../gameLogic/Foundation";
    import { Tableau } from "../gameLogic/Tableau";
    export let foundation: Foundation;
    export let tableau: Tableau;

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
        const data = event.dataTransfer?.getData("text/plain");
        if (data) {
            const { pileIndex: fromPileIndex, cardIndex: fromCardIndex } =
                JSON.parse(data);
            try {
                const fromPile = tableau.piles[fromPileIndex];
                const movingCards = fromPile.cutFromIndex(fromCardIndex);
                const movingCard = movingCards.getHead();

                if (
                    movingCard &&
                    foundation.canPlaceOn(movingCard, targetPileIndex)
                ) {
                    foundation.addCardToPile(movingCard, targetPileIndex);
                    fromPile.getTail()?.flip();
                } else {
                    // Move the card(s) back to the tableau pile
                    fromPile.concat(movingCards);
                    throw new Error("Invalid move");
                }
            } catch (error) {
                console.error("Invalid move", error);
            }
        }
    }
</script>

<div class="foundation">
    {#each foundation.piles as pile, i}
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
                    {#if pile.peek()}
                        <Card card={pile.peek()} />
                    {/if}
                </div>
            {/if}
        </div>
    {/each}
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
</style>
