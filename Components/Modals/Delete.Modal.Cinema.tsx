import { API } from '@/constants/api';
import axiosClient from '@/constants/axiosClient';
import { Cinema } from '@/constants/cinema';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props {
  modalDeleteVisible: boolean;
  setModalDeleteVisible: (visible: boolean) => void;
  selectedCinema: Cinema | null;
  setSelectedCinema: (cinema: Cinema | null) => void;
  cinemaList: Cinema[];
  setCinemaList: (cinemaList: Cinema[]) => void;
}

const DeleteModalCinema = ({
    modalDeleteVisible,
    setModalDeleteVisible,
    selectedCinema,
    cinemaList,
    setCinemaList
}: Props) => {

    const handleDelete = async () => {
        try {
            console.log("Xóa rạp chiếu:", selectedCinema?.id);
            const res = await axiosClient.delete(`${API.deleteCinema}/${selectedCinema?.id}`);
            console.log("Xóa thành công:", res.data);
            Alert.alert("Thành công", "Xóa rạp chiếu thành công");
        } catch (error) {
            console.error("Lỗi khi xóa rạp chiếu:", error);
            Alert.alert("Lỗi", "Không thể xóa rạp chiếu");
        }

        if (selectedCinema) {
            const updatedList = cinemaList.filter(item => item.id !== selectedCinema.id);
            setCinemaList(updatedList);
        }
        setModalDeleteVisible(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalDeleteVisible}
            onRequestClose={() => setModalDeleteVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Xóa rạp chiếu</Text>
                    </View>
                    <Text style={styles.modalText}>
                        Bạn có chắc chắn muốn xóa rạp chiếu <Text style={{ fontWeight: 'bold' }}>{selectedCinema?.name}</Text> không?
                    </Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalDeleteVisible(false)} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#f9f871',
        borderRadius: 16,
        padding: 24,
        width: '90%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8b4513',
    },
    modalText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 24,
        lineHeight: 26,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    deleteButton: {
        backgroundColor: '#dc143c',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DeleteModalCinema;
