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

export default class Timer {
    seconds = $state(0);
    isRunning = $state(false);
    formattedTime = $state("00:00");
    isDraggable = $state(true);
    private intervalId: number | null = null;

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.isDraggable = true;

            this.intervalId = setInterval(() => {
                this.seconds += 1;
                this.formattedTime = formatTime(this.seconds);
            }, 1000);
        }
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        this.isDraggable = false;
    }

    reset() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.seconds = 0;
        this.isRunning = false;
        this.formattedTime = formatTime(0);
        this.isDraggable = true;
    }
} 