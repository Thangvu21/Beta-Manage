import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Đăng nhập",
        headerBackground: () => (
          <LinearGradient
            colors={["#1e6fa8", "#70c6e5"]}
            style={{ flex: 1 }}
          />
        ),
        headerTintColor: '#fff', // tiêu đề header

      }} />
    </Stack>
  );
}