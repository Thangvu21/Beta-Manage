import { Modal, Text, TouchableOpacity, View } from "react-native"

interface Props {

    isActionModalVisible: boolean,
    setIsActionModalVisible: (visible: boolean) => void,
    handleEdit: () => void,
    handleDelete: () => void
}

const SelectActionModal = ({
    isActionModalVisible,
    setIsActionModalVisible,
    handleEdit,
    handleDelete
}: Props) => {



    return (
        <>
            <Modal visible={isActionModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.button} onPress={handleEdit}>
                                <Text style={[styles.buttonText, { color: '#007AFF' }]}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                                <Text style={[styles.buttonText, { color: '#FF3B30' }]}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.button} onPress={() => setIsActionModalVisible(false)}>
                                <Text style={[styles.buttonText, { color: '#FF3B30' }]}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: 'rgba(0,0,0,0.4)', // nền đen mờ
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flexDirection: 'column',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 24,
        alignItems: 'center',
        elevation: 5, // bóng đổ Android
        shadowColor: '#000', // bóng đổ iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    button: {
        flex: 1,
        borderRightColor: '#ccc',
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default SelectActionModal;