import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ShowTime, ShowTimes } from '@/constants/dateTime';

interface Props {
    modalDeleteShowTime: boolean;
    setModalDeleteShowTime: (value: boolean) => void;

    cinemaName: string;
    date: string;
    dateSelected: Date;

    showtimeSelected: ShowTime;
    setShowTime: (value: ShowTime) => void;

    listShowTime: ShowTimes[];
    setListShowTime: (value: ShowTimes[]) => void;

    indexArray: number; // để lấy ra thứ tự của rạp chiếu phim
    indexSelected: number; // để lấy ra thứ tự của thời gian chiếu
}

const DeleteTimeModal = ({
    modalDeleteShowTime,
    setModalDeleteShowTime,
    cinemaName,
    date,
    showtimeSelected,
    setShowTime,
    listShowTime,
    setListShowTime,
    indexArray,
    indexSelected,
    dateSelected
}: Props) => {

    const [tempTime, setTempTime] = useState<Date>(new Date());

    useEffect(() => {
        setTempTime(new Date(new Date(showtimeSelected.time).getTime() - 7 * 60 * 60 * 1000)); // Chuyển đổi thời gian từ UTC+7 sang UTC+0
    }, [showtimeSelected]);

    const handleDelete = () => {
        // Xóa thời gian chiếu
        try {

            const arrayTimeCinemaDate: ShowTime[] = listShowTime[indexArray][cinemaName]
            const newArrayTimeCinemaDate = arrayTimeCinemaDate.filter(item => item.id !== showtimeSelected.id);

            const newListShowTime = listShowTime.map((item, index) => {
                if (index === indexArray) {
                    return {
                        ...item,
                        [cinemaName]: newArrayTimeCinemaDate
                    };
                }
                return item;
            });
            // xóa xong cập nhật lại selectedshowtimeSelected để mấy cái khác còn lấy được
            const initShowTime: ShowTime = {
                id: '1',
                hour: dateSelected.getHours(),
                minute: dateSelected.getMinutes(),
                time: dateSelected.toISOString(),
            }
            setShowTime(initShowTime);
            setListShowTime(newListShowTime);


        } catch (error) {
            console.error("Error deleting showtime:", error);
        }
        setModalDeleteShowTime(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalDeleteShowTime}
            onRequestClose={() => setModalDeleteShowTime(false)}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>🗑 Xác nhận xóa lịch chiếu</Text>
                        <Pressable onPress={() => setModalDeleteShowTime(false)}>
                            <AntDesign name="closecircleo" size={24} color="#555" />
                        </Pressable>
                    </View>

                    {/* Nội dung */}
                    {tempTime && <Text style={styles.message}>
                        Bạn có chắc muốn xóa thời gian chiếu của rạp {cinemaName} vào ngày {date} lúc{' '}
                        {tempTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} không?
                    </Text>}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => setModalDeleteShowTime(false)}
                        >
                            <Text style={styles.cancelText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={handleDelete}
                        >
                            <Text style={styles.deleteText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteTimeModal;

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111',
        flex: 1,
        marginRight: 10,
    },
    message: {
        fontSize: 16,
        color: '#333',
        marginVertical: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 10,
    },
    cancelButton: {
        backgroundColor: '#f1f5f9',
    },
    deleteButton: {
        backgroundColor: '#ef4444',
    },
    cancelText: {
        color: '#333',
        fontWeight: '600',
    },
    deleteText: {
        color: '#fff',
        fontWeight: '600',
    },
});
