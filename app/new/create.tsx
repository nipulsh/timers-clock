import React, { useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { v4 as uuidv4 } from "uuid";

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
    timer: { hours: 0, minutes: 0 },
  });

  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);

  const showStartPicker = () => {
    setStartPickerVisibility(true);
  };

  const hideStartPicker = () => {
    setStartPickerVisibility(false);
  };

  const handleStartConfirm = (date: Date) => {
    setForm({ ...form, start: date });
    hideStartPicker();
  };

  const showEndPicker = () => {
    setEndPickerVisibility(true);
  };

  const hideEndPicker = () => {
    setEndPickerVisibility(false);
  };

  const handleEndConfirm = (date: Date) => {
    setForm({ ...form, end: date });
    hideEndPicker();
  };

  const handleSubmit = () => {
    const newSlot = {
      ...form,
      id: uuidv4(),
      dateCreated: new Date().toISOString(),
      resetDate: new Date().toISOString(),
      tasks: [],
    };
    console.log("TimeSlot created:", newSlot);
  };

  return (
    <ScrollView className="p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Create Time Slot</Text>

      {/* Title */}
      <Text className="mb-1 text-base">Title</Text>
      <TextInput
        placeholder="Enter title"
        className="border p-2 rounded mb-3"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />

      {/* Description */}
      <Text className="mb-1 text-base">Description</Text>
      <TextInput
        placeholder="Enter description"
        className="border p-2 rounded mb-3"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />

      {/* Start Date */}
      <Text className="mb-1 text-base">Start</Text>
      <TouchableOpacity
        className="border p-2 rounded mb-3"
        onPress={showStartPicker}
      >
        <Text>{form.start.toLocaleString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="datetime"
        onConfirm={handleStartConfirm}
        onCancel={hideStartPicker}
        date={form.start}
        // Additional props for better UX
        title="Pick a start date"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
      />

      {/* End Date */}
      <Text className="mb-1 text-base">End</Text>
      <TouchableOpacity
        className="border p-2 rounded mb-3"
        onPress={showEndPicker}
      >
        <Text>{form.end.toLocaleString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="datetime"
        onConfirm={handleEndConfirm}
        onCancel={hideEndPicker}
        date={form.end}
        // Ensure end date is after start date
        minimumDate={form.start}
        title="Pick an end date"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
      />

      {/* Color Picker */}
      <Text className="mb-2 text-base">Choose Color</Text>
      <View className="flex-row flex-wrap mb-4">
        {colors.map((clr) => (
          <TouchableOpacity
            key={clr}
            className={`w-10 h-10 rounded-full m-1 ${
              form.color === clr ? "border-4 border-black" : ""
            }`}
            style={{ backgroundColor: clr }}
            onPress={() => setForm({ ...form, color: clr })}
          />
        ))}
      </View>

      {/* Timer Input */}
      <Text className="mb-2 text-base">Set Timer</Text>
      <View className="flex-row justify-between mb-4">
        <View className="w-1/2 pr-2">
          <Text className="mb-1">Hours</Text>
          <TextInput
            keyboardType="numeric"
            className="border p-2 rounded"
            value={form.timer.hours.toString()}
            onChangeText={(text) =>
              setForm({
                ...form,
                timer: { ...form.timer, hours: parseInt(text) || 0 },
              })
            }
          />
        </View>
        <View className="w-1/2 pl-2">
          <Text className="mb-1">Minutes</Text>
          <TextInput
            keyboardType="numeric"
            className="border p-2 rounded"
            value={form.timer.minutes.toString()}
            onChangeText={(text) =>
              setForm({
                ...form,
                timer: { ...form.timer, minutes: parseInt(text) || 0 },
              })
            }
          />
        </View>
      </View>

      <Button title="Create Time Slot" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default Create;
