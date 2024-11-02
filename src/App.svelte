<script lang="ts">
  import Tableau from "./components/Tableau.svelte";
  import { Tableau as tab } from "./gameLogic/Tableau";
  import { Deck } from "./gameLogic/Deck";
  import Foundation from "./components/Foundation.svelte";
  import { Foundation as fnd } from "./gameLogic/Foundation";
  const deck = new Deck();
  const tableau = new tab(deck);
  const foundation = new fnd();
</script>

<main>
  <div class="game-container">
    <Foundation {foundation} {tableau} />
    <Tableau {tableau} />
  </div>
</main>

<style>
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px; /* Space between Foundation and Tableau */
  }
</style>
