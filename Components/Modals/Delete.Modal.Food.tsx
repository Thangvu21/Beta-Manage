import { FoodItem } from '@/constants/food';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

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

    const handleDelete = () => {

        fetch(`localhost:/booking/admin/${food?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json(); // nếu server trả về JSON
        })
            .then((data) => {
                console.log("Xóa thành công:", data);
            })
            .catch((error) => {
                console.error("Lỗi khi xóa:", error);
            });

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

