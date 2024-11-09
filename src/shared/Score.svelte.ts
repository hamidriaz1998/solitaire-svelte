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

export const SCORE_RULES = {
    WASTE_TO_FOUNDATION: 10,
    WASTE_TO_TABLEAU: 5,
    TABLEAU_TO_FOUNDATION: 10,
    TURN_OVER_TABLEAU_CARD: 5,
    FOUNDATION_TO_TABLEAU: -15,
    RECYCLE_WASTE: -100,
};