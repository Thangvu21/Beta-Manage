import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, Text, View } from "react-native";
import { images, imagesUrl } from "@/constants/image";
import React, { useState } from "react";
import LoginedStatus from "./LoginedStatus";
import NotLoginedStatus from "./NotLoginedStatus";
import { UserData, UserProfile } from "@/constants/user";

interface Props {
    user: UserProfile;
    setUser: (user: UserProfile) => void;
}

const HomeHeader = ({
    user,
    setUser
}: Props) => {

    return (
        <View className="flex-row justify-between items-center" style={{borderBottomColor: '#ccc', borderBottomWidth: 1,}}>
            {<LoginedStatus user={user} setUser={setUser}/>}
            <Image source={images.beta} style={{ width: 150, height: 50 }} />
        </View>
    )
}

export default HomeHeader;