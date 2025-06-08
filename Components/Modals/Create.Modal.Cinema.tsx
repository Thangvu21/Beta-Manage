import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageURISource } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerScreen from "../Camera/ImagePicker";
import React, { useEffect, useState } from "react";
import { FoodItem } from "@/constants/food";
import * as FileSystem from 'expo-file-system';
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import { Cinema, LocationType } from "@/constants/cinema";
import { imagesUrl } from "@/constants/image";

interface Props {
    modalCinemaVisible: boolean,
    setModalCinemaVisible: (visible: boolean) => void,
    cinemaList: Cinema[],
    setCinemaList: (cinemaList: Cinema[]) => void
}

const CreateModalCinema = ({ modalCinemaVisible, setModalCinemaVisible, cinemaList, setCinemaList }: Props) => {

    const [cinemaName, setCinemaName] = useState<string>('');
    const [cinemaPhone, setCinemaPhone] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [ward, setWard] = useState<string>('');
    const [cinemaAvatar, setCinemaAvatar] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [latitude, setLatitude] = useState<string>('');
    const [id, setId] = useState<string>('');

    const handleAfterUpdate = () => {
        setCinemaName('');
        setCinemaPhone('');
        setCity('');
        setDistrict('');
        setStreet('');
        setWard('');
        setCinemaAvatar('');
        setLongitude('');
        setLatitude('');
        setId('');
        setModalCinemaVisible(false);
    }

    const getFullAddress = () => {
        return `${street}, ${ward}, ${district}, ${city}`;
    }

    const handleCreateCinema = async () => {
        if (!cinemaName || !cinemaPhone || !cinemaAvatar) {
            Alert.alert("Please fill all fields");
            return;
        }

        handleAfterUpdate();

        try {

            const newCinema = {
                name: cinemaName,
                phone: cinemaPhone,
                address: {
                    street,
                    ward,
                    district,
                    city,
                    full: getFullAddress(),
                },
                location: {
                    type: LocationType.Point,
                    coordinates: [parseFloat(longitude), parseFloat(latitude)],
                },
                avatar: cinemaAvatar,
            }
            const response = await axiosClient.post(API.createCinema, JSON.stringify(newCinema), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Cinema created successfully:', response.data);
            const idCinema = response.data.id;

            if (true) {
                Alert.alert("Cinema created successfully");
                const newCinema: Cinema = {
                    // id: response.data.id,
                    id: idCinema,
                    name: cinemaName,
                    phone: cinemaPhone,
                    address: {
                        street,
                        ward,
                        district,
                        city,
                        full: getFullAddress(),
                    },
                    location: {
                        type: LocationType.Point,
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    avatar: imagesUrl.rap,
                };
                setCinemaList([
                    ...cinemaList,
                    newCinema
                ]);
            }
            
        } catch (error) {
            Alert.alert("Error creating cinema");
            console.error(error);
        }

        
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalCinemaVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalCinemaVisible(false);
            }}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Create Cinema</Text>
                        <Pressable onPress={() => setModalCinemaVisible(false)}>
                            <AntDesign name="closecircleo" size={24} color="#555" />
                        </Pressable>
                    </View>

                    <ScrollView contentContainerStyle={styles.body}>
                        {/* Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🎬 Cinema Name</Text>
                            <TextInput
                                value={cinemaName}
                                onChangeText={setCinemaName}
                                style={styles.textInput}
                                placeholder="Enter cinema name"
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Phone */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>📞 Phone Number</Text>
                            <TextInput
                                value={cinemaPhone}
                                onChangeText={setCinemaPhone}
                                style={styles.textInput}
                                placeholder="Enter phone number"
                                keyboardType="phone-pad"
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Full Address */}
                        {/* Street */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🏠 Street</Text>
                            <TextInput
                                value={street}
                                onChangeText={setStreet}
                                style={styles.textInput}
                                placeholder="e.g., 123 Trường Chinh"
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Ward */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🏘️ Ward</Text>
                            <TextInput
                                value={ward}
                                onChangeText={setWard}
                                style={styles.textInput}
                                placeholder="e.g., Phương Liệt"
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* District */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🏙️ District</Text>
                            <TextInput
                                value={district}
                                onChangeText={setDistrict}
                                style={styles.textInput}
                                placeholder="e.g., Thanh Xuân"
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* City */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🌆 City</Text>
                            <TextInput
                                value={city}
                                onChangeText={setCity}
                                style={styles.textInput}
                                placeholder="e.g., Hà Nội"
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Coordinates */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🌐 Longitude</Text>
                            <TextInput
                                value={longitude}
                                onChangeText={setLongitude}
                                style={styles.textInput}
                                placeholder="Enter longitude (ex: 105.807)"
                                keyboardType="numeric"
                                placeholderTextColor="#888"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🌐 Latitude</Text>
                            <TextInput
                                value={latitude}
                                onChangeText={setLatitude}
                                style={styles.textInput}
                                placeholder="Enter latitude (ex: 21.002)"
                                keyboardType="numeric"
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Avatar Image Picker */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>📸 Cinema Avatar</Text>
                            <TextInput
                                value={cinemaAvatar}
                                onChangeText={setCinemaAvatar}
                                style={styles.textInput}
                                placeholder="Enter image URL or select from gallery"
                                placeholderTextColor="#888"
                            />
                        </View>
                    </ScrollView>

                    {/* Footer */}
                    <TouchableOpacity style={styles.createButton} onPress={handleCreateCinema}>
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

export default CreateModalCinema;
