import { Stack, useRouter } from "expo-router";
import './global.css';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_FAMILY } from "@/constants/font";
import { useEffect, useState } from "react";


export default function RootLayout() {

  const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // useEffect(() => {
  //   // Giả lập kiểm tra trạng thái đăng nhập
  //   const checkLoginStatus = async () => {
  //     const loggedIn = false; // Thay bằng logic kiểm tra đăng nhập thực tế
  //     // setIsLoggedIn(loggedIn);

  //     if (!loggedIn) {
  //       router.replace("/signIn"); // Điều hướng đến màn hình đăng nhập
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);


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
      {/* <Stack.Screen name="scanner" options={{ 
        headerShown: true, 
        title: "Quét mã QR", 
        headerTintColor: "#fff", 
        headerStyle: { backgroundColor: "#70c6e5" }
      }} /> */}
      <Stack.Screen
        name="login"
        options={
          {
            headerShown: false,
            // headerTransparent: true,
            // headerTitle: "Login",
            // headerTintColor: "#fff",
            // headerTitleStyle: {
            //   fontSize: 20,
            //   fontWeight: "bold",
            //   fontFamily: FONT_FAMILY
            // },
            // headerBackground: () => (
            //   <LinearGradient
            //     colors={["#1e6fa8", "#70c6e5"]}
            //     style={{ flex: 1 }}
            //   />
            // ),
          }
        }
      />
    </Stack>
  );
}
