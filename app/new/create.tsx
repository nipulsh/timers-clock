import { tasks } from "@/constants/tasks";
import usePost from "@/hooks/usePost";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width } = Dimensions.get("window");
const colors = [
  "#FF6B6B",
  "#6BCB77",
  "#4D96FF",
  "#FFD93D",
  "#6A0572",
  "#FF914D",
  "#00A8E8",
  "#ADFF2F",
  "#FF69B4",
  "#A0522D",
];

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    color: colors[0],
    timer: {
      id: "",
      isRunning: false,
      secondsLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      timesStopped: 0,
      initialSeconds: 0,
      initialHours: 0,
      initialMinutes: 0,
    },
    tasks: [] as tasks,
  });

  const saveTimer = usePost().saveTimer;

  const [taskInput, setTaskInput] = useState("");
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [resetIntervals, setResetIntervals] = useState(0);

  const showStartPicker = () => setStartPickerVisibility(true);
  const hideStartPicker = () => setStartPickerVisibility(false);
  const handleStartConfirm = (date: Date) => {
    setForm({ ...form, start: date });
    hideStartPicker();
  };

  function generateRandomNumber() {
    return nanoid(10);
  }

  const showEndPicker = () => setEndPickerVisibility(true);
  const hideEndPicker = () => setEndPickerVisibility(false);
  const handleEndConfirm = (date: Date) => {
    setForm({ ...form, end: date });
    hideEndPicker();
  };

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      Alert.alert("Error", "Please enter a task");
      return;
    }

    const singleTask = {
      id: generateRandomNumber(),
      task: taskInput.trim(),
      completed: false,
    };

    if (form.tasks.some((task) => task.task === singleTask.task)) {
      Alert.alert("Error", "Task already exists");
      return;
    }

    setForm({ ...form, tasks: [...form.tasks, singleTask] });
    setTaskInput("");
  };

  const handleIntervalReset = (numeric: number) => {
    setResetIntervals(numeric);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = form.tasks.filter((_, i) => i !== index);
    setForm({ ...form, tasks: newTasks });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    if (form.start > form.end) {
      Alert.alert("Error", "End time must be after start time");
      return;
    }

    const newSlot = {
      ...form,
      id: generateRandomNumber(),
      timer: { ...form.timer, id: generateRandomNumber() },
      dateCreated: new Date().toISOString(),
      resetIntervals: resetIntervals,
    };

    if (form.timer.hoursLeft < 0 || form.timer.hoursLeft > 23) {
      Alert.alert("Error", "Hours must be between 0 and 23");
      return;
    }

    if (form.timer.minutesLeft < 0 || form.timer.minutesLeft > 59) {
      Alert.alert("Error", "Minutes must be between 0 and 59");
      return;
    }

    if (form.timer.hoursLeft === 0 && form.timer.minutesLeft === 0) {
      Alert.alert("Error", "Please set a timer duration");
      return;
    }

    saveTimer(newSlot);

    Alert.alert("Success", "Time Slot created successfully!", [
      {
        text: "OK",
        onPress: () => {
          console.log("TimeSlot created:", newSlot);
          // Reset form
          setForm({
            title: "",
            description: "",
            start: new Date(),
            end: new Date(),
            color: colors[0],
            timer: {
              id: "",
              isRunning: false,
              secondsLeft: 0,
              hoursLeft: 0,
              minutesLeft: 0,
              timesStopped: 0,
              initialSeconds: 0,
              initialHours: 0,
              initialMinutes: 0,
            },
            tasks: [],
          });
          setTaskInput("");
          setResetIntervals(0);
        },
      },
    ]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView className="bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-16 px-5 pb-5 border-b border-gray-200 shadow-sm">
        <Text className="text-3xl font-bold text-gray-800 text-center">
          Create Time Slot
        </Text>
      </View>

      <View className="p-5">
        {/* Basic Information Card */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Basic Information
          </Text>

          {/* Title */}
          <Text className="mb-2 text-base text-gray-600 font-medium">
            Title *
          </Text>
          <TextInput
            placeholder="Enter a descriptive title"
            className="border border-gray-300 p-3 rounded-lg mb-4 text-base bg-white"
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
          />

          {/* Description */}
          <Text className="mb-2 text-base text-gray-600 font-medium">
            Description
          </Text>
          <TextInput
            placeholder="Add a description (optional)"
            className="border border-gray-300 p-3 rounded-lg mb-4 text-base bg-white h-20"
            multiline
            textAlignVertical="top"
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
          />
        </View>

        {/* Schedule Card */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Schedule
          </Text>

          {/* Start Date */}
          <Text className="mb-2 text-base text-gray-600 font-medium">
            Start Time
          </Text>
          <TouchableOpacity
            className="border border-gray-300 p-4 rounded-lg mb-4 bg-gray-50 flex-row items-center justify-between"
            onPress={showStartPicker}
          >
            <Text className="text-base text-gray-600">
              {formatDate(form.start)}
            </Text>
            <Text className="text-gray-500">📅</Text>
          </TouchableOpacity>

          {/* End Date */}
          <Text className="mb-2 text-base text-gray-600 font-medium">
            End Time
          </Text>
          <TouchableOpacity
            className="border border-gray-300 p-4 rounded-lg mb-4 bg-gray-50 flex-row items-center justify-between"
            onPress={showEndPicker}
          >
            <Text className="text-base text-gray-600">
              {formatDate(form.end)}
            </Text>
            <Text className="text-gray-500">📅</Text>
          </TouchableOpacity>

          {/* intervals */}
          <Text className="mb-2 text-base text-gray-600 font-medium">
            reset intervals
          </Text>
          <TextInput
            placeholder="days you want to reset this timer"
            className="border border-gray-300 p-3 rounded-lg mb-4 text-base bg-white h-20"
            keyboardType="numeric"
            value={resetIntervals?.toString() || ""}
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, "");
              const num = Number(numeric);
              handleIntervalReset(num);
            }}
          />
        </View>

        {/* Customization Card */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Customization
          </Text>

          {/* Color Picker */}
          <Text className="mb-3 text-base text-gray-600 font-medium">
            Theme Color
          </Text>
          <View className="flex-row flex-wrap justify-between mb-5">
            {colors.map((clr) => (
              <TouchableOpacity
                key={clr}
                className={`w-12 h-12 rounded-full m-1 shadow-sm ${
                  form.color === clr ? "border-4 border-gray-800" : "border-0"
                }`}
                style={{
                  backgroundColor: clr,
                  width: (width - 80) / 5 - 8,
                  height: 50,
                }}
                onPress={() => setForm({ ...form, color: clr })}
              />
            ))}
          </View>

          {/* Timer Input */}
          <Text className="mb-3 text-base text-gray-600 font-medium">
            Focus Timer
          </Text>
          <View className="flex-row justify-between">
            <View className="w-5/12">
              <Text className="mb-2 text-sm text-gray-500">Hours</Text>
              <TextInput
                keyboardType="numeric"
                className="border border-gray-300 p-3 rounded-lg text-base text-center bg-white"
                value={form.timer.hoursLeft.toString()}
                onChangeText={(text) => {
                  const hours = parseInt(text) || 0;
                  setForm({
                    ...form,
                    timer: {
                      ...form.timer,
                      hoursLeft: hours,
                      initialHours: hours,
                      secondsLeft: hours * 3600 + form.timer.minutesLeft * 60,
                      initialSeconds:
                        hours * 3600 + form.timer.minutesLeft * 60,
                    },
                  });
                }}
              />
            </View>
            <View className="w-5/12">
              <Text className="mb-2 text-sm text-gray-500">Minutes</Text>
              <TextInput
                keyboardType="numeric"
                className="border border-gray-300 p-3 rounded-lg text-base text-center bg-white"
                value={form.timer.minutesLeft.toString()}
                onChangeText={(text) => {
                  const minutes = parseInt(text) || 0;
                  setForm({
                    ...form,
                    timer: {
                      ...form.timer,
                      minutesLeft: minutes,
                      initialMinutes: minutes,
                      secondsLeft: form.timer.hoursLeft * 3600 + minutes * 60,
                      initialSeconds:
                        form.timer.hoursLeft * 3600 + minutes * 60,
                    },
                  });
                }}
              />
            </View>
          </View>
        </View>

        {/* Tasks Card */}
        <View className="bg-white rounded-xl p-5 mb-5 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Tasks
          </Text>

          {/* Task Input */}
          <View className="flex-row items-center mb-4">
            <TextInput
              placeholder="Add a task..."
              className="flex-1 border border-gray-300 p-3 rounded-lg mr-3 text-base bg-white"
              value={taskInput}
              onChangeText={setTaskInput}
              onSubmitEditing={handleAddTask}
            />
            <TouchableOpacity
              className="px-5 py-3 rounded-lg shadow-sm"
              style={{ backgroundColor: form.color }}
              onPress={handleAddTask}
            >
              <Text className="text-white font-semibold">Add</Text>
            </TouchableOpacity>
          </View>

          {/* Task List */}
          {form.tasks.length > 0 && (
            <View>
              <Text className="text-base font-medium text-gray-600 mb-3">
                Task List ({form.tasks.length})
              </Text>
              {form.tasks.map((task, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
                >
                  <View className="flex-row items-center flex-1">
                    <View
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: form.color }}
                    />
                    <Text className="text-base text-gray-700 flex-1">
                      {task.task}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => handleRemoveTask(index)}
                  >
                    <Text className="text-red-500 font-semibold">✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="p-4 rounded-xl shadow-sm mb-5"
          style={{ backgroundColor: form.color }}
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold text-center">
            Create Time Slot
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Time Pickers */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="datetime"
        onConfirm={handleStartConfirm}
        onCancel={hideStartPicker}
        date={form.start}
      />

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="datetime"
        onConfirm={handleEndConfirm}
        onCancel={hideEndPicker}
        date={form.end}
        minimumDate={form.start}
      />
    </ScrollView>
  );
};

export default Create;
