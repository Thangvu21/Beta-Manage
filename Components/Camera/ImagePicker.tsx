import * as ImagePicker from 'expo-image-picker';
import { MediaType } from 'expo-image-picker';
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    imageUri: string ;
    setImageUri: (uri: string) => void;
}

const ImagePickerScreen = ({imageUri, setImageUri} : Props) => {

    const pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            alert("Sorry, we need camera permissions to make this work!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: 'images',
                allowsEditing: true,
                quality: 1,
            }
        )

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);

        }
    }

    return (
        <TouchableOpacity style={styles.createButton} onPress={pickImage}>
            <Text style={styles.createButtonText}>
                Hãy chọn ảnh từ thư viện
            </Text> 
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, }} resizeMode="cover" />}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'center', marginTop: 30 },
    image: { width: 200, height: 200, marginTop: 20, borderRadius: 10 },
    createButton: {
        marginTop: 20,
        backgroundColor: '#0275d8',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ImagePickerScreen;