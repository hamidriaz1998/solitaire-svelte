import { get, writable } from "svelte/store";

interface TimerStore {
    seconds: number;
    isRunning: boolean;
    formattedTime: string;
    isDraggable: boolean;
}

function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];

    if (hours > 0) {
        parts.push(hours.toString().padStart(2, "0"));
    }
    parts.push(minutes.toString().padStart(2, "0"));
    parts.push(seconds.toString().padStart(2, "0"));

    return parts.join(":");
}

function createTimerStore() {
    const store = writable<TimerStore>({
        seconds: 0,
        isRunning: false,
        formattedTime: "00:00",
        isDraggable: true,
    });

    let intervalId: number | null = null;

    const start = () => {
        const currentState = get(store);

        if (!currentState.isRunning) {
            store.update((state) => ({
                ...state,
                isRunning: true,
                isDraggable: true
            }));

            intervalId = setInterval(() => {
                store.update((state) => ({
                    ...state,
                    seconds: state.seconds + 1,
                    formattedTime: formatTime(state.seconds + 1),
                }));
            }, 1000);
        }
    };

    const pause = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        store.update((state) => ({
            ...state,
            isRunning: false,
            isDraggable: false,
        }));
    };

    const reset = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        store.set({
            seconds: 0,
            isRunning: false,
            formattedTime: formatTime(0),
            isDraggable: true,
        });
    };

    return {
        subscribe: store.subscribe,
        start,
        pause,
        reset,
    };
}

export const timer = createTimerStore();
