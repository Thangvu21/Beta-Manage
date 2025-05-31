import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images, imagesUrl } from "@/constants/image";
import { FONT_FAMILY } from "@/constants/font";
import { useRouter } from "expo-router";
import { UserProfile } from "@/constants/user";

interface Props {
    user: UserProfile;
    setUser: (user: UserProfile) => void;
}

const LoginedStatus = ({ user, setUser }: Props) => {


    const router = useRouter();
    // fetch vai thoong tin cua user

    return (
        <TouchableOpacity onPress={() => router.push({
            pathname: '/(authenticated)/(tabs)/(other)',
            
        })}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center p-2 justify-around">
                {user && (
                    (user.profilePictureUrl === 'default' || !user.profilePictureUrl) ? (
                        <Image
                            source={{ uri: imagesUrl.default }}
                            style={{ width: 45, height: 45, marginHorizontal: 7, borderRadius: 20 }}
                        />
                    ) : (
                        <Image
                            source={{ uri: user.profilePictureUrl }}
                            style={{ width: 45, height: 45, marginHorizontal: 7, borderRadius: 20 }}
                        />
                    ))
                }
                {
                    user && (
                        <View className="justify-center">
                            <Text style={{ fontSize: 14, fontWeight: 500 }}>Chào <Text style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 16 }}>{user.name}</Text></Text>
                            <View className="flex-row justify-around items-center mt-2">
                                <FontAwesome name="user-o" size={20} color="black" className="mr-2" />
                                <Text style={{ fontFamily: FONT_FAMILY, fontWeight: 700 }}>{user.role}</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

export default LoginedStatus;