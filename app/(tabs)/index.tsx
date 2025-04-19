
import { Text, View, Image, TouchableOpacity, FlatList, Modal } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { fonts, FONT_FAMILY } from "@/constants/font";
import { FilmData, Movie } from "@/constants/film";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import HomeHeader from "@/Components/Headers/HomeHeader";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

SplashScreen.preventAutoHideAsync();

export default function Index() {

  const router = useRouter();

  const [listMovie, setListMovie] = useState<Movie[]>(FilmData);

  const [movie, setMovie] = useState<Movie>();

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenAddModal = (movieSelected: Movie) => {
    setMovie(movieSelected);
    setModalVisible(true);
  }

  const handleDeleteMovie = () => {
    // Xóa phim
    const updatedListMovie = listMovie.filter(item => item.id !== movie?.id);
    setListMovie(updatedListMovie);
    setModalVisible(false);
  }



  const [loaded, error] = useFonts({
    [FONT_FAMILY]: require('@/assets/fonts/Oswald-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <SafeAreaProvider>

      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-col bg-white flex-1">
          {/* header */}
          <HomeHeader />
          {/* body */}
          <View className="bg-white m-2 flex-1 flex-col" >

            {/* ds film */}

            <View className="mt-3 flex-1">

              <FlatList
                data={listMovie}
                numColumns={3}
                style={{ flexDirection: 'row', flexWrap: 'wrap', }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => router.push(`/movie/${item.id}`, {

                    })} >


                      <View className="flex-col m p-[6px]">
                        {/* Poster */}
                        <Image source={{ uri: item.posterUrl }} style={styles.imageFilm} resizeMode="cover" />

                        <TouchableOpacity style={styles.menuButtonOverlay} onPress={() => handleOpenAddModal(item)}>
                          <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
                        </TouchableOpacity>

                        {/* Nội dung */}
                        <View className="flex-row justify-around items-center">
                          <View className="flex-col">
                            <Text style={styles.title}>{item.releaseDate}</Text>
                            <Text style={[styles.title, styles.titleMovie]}>{item.title}</Text>
                          </View>
                        </View>
                      </View>

                    </TouchableOpacity>
                  )
                }}
              />

            </View>

            <Modal
              visible={modalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>


                  <TouchableOpacity onPress={() => handleDeleteMovie()}>
                    <Text style={[styles.modalOption, { color: 'red' }]}>Xóa</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={[styles.modalOption, { color: '#888' }]}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>



          </View>

          <TouchableOpacity onPress={() => router.push('/')}>
            <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
              <Ionicons name="add" size={28} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  imageFilm: {
    width: 120, height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 10
  },
  title: {
    flexWrap: 'wrap',
    fontWeight: 800,
    fontFamily: FONT_FAMILY,
    color: '#337ab7',
    justifyContent: 'center',
    textAlign: 'center',
  },

  titleMovie: {
    width: 120,

  },

  fabButton: {
    position: 'absolute',
    bottom: 60,
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
  menuButtonOverlay: {
    position: 'absolute',
    top: 6,
    right: 6,
    padding: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 10,
  },

  // model
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 200,
    elevation: 5,
  },

  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: '600',
  },

});