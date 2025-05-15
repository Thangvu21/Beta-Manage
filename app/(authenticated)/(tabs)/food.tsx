import { Link } from "expo-router";
import { View, Text, Button, TouchableOpacity, Modal, TextInput, Image, FlatList, StyleSheet, SafeAreaView, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { foodData, FoodItem } from "@/constants/food";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CreateModalFood from "@/Components/Modals/Create.Modal.Food";
import UpdateModalFood from "@/Components/Modals/Update.Modal.Food";
import Feather from '@expo/vector-icons/Feather';
import DeleteModalFood from "@/Components/Modals/Delete.Modal.Food";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";

const Food = () => {

    const [foodList, setFoodList] = useState<FoodItem[]>();

    const [food, setFood] = useState<FoodItem>();

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    const [modalEditVisible, setModalEditVisible] = useState(false);

    const [modalCreateVisible, setModalCreateVisible] = useState(false);

    const handleOpenAddModal = () => {
        setModalCreateVisible(true);
    }

    const handleUpdateMovie = (food: FoodItem) => {
        setFood(food);
        setModalEditVisible(true);
    }

    const handleDeleteMovie = (food: FoodItem) => {
        setFood(food);
        setModalDeleteVisible(true);
    }

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axiosClient.get(API.getAllFood);

                console.log("response", response.data);
                if (response.status === 200) {
                    setFoodList(response.data);
                }
            } catch (error) {
                Alert.alert("Error", "Không thể lấy danh sách món ăn");
            }
        }

        fetchFoodList();
    }, [])



    return (

        <>
            <View className="flex-1 bg-gray-100 px-4 pt-20">
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
                                <TouchableOpacity
                                    className="bg-yellow-400 p-2 rounded-lg"
                                    onPress={() => {
                                        handleUpdateMovie(item);
                                    }}>

                                    <AntDesign name="edit" size={24} color="black" />

                                </TouchableOpacity>
                                <TouchableOpacity className="bg-red-500 p-2 rounded-lg"
                                    onPress={() => {
                                        handleDeleteMovie(item);
                                    }}>
                                    <Feather name="x-circle" size={24} color="black" />

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
                    food && foodList && (
                        <UpdateModalFood
                            setModalUpdateVisible={setModalEditVisible}
                            modalUpdateVisible={modalEditVisible}
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