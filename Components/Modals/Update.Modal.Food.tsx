import { FoodItem } from "@/constants/food";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";


interface props {
    modalUpdateVisible: boolean,
    setModalUpdateVisible: (visible: boolean) => void
    food: FoodItem,
    foodList: FoodItem[],
    setFoodList: (foodList: FoodItem[]) => void
}

const UpdateModalFood = ({
    modalUpdateVisible,
    setModalUpdateVisible,
    food,
    foodList,
    setFoodList
}: props) => {

    

    // const [image, setImage] = useState<string>(food?.image || imagesUrl.img5);
    const [title, setTitle] = useState<string>(food?.name || '');
    const [price, setPrice] = useState<string>(food?.price.toString() || '');

    useEffect(() => {
        setTitle(food?.name || '');
        setPrice(food?.price.toString() || '');
    }, [food]);


    const handelupdateFood = async () => {
        if (!title || !price) {
            Alert.alert("Please fill all fields");
            return;
        }
        try {
            
            const response = await axiosClient.patch(`${API.updateFood}/${food?.id}`, {
                name: title,
                price: price,
            });

            
            if (response.status === 200) {
                Alert.alert("Success", "Cập nhật món ăn thành công");
                setFoodList(foodList.map(item => item.id === food?.id ? { ...item, name: title, price: price } : item));
            }
            
        } catch (error: any) {
            console.error("Lỗi khi cập nhật món ăn:", error);
            Alert.alert("Error", "Không thể cập nhật món ăn");
        }

        setModalUpdateVisible(false);
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
                        {/* <ImagePickerScreen imageUri={image} setImageUri={setImage} /> */}
                    </View>

                    {/* Footer */}
                    <View style={[styles.createButton, { marginTop: 20, marginBottom: 20 }]}>
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
