// SettingScreen.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { FONT_FAMILY } from '@/constants/font';
import { useUser } from '@/Components/Context/UserProvider';
import { useAuthContext } from '@/Components/Context/AuthProvider';
import axiosClient from '@/constants/axiosClient';
import { API } from '@/constants/api';
import * as FileSystem from 'expo-file-system';
import { imagesUrl } from '@/constants/image';

function convertLocalhost(url: string) {
  if (!url) return '';

  // Kiểm tra nếu URL bắt đầu bằng http://localhost
  const localhostPrefix = 'http://localhost';
  if (url.substring(0, localhostPrefix.length) === localhostPrefix) {
    return API.hostImage + url.substring(localhostPrefix.length);
  }

  return url;
}

export default function ProfileScreen() {

  const { user, setUser } = useUser();

  const { logout } = useAuthContext();

  const [imageUri, setImageUri] = useState<string>(user.profilePictureUrl || imagesUrl.default);

  const pickImage = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: 'images',
        allowsEditing: true,
        quality: 1,
      }
    )

    if (!result.canceled) {
      // console.log("Image selected:", result.assets[0]);
      const uri = result.assets[0].uri;
      // console.log("Selected image URI:", uri);
      setImageUri(uri);
      updateProfilePicture(uri); // Gọi hàm cập nhật ảnh đại diện sau khi chọn ảnh mới

    }
  }

  const updateProfilePicture = async (uri: string) => {
    try {
      // Chỉ kiểm tra file local, không kiểm tra URL
      if (uri && uri.startsWith('file://')) {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          Alert.alert("File không tồn tại!");
          return;
        }
      }

      const fileName = uri.split('/').pop() || 'photo.jpg';
      const fileType = fileName.split('.').pop();

      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);

      const response = await axiosClient.patch(API.changeAvatar, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newUrl = convertLocalhost(response.data.url);

      setUser(prevUser => ({
        ...prevUser,
        profilePictureUrl: newUrl
      }));
    }
    catch (error) {
      console.error("Error updating profile picture:", error);
    }
  }
  // useEffect(() => {
  //   if (user.profilePictureUrl) {
  //     setImageUri(user.profilePictureUrl);
  //   }
  // }, [user.profilePictureUrl]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(login)');
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <>
      <View style={styles.container}>

        <View style={{ backgroundColor: '#fff', flexDirection: 'column', alignItems: 'center', padding: 20, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: "#ccc", width: '100%', borderRadius: 10 }}>
          <Image source={{ uri: imageUri }} style={{ width: 250, height: 250, marginBottom: 10, borderRadius: 120 }} />
          <Text style={{ fontSize: 15, fontWeight: 300 }}>Xin Chào</Text>
          <Text style={{ fontSize: 25, fontWeight: 500 }}>{user.name.toUpperCase()}</Text>
        </View>


        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cá nhân</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Đổi ảnh đại diện</Text>
              <FontAwesome5 name="user-circle" size={24} color="black" />
            </TouchableOpacity>
            {/* <ImagePickerScreen imageUri={imageUri} setImageUri={setImageUri}/> */}
            {/* <TouchableOpacity style={styles.button} onPress={() => router.navigate('/(authenticated)/user')}>
              <Text style={styles.buttonText}>Đổi mật khẩu</Text>
              <FontAwesome5 name="lock" size={24} color="black" />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
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
  buttonText: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold'
  },
});
