import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Button, Linking } from "react-native";
import { FONT_FAMILY } from "@/constants/font";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import { ShowTimes, DateTime, sampleShowTimes, sampleShowDate } from "@/constants/dateTime";
import { sampleCinemas, sampleNameCinemas } from "@/constants/cinema";
import { colors } from "@/constants/color";


const Details = () => {

    const navigation = useNavigation();
    const router = useRouter();
    const { id, title, posterUrl } = useLocalSearchParams<{ id: string, title: string, posterUrl: string }>();
    // nhận vào id film để fetch film details
    // fetch lịch chiếu
    const [listShowTime, setListShowTime] = useState<ShowTimes[]>(sampleShowTimes);
    const [selectedIndex, setSelectedIndex] = useState<Number>(0);

    const handleAddShowTime = (cinemaName: string) => {
        console.log('Thêm lịch chiếu cho:', cinemaName);
        // thêm thời gian mới vào cinemaName tương ứng trong listShowTime
    };

    const handleEditShowTime = (cinemaName: string) => {
        console.log('Sửa lịch chiếu cho:', cinemaName);
        // ví dụ sửa lịch chiếu đầu tiên hoặc mở form chỉnh sửa
    };

    const handleDeleteShowTime = (cinemaName: string) => {
        console.log('Xóa lịch chiếu của:', cinemaName);
        // xóa toàn bộ showtime hoặc từng cái tùy logic
    };

    function getDate(dateStr: Date) {
        const date = new Date(dateStr);
        return date.getDate(); // Trả về ngày: 18
    }

    function getDayLabel(dateStr: Date) {
        const date = new Date(dateStr);
        const today = new Date();
        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        if (isToday) return 'Today';

        // const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = dayNames[date.getDay()];

        return `${month}-${dayName}`;
    }

    const chooseDate = (index: Number) => {
        setSelectedIndex(index)
    }

    useEffect(() => {
        const fetchFilmShowTime = async () => {
            try {
                const response = await axiosClient.get(`${API.getFilmDetail}/${id}`)
                const data = response.data;

                // Từ film data nhận được thì set lại title các thứ
            } catch (error) {
                console.error("Error fetching film details:", error);
            }
        }

        // fetchFilmShowTime();

        // setListShowTime(sampleShowTimes.sort((a, b) => {
        //     const dateA = new Date(a.date);
        //     const dateB = new Date(b.date);
        //     return dateA.getTime() - dateB.getTime();
        // }));

        if (title) {
            navigation.setOptions({
                headerTitle: `${title} Showtime`,
            });
        }
    }, [id, navigation]);

    useEffect(() => {

    }, [selectedIndex]);

    return (

        <ScrollView style={{ paddingBottom: 20, marginBottom: 20 }} showsVerticalScrollIndicator={true}>
            <View>
                <ImageBackground
                    source={{ uri: posterUrl }}
                    style={{ width: '100%', height: 200 }}

                >
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.1)']}
                        style={{ flex: 1 }}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 24, marginBottom: 5 }}>{title}</Text>
                            <TouchableOpacity style={styles.buttonDetail}
                                onPress={() => router.push({
                                    pathname: '/movie/detail',
                                    params: {
                                        id: id,
                                        title: title,
                                    }
                                })}>
                                <Text style={styles.textDetail}>Film Details</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Showtimes</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        gap: 12,
                        marginVertical: 10,
                    }}
                >
                    {sampleShowDate.map((item, index) => {
                        const isSelected = index === selectedIndex;
                        const day = getDate(item.date);
                        const label = getDayLabel(item.date);

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    chooseDate(index);
                                }}
                                activeOpacity={0.8}
                            >
                                <View
                                    style={{
                                        width: 75,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        borderBottomWidth: 2,
                                        borderBottomColor: isSelected ? '#e50914' : 'transparent',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 30, // Tăng từ 18 → 22
                                            fontWeight: isSelected ? 'bold' : '500',
                                            color: isSelected ? '#e50914' : '#444',
                                        }}
                                    >
                                        {day}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 20, // Tăng từ 12 → 14
                                            color: isSelected ? '#e50914' : '#666',
                                            marginTop: 2,
                                        }}
                                    >
                                        {label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Cinemas</Text>
                {listShowTime.map((cinema, index) => {
                    const cinemaName = Object.keys(cinema)[0];

                    return (
                        <View
                            key={index}
                            style={{
                                backgroundColor: '#f9f9f9',
                                borderRadius: 10,
                                marginHorizontal: 10,
                                marginVertical: 5,
                                padding: 10,
                                shadowColor: '#000',
                                shadowOpacity: 0.1,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 4,
                                elevation: 2,
                            }}
                        >

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => {/* xử lý lọc */ }}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                                        {cinemaName}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleAddShowTime(cinemaName)}
                                    style={{
                                        backgroundColor: colors.primary,
                                        paddingVertical: 2,
                                        paddingHorizontal: 2,
                                        borderRadius: 25,
                                    }}
                                >
                                    <Ionicons name="add" size={28} color="#fff" />
                                </TouchableOpacity>


                            </View>

                            {/* Hiển thị danh sách khung giờ chiếu */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                                {cinema[cinemaName].map((timeCinema, timeIndex) => (
                                    <View style={styles.showtimeContainer} key={timeIndex}>
                                        <TouchableOpacity style={styles.timeButton}>
                                            <Text style={styles.timeText}>
                                                {new Date(timeCinema.time).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </Text>
                                        </TouchableOpacity>

                                        <View style={styles.iconButtonRow}>
                                            <TouchableOpacity style={{borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent:'center', alignContent:'center'}} onPress={() => handleEditShowTime(cinemaName)}>
                                                <Text style={styles.iconButton}>✏️</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent:'center', alignContent:'center'}} onPress={() => handleDeleteShowTime(cinemaName)}>
                                                <Text style={styles.iconButton}>🗑️</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )
                })}
            </View>

        </ScrollView >


    )
}


const styles = StyleSheet.create({
    buttonDetail: {
        paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: '#337ab7', borderRadius: 30
    },

    textDetail: {
        fontFamily: FONT_FAMILY, fontWeight: 900, color: '#337ab7', fontSize: 20
    },

    showtimeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        minWidth: 80,
    },

    timeButton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginBottom: 4,
    },

    timeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },

    iconButtonRow: {
        flexDirection: 'row',
        marginTop: 4,
        gap: 12,
    },

    iconButton: {
        padding: 4,
    },
});



export default Details;