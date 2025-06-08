import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { sampleCinemas } from '@/constants/cinema';
import { Cinema } from '@/constants/cinema';
import { LinearGradient } from 'expo-linear-gradient';
import CreateModalCinema from '@/Components/Modals/Create.Modal.Cinema';
import UpdateModalCinema from '@/Components/Modals/Update.Modal.Cinema';
import DeleteModalCinema from '@/Components/Modals/Delete.Modal.Cinema';
import { colors } from '@/constants/color';
import axiosClient from '@/constants/axiosClient';
import { API } from '@/constants/api';
import { imageBaseUrl, images, imagesUrl } from '@/constants/image';

export default function CinemaScreen() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  const handleDelete = (id: string) => {
    const cinemaToDelete = cinemas.find((cinema) => cinema.id === id);
    if (cinemaToDelete) {
      setSelectedCinema(cinemaToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleEdit = (id: string) => {
    const cinemaToEdit = cinemas.find((cinema) => cinema.id === id);
    if (cinemaToEdit) {
      setSelectedCinema(cinemaToEdit);
      setIsEditModalVisible(true);
    }
  };

  const handleAdd = () => {
    setIsCreateModalVisible(true);
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axiosClient.get(API.getAllCinema)
        const listCinema: Cinema[] = []
        for (const key in response.data) {
            listCinema.push(... response.data[key])
        }
        setCinemas(listCinema);
        } catch (error) {
        
        console.error('Error fetching cinemas:', error);
        Alert.alert('Error', 'Failed to fetch cinemas. Please try again later.');
      }
    }
    fetchCinemas();


  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd} activeOpacity={0.7}>
        <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
          <Feather name="plus" size={20} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <View style={{ flex: 1, paddingBottom: 70 }}>
        <FlatList

          data={cinemas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              { 
                // <Image source={{ uri: item.avatar }} style={styles.avatar} /> ) 
                <Image source={{ uri: imagesUrl.rap }} style={styles.avatar} />
              }
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="map-pin" size={14} color="#6b7280" style={{ marginRight: 5 }} />
                  <Text
                    numberOfLines={3}
                    style={styles.text}>{item.address.full}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <Feather name="phone" size={14} color="#10b981" style={{ marginRight: 4 }} />
                  <Text
                    numberOfLines={3}
                    style={styles.phone}>{item.phone}</Text>
                </View>

                <View style={styles.iconButtonRow}>
                  <TouchableOpacity style={{ borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignContent: 'center' }} onPress={() => handleEdit(item.id)}>
                    <Text style={styles.iconButton}>✏️</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ borderColor: colors.primary, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignContent: 'center' }} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.iconButton}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        />
      </View>

      {(
        <CreateModalCinema
          modalCinemaVisible={isCreateModalVisible}
          setModalCinemaVisible={setIsCreateModalVisible}
          setCinemaList={setCinemas}
          cinemaList={cinemas}

        />
      )}
      {
        <UpdateModalCinema
          modalCinemaVisible={isEditModalVisible}
          setModalCinemaVisible={setIsEditModalVisible}
          setCinemaList={setCinemas}
          cinemaList={cinemas}
          selectedCinema={selectedCinema}
          setSelectedCinema={setSelectedCinema}
        />
      }
      {selectedCinema && (
        <DeleteModalCinema
          modalDeleteVisible={isDeleteModalVisible}
          setModalDeleteVisible={setIsDeleteModalVisible}
          selectedCinema={selectedCinema}
          cinemaList={cinemas}
          setCinemaList={setCinemas}
          setSelectedCinema={setSelectedCinema}
        />
      )}
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
    marginRight: 2
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


  iconButtonRow: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 12,
  },

  iconButton: {
    padding: 4,
  },
});
