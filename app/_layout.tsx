import { Stack } from "expo-router";
import './global.css';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_FAMILY } from "@/constants/font";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          title: "Movie Details",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signIn"
        options={
          {
            headerTransparent: true,
            headerTitle: "Login",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: FONT_FAMILY
            },
            headerBackground: () => (
              <LinearGradient
                colors={["#1e6fa8", "#70c6e5"]}
                style={{ flex: 1 }}
              />
            ),
          }
        }
      />
    </Stack>
  );
}
