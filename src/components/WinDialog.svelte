<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { gameStore } from "../stores/gameStore";
  import { timer } from "../stores/timerStore";
  import { Game } from "../gameLogic/Game";
  import { scoreStore } from "../stores/scoreStore";
  export let visible = false;

  let finalTime: string;
  let finalScore: number;

  timer.subscribe((state) => {
    finalTime = state.formattedTime;
  });

  scoreStore.subscribe((state) => {
    finalScore = state.score;
  });

  function newGame() {
    timer.reset();
    scoreStore.reset();
    gameStore.set(new Game());
    timer.start();
    visible = false;
  }
</script>

{#if visible}
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
    transition:fade={{ duration: 300 }}
  >
    <div
      class="bg-white p-12 rounded-2xl text-center shadow-2xl animate-bounce-in"
      transition:scale={{ duration: 300, start: 0.8 }}
    >
      <h2 class="text-4xl mb-4 text-gray-800 drop-shadow-sm">
        🎉 Congratulations!
      </h2>
      <p class="text-xl text-gray-600 mb-2">You've won the game!</p>
      <div class="space-y-2 mb-8">
        <p class="text-lg text-gray-500">Final Time: {finalTime}</p>
        <p class="text-lg text-gray-500">Final Score: {finalScore}</p>
      </div>
      <button
        class="bg-gradient-to-br from-green-400 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/30"
        on:click={newGame}
      >
        Play Again
      </button>
    </div>
  </div>
{/if}

<style>
  @keyframes bounce-in {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .animate-bounce-in {
    animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
</style>
