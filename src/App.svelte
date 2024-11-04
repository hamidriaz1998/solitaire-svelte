<script lang="ts">
  import { gameStore } from "./stores/gameStore";
  import { Game } from "./gameLogic/Game";
  import { onMount } from "svelte";
  import Tableau from "./components/Tableau.svelte";
  import Foundation from "./components/Foundation.svelte";
  import StockWaste from "./components/StockWaste.svelte";
  import GameHeader from "./components/GameHeader.svelte";
  import WinDialog from "./components/WinDialog.svelte";

  let game: Game;
  let showWinDialog = false;

  const unsubscribe = gameStore.subscribe((value) => {
    game = value;
    if (game?.isGameWon()) {
      showWinDialog = true;
    }
  });

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
</script>

<main
  class="min-h-screen p-8 bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url('/Backgrounds/background_2.png')] bg-cover flex flex-col"
>
  <GameHeader />
  <div
    class="flex flex-col items-center gap-10 max-w-[1400px] mx-auto p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg min-h-[calc(100vh-4rem)] flex-grow overflow-y-auto"
  >
    <div
      class="flex justify-center gap-60 w-full p-6 bg-white/5 rounded-2xl mb-5 md:gap-30 md:p-4"
    >
      <StockWaste />
      <Foundation />
    </div>
    <Tableau />
  </div>
  <WinDialog visible={showWinDialog} />
</main>
