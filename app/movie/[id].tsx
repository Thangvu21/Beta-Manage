import { FilmData } from "@/constants/film";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FONT_FAMILY } from "@/constants/font";



const Details = () => {

    const { id } = useLocalSearchParams<{ id: string }>();
    const film = FilmData.find((item) => item.id === id);

    return (
        // c1
        <View style={styles.imageContainer}>
            <ImageBackground
                source={{ uri: film?.posterUrl }}
                style={styles.background}
                imageStyle={{  }}
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
        </View>
        // c2
        // <View>
        //     <View style={styles.posterCard}>
        //         <Image source={{ uri: film?.posterUrl }} style={styles.posterCardImage} />
        //     </View>
        //     <LinearGradient 
        //         colors={["#1e6fa8", "#70c6e5"]}
        //         style={{ flex: 1, marginTop: 20 }}>
        //         <View style={{ padding: 20 }}>
        //             <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{film?.title}</Text>
        //             <Text style={{ color: '#fff', fontSize: 16 }}>{film?.releaseDate}</Text>
        //         </View>
        //     </LinearGradient>
        // </View>
        // <ScrollView style={styles.container}>
        //     <ImageBackground
        //         source={{ uri: film?.posterUrl }}
        //         style={styles.poster}
        //     >
        //         <LinearGradient
        //             colors={['transparent', '#000']}
        //             style={styles.gradient}
        //         />
        //     </ImageBackground>

        //     <View style={styles.infoContainer}>
        //         <Text style={styles.title}>Alita: Battle Angel</Text>
        //         <Text style={styles.meta}>C16 | IMDb 7.6 | 3D/2D | 130 mins</Text>

        //         <View style={styles.tabs}>
        //             <Text style={styles.tab}>INFORMATION</Text>
        //             <Text style={[styles.tab, { color: '#aaa' }]}>SHOWTIMES</Text>
        //             <Text style={[styles.tab, { color: '#aaa' }]}>REVIEWS</Text>
        //         </View>

        //         <View style={styles.tagsRow}>
        //             <Text style={styles.genre}>Action, Adventure, Romance</Text>
        //             <Text style={styles.director}>Director: Robert Rodriguez</Text>
        //         </View>

        //         <TouchableOpacity style={styles.buyButton}>
        //             <Text style={styles.buyText}>BUY TICKET</Text>
        //         </TouchableOpacity>
        //     </View>
        // </ScrollView>
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
    }
    // c2
    // posterCard: {
    //     alignSelf: 'center',
    //     marginTop: 60,
    //     elevation: 10,
    //     shadowColor: '#000',
    //     shadowOpacity: 0.5,
    //     shadowRadius: 10,
    //     borderRadius: 20,
    // },
    // posterCardImage: {
    //     width: 240,
    //     height: 360,
    //     borderRadius: 20,
    // }
    // c3
    // container: {
    //     backgroundColor: '#000',
    //     flex: 1,
    //   },
    //   poster: {
    //     width: '100%',
    //     height: 400,
    //     justifyContent: 'flex-end',
    //   },
    //   gradient: {
    //     height: 200,
    //     width: '100%',
    //     position: 'absolute',
    //     bottom: 0,
    //   },
    //   infoContainer: {
    //     padding: 20,
    //     marginTop: -80,
    //   },
    //   title: {
    //     fontSize: 26,
    //     fontWeight: 'bold',
    //     color: '#fff',
    //   },
    //   meta: {
    //     color: '#bbb',
    //     marginVertical: 5,
    //   },
    //   tabs: {
    //     flexDirection: 'row',
    //     marginVertical: 10,
    //     gap: 15,
    //   },
    //   tab: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    //   },
    //   tagsRow: {
    //     marginVertical: 5,
    //   },
    //   genre: {
    //     color: '#ccc',
    //     fontSize: 14,
    //   },
    //   director: {
    //     color: '#aaa',
    //     fontSize: 13,
    //     marginTop: 3,
    //   },
    //   buyButton: {
    //     backgroundColor: '#ff3b30',
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     borderRadius: 6,
    //     marginVertical: 15,
    //     alignSelf: 'flex-start',
    //   },
    //   buyText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    //   },

});

export default Details;