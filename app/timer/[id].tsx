import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { task } from "../../constants/tasks"; // adjust path as needed

type Props = {
  initialSeconds: number;
  onCancel?: () => void;
};

const size = 280;
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const formatTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
    2,
    "0"
  )}`;

const taskList: task[] = [
  { id: "1", task: "Meditation", completed: false },
  { id: "2", task: "Workout", completed: true },
  { id: "3", task: "Study DSA", completed: false },
  { id: "4", task: "Project Work", completed: true },
];

const CountdownTimer = ({ initialSeconds, onCancel }: Props) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const progress = secondsLeft / initialSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  return (
    <View className="flex-1 bg-black justify-center items-center">
      {/* Circular Progress */}
      <View className="mb-10">
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2e2e2e"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f9a825"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        {/* Timer Text */}
        <Text className="absolute top-[110px] left-0 right-0 text-center text-white text-5xl font-semibold">
          {formatTime(secondsLeft)}
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between w-full px-10 mt-10">
        <TouchableOpacity
          onPress={onCancel}
          className="w-28 h-28 rounded-full border-2 border-white justify-center items-center"
        >
          <Text className="text-white text-lg">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsRunning((prev) => !prev)}
          className={clsx(
            "w-28 h-28 rounded-full justify-center items-center",
            isRunning ? "bg-red-700" : "bg-green-700"
          )}
        >
          <Text className="text-white text-lg">
            {isRunning ? "Pause" : "Resume"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Task List */}
      <View className="mt-10 w-full px-10">
        <Text className="text-white text-xl mb-4 font-semibold">
          Today Tasks
        </Text>
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-gray-800 rounded-xl px-4 py-3 mb-3">
              <Text className="text-white text-base">{item.task}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CountdownTimer;
