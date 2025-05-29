import { ImageURISource } from "react-native";
import { foodImages, images, imagesUrl } from "./image";

export interface FoodItem {

    id: string;
    name: string;
    price: string;
    imageUrl: string;
    
}

export const foodData: FoodItem[] = [
    {
        id: "1",
        name: "Mỳ",
        price: "25.000đ",
        imageUrl: imagesUrl.img1
    },
    {
        id: '2',
        name: "Coffee",
        price: "15.000đ",
        imageUrl: imagesUrl.img2
    },
 
];
