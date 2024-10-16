<script lang="ts">
  import Card from "./lib/Card.svelte";

  let cards = [
    { value: 1, suit: "hearts", faceUp: false, color: "red" },
    { value: 2, suit: "spades", faceUp: true, color: "black" },
    // Add more cards as needed
  ];
</script>

<main>
  <h1>Solitaire</h1>
  {#each cards as card}
    <Card
      value={card.value}
      suit={card.suit}
      faceUp={card.faceUp}
      color={card.color}
    />
  {/each}
</main>

<style>
  /* Add your styles here */
</style>
