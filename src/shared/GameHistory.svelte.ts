import Stack from "../DataStructures/Stack.ts";
import { Game } from "../gameLogic/Game.ts";
export default class GameHistory {
    undoStack = $state(new Stack<Game>());
    redoStack = $state(new Stack<Game>());
    currentGame = $state<Game | null>(null);

    constructor(initialGame: Game | null) {
        this.currentGame = initialGame;
    }
    newGame() {
        this.reset();
        this.currentGame = new Game();
    }

    get canUndo() {
        return this.undoStack.size() > 0;
    }

    get canRedo() {
        return this.redoStack.size() > 0;
    }

    undo() {
        if (!this.canUndo) {
            throw new Error("No undo available");
        }
        this.redoStack.push(this.currentGame!);
        this.currentGame = this.undoStack.pop()!.clone();
    }

    redo() {
        if (!this.canRedo) {
            throw new Error("No redo available");
        }
        this.undoStack.push(this.currentGame!);
        this.currentGame = this.redoStack.pop()!.clone();
    }

    push(game: Game) {
        this.undoStack.push(game.clone());
        this.redoStack.clear();
        this.currentGame = game.clone();
    }

    reset() {
        this.undoStack.clear();
        this.redoStack.clear();
        this.currentGame = null;
    }
}
