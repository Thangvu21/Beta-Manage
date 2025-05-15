import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Overlay from "./Overlay";
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
// import { BarCodeScanner} from "expo-barcode-scanner";
import Constants from 'expo-constants';
import axios from "axios";
const API_URL = Constants.manifest?.extra?.API_URL;

export default function HomeScanner() {

    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickerImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            alert("Sorry, we need camera permissions to make this work!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            }
        )

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            // xử lý image đấy luôn
            // try {
            //     // Quét mã QR từ ảnh
            //     const scanResult = await BarCodeScanner.scanFromURLAsync(uri);
            //     if (scanResult.length > 0) {
            //         const qrData = scanResult[0].data;
            //         console.log("QR Data:", qrData);
    
            //         // Xử lý dữ liệu quét được
            //         handleScanCode({ data: qrData });
            //     } else {
            //         Alert.alert("Không tìm thấy mã QR trong ảnh.");
            //     }
            // } catch (error) {
            //     console.error("Lỗi khi quét mã QR từ ảnh:", error);
            //     Alert.alert("Lỗi", "Không thể quét mã QR từ ảnh.");
            // }
        }

    }

    const handleScanCode = async ({ data }: { data: string }) => {
        if (data && !qrLock.current) {
            qrLock.current = true;
    
            try {
                console.log("QR Data:", data);
                const response = await axios.get(`${API_URL}/booking/admin/${data}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const result = response.data;
                console.log("Result:", result);
            } catch (error) {
                console.error("Error:", error);
                Alert.alert("Lỗi", "Không thể xử lý mã QR.");
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
            <View style={StyleSheet.absoluteFill}>
                {Platform.OS === "android" ? <StatusBar hidden /> : null}
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    facing="back"
                    onBarcodeScanned={handleScanCode}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                />
                <View style={styles.imageStorage}>
                    <TouchableOpacity style={styles.buttonStorage} onPress={pickerImage}>
                        <View>
                            <Feather name="image" size={28} color='#fff' />
                        </View>
                    </TouchableOpacity>
                </View>
                <Overlay />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    imageStorage: { position: "absolute", bottom: 150, right: 180, flex: 1, opacity: 1, zIndex: 10 },
    buttonStorage: { borderRadius: 50, borderWidth: 2, borderColor: '#fff', padding: 10, backgroundColor: '#3498db' }
});

