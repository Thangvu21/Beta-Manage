import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Button, Linking, Alert } from "react-native";
import { FONT_FAMILY } from "@/constants/font";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import { ShowTimes, sampleShowTimes, sampleShowDate, ShowTime } from "@/constants/dateTime";
import { Cinema, sampleCinemas, sampleNameCinemas } from "@/constants/cinema";
import { colors } from "@/constants/color";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
import CreateTimeModal from "@/Components/Modals/Create.Modal.ShowTime";
import UpdateTimeModal from "@/Components/Modals/Update.Modal.ShowTime";
import DeleteTimeModal from "@/Components/Modals/Delete.Modal";

// export interface CinemaShowTime {
//     name: string;
//     id: string;
// }


const Details = () => {

    const navigation = useNavigation();
    const router = useRouter();
    // id film
    const { id, title, posterUrl } = useLocalSearchParams<{ id: string, title: string, posterUrl: string }>();

    const [listShowDate, setListShowDate] = useState<Date[]>([]);
    const [listShowTime, setListShowTime] = useState<ShowTimes[]>([]);

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [selectedIndexCinema, setSelectedIndexCinema] = useState<number>(0);

    const [modalCreateShowTime, setModalCreateShowTime] = useState(false);
    const [modalEditShowTime, setModalEditShowTime] = useState(false);
    const [modalDeleteShowTime, setModalDeleteShowTime] = useState(false);

    const [timeSeleted, setTimeSelected] = useState<ShowTime>({} as ShowTime);
    const [dateSelected, setDateSelected] = useState<Date>(new Date());
    const [betaSelected, setBetaSelected] = useState<Cinema>({} as Cinema);

    // hiển thị ra all cinema xong rồi mới chọn
    // const [cinemaShowTImeList, setCinemaShowtimeList] = useState<CinemaShowTime[]>([]);
    const [cinemaList, setCinemaList] = useState<Cinema[]>([]);


    // chọn ngày trước
    const createListDate = () => {
        const dates: Date[] = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(); // luôn khởi tạo mới
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };


    const chooseDate = (date: Date) => {
        setDateSelected(date)
    }

    const chooseIndex = (index: number) => {
        setSelectedIndex(index);
        console.log('Index đã chọn trong mảng show time:', index);
    }

    // chọn rạp
    const handleSelectedBeta = (beta: Cinema) => {
        // console.log('Beta đã chọn:', beta);
        setBetaSelected(beta);
    }

    const initCreateShowTime = () => {
        const initShowTime: ShowTime = {
            id: '1',
            hour: dateSelected.getHours(),
            minute: dateSelected.getMinutes(),
            time: dateSelected.toISOString(),
        }
        setTimeSelected(initShowTime);
    }

    // chọn thời gian
    const handleSelectedTime = (showtime: ShowTime) => {
        console.log('Thời gian đã chọn:', showtime);
        setTimeSelected(showtime);
    }

    const handleEditShowTime = () => {
        setModalEditShowTime(true);
    };

    const handleDeleteShowTime = () => {
        setModalDeleteShowTime(true);
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

    const handleChooseDate = async (index: number) => {
        try {
            const response = await axiosClient.get(`${API.getAllShowtime}/${id}`, {
                params: {
                    page: index
                }
            })
            const data = response.data;
            // console.log('Showtimes data:', data);
            const newShowTimes: ShowTimes[] = []
            for (const cinemaName in data) {
                newShowTimes.push({
                    [cinemaName]: data[cinemaName].map((showtime: ShowTime) => ({
                        id: showtime.id,
                        hour: new Date(showtime.time).getHours(),
                        minute: new Date(showtime.time).getMinutes(),
                        time: showtime.time, // Giữ nguyên định dạng ISO
                    }))
                })
            }
            setListShowTime(newShowTimes);
            // Từ film data nhận được thì set lại title các thứ
            // console.log("List showtime:", JSON.stringify(listShowTime, null, 2));

        } catch (error) {
            console.error("Error fetching film details:", error);
        }
    }



    useEffect(() => {
        const fetchFilmShowTime = async () => {
            try {
                const response = await axiosClient.get(`${API.getAllShowtime}/${id}`, {
                    params: {
                        page: 0
                    }
                })
                const data = response.data;
                // console.log('Showtimes data:', data);
                const newShowTimes: ShowTimes[] = []
                for (const cinemaName in data) {
                    newShowTimes.push({
                        [cinemaName]: data[cinemaName].map((showtime: ShowTime) => ({
                            id: showtime.id,
                            hour: new Date(showtime.time).getHours(),
                            minute: new Date(showtime.time).getMinutes(),
                            time: showtime.time, // Giữ nguyên định dạng ISO
                        }))
                    })
                }
                setListShowTime(newShowTimes);
                // Từ film data nhận được thì set lại title các thứ
                // console.log("List showtime:", JSON.stringify(listShowTime, null, 2));

            } catch (error) {
                console.error("Error fetching film details:", error);
            }
        }

        const fetchCinemaList = async () => {
            try {
                const response = await axiosClient.get(API.getAllCinema)
                const listCinema: Cinema[] = []
                for (const key in response.data) {
                    listCinema.push(...response.data[key])
                }
                setCinemaList(listCinema);
                // console.log('Cinema list:', cinemaList);
            } catch (error) {
                Alert.alert("Error", "Failed to fetch cinema list. Please try again later.");
                console.error("Error fetching cinema list:", error);
            }
        }

        fetchFilmShowTime();
        fetchCinemaList();

        // khi lấy ra time phải sort 
        setListShowDate(createListDate());
        setDateSelected(new Date());

        if (title) {
            navigation.setOptions({
                headerTitle: `${title} Showtime`,
            });
        }
    }, [id, navigation]);

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
                    {listShowDate && listShowDate.map((item, index) => {
                        const isSelected = index === selectedIndex;
                        const day = getDate(item);
                        const label = getDayLabel(item);

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    chooseDate(item);
                                    chooseIndex(index);
                                    handleChooseDate(index)
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

                {cinemaList && cinemaList.map((cinema, index) => {

                    const showTimes =
                        listShowTime.find(item => Object.keys(item)[0] === cinema.name)?.[cinema.name] ?? [];
                    return (
                        <>
                            <View
                                key={cinema.id}
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
                                            {cinema.name}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            initCreateShowTime();
                                            handleSelectedBeta(cinema);
                                            setSelectedIndexCinema(index);
                                            setModalCreateShowTime(true);
                                            // setTimeSelected(cinema[cinemaName][selectedIndex]);
                                        }}
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
                                    {showTimes.map((timeCinema, timeIndex) => (
                                        <View style={styles.showtimeContainer} key={timeCinema.id}>
                                            <TouchableOpacity style={styles.timeButton}>
                                                <Text style={styles.timeText}>
                                                    {new Date(timeCinema.time).toISOString().substring(11, 16)}
                                                    {/* {new Date(timeCinema.time).toLocaleTimeString()} */}
                                                </Text>
                                            </TouchableOpacity>

                                            <View style={styles.iconButtonRow}>
                                                {/* <TouchableOpacity style={{ borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignContent: 'center' }}
                                                        onPress={
                                                            () => {
                                                                handleSelectedBeta(cinema)
                                                                handleSelectedTime(timeCinema)
                                                                handleEditShowTime()
                                                                setSelectedIndexCinema(index);
                                                                setSelectedIndex(timeIndex)
                                                            }}>
                                                        <Text style={styles.iconButton}>✏️</Text>
                                                    </TouchableOpacity> */}


                                                <TouchableOpacity style={{ borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignContent: 'center' }}
                                                    onPress={() => {
                                                        handleSelectedBeta(cinema)
                                                        handleSelectedTime(timeCinema)
                                                        handleDeleteShowTime()
                                                        setSelectedIndexCinema(index);
                                                        setSelectedIndex(timeIndex)
                                                    }}>
                                                    <Text style={styles.iconButton}>🗑️</Text>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    ))
                                    }
                                </ScrollView>
                            </View>
                        </>
                    )
                })

                }
            </View>

            {
                dateSelected && listShowTime && betaSelected && (
                    <CreateTimeModal
                        listShowTime={listShowTime}
                        setListShowTime={setListShowTime}
                        modalCreateShowTime={modalCreateShowTime}
                        setModalCreateShowTime={setModalCreateShowTime}
                        cinemaSelected={betaSelected}
                        showtimeSelected={timeSeleted}
                        date={getDate(dateSelected).toString()}
                        indexArray={selectedIndexCinema}
                        dateSelected={dateSelected}
                        idFilm={id}
                    />
                )
            }
            {/* {
                dateSelected && listShowTime && timeSeleted && betaSelected && (
                    <UpdateTimeModal
                        listShowTime={listShowTime}
                        setListShowTime={setListShowTime}
                        modalUpdateShowTime={modalEditShowTime}
                        setModalUpdateShowTime={setModalEditShowTime}
                        cinemaSelected={betaSelected}
                        date={getDate(dateSelected).toString()}
                        showtimeSelected={timeSeleted}
                        setShowTimeSelected={setTimeSelected}
                        indexArray={selectedIndexCinema}
                        idFilm={id}
                    />
                )
            } */}
            {
                dateSelected && listShowTime && timeSeleted && betaSelected && (
                    <DeleteTimeModal

                        listShowTime={listShowTime}
                        setListShowTime={setListShowTime}
                        modalDeleteShowTime={modalDeleteShowTime}
                        setModalDeleteShowTime={setModalDeleteShowTime}
                        cinemaSelected={betaSelected}
                        date={getDate(dateSelected).toString()}
                        dateSelected={dateSelected}
                        showtimeSelected={timeSeleted}
                        indexSelected={selectedIndex}
                        setShowTime={setTimeSelected}
                        indexArray={selectedIndexCinema}

                    />
                )
            }
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