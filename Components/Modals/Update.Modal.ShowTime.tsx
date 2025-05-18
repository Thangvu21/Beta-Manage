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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { ShowTime, ShowTimes } from '@/constants/dateTime';

interface Props {
    modalUpdateShowTime: boolean;
    setModalUpdateShowTime: (value: boolean) => void;
    cinemaName: string;

    date: string;
       
    showtimeSelected: ShowTime;
    setShowTimeSelected: (value: ShowTime) => void;
    
    listShowTime: ShowTimes[];
    setListShowTime: (value: ShowTimes[]) => void;

    indexArray: number; // để lấy ra thứ tự của rạp chiếu phim
}

const UpdateTimeModal = ({
    modalUpdateShowTime,
    setModalUpdateShowTime,
    cinemaName,
    showtimeSelected,
    setShowTimeSelected,
    listShowTime,
    setListShowTime,
    indexArray,
    date,
}: Props) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [tempTime, setTempTime] = useState<Date>(new Date()) ;


    useEffect(() => {
        setTempTime(new Date(showtimeSelected.time));
    }, [showtimeSelected]);

    const handleConfirm = () => {
        setTempTime(tempTime);
        setModalUpdateShowTime(false);
    };

    const handleUpdate = () => {
        const newTime = new Date(showtimeSelected.time);
        newTime.setHours(tempTime.getHours());
        newTime.setMinutes(tempTime.getMinutes());

        const updatedShowTime = {
            id: Math.random().toString(36).substring(2, 15),
            hour: newTime.getHours(),
            minute: newTime.getMinutes(),
            time: newTime.toISOString(),
        };

        const arrayTimeCinemaDate: ShowTime[] = listShowTime[indexArray][cinemaName];
        const newArrayTimeCinemaDate = arrayTimeCinemaDate.map(item => {
            if (item.id === showtimeSelected.id) {
                return updatedShowTime;
            }
            return item;
        });
        const newListShowTime = listShowTime.map((item, index) => {
            if (index === indexArray) {
                return {
                    ...item, // giữ lại các rạp khác
                    [cinemaName]: newArrayTimeCinemaDate, // cập nhật rạp này
                };
            }
            return item;
        });
        setListShowTime(newListShowTime);
        setShowTimeSelected(updatedShowTime);
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
                            🛠 Cập nhật thời gian cho rạp {cinemaName} ngày {date}
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
