import { Image } from "react-native-svg";
import { images, imagesUrl } from "./image";
import { ImageRequireSource } from "react-native";
import uriBase from "@/Components/Camera/getUriFromImport";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    profilePictureUrl: string;
}

export const UserData: UserProfile = {
    id: '1',
    name: 'Thang',
    email: '',
    profilePictureUrl: images.avatar,
}
