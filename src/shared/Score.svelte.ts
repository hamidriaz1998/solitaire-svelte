export default class Score {
    score = $state(0);
    lastMove = $state(0);
    moves = $state(0);

    reset() {
        this.score = 0;
        this.lastMove = 0;
        this.moves = 0;
    }

    addPoints(points: number) {
        this.score += points;
        this.lastMove = points;
    }

    incrementMoves() {
        this.moves += 1;
    }
} 