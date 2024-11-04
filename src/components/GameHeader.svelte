<script lang="ts">
  import { gameStore } from "../stores/gameStore";
  import { timer } from "../stores/timerStore";
  import { scoreStore } from "../stores/scoreStore";
  import { fade } from "svelte/transition";
  import { Game } from "../gameLogic/Game";

  let formattedTime: string;
  let isRunning: boolean;
  let score: number;
  let lastMove: number;

  timer.subscribe((state) => {
    formattedTime = state.formattedTime;
    isRunning = state.isRunning;
  });

  scoreStore.subscribe((state) => {
    score = state.score;
    lastMove = state.lastMove;
  });

  function newGame() {
    timer.reset();
    scoreStore.reset();
    gameStore.set(new Game());
    timer.start();
  }

  function toggleTimer() {
    if (isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
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
      <span class="text-lg font-semibold text-gray-700">Score:</span>
      <span class="text-xl font-mono text-gray-900">{score}</span>
      {#if lastMove !== 0}
        <span
          class="text-sm font-mono ml-2 {lastMove > 0
            ? 'text-green-600'
            : 'text-red-600'}"
          in:fade
        >
          ({lastMove > 0 ? "+" : ""}{lastMove})
        </span>
      {/if}
    </div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-mono text-gray-700">{formattedTime}</span>
      <button
        class="p-2 rounded-full hover:bg-gray-100 transition-colors"
        on:click={toggleTimer}
      >
        {#if !isRunning}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        {:else}
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
  </div>
</header>
