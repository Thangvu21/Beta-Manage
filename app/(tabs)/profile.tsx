// SettingScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>

      <TouchableOpacity
        style={styles.item}
        // onPress={() => navigation.navigate('../setting/ChangeAvatar')}
      >
        <Text style={styles.itemText}>Thay đổi ảnh đại diện</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        // onPress={() => navigation.navigate('./setting/ChangePassword')}
      >
        <Text style={styles.itemText}>Đổi mật khẩu</Text>
      </TouchableOpacity>

      {/* Các mục khác như Ngôn ngữ, Đăng xuất... có thể thêm tương tự */}
      <TouchableOpacity
        style={styles.item}
        // onPress={() => navigation.navigate('./setting/ChangePassword')}
      >
        <Text style={styles.itemText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  item: {
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ccc'
  },
  itemText: { fontSize: 18 }
});
