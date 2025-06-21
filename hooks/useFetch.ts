import timeSlot from "@/constants/timeSlot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [timers, setTimers] = useState<timeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("timers");
        if (jsonValue) {
          const parsed: timeSlot[] = JSON.parse(jsonValue);
          setTimers(parsed);
        } else {
          setTimers([]);
        }
        console.log("Fetched timers:", timers);
      } catch (error) {
        console.error("Error fetching timers:", error);
        setTimers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimers();
  }, []);

  return { timers, loading };
};

export default useFetch;
