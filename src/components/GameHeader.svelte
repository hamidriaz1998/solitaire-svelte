<script lang="ts">
  import { gameStore } from "../stores/gameStore";
  import { fade } from "svelte/transition";
  import { Game } from "../gameLogic/Game";

  function newGame() {
    gameStore.set(new Game());
  }
</script>

<header
  class="w-full px-8 py-3 flex justify-between items-center bg-white/95 backdrop-blur-md shadow-lg mb-4 rounded-xl"
  in:fade={{ duration: 300 }}
>
  <h1
    class="text-3xl font-bold bg-gradient-to-br from-gray-800 to-blue-500 bg-clip-text text-transparent drop-shadow-sm"
  >
    Solitaire
  </h1>
  <div class="flex gap-4">
    <button
      class="px-5 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm bg-gradient-to-br from-green-400 to-green-600 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/30"
      on:click={newGame}
    >
      New Game
    </button>
    <button
      class="px-5 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm bg-gray-100 text-gray-500 border-2 border-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled
    >
      Undo
    </button>
  </div>
</header>
