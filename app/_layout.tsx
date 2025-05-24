import { Stack } from 'expo-router';
import { AuthProvider } from '@/Components/Context/AuthProvider';
import { UserProvider } from '@/Components/Context/UserProvider';

export default function AppLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />
          <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </AuthProvider>
  );
}