import Stack from "../DataStructures/Stack.ts";
import { Game } from "./Game.ts";

export default class GameHistory {
    undoStack: Stack<Game>;
    redoStack: Stack<Game>;
    currentGame: Game;
    static readonly MAX_HISTORY_SIZE = 50;

    constructor(game: Game) {
        this.undoStack = new Stack<Game>();
        this.redoStack = new Stack<Game>();
        this.currentGame = game.clone();
    }
    addGame(game: Game) {
        const clone = game.clone();
        this.undoStack.push(clone);
        this.redoStack.clear();
        this.currentGame = clone;
    }
    undo() {
        if (this.canUndo) {
            this.redoStack.push(this.currentGame);
            this.currentGame = this.undoStack.pop()!;
        }
        else {
            throw new Error("No more moves to undo");
        }
    }
    redo() {
        if (this.canRedo) {
            this.undoStack.push(this.currentGame);
            this.currentGame = this.redoStack.pop()!;
        }
        else {
            throw new Error("No more moves to redo");
        }
    }
    reset(initialGame: Game): GameHistory {
        const newHistory = new GameHistory(initialGame);
        return newHistory;
    }

    get canUndo(): boolean {
        return !this.undoStack.isEmpty();
    }
    get canRedo(): boolean {
        return !this.redoStack.isEmpty();
    }
}
