import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { foodData, FoodItem } from "@/constants/food";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CreateModalFood from "@/Components/Modals/Create.Modal.Food";
import UpdateModalFood from "@/Components/Modals/Update.Modal.Food";
import DeleteModalFood from "@/Components/Modals/Delete.Modal.Food";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import UpdateImageModalFood from "@/Components/Modals/Update.Modal.Image.Food";
import SelectActionItemModal from "@/Components/Modals/Select.Action.Item.Modal";
import { colors } from "@/constants/color";

const Food = () => {

    const [foodList, setFoodList] = useState<FoodItem[]>([]);

    const [food, setFood] = useState<FoodItem>();

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    const [modalSelectionVisible, setModalSelectionVisible] = useState(false);

    const [modalUpdateItem, setModalUpdateItem] = useState(false);

    const [modalUpdateImageItem, setModalUpdateImageItem] = useState(false);

    const [modalCreateVisible, setModalCreateVisible] = useState(false);

    const handleOpenAddModal = () => {
        console.log("open add modal");
        setModalCreateVisible(true);
    }

    const handleUpdateFood = (food: FoodItem) => {
        setFood(food);
        setModalSelectionVisible(true);

    }

    const handleUpdateImageMovie = (food: FoodItem) => {
        setModalUpdateImageItem(true);
        setModalSelectionVisible(false);
    }

    const handleUpdateItem = (food: FoodItem) => {
        setModalUpdateItem(true);
        setModalSelectionVisible(false);
    }

    const handleDeleteFood = (food: FoodItem) => {
        setFood(food);
        setModalDeleteVisible(true);
    }

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axiosClient.get(API.getAllFood);

                // console.log("response", response.data);
                if (response.status === 200) {
                    setFoodList(response.data);
                }
            } catch (error) {
                Alert.alert("Error", "Không thể lấy danh sách món ăn");
            }
        }

        fetchFoodList();
        // setFoodList(foodData)
    }, [])



    return (

        <>
            <View className="flex-1 bg-gray-100 px-4 pt-5">
                {/* Header */}


                {/* List món ăn */}
                <FlatList
                    data={foodList}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View className="bg-white rounded-xl shadow p-3 mb-4 w-[48%]">
                            <Image source={{ uri: item.image }} className="w-full h-28 rounded-lg mb-2" resizeMode="cover" />
                            <Text className="font-semibold text-base text-gray-800">{item.name}</Text>
                            <Text className="text-sm text-gray-500 mb-2">{item.price}</Text>
                            <View className="flex-row justify-between">

                                <TouchableOpacity style={{ borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignContent: 'center' }} onPress={() => {
                                    handleUpdateFood(item);
                                }}>
                                    <Text style={{ padding: 4, }}>✏️</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignContent: 'center' }} onPress={() => {
                                    handleDeleteFood(item);
                                }}>
                                    <Text style={{ padding: 4, }}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

                {foodList && <CreateModalFood
                    setModalCreateVisible={setModalCreateVisible}
                    modalCreateVisible={modalCreateVisible}
                    foodList={foodList}
                    setFoodList={setFoodList} />}

                {
                    food && (
                        <SelectActionItemModal
                            handleUpdateImage={() => handleUpdateImageMovie(food)}
                            handleUpdateItem={() => handleUpdateItem(food)}
                            isActionModalVisible={modalSelectionVisible}
                            setIsActionModalVisible={setModalSelectionVisible}
                            food={food}

                        />
                    )
                }
                {
                    food && foodList && (
                        <UpdateModalFood
                            setModalUpdateVisible={setModalUpdateItem}
                            modalUpdateVisible={modalUpdateItem}
                            food={food}
                            foodList={foodList}
                            setFoodList={setFoodList}
                        />
                    )
                }
                {
                    food && foodList && (
                        <UpdateImageModalFood
                            setModalUpdateVisible={setModalUpdateImageItem}
                            modalUpdateVisible={modalUpdateImageItem}
                            food={food}
                            foodList={foodList}
                            setFoodList={setFoodList}
                        />
                    )
                }
                {
                    food && foodList && (
                        <DeleteModalFood
                            setModalDeleteVisible={setModalDeleteVisible}
                            modalDeleteVisible={modalDeleteVisible}
                            food={food}
                            foodList={foodList}
                            setFoodList={setFoodList}
                        />
                    )
                }
                {/* Modal thêm món */}
                <View>
                    <TouchableOpacity onPress={() => handleOpenAddModal()}>
                        <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
                            <Ionicons name="add" size={28} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </>


    )
}

const styles = StyleSheet.create({

    fabButton: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default Food;