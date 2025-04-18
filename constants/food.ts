import { ImageURISource } from "react-native";
import { foodImages } from "./image";

export interface FoodItem {

    id: number;
    name: string;
    price: string;
    image: ImageURISource;
    
}

export const foodData: FoodItem[] = [
    {
        id: 1,
        name: "Mỳ",
        price: "25.000đ",
        image: foodImages.bong
    },
    {
        id: 2,
        name: "Coffee",
        price: "15.000đ",
        image: foodImages.coffee
    },
 
];
