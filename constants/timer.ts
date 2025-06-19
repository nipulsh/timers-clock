type timer = {
  timerName: string;
  initialSeconds: number;
  id: string;
  isRunning: boolean;
  secondsLeft: number;
  timesStopped: number;
};

export default timer;
