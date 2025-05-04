import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images, imagesUrl } from "@/constants/image";
import { FONT_FAMILY } from "@/constants/font";
import { useRouter } from "expo-router";

const LoginedStatus = () => {

    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.replace('/(authenticated)/(tabs)/profile')}
            activeOpacity={0.7}
            >
            <View className="flex-row items-center p-2 justify-around">
                <Image source={images.avatar} style={{ width: 45, height: 45, marginHorizontal: 7 }} />
                <View className="justify-center">
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Chào <Text style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 16 }}>Thắng Vũ</Text></Text>
                    <View className="flex-row justify-around items-center mt-2">
                        <FontAwesome name="user-o" size={20} color="black" className="mr-2" />
                        <Text style={{ fontFamily: FONT_FAMILY, fontWeight: 700 }}>MEMBER</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LoginedStatus;