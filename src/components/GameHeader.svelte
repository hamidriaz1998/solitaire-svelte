<script lang="ts">
  import { onDestroy } from "svelte";
  import { gameHistory as game, score, timer } from "../shared/shared.svelte";
  import { fade } from "svelte/transition";

  function newGame() {
    timer.reset();
    score.reset();
    game.newGame();
    timer.start();
  }

  function toggleTimer() {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
  }

  function handleUndo() {
    game.undo();
    score.incrementMoves();
  }

  function handleRedo() {
    game.redo();
    score.incrementMoves();
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
  <div class="flex items-center gap-8">
    <div class="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
      <span class="text-lg font-semibold text-gray-700">Moves:</span>
      <span class="text-xl font-mono text-gray-900 mr-4">{score.moves}</span>
      <span class="text-lg font-semibold text-gray-700">Score:</span>
      <span class="text-xl font-mono text-gray-900">{score.score}</span>
      {#if score.lastMove !== 0}
        <span
          class="text-sm font-mono ml-2 {score.lastMove > 0
            ? 'text-green-600'
            : 'text-red-600'}"
          in:fade
        >
          ({score.lastMove > 0 ? "+" : ""}{score.lastMove})
        </span>
      {/if}
    </div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-mono text-gray-700">{timer.formattedTime}</span
      >
      <button
        class="p-2 rounded-full hover:bg-gray-100 transition-colors"
        onclick={toggleTimer}
      >
        {#if !timer.isRunning}
          <!-- Play Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        {:else}
          <!-- Pause Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        {/if}
      </button>
    </div>
    <div class="flex gap-4">
      <button
        class="px-5 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm bg-gradient-to-br from-green-400 to-green-600 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/30"
        onclick={newGame}
      >
        New Game
      </button>
      <button
        class="px-5 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm bg-gray-100 text-gray-500 border-2 border-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onclick={handleUndo}
        disabled={!game.canUndo || !timer.isRunning}
      >
        Undo
      </button>
      <button
        class="px-5 py-2 rounded-lg font-semibold uppercase tracking-wider text-sm bg-gray-100 text-gray-500 border-2 border-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onclick={handleRedo}
        disabled={!game.canRedo || !timer.isRunning}
      >
        Redo
      </button>
    </div>
  </div>
</header>

<style>
</style>
