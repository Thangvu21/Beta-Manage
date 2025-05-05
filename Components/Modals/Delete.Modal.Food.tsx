import { FoodItem } from '@/constants/food';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
const API_URL = Constants.manifest?.extra?.API_URL;

const { width, height } = Dimensions.get('window');

interface props {
    modalDeleteVisible: boolean,
    setModalDeleteVisible: (visible: boolean) => void
    food: FoodItem | undefined,
    foodList: FoodItem[],
    setFoodList: (foodList: FoodItem[]) => void
}

const DeleteModalFood = ({
    modalDeleteVisible,
    setModalDeleteVisible,
    food,
    foodList,
    setFoodList
}: props) => {

    const handleDelete = async () => {

        try {
            const res = await axios.delete(`${API_URL}/booking/admin/item/${food?.id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            console.log("Xóa thành công:", res.data);
            // Có thể hiển thị alert hoặc cập nhật UI tại đây
          } catch (error: any) {
            if (axios.isAxiosError(error)) {
              const status = error.response?.status;
              const message = error.response?.data?.message || "Đã xảy ra lỗi khi xóa.";
              console.error(`Lỗi khi xóa: ${status} - ${message}`);
              Alert.alert("Lỗi", message);
            } else {
              console.error("Lỗi không xác định:", error);
              Alert.alert("Lỗi", "Đã xảy ra lỗi không xác định.");
            }
          }
        
        if (food) {
            const updatedFoodList = foodList.filter(item => item.id !== food.id);
            setFoodList(updatedFoodList);
        }
        setModalDeleteVisible(false);
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDeleteVisible}
                onRequestClose={() => {
                    setModalDeleteVisible(!modalDeleteVisible);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {/* <AlertTriangle className="inline-block mr-2" size={20} /> */}
                                Xóa món ăn
                            </Text>
                        </View>
                        <Text style={styles.modalText}>
                            Bạn có chắc chắn muốn xóa món ăn <Text style={{ fontWeight: 'bold' }}>{food?.name}</Text> không?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => handleDelete()} style={styles.deleteButton}>
                                {/* <Trash2 className="mr-2" size={16} /> */}
                                <Text style={styles.deleteButtonText}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setModalDeleteVisible(false) }} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )

}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#f9f871', // Soft yellow background,
        borderRadius: 16, // More rounded corners
        padding: 24,
        width: '90%', // Slightly wider
        maxWidth: 400, // Maximum width for larger screens
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3, // Slightly stronger shadow
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1, // Add a border
        borderColor: '#f0e68c',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: '#f0e68c',
    },
    modalTitle: {
        fontSize: 22, // Larger title
        fontWeight: 'bold',
        color: '#8b4513',  // Darker title color
        display: 'flex',
        alignItems: 'center'
    },
    closeButton: {
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#fff',
    },
    modalText: {
        fontSize: 18, // Increased font size
        color: '#555', // Darker text
        marginBottom: 24, // Increased margin
        lineHeight: 26,  // Improved line height for readability
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    deleteButton: {
        backgroundColor: '#dc143c', // Stronger red
        paddingVertical: 12, // Increased padding
        paddingHorizontal: 24,
        borderRadius: 12, // More rounded
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 18, // Increased font size
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#e0e0e0', // Lighter gray
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cancelButtonText: {
        color: '#333', // Darker gray
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DeleteModalFood;

