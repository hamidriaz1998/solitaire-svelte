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
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    background-size: cover;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .face-down:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
</style>
