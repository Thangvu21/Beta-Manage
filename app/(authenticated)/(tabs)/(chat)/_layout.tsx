import { FONT_FAMILY } from '@/constants/font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTransparent: true,
                    headerTitle: "Chat Rooms",
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
                }}
            />
        </Stack>
    )

}

export default Layout;