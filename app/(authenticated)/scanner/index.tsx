import { CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Alert, AppState, Button, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import Overlay from "./Overlay";
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
// import { BarCodeScanner} from "expo-barcode-scanner";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import { useRouter } from "expo-router";

export interface QRData {
    bookingId: string;
    // Add other fields as necessary
}

export default function HomeScanner() {

    const qrLock = useRef(false);
    const router = useRouter();
    const appState = useRef(AppState.currentState);

    const handleScanCode = async ({ data }: { data: string }) => {
        if (data && !qrLock.current) {
            qrLock.current = true;

            try {
                console.log("QR Data:", data);
                const parsedData: QRData = data ? JSON.parse(data) : null;

                console.log("Parsed QR Data:", parsedData);

                router.push({
                    pathname: "/(authenticated)/scanner/afterScanner",
                    params: { bookingId: parsedData.bookingId }
                })
            } catch (error) {
                console.error("Error:", error);
                Alert.alert("Lỗi", "Không thể xử lý mã QR.");
                qrLock.current = false;
            }
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                qrLock.current = false;
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);



    return (
        <>
            <View style={[StyleSheet.absoluteFill, ]}>
                {Platform.OS === "android" ? <StatusBar hidden /> : null}
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    facing="back"
                    onBarcodeScanned={handleScanCode}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                />
                <Overlay />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    imageStorage: { position: "absolute", bottom: 150, right: 180, flex: 1, opacity: 1, zIndex: 10 },
    buttonStorage: { borderRadius: 50, borderWidth: 2, borderColor: '#fff', padding: 10, backgroundColor: '#3498db' }
});

