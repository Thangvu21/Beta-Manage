import { Stack } from 'expo-router';
import { AuthProvider } from '@/Components/Context/AuthProvider';

export default function AppLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}