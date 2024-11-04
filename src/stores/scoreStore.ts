import { writable } from "svelte/store";

interface ScoreState {
    score: number;
    lastMove: number;
}

function createScoreStore() {
    const { subscribe, set, update } = writable<ScoreState>({
        score: 0,
        lastMove: 0,
    });

    return {
        subscribe,
        reset: () => set({ score: 0, lastMove: 0 }),
        addPoints: (points: number) =>
            update((state) => ({
                score: state.score + points,
                lastMove: points,
            })),
    };
}

export const scoreStore = createScoreStore();

// Scoring rules
export const SCORE_RULES = {
    WASTE_TO_FOUNDATION: 10,
    WASTE_TO_TABLEAU: 5,
    TABLEAU_TO_FOUNDATION: 10,
    TURN_OVER_TABLEAU_CARD: 5,
    FOUNDATION_TO_TABLEAU: -15,
    RECYCLE_WASTE: -100,
}; 