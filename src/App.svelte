<script lang="ts">
  import { gameStore } from "./stores/gameStore";
  import { Game } from "./gameLogic/Game";
  import { onMount } from "svelte";
  import Tableau from "./components/Tableau.svelte";
  import Foundation from "./components/Foundation.svelte";
  import StockWaste from "./components/StockWaste.svelte";

  let game: Game;

  const unsubscribe = gameStore.subscribe((value) => {
    game = value;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
</script>

<main>
  <div class="game-container">
    <div class="top-section">
      <StockWaste />
      <Foundation />
    </div>
    <Tableau />
  </div>
</main>

<style>
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  .top-section {
    display: flex;
    justify-content: center;
    gap: 32px;
  }
</style>
