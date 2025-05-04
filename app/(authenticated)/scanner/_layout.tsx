import { Stack } from "expo-router";

export default function ScannerLayout() {
    return (
        <Stack screenOptions={{  }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}