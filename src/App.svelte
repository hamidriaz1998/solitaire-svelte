<script lang="ts">
  import Tableau from "./components/Tableau.svelte";
  import { Tableau as tab } from "./gameLogic/Tableau";
  import { Deck } from "./gameLogic/Deck";
  const deck = new Deck();
  const tableau = new tab(deck);
</script>

<main>
  <Tableau {tableau} />
</main>
