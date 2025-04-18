
import { Text, View, Image, TextInput, TouchableOpacity, FlatList } from "react-native";

import AntDesign from '@expo/vector-icons/AntDesign';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { fonts, FONT_FAMILY } from "@/constants/font";
import { FilmData } from "@/constants/film";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import HomeHeader from "@/Components/Headers/HomeHeader";

SplashScreen.preventAutoHideAsync();

export default function Index() {

  const router = useRouter();

  const find = () => {
    // alert('find'); 
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
                    <TouchableOpacity onPress={() => router.push(`/movie/${item.id}`, {
                      
                    })} >
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
    fontFamily: FONT_FAMILY,
    color: '#337ab7',
    justifyContent: 'center',
    textAlign: 'center',
  },

  titleMovie: {
    width: 120,

  }
});