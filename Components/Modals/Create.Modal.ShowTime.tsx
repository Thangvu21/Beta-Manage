import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ShowTime, ShowTimes } from "@/constants/dateTime";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import { Cinema } from "@/constants/cinema";
export enum TypeShowTime {
    D2 = '2D',
    D3 = '3D',
}


interface props {
    modalCreateShowTime: boolean;
    setModalCreateShowTime: (value: boolean) => void;
    cinemaSelected: Cinema;

    date: string;
    showtimeSelected: ShowTime;
    listShowTime: ShowTimes[];

    setListShowTime: (value: ShowTimes[]) => void;
    indexArray: number; // để lấy ra thứ tự của rạp chiếu phim
    dateSelected: Date;

    idFilm: string;
}

const CreateTimeModal = ({
    modalCreateShowTime,
    setModalCreateShowTime,
    cinemaSelected,
    date,
    listShowTime,
    setListShowTime,
    showtimeSelected,
    dateSelected,
    idFilm
}: props) => {

    const [showTimePicker, setShowTimePicker] = useState(false);
    const [tempTime, setTempTime] = useState(new Date());
    const [showtime, setShowtime] = useState<ShowTime>();
    const [type, setType] = useState<TypeShowTime>(TypeShowTime.D2);

    useEffect(() => {
        const initShowTime: ShowTime = {
            id: '1',
            hour: dateSelected.getHours(),
            minute: dateSelected.getMinutes(),
            time: dateSelected.toISOString(),
        }
        setShowtime(initShowTime);
    }, []);

    const handleConfirm = () => {
        setTempTime(new Date());
        setModalCreateShowTime(false);
    };

    const handleCreate = async () => {


        try {
            const newTime = new Date(Date.UTC(
                new Date(showtimeSelected.time).getFullYear(),
                new Date(showtimeSelected.time).getMonth(),
                new Date(showtimeSelected.time).getDate(),
                tempTime.getHours(),
                tempTime.getMinutes()
            ));

            const response = await axiosClient.post(`${API.createShowtime}`, JSON.stringify({
                cinemaId: cinemaSelected.id,
                filmId: idFilm,
                time: newTime.toISOString(),
                type: type,
            }));
            const data = response.data;
            console.log("Response from server:", data);

            // console.log("newTime", newTime)
            const newShowTime = {
                id: data.id,
                hour: newTime.getHours(),
                minute: newTime.getMinutes(),
                time: newTime.toISOString(),
                type: type,
            }
            const arrayTimeCinemaDate: ShowTime[] = listShowTime.find(item => Object.keys(item)[0] === cinemaSelected.name)?.[cinemaSelected.name] ?? [];

            const newArrayTimeCinemaDate = [...arrayTimeCinemaDate, newShowTime]
            let found = false;
            const newListShowTime = listShowTime.map(item => {
                if (Object.keys(item)[0] === cinemaSelected.name) {
                    found = true;
                    return {
                        ...item,
                        [cinemaSelected.name]: newArrayTimeCinemaDate
                    };
                }
                return item;
            });
            if (!found) {
                newListShowTime.push({ [cinemaSelected.name]: [newShowTime] });
            }
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
                                🎬 Tạo thời gian cho rạp {cinemaSelected.name} vào ngày {date}
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
                            {/* Chọn định dạng */}
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                    Chọn loại định dạng:
                                </Text>

                                <View style={{ flexDirection: 'row', gap: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => setType(TypeShowTime.D2)}
                                        style={{
                                            paddingVertical: 8,
                                            paddingHorizontal: 16,
                                            borderRadius: 8,
                                            backgroundColor: type === TypeShowTime.D2 ? '#e0f2fe' : '#f0f0f0',
                                        }}
                                    >
                                        <Text style={{
                                            color: type === TypeShowTime.D2 ? '#0ea5e9' : '#555',
                                            fontWeight: type === TypeShowTime.D2 ? '700' : '400',
                                        }}>
                                            2D
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => setType(TypeShowTime.D3)}
                                        style={{
                                            paddingVertical: 8,
                                            paddingHorizontal: 16,
                                            borderRadius: 8,
                                            backgroundColor: type === TypeShowTime.D3 ? '#e0f2fe' : '#f0f0f0',
                                        }}
                                    >
                                        <Text style={{
                                            color: type === TypeShowTime.D3 ? '#0ea5e9' : '#555',
                                            fontWeight: type === TypeShowTime.D3 ? '700' : '400',
                                        }}>
                                            3D
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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