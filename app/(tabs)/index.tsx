import Timer from "@/components/timer"; // 👈 Adjust this import to your actual path
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [timers, setTimers] = useState<number[]>([]); // Store IDs or time values

  // Load timers from storage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("timers");
      if (saved) setTimers(JSON.parse(saved));
    })();
  }, []);

  // Save timers to storage
  const saveTimers = async (list: number[]) => {
    await AsyncStorage.setItem("timers", JSON.stringify(list));
  };

  // Add a new timer (you can customize what info you want)
  const addTimer = () => {
    const timestamp = Date.now(); // Use timestamp as a unique ID
    const updated = [...timers, timestamp];
    setTimers(updated);
    saveTimers(updated);
  };

  return (
    <View className="flex-1 p-4 pt-16 bg-white">
      {/* Top bar with heading + plus button */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">Your Timers</Text>
        <TouchableOpacity onPress={addTimer}>
          <Ionicons name="add-circle" size={36} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* List of Timers */}
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
