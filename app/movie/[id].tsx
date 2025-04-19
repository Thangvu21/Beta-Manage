import { FilmData } from "@/constants/film";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FONT_FAMILY } from "@/constants/font";
import { useState } from "react";
import { images } from "@/constants/image";



const Details = () => {

    const { id } = useLocalSearchParams<{ id: string }>();
    const film = FilmData.find((item) => item.id === id);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const handleUpdateMovie = () => {

        setEditModalVisible(true);
    }

    return (
        // c1
        <View style={styles.imageContainer}>
            <ImageBackground
                source={{ uri: film?.posterUrl }}
                style={styles.background}
                imageStyle={{}}
                blurRadius={20}
            >
                <View className="absolute top-10 left-5 right-0 bottom-0 ">
                    <Text style={styles.textTitle}>
                        {film?.title}
                    </Text>
                    <Text style={styles.timeTitle}>
                        {film?.releaseDate}
                    </Text>
                </View>
                <View style={styles.overlay}>
                    <Image source={{ uri: film?.posterUrl }} style={styles.posterImage} />
                </View>
            </ImageBackground>
            <TouchableOpacity onPress={() => setEditModalVisible(true)}
                style={styles.fabButton}>

                <Ionicons  name="refresh-circle-outline" size={36} color='black' />

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
        bottom: 60,
        right: 20,
        backgroundColor: '#36D1DC',
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
    }

});

export default Details;