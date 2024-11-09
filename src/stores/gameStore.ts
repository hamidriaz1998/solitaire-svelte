import { writable } from "svelte/store";
import { Game } from "../gameLogic/Game.ts";

interface GameHistory {
    undoStack: Game[];
    redoStack: Game[];
    currentGame: Game;
}

function createGameStore() {
    const initialGame = new Game();
    const { subscribe, set } = writable<GameHistory>({
        undoStack: [],
        redoStack: [],
        currentGame: initialGame,
    });

    let currentState: GameHistory = {
        undoStack: [],
        redoStack: [],
        currentGame: initialGame,
    };

    return {
        subscribe,
        set: (newGame: Game) => {
            currentState = {
                undoStack: [...currentState.undoStack, currentState.currentGame.clone()],
                redoStack: [],
                currentGame: newGame.clone(),
            };
            set(currentState);
        },
        undo: () => {
            if (currentState.undoStack.length === 0) {
                set(currentState);
                return;
            }

            const previousGame = currentState.undoStack[currentState.undoStack.length - 1];
            currentState = {
                undoStack: currentState.undoStack.slice(0, -1),
                redoStack: [...currentState.redoStack, currentState.currentGame.clone()],
                currentGame: previousGame.clone(),
            };
            set(currentState);
        },
        redo: () => {
            if (currentState.redoStack.length === 0) {
                set(currentState);
                return;
            }

            const nextGame = currentState.redoStack[currentState.redoStack.length - 1];
            currentState = {
                undoStack: [...currentState.undoStack, currentState.currentGame.clone()],
                redoStack: currentState.redoStack.slice(0, -1),
                currentGame: nextGame.clone(),
            };
            set(currentState);
        },
        reset: () => {
            currentState = {
                undoStack: [],
                redoStack: [],
                currentGame: new Game(),
            };
            set(currentState);
        }
    };
}

export const gameStore = createGameStore();
