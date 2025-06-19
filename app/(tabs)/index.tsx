import Timer from "@/components/timer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [timers, setTimers] = useState<number[]>([]);
  const router = useRouter(); // 👈

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("timers");
      if (saved) setTimers(JSON.parse(saved));
    })();
  }, []);

  const saveTimers = async (list: number[]) => {
    await AsyncStorage.setItem("timers", JSON.stringify(list));
  };

  const navigateTimerPage = () => {
    router.push("/new/create"); // 👈 adjust route path if needed
  };

  return (
    <View className="flex-1 p-4 pt-16 bg-white">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">Your Timers</Text>
        <TouchableOpacity onPress={navigateTimerPage}>
          <Ionicons name="add-circle" size={36} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={timers}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View className="mb-3">
            <Timer id={item} />
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-400 mt-4">No timers added yet.</Text>
        }
      />
    </View>
  );
}
