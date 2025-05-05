
import { Text, View, Image, TouchableOpacity, FlatList, Modal, Button } from "react-native";
// import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useEffect, useState } from "react";
import { fonts, FONT_FAMILY } from "@/constants/font";
import { FilmData, Movie } from "@/constants/film";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import HomeHeader from "@/Components/Headers/HomeHeader";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CreateModalMovie from "@/Components/Modals/Create.Modal.Movie";
import ConfirmDeleteModal from "@/Components/Modals/Delete.Modal.Movie";
import SelectActionModal from "@/Components/Modals/Select.Action.Modal";
import UpdateModalMovie from "@/Components/Modals/Update.Modal.Movie";



export default function Index() {

  const router = useRouter();

  const [listMovie, setListMovie] = useState<Movie[]>(FilmData);

  // is user selected
  const [movie, setMovie] = useState<Movie>();

  const [modalCreateVisible, setModalCreateVisible] = useState(false);

  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [isActionModalVisible, setIsActionModalVisible] = useState(false);

  const handlEdit = () => {
    setIsActionModalVisible(false);
    setEditModalVisible(true);
  }

  const handleDelete = () => { 
    setIsActionModalVisible(false);
    setModalDeleteVisible(true);
  }

  const handleOpenAddModal = (movieSelected: Movie) => {
    setMovie(movieSelected);
    // setModalDeleteVisible(true);
    setIsActionModalVisible(true)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('localhost:/film', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);
        setListMovie(data); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchMovies();
  }, []);

  

  return (
    <>

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
                    <TouchableOpacity onPress={() => router.push({
                      pathname: '/(authenticated)/movie/[id]',
                      params: {
                        id: item.id,
                        title: item.title,
                        image: item.posterUrl,
                        description: item.releaseDate
                      }
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
                            {/* <Text style={styles.title}>{item.releaseDate}</Text> */}
                            <Text style={[styles.title, styles.titleMovie]}>{item.title}</Text>
                          </View>
                        </View>
                      </View>

                    </TouchableOpacity>
                  )
                }}
              />

            </View>

            <ConfirmDeleteModal
              modalDeleteVisible={modalDeleteVisible}
              setModalDeleteVisible={setModalDeleteVisible}
              movie={movie}
              setListMovie={setListMovie}
              listMovie={listMovie}
            />
            {movie && <UpdateModalMovie
              modalUpdateVisible={editModalVisible}
              setModalUpdateVisible={setEditModalVisible}
              movie={movie}
              listMovie={listMovie}
              setListMovie={setListMovie}
            />}
          </View>

          <SelectActionModal
            handleDelete={handleDelete}
            handleEdit={handlEdit}
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

});