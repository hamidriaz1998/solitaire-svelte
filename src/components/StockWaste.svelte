<script lang="ts">
    import { gameStore } from "../stores/gameStore";
    import type { Game } from "../gameLogic/Game.ts";
    import Card from "./Card.svelte";

    let game: Game;

    const unsubscribe = gameStore.subscribe((value) => {
        game = value;
    });

    function handleStockClick() {
        game.drawFromStockpile();
        gameStore.set(game);
    }

    $: stockEmpty = game.stockpile.cards.isEmpty();
</script>

<div class="stock-waste-container">
    <button
        class="stockpile {stockEmpty ? 'empty' : ''}"
        on:click={handleStockClick}
        aria-label="Stockpile"
    >
        {#if stockEmpty}
            <span>Stockpile Empty</span>
        {:else}
            <div class="card">
                <Card card={game.stockpile.peek()} />
            </div>
        {/if}
    </button>
    <div class="wastepile"></div>
</div>

<style>
    .stock-waste-container {
        display: flex;
        gap: 16px;
    }
    .stockpile {
        width: 109px;
        height: 150px;
        border: 2px solid #000;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #f0f0f0;
    }
    .stockpile.empty {
        background-color: #ddd;
    }
    .wastepile {
        width: 109px;
        height: 150px;
        border: 2px solid #000;
        border-radius: 8px;
        background-color: #fff;
        position: relative;
    }
</style>
