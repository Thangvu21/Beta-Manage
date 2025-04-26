import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";

import { useCameraPermissions } from "expo-camera";

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    console.log("Permission result:", result);
  };

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>QR Code Scanner</Text>
      <View style={{ gap: 20 }}>
        <Pressable onPress={handleRequestPermission}>
          <Text style={styles.buttonStyle}>Request Permissions</Text>
        </Pressable>
        <Link href={"../scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "white",
    fontSize: 40,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
});


// const Camera = () => {
  
  
//   const requestCameraPermissions = async () => {
//     const checkPermission = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//     )

//     if (checkPermission === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("Oke");

//       const result = await launchCamera({mediaType:'photo', cameraType:'back'})
//       console.log("result", result);
//     } else {
//       console.log("Permission denied");
//     }
//   }

//   return (
//     <View>
//       <Text>Camera</Text>
//       <Button 
        
//         title="CHọn ảnh nhé"
//         onPress={() => requestCameraPermissions()}
//       />
//     </View>
//   );
// }

// export default Camera;