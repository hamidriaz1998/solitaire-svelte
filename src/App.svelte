<script lang="ts">
  import { gameStore } from "./stores/gameStore";
  import { Game } from "./gameLogic/Game";
  import { onMount } from "svelte";
  import Tableau from "./components/Tableau.svelte";
  import Foundation from "./components/Foundation.svelte";

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
      <!-- Add other components like Stockpile or WastePile if you have them -->
      <Foundation {game} />
    </div>
    <Tableau {game} />
  </div>
</main>

<style>
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px; /* Space between Foundation and Tableau */
  }
  .top-section {
    display: flex;
    justify-content: center;
    gap: 32px;
  }
</style>
