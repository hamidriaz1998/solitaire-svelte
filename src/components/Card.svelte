<script lang="ts">
  import { Card } from "../gameLogic/Card";
  export let card: Card | undefined;
</script>

<div
  class="card {card?.faceUp ? 'face-up' : 'face-down'}"
  style="background-image: {card?.faceUp
    ? `url('/Cards/${card?.suit}/${card?.rank}.png')`
    : `url('/Cards/card_back.png')`}"
></div>

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
</style>
