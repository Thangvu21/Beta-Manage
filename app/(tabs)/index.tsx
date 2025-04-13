import { images, imagesUrl } from "@/constants/image";
import { Link } from "expo-router";
import { Text, View, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { fonts } from "@/constants/font";
import { FilmData } from "@/constants/film";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function Index() {

  const find = () => {
    // alert('find'); 
  }

  const [loaded, error] = useFonts({
    'thang': fonts.font,
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
          <View className="flex-row justify-between items-center border-b border-gray-300">
            <View className="flex-row items-center p-2">
              <Image source={images.avatar} style={{ width: 45, height: 45 }} className="mr-3" />
              <View className="justify-center">
                <Text>Chào <Text style={{ fontFamily: 'thang', fontWeight: 700 }}>Thắng Vũ</Text></Text>
                <View className="flex-row items-center mt-2">
                  <FontAwesome name="user-o" size={20} color="black" className="mr-2" />
                  <Text style={{ fontFamily: 'thang', fontWeight: 700 }}>MEMBER</Text>
                </View>
              </View>
            </View>
            <Image source={images.beta} style={{ width: 150, height: 50 }} />
          </View>
          {/* body */}
          <View className="bg-white m-2 flex-1 flex-col" >
            <View className=" flex-row items-center ">
              <TouchableOpacity onPress={find} >
                <AntDesign name="find" size={30} color="black" className="mr-2 " />
              </TouchableOpacity>
              <TextInput
                placeholder="Tìm kiếm"
                className="border border-gray-500 rounded-full text-2xl p-2 flex-1"
              />
            </View>
            {/* ds film */}

            <View className="mt-3 flex-1">

              <FlatList
                data={FilmData}
                numColumns={3}
                style={{ flexDirection: 'row', flexWrap: 'wrap', }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity >
                      <View className="flex-col m p-[6px]">
                        <Image source={{ uri: item.posterUrl }} style={styles.imageFilm} resizeMode="cover" />
                        <Text style={styles.title}>{item.releaseDate}</Text>
                        <Text style={[styles.title, styles.titleMovie]}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />

            </View>

          </View>
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
    fontFamily: 'thang',
    color: '#337ab7',
    justifyContent: 'center',
    textAlign: 'center',
  },

  titleMovie: {
    width: 120,

  }
});