import { Movie } from "@/constants/film";
import { FoodItem } from "@/constants/food";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Button, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePickerScreen from "../Camera/ImagePicker";

interface props {
    modalUpdateVisible: boolean,
    setModalUpdateVisible: (visible: boolean) => void
    movie: Movie | undefined
}


const UpdateModalMovie = (props: props) => {

    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>(props.movie?.title || '');
    const [releaseDate, setReleaseDate] = useState<string>(props.movie?.releaseDate || '');

    const handelUpdateMovie = () => {

        if (!title || !releaseDate || !image) {
            Alert.alert("Please fill all fields");
            return;
        }
        // Handle movie update logic here
        console.log("Movie Updated:", { title, releaseDate, image });
        // Gửi API
        props.setModalUpdateVisible(!props.modalUpdateVisible);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalUpdateVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                props.setModalUpdateVisible(false);
            }}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Update Movie</Text>
                        <Pressable onPress={() => props.setModalUpdateVisible(false)}>
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
                        <ImagePickerScreen imageUri={image} setImageUri={setImage} />
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
                            onPress={() => props.setModalUpdateVisible(false)}
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