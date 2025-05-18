// ChangePasswordScreen.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu mới phải từ 6 ký tự trở lên');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới không khớp');
      return;
    }

    // Giả lập xử lý
    Alert.alert('Thành công', 'Đổi mật khẩu thành công!');
  };

  return (

    <>
      <Stack.Screen
        options={{
          title: "Đổi mật khẩu", 
          headerTintColor: '#fff', // tiêu đề header
          headerBackground: () => (
            <LinearGradient
              colors={["#1e6fa8", "#70c6e5"]}
              style={{ flex: 1 }}
            />
          )
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Đổi mật khẩu</Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Mật khẩu hiện tại"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Nhập lại mật khẩu mới"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 15
  },
  button: {
    backgroundColor: '#E50914', padding: 15, borderRadius: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
