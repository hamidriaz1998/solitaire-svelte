import { writable } from "svelte/store";
import { Game } from "../gameLogic/Game.ts";

export const gameStore = writable(new Game());
