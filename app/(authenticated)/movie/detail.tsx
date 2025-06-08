import { MovieDetailData, TextAgeRating } from "@/constants/film";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Button, Linking } from "react-native";
import { FONT_FAMILY } from "@/constants/font";
import React, { useEffect, useState } from "react";
import UpdateModalMovie from "@/Components/Modals/Update.Modal.Movie";
import { useMovieContext } from "@/Components/Context/MoiveProvider";
import { LinearGradient } from "expo-linear-gradient";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";
import { colors } from "@/constants/color";


const Details = () => {

    const navigation = useNavigation();
    const { id, title } = useLocalSearchParams<{ id: string, title: string }>();
    // nhận vào id film để fetch film details
    const [filmId, setFilmId] = useState<string>(id);
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

    const getTextAgeRating = (ageRating: string) => {
        return TextAgeRating[ageRating as keyof typeof TextAgeRating] || 'Unknown';
    }

    useFocusEffect(
        React.useCallback(() => {
            if (!id) {
                console.error("No film ID provided");
                return;
            }
            const fetchFilmDetails = async () => {
                try {
                    const response = await axiosClient.get(`${API.getFilmDetail}/${filmId}`)
                    const data = response.data;
                    console.log("Response from API:", filmId);
                    console.log("Fetched film details:", response.data);
                    setFilmDetail(data);
                    // Từ film data nhận được thì set lại title các thứ
                    console.log("Film details fetched:", data);
                } catch (error) {
                    console.error("Error fetching film details:", error);
                }
            }

            fetchFilmDetails();
            // setFilmDetail(MovieDetailData);

            if (title) {
                navigation.setOptions({
                    headerTitle: `${title} Details`,
                });
            }
            console.log("Film ID:", filmDetail);
        }, [filmId, navigation]))

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {filmDetail && (
                    <>
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View>
                                <ImageBackground
                                    source={{ uri: filmDetail.posterUrl }}
                                    style={{ width: '100%', height: 250 }}
                                >
                                    <LinearGradient
                                        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.1)']}
                                        style={{ flex: 1 }}
                                    >
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity style={styles.videoContainer} onPress={handleOpenYouTube}>
                                                <Ionicons
                                                    name="play-circle"
                                                    size={70}
                                                    color="#fff"
                                                    style={styles.playIcon}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>
                                </ImageBackground>
                            </View>

                            <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
                                <View style={[styles.infoBlock, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                    <Image source={{ uri: filmDetail.posterUrl }} style={styles.posterImage} />
                                    <View style={{ alignItems: 'flex-start', flex: 1, marginLeft: 10 }}>
                                        <Text style={styles.title}>{filmDetail.title}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.primary, borderColor: '#337ab7', borderWidth: 1, borderRadius: 10, fontFamily: FONT_FAMILY, padding: 4 }}>
                                            {getTextAgeRating(filmDetail.ageRating)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>DIRECTOR:</Text>
                                    <Text numberOfLines={2} style={styles.value}>{filmDetail.director}</Text>
                                </View>

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>CAST:</Text>
                                    <Text numberOfLines={3} style={styles.value}>{filmDetail.actors.join(', ')}</Text>
                                </View>

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>GENRE:</Text>
                                    <Text numberOfLines={3} style={styles.value}>{filmDetail.genres.join(', ')}</Text>
                                </View>

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>RUN TIME:</Text>
                                    <Text style={styles.value}>{filmDetail.duration.toString()} Minutes</Text>
                                </View>

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>LANGUAGE:</Text>
                                    <Text style={styles.value}>{filmDetail.language}</Text>
                                </View>

                                <View style={styles.infoBlock}>
                                    <Text style={styles.label}>RELEASE DATE:</Text>
                                    {filmDetail?.releaseDate && (
                                        <Text style={styles.value}>{new Date(filmDetail.releaseDate).toLocaleDateString()}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={{ borderColor: '#ccc', borderTopWidth: 1, marginTop: 10, padding: 16 }}>
                                <Text style={[styles.value, { textAlign: 'justify', lineHeight: 24 }]} numberOfLines={10}>
                                    {filmDetail.description}
                                </Text>
                            </View>
                        </ScrollView>

                        {filmDetail && (
                            <UpdateModalMovie
                                modalUpdateVisible={editModalVisible}
                                setModalUpdateVisible={setEditModalVisible}
                                movie={filmDetail}
                                listMovie={listMovie}
                                setListMovie={setListMovie}
                            />
                        )}

                        <TouchableOpacity onPress={() => setEditModalVisible(true)}>
                            <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
                                <Ionicons name="add" size={28} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                )}
            </SafeAreaView>
        </>

    )
}


const styles = StyleSheet.create({

    videoContainer: {
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
    },
    posterImage: {
        width: 135,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#337ab7',
        textAlign: 'center',
        marginBottom: 8,
    },
    infoBlock: {
        marginBottom: 14,
        flexDirection: 'row',
    },
    label: {
        fontWeight: '900',
        color: '#337ab7',
        fontSize: 16,
        marginBottom: 4,
        flex: 1,
        marginRight: 30,
    },
    value: {
        color: '#222',
        fontSize: 16,
        lineHeight: 22,
        flex: 2,
        fontWeight: '500'
    },
    playIcon: {
        zIndex: 1,
        opacity: 0.9,
    },
    fabButton: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        backgroundColor: '#337ab7',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

{/* <ImageBackground
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
</ImageBackground> */}


export default Details;