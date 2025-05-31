import { API } from "@/constants/api";
import axiosClient from "@/constants/axiosClient";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";


const AfterScanner = () => {

    const { bookingId } = useLocalSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`${API.scanBooking}/${bookingId}`)
                console.log("Response from AfterScanner:", response.data);

            } catch (error) {
                console.error("Error in AfterScanner:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Quét mã thành công!</Text>
                <Text>Booking {bookingId}</Text>
            </View>
        </View>
    )
}

export default AfterScanner;