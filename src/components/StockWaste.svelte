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

    function handleStockClick() {
        game?.drawFromStockpile();
        gameStore.set(game!);
    }

    function handleDragStart(event: DragEvent) {
        const dragData = {
            source: "waste",
        };
        event.dataTransfer?.setData(
            "application/json",
            JSON.stringify(dragData),
        );
        (event.currentTarget as HTMLElement).classList.add("dragging");
    }

    function handleDragEnd(event: DragEvent) {
        (event.currentTarget as HTMLElement).classList.remove("dragging");
    }
</script>

<div class="stock-waste">
    <button class="stock" on:click={handleStockClick}>
        {#if game && !game.stockpile.isEmpty()}
            <div class="card">
                <Card card={game.stockpile?.peek()} />
            </div>
        {:else}
            <div class="placeholder">Empty Stock</div>
        {/if}
    </button>
    <div class="waste">
        {#if game && !game.wastePile.pile.isEmpty()}
            <div
                class="card"
                draggable="true"
                role="list"
                on:dragstart={(event) => handleDragStart(event)}
                on:dragend={(event) => handleDragEnd(event)}
            >
                <Card card={game.wastePile.getTopCard()} />
            </div>
        {:else}
            <div class="placeholder">Empty Waste</div>
        {/if}
    </div>
</div>

<style>
    .stock-waste {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;
    }
    .stock,
    .waste {
        position: relative;
        width: 109px;
        height: 150px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .stock .card.back {
        background-image: url("/Cards/card_back.png");
    }
    .waste .card {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .card.dragging {
        opacity: 0.5;
        transform: scale(1.1);
    }
    .placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
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
