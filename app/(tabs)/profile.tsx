// SettingScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserData } from "@/constants/user";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { imagesUrl } from '@/constants/image';
import { router } from 'expo-router';
import { FONT_FAMILY } from '@/constants/font';
const Stack = createNativeStackNavigator();

export default function Profile() {
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState<string>(imagesUrl.img2 || '');

  const pickImage = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      }
    )

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

    }
  }

  return (
    <>
      <View style={styles.container}>

        <View style={{ backgroundColor: '#fff', flexDirection: 'column', alignItems: 'center', padding: 20, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: "#ccc", width: '100%', borderRadius: 10 }}>
          <Image source={{ uri: imageUri }} style={{ width: 60, height: 60, marginBottom: 10, borderRadius: 30 }} />
          <Text style={{ fontSize: 15, fontWeight: 300 }}>Xin Chào</Text>
          <Text style={{ fontSize: 25, fontWeight: 500 }}>{UserData.name.toUpperCase()}</Text>
        </View>


        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cá nhân</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Đổi ảnh đại diện</Text>
              <FontAwesome5 name="user-circle" size={24} color="black" />
            </TouchableOpacity>
            {/* <ImagePickerScreen imageUri={imageUri} setImageUri={setImageUri}/> */}
            <TouchableOpacity style={styles.button} onPress={() => router.push('../setting/ChangePassword')}>
              <Text style={styles.buttonText}>Đổi mật khẩu</Text>
              <FontAwesome5 name="lock" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('../login')}>
              <Text style={styles.buttonText}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  item: {
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ccc'
  },
  itemText: { fontSize: 18 },
  button: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 15, 
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  buttonText: { fontSize: 18, 
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold'
  },
});
