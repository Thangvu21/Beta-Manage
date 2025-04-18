import { Tabs } from "expo-router";
import { ImageBackground, View, Text } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { images } from "@/constants/image";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient";
import { FONT_FAMILY } from "@/constants/font";

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home", headerShown: false,
                    tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name="movie-open-check-outline" size={25} color={color} />
                }}
            />
            <Tabs.Screen
                name="food"
                options={{
                    headerTransparent: true,
                    headerTitle: "Food",
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
                    tabBarIcon: ({ color }) => <MaterialIcons name="fastfood" size={24} color={color} />
                }}
            />

            <Tabs.Screen
                name="showtimes"
                options={{
                    title: "Time", headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="timer-outline" size={25} color={color} />
                }}
            />

            <Tabs.Screen
                name="statistics"
                options={{
                    title: "Analyst",
                    headerTransparent: false,
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
                    ),
                    tabBarIcon: ({ color }) => <Ionicons name="analytics" size={25} color={color} />
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile", headerShown: false
                    , tabBarIcon: ({ color }) => <AntDesign name="profile" size={25} color={color} />
                }}
            />
        </Tabs>
    );
}

export default _Layout;