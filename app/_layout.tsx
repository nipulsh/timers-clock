// app/_layout.tsx
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="timer" options={{ headerShown: false }} />
    </Stack>
  );
}
