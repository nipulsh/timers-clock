import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type TimerProps = {
  initialSeconds: number;
  timerName: string;
};

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `00:${mins}:${secs}`;
};

const CountdownTimer = ({ initialSeconds, timerName }: TimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current!);
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  return (
    <View className="bg-neutral-900 rounded-2xl p-5 w-80 self-center items-center">
      <View>
        <Text className="text-2xl font-bold text-gray-300">{timerName}</Text>
      </View>
      <View className="w-48 h-48 rounded-full border-4 border-neutral-700 items-center justify-center mb-5">
        <Text className="text-3xl font-bold text-gray-300">
          {formatTime(seconds)}
        </Text>
      </View>

      <View className="flex-row space-x-5">
        <TouchableOpacity
          onPress={startTimer}
          className="bg-blue-500 p-3 rounded-full"
        >
          <Ionicons name="play" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={resetTimer}
          className="bg-neutral-800 p-3 rounded-full"
        >
          <Ionicons name="refresh" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountdownTimer;
