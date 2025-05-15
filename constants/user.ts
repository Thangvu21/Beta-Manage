import { Image } from "react-native-svg";
import { images, imagesUrl } from "./image";
import { ImageRequireSource } from "react-native";
import uriBase from "@/Components/Camera/getUriFromImport";


export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    SUPER_ADMIN = 'superadmin',
}
export interface UserProfile {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    profilePictureUrl: string;
}

export const UserData: UserProfile = {
    name: 'Thang',
    email: '',
    password: '',
    phone: '',
    role: UserRole.ADMIN,
    profilePictureUrl: imagesUrl.img1,
}

export enum gender {
    male = 'male',
    female = 'female',
    other = 'other',
}
export interface UserData {
    id: String;
    name: String;
    email: String;
    password: String;
    birthday: Date;
    phone: String;
    gender: String
    avatar: String
}