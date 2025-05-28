
import { FONT_FAMILY } from '@/constants/font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

const Layout = () => {
    return (

        <Stack>
            <Stack.Screen name="index" options={{
                headerTransparent: true,
                headerTitle: "Analyst",
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
            <Stack.Screen name="statistics" options={{
                title: "Statistic",
                headerBackground: () => (
                    <LinearGradient
                        colors={["#1e6fa8", "#70c6e5"]}
                        style={{ flex: 1 }}
                    />
                ),
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name="revenue" options={{
                title: "Revenue",
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