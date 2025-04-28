// SettingScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserData } from "@/constants/user";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function Profile() {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>

      <View style= {{ backgroundColor: '#fff', flexDirection: 'column', alignItems: 'center', padding: 20, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: "#ccc", width: '100%', borderRadius:10 }}>
        <Image source={UserData.profilePictureUrl} style={{width: 60, height: 60, marginBottom: 10, borderRadius: 30}}/>
        <Text style={{fontSize: 15, fontWeight: 300}}>Xin Chào</Text>
        <Text style={{fontSize: 25, fontWeight: 500}}>{UserData.name.toUpperCase()}</Text>
      </View>

      
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cá nhân</Text>
        <View>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>Đổi ảnh đại diện</Text>
            <FontAwesome5 name="user-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>Đổi mật khẩu</Text>
            <EvilIcons name="lock" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
