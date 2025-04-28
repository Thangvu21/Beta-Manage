import { Stack } from "expo-router"
import SignIn from "./signIn"

const login = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <SignIn />
        </>


    )
}

export default login