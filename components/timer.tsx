import useDelete from "@/hooks/useDelete";
import useFetch from "@/hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type TimerProps = {
  id: string;
};

const formatTime = (seconds: number) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `00:${mins}:${secs}`;
};

const CountdownTimer = ({ id }: TimerProps) => {
  const { timers, loading } = useFetch();
  const deleteTimer = useDelete();

  // Find the timer by id
  const timer = timers.find((t) => t.id === id);

  if (loading) return <Text>Loading...</Text>;
  if (!timer) return null;

  const { timerName, initialSeconds } = timer;

  const handleTimerDelete = async (id: string) => {
    try {
      await deleteTimer(id);
    } catch (error) {
      console.error("Error deleting timer:", error);
    }
  };

  return (
    <Link href={`/timer/${id}`}>
      <View className="bg-neutral-900 rounded-2xl p-5 w-80 self-center items-center">
        <View>
          <Text className="text-2xl font-bold text-gray-300">{timerName}</Text>
        </View>
        <View className="w-48 h-48 rounded-full border-4 border-neutral-700 items-center justify-center mb-5">
          <Text className="text-3xl font-bold text-gray-300">
            {formatTime(initialSeconds)}
          </Text>
        </View>

        <View className="flex-row">
          <TouchableOpacity
            onPress={() => handleTimerDelete(id)}
            className="bg-red-600 p-3 rounded-full"
          >
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Link>
  );
};

export default CountdownTimer;
