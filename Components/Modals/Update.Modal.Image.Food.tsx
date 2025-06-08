import { FoodItem } from "@/constants/food";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Button, ImageURISource, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePickerScreen from "../Camera/ImagePicker";
import { imagesUrl } from "@/constants/image";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import * as FileSystem from 'expo-file-system';

function convertLocalhost(url: string) {
    if (!url) return '';
    if (!url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg')) {
        return imagesUrl.imageFood
    }
    

    // Kiểm tra nếu URL bắt đầu bằng http://localhost
    // const localhostPrefix = ':9000/booking/';
    // if (url.substring(0, localhostPrefix.length) === localhostPrefix) {
        return API.hostImage + url.replace('http://localhost', '');
    // }

    return url;
}

interface props {
    modalUpdateVisible: boolean,
    setModalUpdateVisible: (visible: boolean) => void
    food: FoodItem,
    foodList: FoodItem[],
    setFoodList: (foodList: FoodItem[]) => void
}

const UpdateImageModalFood = ({
    modalUpdateVisible,
    setModalUpdateVisible,
    food,
    foodList,
    setFoodList
}: props) => {

    const [image, setImage] = useState<string>(food.image || imagesUrl.default);

    useEffect(() => {
        setImage(food.image || imagesUrl.default);
    }, [food.id]);

    const handleUpdateImageItem = async () => {
        if (!image) {
            Alert.alert("Please select an image");
            return;
        }
        try {
            const fileInfo = await FileSystem.getInfoAsync(image);
            if (!fileInfo.exists) {
                Alert.alert("File không tồn tại!");
                return;
            }
            const fileName = image.split('/').pop() || 'photo.jpg';
            const fileType = fileName.split('.').pop();

            const formData = new FormData();
            formData.append('image', {
                uri: image,
                name: fileName,
                type: `image/${fileType}`,
            } as any);

            const response = await axiosClient.patch(`${API.updateFoodImage}/${food?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Response from update image:", response.data.imageUrl);
            const imageResponseUrl = convertLocalhost(response.data.imageUrl);
            console.log("Image updated successfully:", imageResponseUrl);
            Alert.alert("Success", "Cập nhật ảnh món ăn thành công");
            setFoodList(foodList.map(item => item.id === food?.id ? { ...item, image: imageResponseUrl, imageUrl:imageResponseUrl } : item));
            setModalUpdateVisible(false);
            setImage(imageResponseUrl);

        } catch (error: any) {
            console.error("Lỗi khi cập nhật ảnh món ăn:", error);
            Alert.alert("Error", "Không thể cập nhật ảnh món ăn");
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalUpdateVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalUpdateVisible(!modalUpdateVisible);
            }}>
            <View style={styles.modalWrapper}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Update Food
                        </Text>
                        <Pressable onPress={() => setModalUpdateVisible(!modalUpdateVisible)}>
                            <AntDesign name="closecircleo" size={24} color="#555" />
                        </Pressable>
                    </View>
                    <ImagePickerScreen imageUri={image} setImageUri={setImage} />
                    <View style={[styles.createButton, { marginTop: 20, marginBottom: 20 }]}>
                        <TouchableOpacity onPress={() => handleUpdateImageItem()}>
                            <Text style={styles.createButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    )


}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 45,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    selectButton: {
        backgroundColor: '#5cb85c',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    createButton: {
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: '#0275d8',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',

    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    inputGroup: {
        marginTop: 15,
    },
});

export default UpdateImageModalFood;