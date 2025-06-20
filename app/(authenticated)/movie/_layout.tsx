import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

const MovieLayout = () => {

    
    return (
        <Stack
            screenOptions={{
                headerShown: true, 
            }}
        >
            <Stack.Screen
                name="[id]"
                options={{
                    headerTitle: "Movie Details",
                    headerTintColor: "#fff", 
                    headerBackground: () => (
                        <LinearGradient
                            colors={["#1e6fa8", "#70c6e5"]}
                            style={{ flex: 1 }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="detail"
                options={{
                    headerTitle: "Movie Showtime",
                    headerTintColor: "#fff", 
                    headerBackground: () => (
                        <LinearGradient
                            colors={["#1e6fa8", "#70c6e5"]}
                            style={{ flex: 1 }}
                        />
                    ),
                }}
            />
        </Stack>
    );
};

export default MovieLayout;