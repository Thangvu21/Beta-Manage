import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { ShowTime, ShowTimes } from '@/constants/dateTime';
import { Cinema } from '@/constants/cinema';
import axios from 'axios';
import axiosClient from '@/constants/axiosClient';
import { API } from '@/constants/api';
import { TypeShowTime } from './Create.Modal.ShowTime';


interface Props {
    modalUpdateShowTime: boolean;
    setModalUpdateShowTime: (value: boolean) => void;
    cinemaSelected: Cinema;

    date: string;

    showtimeSelected: ShowTime;
    setShowTimeSelected: (value: ShowTime) => void;

    listShowTime: ShowTimes[];
    setListShowTime: (value: ShowTimes[]) => void;

    indexArray: number; // để lấy ra thứ tự của rạp chiếu phim
    idFilm: string;
}

const UpdateTimeModal = ({
    modalUpdateShowTime,
    setModalUpdateShowTime,
    cinemaSelected,
    showtimeSelected,
    setShowTimeSelected,
    listShowTime,
    setListShowTime,
    date,
    idFilm
}: Props) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [tempTime, setTempTime] = useState<Date>(new Date());
    const [type, setType] = useState<TypeShowTime>(TypeShowTime.D2);

    useEffect(() => {
        setTempTime(new Date(new Date(showtimeSelected.time).getTime() - 7 * 60 * 60 * 1000)); // Chuyển đổi thời gian từ UTC+7 sang UTC+0
    }, [showtimeSelected]);

    const handleConfirm = () => {
        setTempTime(tempTime);
        setModalUpdateShowTime(false);
    };

    const handleUpdate = async () => {
        try {
            const newTime = new Date(showtimeSelected.time);
            newTime.setHours(tempTime.getHours());
            newTime.setMinutes(tempTime.getMinutes());
            const response = await axiosClient.patch(`${API.updateShowtime}/${showtimeSelected.id}`, JSON.stringify({
                cinemaId: cinemaSelected.id,
                filmId: idFilm,
                time: newTime.toISOString(),
                type: type
            }))
            const data = response.data;
            console.log("Update showtime response:", data);

            const updatedShowTime = {
                id: showtimeSelected.id,
                hour: newTime.getHours(),
                minute: newTime.getMinutes(),
                time: newTime.toISOString(),
                type: type,
            };
            // console.log("updatedShowTime", updatedShowTime);

            // không nên dùng id mà nên tim lấy tên
            const arrayTimeCinemaDate: ShowTime[] = listShowTime.find(item => Object.keys(item)[0] === cinemaSelected.name)?.[cinemaSelected.name] ?? [];
            const newArrayTimeCinemaDate = arrayTimeCinemaDate.map(item =>
                item.id === updatedShowTime.id ? updatedShowTime : item
            );
            const newListShowTime = listShowTime.map((item, index) => {
                if (Object.keys(item)[0] === cinemaSelected.name) {
                    return {
                        ...item,
                        [cinemaSelected.name]: newArrayTimeCinemaDate, // <-- SAI
                        // Sửa thành:
                        [cinemaSelected.name]: newArrayTimeCinemaDate,
                    };
                }
                return item;
            });

            setListShowTime(newListShowTime);
            setShowTimeSelected(updatedShowTime);
        } catch (error) {
            console.error('Error updating show time:', error);
            Alert.alert('Lỗi cập nhật',);
        }


        handleConfirm();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalUpdateShowTime}
            onRequestClose={() => setModalUpdateShowTime(false)}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            🛠 Cập nhật thời gian cho rạp {cinemaSelected.name} ngày {date}
                        </Text>
                        <Pressable onPress={() => setModalUpdateShowTime(false)}>
                            <AntDesign name="closecircleo" size={24} color="#555" />
                        </Pressable>
                    </View>

                    {/* Body */}
                    <ScrollView contentContainerStyle={styles.body}>
                        <TouchableOpacity
                            style={styles.timeButton}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text style={styles.timeButtonText}>
                                🕒 Thời gian hiện tại: {tempTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </TouchableOpacity>

                        {showTimePicker && (
                            <DateTimePicker
                                value={tempTime}
                                mode="time"
                                is24Hour={true}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setTempTime(selectedDate);
                                    }
                                    if (Platform.OS !== 'ios') setShowTimePicker(false);
                                }}
                            />
                        )}
                    </ScrollView>

                    {/* Footer */}
                    <TouchableOpacity style={styles.confirmButton} onPress={handleUpdate}>
                        <Text style={styles.confirmButtonText}>Cập nhật thời gian</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default UpdateTimeModal;

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: '100%',
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111',
        flex: 1,
        marginRight: 10,
    },
    body: {
        paddingBottom: 20,
    },
    timeButton: {
        backgroundColor: '#e0f2fe',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    timeButtonText: {
        color: '#0ea5e9',
        fontWeight: '600',
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: '#0ea5e9',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
