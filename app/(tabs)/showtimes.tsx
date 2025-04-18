import { View, Text } from "react-native";
import { Link } from "expo-router";

const ShowTime = () => {
    return (
        <View className='flex-1 justify-center items-center'>
            <Link href={'/signIn'}>Sign In </Link>
        </View>
    )
}

export default ShowTime;