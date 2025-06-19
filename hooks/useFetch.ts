import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Timer from "../constants/timer";

const useFetch = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("timers");
        if (jsonValue) {
          const parsed: Timer[] = JSON.parse(jsonValue);
          setTimers(parsed);
        } else {
          setTimers([]);
        }
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
