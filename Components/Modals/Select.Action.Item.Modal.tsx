import { FoodItem } from "@/constants/food";
import { Modal, Text, TouchableOpacity, View } from "react-native"

interface Props {
    isActionModalVisible: boolean,
    setIsActionModalVisible: (visible: boolean) => void,
    handleUpdateItem: (food : FoodItem) => void,
    handleUpdateImage: (food : FoodItem) => void,
    food: FoodItem,
}

const SelectActionItemModal = ({
    food,
    isActionModalVisible,
    setIsActionModalVisible,
    handleUpdateImage,
    handleUpdateItem
}: Props) => {



    return (
        <>
            <Modal visible={isActionModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>

                        {/* Nút sửa */}
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleUpdateItem(food)}>
                            <Text style={[styles.optionText, { color: '#007AFF' }]}>Sửa item</Text>
                        </TouchableOpacity>

                        {/* Nút xóa */}
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleUpdateImage(food)}>
                            <Text style={[styles.optionText, { color: '#FF3B30' }]}>Sửa ảnh item</Text>
                        </TouchableOpacity>

                    </View>

                    {/* Khoảng cách */}
                    <View style={{ height: 8 }} />

                    {/* Nút đóng riêng */}
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => setIsActionModalVisible(false)}>
                            <Text style={[styles.optionText, { color: '#007AFF' }]}>Đóng</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

        </>
    )
}

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end', // modal trượt từ dưới lên
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    optionButton: {
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
    },
});

export default SelectActionItemModal;