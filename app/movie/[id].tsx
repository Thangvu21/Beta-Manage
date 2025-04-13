import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";



const Details = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View>
            <Text>Details: {id}</Text>
        </View>
    )
}

export default Details;