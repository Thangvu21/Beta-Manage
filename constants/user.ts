import { Image } from "react-native-svg";
import { images } from "./image";
import { ImageRequireSource } from "react-native";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    profilePictureUrl: ImageRequireSource;
}

export const UserData: UserProfile = {
    id: '1',
    name: 'Thang',
    email: '',
    profilePictureUrl: images.avatar
}
