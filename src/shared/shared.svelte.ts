import GameHistory from "./GameHistory.svelte.ts";
import Score from "./Score.svelte.ts";
import Timer from "./Timer.svelte.ts";

export const gameHistory = $state(new GameHistory(null));
export const score = $state(new Score());
export const timer = $state(new Timer());
