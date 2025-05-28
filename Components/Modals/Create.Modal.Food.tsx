import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageURISource } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerScreen from "../Camera/ImagePicker";
import React, { useEffect, useState } from "react";
import { FoodItem } from "@/constants/food";
import * as FileSystem from 'expo-file-system';
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";

function convertLocalhost(url: string) {
    if (!url) return '';

    // Kiểm tra nếu URL bắt đầu bằng http://localhost
    const localhostPrefix = 'http://localhost';
    if (url.substring(0, localhostPrefix.length) === localhostPrefix) {
        return API.hostImage + url.substring(localhostPrefix.length);
    }

    return url;
}

interface Props {
    modalCreateVisible: boolean,
    setModalCreateVisible: (visible: boolean) => void,
    foodList: FoodItem[],
    setFoodList: (foodList: FoodItem[]) => void
}

const CreateModalFood = ({ modalCreateVisible, setModalCreateVisible, foodList, setFoodList }: Props) => {

    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [id, setId] = useState<string>('');

    const handleAfterUpdate = () => {

    }

    const handelCreateFood = async () => {
        if (!title || !price) {

            Alert.alert("Please fill all fields");
            return;
        }


        try {
            // setup cho create food
            const uri = image;
            if (!uri) {
                Alert.alert("Vui lòng chọn ảnh!");
                return;
            }
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (!fileInfo.exists) {
                Alert.alert("File không tồn tại!");
                return;
            }
            const fileName = uri.split('/').pop() || 'photo.jpg';
            const fileType = fileName.split('.').pop();

            const formData = new FormData();
            formData.append('image', {
                uri,
                name: fileName,
                type: `image/${fileType}`,
            } as any);
            formData.append('name', title);
            formData.append('price', price);

            const response = await axiosClient.post(API.createFood, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const imageResponseUrl = convertLocalhost(response.data.imageUrl);

            if (response.status === 200 || response.status === 201) {
                Alert.alert("Success", "Tạo món ăn thành công");
                setFoodList([
                    ...foodList,
                    {
                        id: response.data.id, // lấy id trực tiếp từ response
                        name: title,
                        price: price,
                        imageUrl: imageResponseUrl,
                    }
                ]);
                // Reset form và đóng modal chỉ khi thành công
                setTitle('');
                setPrice('');
                setImage('');
                setModalCreateVisible(false);
            } else {
                Alert.alert("Lỗi", "Không thể tạo món ăn!");
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo món ăn!");
        }
    }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCreateVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalCreateVisible(false);
                }}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Create Food</Text>
                            <Pressable onPress={() => setModalCreateVisible(false)}>
                                <AntDesign name="closecircleo" size={24} color="#555" />
                            </Pressable>
                        </View>

                        <ScrollView contentContainerStyle={styles.body}>
                            {/* Title */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>🍛 Food Title</Text>
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    style={styles.textInput}
                                    placeholder="Enter food name"
                                    placeholderTextColor="#888"
                                />
                            </View>

                            {/* Price */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>💵 Food Price</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={price}
                                    onChangeText={setPrice}
                                    placeholder="Enter food price"
                                    keyboardType="numeric"
                                    placeholderTextColor="#888"
                                />
                            </View>

                            {/* Image */}
                            <ImagePickerScreen imageUri={image} setImageUri={setImage} />
                        </ScrollView>

                        {/* Footer */}
                        <TouchableOpacity style={styles.createButton} onPress={() => handelCreateFood()}>
                            <Text style={styles.createButtonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const styles = StyleSheet.create({
        modalWrapper: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            width: '90%',
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingVertical: 20,
            paddingHorizontal: 25,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
            elevation: 10,
            maxHeight: '85%',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: '700',
        },
        body: {
            paddingBottom: 20,
        },
        inputGroup: {
            marginTop: 15,
        },
        label: {
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 5,
            color: '#333',
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
    });

    export default CreateModalFood;
