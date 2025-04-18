import { Link } from "expo-router";
import { View, Text, Button, TouchableOpacity, Modal, TextInput, Image, FlatList } from "react-native";
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { foodData, FoodItem } from "@/constants/food";

const Food = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [items, setItems] = useState<FoodItem[]>(foodData);

    return (

        <View className="flex-1 bg-gray-100 px-4 pt-6">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-bold text-gray-800">Món ăn</Text>
                <TouchableOpacity
                    className="bg-orange-500 p-2 rounded-full"
                    onPress={() => setModalVisible(true)}
                >
                    <AntDesign name="pluscircleo" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* List món ăn */}
            <FlatList
                data={foodData}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <View className="bg-white rounded-xl shadow p-3 mb-4 w-[48%]">
                        <Image source={item.image} className="w-full h-28 rounded-lg mb-2" resizeMode="cover" />
                        <Text className="font-semibold text-base text-gray-800">{item.name}</Text>
                        <Text className="text-sm text-gray-500 mb-2">{item.price}</Text>
                        <View className="flex-row justify-between">
                            <TouchableOpacity className="bg-yellow-400 px-2 py-1 rounded-lg">
                                <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-red-500 px-2 py-1 rounded-lg">
                                <AntDesign name="delete" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Modal thêm món */}
            <Modal transparent visible={modalVisible} animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/50 px-4">
                    <View className="bg-white p-5 rounded-xl w-full">
                        <Text className="text-lg font-bold mb-3">Thêm món ăn</Text>
                        <TextInput placeholder="Tên món" className="border px-3 py-2 rounded-lg mb-2" />
                        <TextInput placeholder="Giá" keyboardType="numeric" className="border px-3 py-2 rounded-lg mb-4" />
                        <View className="flex-row justify-end space-x-3">
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text className="text-gray-600">Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg">
                                <Text className="text-white">Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>


    )
}

export default Food;