import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Text, View } from "react-native";
import { images, imagesUrl } from "@/constants/image";
import React, { useState } from "react";
import LoginedStatus from "./LoginedStatus";
import NotLoginedStatus from "./NotLoginedStatus";

const HomeHeader = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <View className="flex-row justify-between items-center" style={{borderBottomColor: '#ccc', borderBottomWidth: 1,}}>
            {isLogin ? <LoginedStatus /> : <NotLoginedStatus />}
            <Image source={images.beta} style={{ width: 150, height: 50 }} />
        </View>
    )
}

export default HomeHeader;