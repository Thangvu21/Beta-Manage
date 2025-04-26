import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, Linking, Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Overlay from "./Overlay";


export default function HomeScanner() {

    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);

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
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen
                options={{
                    title: "Overview",
                    headerShown: false,
                }}
            />
            {Platform.OS === "android" ? <StatusBar hidden /> : null}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={({ data }) => {
                    if (data && !qrLock.current) {
                        qrLock.current = true;
                        setTimeout(async () => {
                            await Linking.openURL(data);
                        }, 500);
                    }
                }}
            />
            <Overlay />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
});

// import { StatusBar } from "expo-status-bar";
// import { Button, StyleSheet, Text, View } from "react-native";
// import {
//   launchImageLibrary,
//   type ImageLibraryOptions,
// } from "react-native-image-picker";
// import { useState, useCallback } from "react";
// import { scanFromPath } from "@/modules/qr-code-image-scan"; 

// export default function HomeScanner() {
//   const [qrCodes, setQrCodes] = useState<string[]>([]);

//   const onPress = useCallback(async () => {
//     const option: ImageLibraryOptions = {
//       mediaType: "photo",
//     };
//     const result = await launchImageLibrary(option);
//     const uri = result?.assets?.[0]?.uri;
//     if (!uri) {
//       return;
//     }

//     const codes = await scanFromPath(uri);
//     setQrCodes(codes);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" />
//       <View style={styles.container}>
//         <Text>Result: {qrCodes}</Text>
//         <Button onPress={onPress} title="Open Picker" />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


