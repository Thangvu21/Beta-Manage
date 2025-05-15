import { FilmData, MovieDetailData } from "@/constants/film";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Button, Linking } from "react-native";
import { FONT_FAMILY } from "@/constants/font";
import { useEffect, useState } from "react";
import { images } from "@/constants/image";
import UpdateModalMovie from "@/Components/Modals/Update.Modal.Movie";
import axios from "axios";
import { useMovieContext } from "@/Components/Context/MoiveProvider";
import { LinearGradient } from "expo-linear-gradient";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";


const Details = () => {

    const navigation = useNavigation();
    const { id, title } = useLocalSearchParams<{ id: string, title: string }>();
    // nhận vào id film để fetch film details
    const [filmDetail, setFilmDetail] = useState<MovieDetailData>();
    const [editModalVisible, setEditModalVisible] = useState(false);

    const { listMovie, setListMovie } = useMovieContext();


    const handleOpenYouTube = () => {
        if (filmDetail && filmDetail.trailerUrl) {
            Linking.openURL(filmDetail.trailerUrl).catch(err =>
                console.error("Failed to open URL:", err)
            );
        } else {
            Linking.openURL(MovieDetailData.trailerUrl).catch(err =>
                console.error("Failed to open URL:", err)
            );
        }
    };

    useEffect(() => {
        const fetchFilmDetails = async () => {
            try {
                const response = await axiosClient.get(`${API.getFilmDetail}/${id}`)
                const data = response.data;
                setFilmDetail(data);
                // Từ film data nhận được thì set lại title các thứ
            } catch (error) {
                console.error("Error fetching film details:", error);
            }
        }

        fetchFilmDetails();

        if (title) {
            navigation.setOptions({
                headerTitle: title,
            });
        }
    }, [id, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {filmDetail && (
                <ImageBackground
                    source={{ uri: filmDetail.posterUrl }}
                    style={styles.background}
                    blurRadius={12}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.videoContainer}>
                            <TouchableOpacity onPress={handleOpenYouTube}>
                                <Image
                                    source={{ uri: filmDetail.posterUrl }}
                                    style={styles.videoThumbnail}
                                />
                                <Ionicons
                                    name="play-circle"
                                    size={64}
                                    color="#fff"
                                    style={styles.playIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.overlay}>
                            <Image source={{ uri: filmDetail.posterUrl }} style={styles.posterImage} />
                            <Text style={styles.title}>{filmDetail.title}</Text>
                            <Text style={styles.ageRating}>No children under 16 years old</Text>

                            <View style={styles.infoBlock}>
                                <Text style={styles.label}>DIRECTOR</Text>
                                <Text style={styles.value}>{filmDetail.director}</Text>
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.label}>CAST</Text>
                                <Text style={styles.value}>{filmDetail.actors.join(', ')}</Text>
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.label}>GENRE</Text>
                                <Text style={styles.value}>{filmDetail.genres.join(', ')}</Text>
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.label}>RUN TIME</Text>
                                <Text style={styles.value}>{filmDetail.duration.toString()} Minutes</Text>
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.label}>LANGUAGE</Text>
                                <Text style={styles.value}>{filmDetail.language}</Text>
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.label}>RELEASE DATE</Text>
                                {filmDetail?.releaseDate && (
                                    <Text style={styles.value}>{new Date(filmDetail.releaseDate).toLocaleDateString()}</Text>
                                )}
                            </View>

                            <View style={styles.infoBlock}>
                                <Text style={styles.label}>DESCRIPTION</Text>
                                <Text style={styles.value}>{filmDetail.description}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    {filmDetail && <UpdateModalMovie
                        modalUpdateVisible={editModalVisible}
                        setModalUpdateVisible={setEditModalVisible}
                        movie={filmDetail}
                        listMovie={listMovie}
                        setListMovie={setListMovie}
                    />}
                    <TouchableOpacity onPress={() => setEditModalVisible(true)}>
                        <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
                            <Ionicons name="add" size={28} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </ImageBackground>
            )}
        </SafeAreaView>

    )
}

const styles1 = StyleSheet.create({
    // c1
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 10,
        borderRadius: 16,
    },
    posterImage: {
        width: 300,
        height: 400,
        borderRadius: 16,
    },
    textTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    timeTitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: FONT_FAMILY
    },

    // modal button
    fabButton: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        backgroundColor: '#337ab7',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollContainer: {
        alignItems: 'center',
        padding: 20,
    },
    videoContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    video: {
        width: 340,
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.65)',
        borderRadius: 20,
        padding: 20,
        width: '100%',
    },
    posterImage: {
        width: '100%',
        height: 280,
        borderRadius: 16,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    ageRating: {
        fontSize: 14,
        color: '#f77',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoBlock: {
        marginBottom: 14,
    },
    label: {
        fontWeight: '600',
        color: '#ccc',
        fontSize: 13,
    },
    value: {
        color: '#fff',
        fontSize: 15,
        marginTop: 4,
        lineHeight: 20,
    },
    videoThumbnail: {
        width: 340,
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    playIcon: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        zIndex: 1,
        opacity: 0.8,
    },

    // button modify
    fabButton: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        backgroundColor: '#337ab7',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});



export default Details;