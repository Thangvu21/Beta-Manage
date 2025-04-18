import { Button, Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from "expo-router";
import { FONT_FAMILY } from "@/constants/font";
const NotLoginedStatus = () => {
    return (

        <View className="p-2" style={{ marginHorizontal: 20}}>
            <Link href={"/signIn"} >
                <View className="flex-row p-2 items-center bg-white borded rounded-lg border" style={{ borderColor: '#337ab7' }}>
                    <FontAwesome6 name="user" size={20} color="#337ab7"/>
                    <Text className="text-base font-semibold" style={{ fontFamily: FONT_FAMILY, marginHorizontal: 15, color: '#337ab7', fontSize: 15}}>Login</Text>
                </View>
            </Link>
        </View>
    )
}

export default NotLoginedStatus;