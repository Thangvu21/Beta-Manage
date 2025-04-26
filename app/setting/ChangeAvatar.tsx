// ChangeAvatarScreen.tsx
import { images } from '@/constants/image';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ChangeAvatarScreen() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets[0]) {
        setAvatarUri(response.assets[0].uri || null);
        Alert.alert('Thành công', 'Ảnh đại diện đã được cập nhật!');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ảnh đại diện</Text>

      <Image
        source={{uri: images.avatar}}
        style={styles.avatar}
      />

      <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
        <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 20, backgroundColor: '#eee' },
  button: {
    backgroundColor: '#2196F3', padding: 15, borderRadius: 8, alignItems: 'center', width: '80%'
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' }
});
