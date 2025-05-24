
import { FONT_FAMILY } from '@/constants/font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

const Layout = () => {
    return (

        <Stack>
            <Stack.Screen name="index" options={{
                headerTransparent: true,
                headerTitle: "Other",
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
                )
            }} />
            <Stack.Screen name="food" options={{
                title: "Food",
                headerBackground: () => (
                    <LinearGradient
                        colors={["#1e6fa8", "#70c6e5"]}
                        style={{ flex: 1 }}
                    />
                ),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="cinema" options={{
                title: "Rạp phim",
                headerBackground: () => (
                    <LinearGradient
                        colors={["#1e6fa8", "#70c6e5"]}
                        style={{ flex: 1 }}
                    />
                ),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="notification" options={{
                title: "Thông báo",
                headerBackground: () => (
                    <LinearGradient
                        colors={["#1e6fa8", "#70c6e5"]}
                        style={{ flex: 1 }}
                    />
                ),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="profile" options={{
                title: "Hồ sơ",
                headerBackground: () => (
                    <LinearGradient
                        colors={["#1e6fa8", "#70c6e5"]}
                        style={{ flex: 1 }}
                    />
                ),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="createAccountAdmin" options={{
                title: "Tạo tài khoản admin",
                headerBackground: () => (
                    <LinearGradient
                        colors={["#1e6fa8", "#70c6e5"]}
                        style={{ flex: 1 }}
                    />
                ),
                headerTintColor: '#fff',
            }} />
        </Stack>

    )
}

export default Layout;