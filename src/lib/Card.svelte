<script lang="ts">
  export let value: number;
  export let suit: string;
  export let faceUp: boolean = false;
  export let color: string;

  function toggleFaceUp() {
    faceUp = !faceUp;
  }
  function incrementCard() {
    value = (value % 13) + 1;
  }
</script>

<div
  class="card {faceUp ? 'face-up' : 'face-down'}"
  style="--color: {color}; background-image: {faceUp
    ? `url('/Cards/${suit}/${value}.png')`
    : `url('/Cards/card_back.png')`}"
></div>
<button on:click={toggleFaceUp}>toggle</button>
<button on:click={incrementCard}>incrementCard</button>

<style>
  .card {
    width: 100px;
    height: 150px;
    border: 1px solid #000;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--color);
    background-color: white;
    background-size: cover;
  }
  .card.face-down {
    /* Additional styles for face-down cards if needed */
  }
  .card.face-up {
    /* Additional styles for face-up cards if needed */
  }
</style>
