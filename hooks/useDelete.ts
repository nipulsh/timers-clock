import Timer from "@/constants/timer"; // ✅ use the type, not the default export
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDelete = () => {
  const deleteTimer = async (id: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem("timers");

      // ✅ Add type to parsed data
      let timers: Timer[] = jsonValue != null ? JSON.parse(jsonValue) : [];

      // ✅ Type each timer object correctly
      const updatedTimers = timers.filter((timer: Timer) => timer.id !== id);

      await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
    } catch (error) {
      console.error("Error deleting timer:", error);
    }
  };

  return deleteTimer;
};

export default useDelete;
