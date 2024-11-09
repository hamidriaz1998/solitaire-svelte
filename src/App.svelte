<script lang="ts">
  import { gameStore } from "./stores/gameStore";
  import { Game } from "./gameLogic/Game";
  import { onMount } from "svelte";
  import Tableau from "./components/Tableau.svelte";
  import Foundation from "./components/Foundation.svelte";
  import StockWaste from "./components/StockWaste.svelte";
  import GameHeader from "./components/GameHeader.svelte";
  import WinDialog from "./components/WinDialog.svelte";
  import { timer } from "./stores/timerStore";

  let game: Game;
  let showWinDialog = false;

  const unsubscribe = gameStore.subscribe((value) => {
    game = value.currentGame;
    if (game?.isGameWon()) {
      timer.pause();
      showWinDialog = true;
    }
  });

  onMount(() => {
    timer.start();
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
    class="flex flex-col items-center gap-10 max-w-[1400px] mx-auto p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg min-h-[calc(100vh-4rem)] flex-grow custom-scrollbar overflow-y-auto"
  >
    <div
      class="flex justify-center gap-60 w-full p-6 bg-white/5 rounded-2xl mb-5 md:gap-30 md:p-4 sticky top-0 z-10 backdrop-blur-md"
    >
      <StockWaste />
      <Foundation />
    </div>
    <Tableau />
  </div>
  <WinDialog visible={showWinDialog} />
</main>

<style>
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
</style>
