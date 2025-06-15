interface timer {
  timerName: string;
  initialSeconds: number;
  id: number;
  isRunning: boolean;
  secondsLeft: number;
}

export default timer;
