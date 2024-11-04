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

  let startTime: number;
  let intervalId: number | null = null;

  const start = () => {
    startTime = Date.now() - (get(store).seconds * 1000);
    store.update((state) => ({ ...state, isRunning: true, isDraggable: true }));

    intervalId = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      store.update((state) => ({
        ...state,
        seconds: elapsedSeconds,
        formattedTime: formatTime(elapsedSeconds),
      }));
    }, 1000);
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
