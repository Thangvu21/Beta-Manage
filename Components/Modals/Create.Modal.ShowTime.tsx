import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ShowTime, ShowTimes } from "@/constants/dateTime";

interface props {
    modalCreateShowTime: boolean;
    setModalCreateShowTime: (value: boolean) => void;
    cinemaName: string;
    date: string;
    listShowTime: ShowTimes[];
    setListShowTime: (value: ShowTimes[]) => void;
    indexArray: number; // để lấy ra thứ tự của rạp chiếu phim
}

const CreateTimeModal = ({
    modalCreateShowTime,
    setModalCreateShowTime,
    cinemaName,
    date,
    listShowTime,
    setListShowTime,
    indexArray,
}: props) => {

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [tempTime, setTempTime] = useState(new Date());


    const handleConfirm = () => {
        setTempTime(new Date());
        setModalCreateShowTime(false);
    };

    const handleCreate = () => {


        try {

            const newTime = new Date(date)
            newTime.setHours(tempTime.getHours());
            newTime.setMinutes(tempTime.getMinutes());
            const newShowTime = {
                id: Math.random().toString(36).substring(2, 15),
                hour: newTime.getHours(),
                minute: newTime.getMinutes(),
                time: newTime.toISOString(),
            }
            const arrayTimeCinemaDate: ShowTime[] = listShowTime[indexArray][cinemaName]
            console.log("Mảng giờ cũ", arrayTimeCinemaDate)
            const newArrayTimeCinemaDate = [...arrayTimeCinemaDate, newShowTime]
            console.log("Mảng giờ mới", newArrayTimeCinemaDate)
            const newListShowTime = listShowTime.map((item, index) => {
                if (index === indexArray) {
                    return {
                        ...item, // giữ lại các rạp khác
                        [cinemaName]: newArrayTimeCinemaDate // cập nhật rạp này
                    };
                }
                return item;
            });
            setListShowTime(newListShowTime);


        } catch (error) {
            console.log("Error creating show time: ", error);
            Alert.alert("Error", "Failed to create show time.");
        }
        handleConfirm();
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCreateShowTime}
                onRequestClose={() => {
                    setModalCreateShowTime(false);
                }}
            >
                <View style={styles.modalWrapper}>
                    <View style={styles.modalContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>
                                🎬 Tạo thời gian cho rạp {cinemaName} vào ngày {date}
                            </Text>
                            <Pressable onPress={() => setModalCreateShowTime(false)}>
                                <AntDesign name="closecircleo" size={24} color="#555" />
                            </Pressable>
                        </View>


                        <ScrollView contentContainerStyle={styles.body}>
                            {tempTime && <Text>Thời gian bạn chọn là {tempTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>}
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

                            <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
                                <Text style={styles.timeButtonText}>🕒 Chọn giờ chiếu</Text>
                            </TouchableOpacity>

                        </ScrollView>

                        {/* Footer */}
                        <TouchableOpacity style={styles.createButton} onPress={() => handleCreate()}>
                            <Text style={styles.createButtonText}>Tạo lịch chiếu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </>
    )

}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
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
        flex: 1,
        marginRight: 10,
        color: '#111',
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
    createButton: {
        marginTop: 20,
        backgroundColor: '#0ea5e9',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default CreateTimeModal;