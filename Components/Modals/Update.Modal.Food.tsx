import { FoodItem } from "@/constants/food";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Button, ImageURISource, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePickerScreen from "../Camera/ImagePicker";

interface props {
    modalUpdateVisible: boolean,
    setModalUpdateVisible: (visible: boolean) => void
    food: FoodItem | undefined
}

const UpdateModalFood = (props: props) => {

    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>(props.food?.name || '');
    const [price, setPrice] = useState<string>(props.food?.price || '');
    const handelupdateFood = () => {
        if (!title || !price || !image) {
            Alert.alert("Please fill all fields");
            return;
        }
        // Handle food update logic here
        console.log("Food Updated:", { title, price, image });
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
                props.setModalUpdateVisible(!props.modalUpdateVisible);
            }}>
            <View style={styles.modalWrapper}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Update Food
                        </Text>
                        <Pressable onPress={() => props.setModalUpdateVisible(!props.modalUpdateVisible)}>
                            <AntDesign name="closecircleo" size={24} color="#555" />
                        </Pressable>
                    </View>

                    {/* Body */}
                    <View>
                        <View>
                            <Text style={styles.label}>Food Title</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter food title"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Food Price</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter food price"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>

                        {/* Image */}
                        <ImagePickerScreen imageUri={image} setImageUri={setImage} />
                    </View>

                    {/* Footer */}
                    <View style={[styles.createButton, {marginTop: 20, marginBottom: 20}]}>
                        <TouchableOpacity onPress={() => handelupdateFood()}>
                            <Text style={styles.createButtonText}>Update</Text>
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

export default UpdateModalFood;
