import { Stack, useRouter } from "expo-router";
import './global.css';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_FAMILY } from "@/constants/font";
import { useEffect, useState } from "react";


export default function RootLayout() {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    // Giả lập kiểm tra trạng thái đăng nhập
    const checkLoginStatus = async () => {
      const loggedIn = false; // Thay bằng logic kiểm tra đăng nhập thực tế
      // setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        router.replace("./login"); 
      } else {
        router.replace("./"); 
      }
    };

    checkLoginStatus();
  }, []);


  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movie"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="scanner" />
      
      <Stack.Screen
        name="login"
        options={
          {
            headerShown: false,
          }
        }
      />
    </Stack>
  );
}
