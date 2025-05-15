import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_FAMILY } from '@/constants/font';
// import { useAuth } from '@/context/AuthContext';
import { MovieProvider } from '@/Components/Context/MoiveProvider';
import { UserProvider } from '@/Components/Context/UserProvider';

export default function AuthenticatedLayout() {
  //   const { isAuthenticated } = useAuth();

  return (
    <MovieProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movie" options={{ headerShown: false }} />
          <Stack.Screen name='user' options={{ headerShown: false }} />
          <Stack.Screen
            name="scanner"
            options={{
              headerShown: true, headerTitle: "Quét mã QR",
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: FONT_FAMILY,
                color: "#fff"
              },
              headerTintColor: "#fff",
              headerBackground: () => (
                <LinearGradient
                  colors={["#1e6fa8", "#70c6e5"]}
                  style={{ flex: 1 }}
                />
              )
            }}
          />
        </Stack>
      </UserProvider>
    </MovieProvider>
  );
}