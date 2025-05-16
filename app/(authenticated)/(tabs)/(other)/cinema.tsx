import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { sampleCinemas } from '@/constants/cinema';
import { Cinema } from '@/constants/cinema';
import { LinearGradient } from 'expo-linear-gradient';

export default function CinemaScreen() {
  const [cinemas, setCinemas] = useState(sampleCinemas);

  const handleDelete = (id: string) => {

  };

  const handleEdit = (id: string) => {
    Alert.alert('Chức năng sửa chưa được triển khai.');
  };

  const handleAdd = () => {
    Alert.alert('Chức năng thêm chưa được triển khai.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd} activeOpacity={0.7}>
        <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
          <Feather name="plus" size={20} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <FlatList
        data={cinemas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="map-pin" size={14} color="#6b7280" style={{ marginRight: 4 }} />
                <Text style={styles.text}>{item.address}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Feather name="phone" size={14} color="#10b981" style={{ marginRight: 4 }} />
                <Text style={styles.phone}>{item.phone}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item.id)} activeOpacity={0.7}>
                  <Feather name="edit" size={18} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} activeOpacity={0.7}>
                  <Feather name="trash-2" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderWidth: 0.2,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827',
  },
  text: {
    fontSize: 14,
    color: '#4b5563',
  },
  phone: {
    fontSize: 13,
    color: '#10b981',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 18,
  },
  addButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
