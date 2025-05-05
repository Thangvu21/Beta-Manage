import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { useState } from "react";
import ImagePickerScreen from "../Camera/ImagePicker";
import { Movie } from "@/constants/film";
import { images, imagesUrl } from "@/constants/image";
import { v4 as uuidv4 } from 'uuid';
import Constants from 'expo-constants';
import axios from "axios";
const API_URL = Constants.manifest?.extra?.API_URL;

interface Props {
    modalCreateVisible: boolean,
    setModalCreateVisible: (visible: boolean) => void,
    listMovie: Movie[],
    setListMovie: (listMovie: Movie[]) => void;
}

const CreateModalMovie = ({
    modalCreateVisible,
    setModalCreateVisible,
    listMovie,
    setListMovie
}: Props) => {

    const [image, setImage] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    //them aysnc await cho fetch API
    const handelCreateMovie = async () => {
        if (!title || !description) {
            Alert.alert("Please fill all fields");
            return;
        }
        // Handle movie creation logic here
        console.log("Movie Created:", { title, description, image });
        // Gửi API
        try {
            const response = await axios.post(`${API_URL}/film/admin`, {
                body: JSON.stringify({
                    id: uuidv4(),
                    title: title,
                    description: description,
                    image: image,
                    realeaseDate: new Date().toISOString(),
                    language: 'en',
                    director: 'John Doe',
                    actors: ['Actor 1', 'Actor 2'],
                    duration: 120,
                    gerners: ['Action', 'Drama'],
                    posterUrl: imagesUrl.img4,
                    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    status: 'active',
                }), 
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        
        

        // setListMovie
        const MovieAdded: Movie = {
            id: uuidv4(),
            title: title,
            releaseDate: description,
            posterUrl: imagesUrl.img4
        }
        setListMovie([...listMovie, MovieAdded]);
        setImage('');
        setTitle('');
        setDescription('');
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
                        <Text style={styles.headerTitle}>Create Movie</Text>
                        <Pressable onPress={() => setModalCreateVisible(false)}>
                            <AntDesign name="closecircleo" size={24} color="#555" />
                        </Pressable>
                    </View>

                    <ScrollView contentContainerStyle={styles.body}>
                        {/* Title */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🎬 Movie Title</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie title"
                                placeholderTextColor="#888"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>📝 Movie Description</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie description"
                                placeholderTextColor="#888"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                            />
                        </View>

                        {/* Image */}
                        <ImagePickerScreen imageUri={image} setImageUri={setImage}/>
                    </ScrollView>

                    {/* Footer */}
                    <TouchableOpacity style={styles.createButton} onPress={() => handelCreateMovie()}>
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

export default CreateModalMovie;
