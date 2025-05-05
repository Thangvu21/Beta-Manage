import { Movie } from "@/constants/film";
import { FoodItem } from "@/constants/food";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Button, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePickerScreen from "../Camera/ImagePicker";
import { imagesUrl } from "@/constants/image";
import { v4 as uuidv4 } from 'uuid';
import Constants from 'expo-constants';
import axios from "axios";
const API_URL = Constants.manifest?.extra?.API_URL;

interface props {
    modalUpdateVisible: boolean,
    setModalUpdateVisible: (visible: boolean) => void
    movie: Movie,
    listMovie: Movie[],
    setListMovie: (listMovie: Movie[]) => void;
}


const UpdateModalMovie = ({
    modalUpdateVisible,
    setModalUpdateVisible,
    movie,
    listMovie,
    setListMovie
}: props) => {

    const [image, setImage] = useState<string>(movie?.posterUrl || '');
    const [title, setTitle] = useState<string>(movie?.title || '');
    const [releaseDate, setReleaseDate] = useState<string>(movie?.releaseDate || '');

    useEffect(() => {
        setImage(movie?.posterUrl || '');
        setTitle(movie?.title || '');
        setReleaseDate(movie?.releaseDate || '');
    }, [movie])

    const handelUpdateMovie = async () => {

        if (!title || !releaseDate || !image) {
            Alert.alert("Please fill all fields");
            return;
        }

        try {
            const response = await axios.patch(`${API_URL}/film/admin/${movie.id}`, {
                title: title,
                description: releaseDate,
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
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`, // nếu có xác thực
                }
            });

            console.log("Phản hồi từ server:", response.data);
            // Alert.alert("Thành công", "Phim đã được cập nhật!");
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Không thể cập nhật phim.";
                console.error("Lỗi API:", message);
                Alert.alert("Lỗi", message);
            } else {
                console.error("Lỗi không xác định:", error);
                Alert.alert("Lỗi", "Đã xảy ra lỗi không xác định.");
            }
        }

        // Handle movie update logic here
        setListMovie(listMovie.map((item) => {
            return item.id === movie.id ? { ...item, title, releaseDate, posterUrl: image } : item;
        })
        )
        setImage(image)
        setTitle(title)
        setReleaseDate(releaseDate)
        // Gửi API
        setModalUpdateVisible(!modalUpdateVisible);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalUpdateVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalUpdateVisible(false);
            }}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Update Movie</Text>
                        <Pressable onPress={() => setModalUpdateVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>

                    {/* Body */}
                    <View style={styles.body}>
                        <Text style={styles.label}>Movie Title</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter movie title"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <Text style={styles.label}>Release Date</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter release date"
                            value={releaseDate}
                            onChangeText={setReleaseDate}
                        />

                        <Text style={styles.label}>Movie Poster</Text>
                        {image && <ImagePickerScreen imageUri={image} setImageUri={setImage} />}
                    </View>

                    {/* Footer */}
                    <View className="mt-1 mb-1">
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handelUpdateMovie}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Update</Text>

                        </TouchableOpacity>
                    </View>
                    <View className="mt-1 mb-1">
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalUpdateVisible(false)}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
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
    container: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    body: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#444',
    },
    textInput: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#5cb85c',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 5,
    },

});


export default UpdateModalMovie;