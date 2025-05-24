
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
// import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useEffect, useState } from "react";
import { FONT_FAMILY } from "@/constants/font";
import { ColorAgeRating, FilmData, MovieData } from "@/constants/film";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import HomeHeader from "@/Components/Headers/HomeHeader";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CreateModalMovie from "@/Components/Modals/Create.Modal.Movie";
import ConfirmDeleteModal from "@/Components/Modals/Delete.Modal.Movie";
import SelectActionModal from "@/Components/Modals/Select.Action.Modal";
import Swiper from 'react-native-swiper'
import { useMovieContext } from "@/Components/Context/MoiveProvider";
import { useUser } from "@/Components/Context/UserProvider";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";

export default function Index() {

  const router = useRouter();

  // const [listMovie, setListMovie] = useState<MovieDetailData[]>(MovieDetailDataList);
  const { listMovie, setListMovie } = useMovieContext();

  // is user selected
  const [movie, setMovie] = useState<MovieData>();

  const { user, setUser } = useUser();

  const [modalCreateVisible, setModalCreateVisible] = useState(false);

  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const [isActionModalVisible, setIsActionModalVisible] = useState(false);

  const handleDelete = () => {
    setIsActionModalVisible(false);
    setModalDeleteVisible(true);
  }

  const handleOpenAddModal = (movieSelected: MovieData) => {
    setMovie(movieSelected);
    // setModalDeleteVisible(true);
    setIsActionModalVisible(true)
  }

  const ColorAgeSelect = (ageRating: string) => {
    return ColorAgeRating[ageRating as keyof typeof ColorAgeRating];
  }

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        const response = await axiosClient.get(API.getAllFilm);

        // console.log('thành công', response.data);
        setListMovie(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // setListMovie(FilmData);
    fetchMovies();
  }, []);



  return (
    <>

      <SafeAreaView className="flex-1 bg-white pb-5">
        <View className="flex-col bg-white flex-1">
          {/* header */}
          <HomeHeader user={user} setUser={setUser}/>
          {/* body */}
          <View className="bg-white m-2 flex-1 flex-col pb-6" >

            {/* ds film */}
            <ScrollView className="flex-1 mb-4 ">
              <View style={styles.sliderContainer}>
                <Swiper
                  autoplay={true}
                  autoplayTimeout={3}
                  showsButtons={false}
                  showsPagination={true}
                  paginationStyle={styles.pagination}
                  dotStyle={styles.dot}
                  activeDotStyle={styles.activeDot}
                >
                  {listMovie.map((item, index) => (
                    <View key={index} style={styles.slide}>
                      <Image source={{ uri: item.posterUrl }} style={styles.sliderImage} />
                      {/* <Text style={styles.sliderTitle}>{item.title}</Text> */}
                    </View>
                  ))}
                </Swiper>
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, flex: 1 }}>
                {listMovie.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      router.push({
                        pathname: '/(authenticated)/movie/[id]',
                        params: {
                          id: item.id,
                          title: item.title,
                          posterUrl: item.posterUrl
                        },
                      })
                    }
                    style={{ width: '33.33%' }} // chia làm 3 cột
                  >
                    <View style={{ width: 45, height: 25, top: 10, left: 10, justifyContent: 'center', alignItems: 'center', padding: 1, position: 'absolute', borderRadius: 8, backgroundColor: ColorAgeSelect(item.ageRating), zIndex: 10 }}>
                        <Text style={{fontSize: 16, fontFamily: FONT_FAMILY, color:'#fff', fontWeight:900}}>{item.ageRating}</Text>
                      </View>
                    <View className="flex-col m p-[6px]">
                      {/* Poster */}
                      <Image
                        source={{ uri: item.posterUrl }}
                        style={styles.imageFilm}
                        resizeMode="cover"
                      />
                      
                      <TouchableOpacity
                        style={styles.menuButtonOverlay}
                        onPress={() => handleOpenAddModal(item)}
                      >
                        <Ionicons name="ellipsis-vertical" size={18} color="#fff" />
                      </TouchableOpacity>

                      {/* Nội dung */}
                      <View className="flex-row justify-around items-center">
                        <View className="flex-col">
                          <Text style={[styles.title, styles.titleMovie]}>{item.title}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>


            <ConfirmDeleteModal
              modalDeleteVisible={modalDeleteVisible}
              setModalDeleteVisible={setModalDeleteVisible}
              movie={movie}
              setListMovie={setListMovie}
              listMovie={listMovie}
            />
            
          </View>

          <SelectActionModal
            handleDelete={handleDelete}
            isActionModalVisible={isActionModalVisible}
            setIsActionModalVisible={setIsActionModalVisible}
          />
          <CreateModalMovie
            modalCreateVisible={modalCreateVisible}
            setModalCreateVisible={setModalCreateVisible}
            setListMovie={setListMovie}
            listMovie={listMovie}
          />
          <TouchableOpacity onPress={() => setModalCreateVisible(true)}>
            <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
              <Ionicons name="add" size={28} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </>
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

  image: {
    width: '95%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  // slide
  sliderContainer: {
    height: 150,
    marginTop: 5,
    marginBottom: 5,
    // marginVertical: 0,
    // padding: 0,
    // borderRadius: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '95%',
    height: 175,
    borderRadius: 15,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  sliderTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  pagination: {
    bottom: 5,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#337ab7',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});