import timeSlot from "@/constants/timeSlot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Timer from "../constants/timer";

const usePost = () => {
  const saveTimer = async (newTimer: timeSlot) => {
    try {
      const existing = await AsyncStorage.getItem("timers");
      const timers: timeSlot[] = existing ? JSON.parse(existing) : [];
      const updatedTimers = [...timers, newTimer];
      await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
    } catch (error) {
      console.error("Error saving timer:", error);
    }
  };

  const saveAllTimers = async (timers: Timer[]) => {
    try {
      await AsyncStorage.setItem("timers", JSON.stringify(timers));
    } catch (error) {
      console.error("Error saving all timers:", error);
    }
  };

  return { saveTimer, saveAllTimers };
};

export default usePost;
