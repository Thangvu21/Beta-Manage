import { FilmData } from "@/constants/film";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";



const Details = () => {

    const { id } = useLocalSearchParams<{ id: string }>();
    const film = FilmData.find((item) => item.id === id);

    return (
        <View className="flex-1 w-full m-top-4 bg-white">
            <Image 
                source={{ uri: film?.posterUrl }}
                className=""
                style= {{ borderBottomLeftRadius: 150,
                    borderBottomRightRadius: 150,
                    overflow: 'hidden', width: 300, height: 400 }}
                resizeMode="stretch"
            />
            <Text>Details: {id}</Text>
        </View>
    )
}

export default Details;