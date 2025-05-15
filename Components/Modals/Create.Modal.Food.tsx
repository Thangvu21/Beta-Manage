import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageURISource } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerScreen from "../Camera/ImagePicker";
import React, { useEffect, useState } from "react";
import { FoodItem } from "@/constants/food";
import { images, imagesUrl } from "@/constants/image";
import { v4 as uuidv4 } from 'uuid';
import Constants from 'expo-constants';
import axios from "axios";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
const API_URL = Constants.manifest?.extra?.API_URL;

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

    const handelCreateFood = async () => {
        if (!title || !price) {

            Alert.alert("Please fill all fields");
            return;
        }

        try {
            const response = await axiosClient.post(`${API.createFood}`, {
                title: title,
                price: price,
                image: image,
            })
            console.log("response", response.data);
            if (response.status === 200) {
                setId(response.data.id);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        const newFood: FoodItem = {
            id: id,
            name: title,
            price: price,
            image: imagesUrl.img6,
        };
        // Handle food creation logic here
        setFoodList([...foodList, newFood]);
        // Gửi API
        setTitle('');
        setPrice('');
        setImage('');
        setModalCreateVisible(false);
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
