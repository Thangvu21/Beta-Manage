import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from "react";
import ImagePickerScreen from "../Camera/ImagePicker";
import { Cinema, LocationType } from "@/constants/cinema";
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";

interface Props {
  modalCinemaVisible: boolean;
  setModalCinemaVisible: (visible: boolean) => void;
  selectedCinema: Cinema | null;
  setSelectedCinema: (cinema: Cinema | null) => void;
  cinemaList: Cinema[];
  setCinemaList: (cinemaList: Cinema[]) => void;
}

const UpdateModalCinema = ({
  modalCinemaVisible,
  setModalCinemaVisible,
  selectedCinema,
  setSelectedCinema,
  cinemaList,
  setCinemaList
}: Props) => {
  const [cinemaName, setCinemaName] = useState<string>('');
  const [cinemaPhone, setCinemaPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [cinemaAvatar, setCinemaAvatar] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    if (selectedCinema) {
      setId(selectedCinema.id || '');
      setCinemaName(selectedCinema.name || '');
      setCinemaPhone(selectedCinema.phone || '');
      setCity(selectedCinema.address.city || '');
      setDistrict(selectedCinema.address.district || '');
      setStreet(selectedCinema.address.street || '');
      setWard(selectedCinema.address.ward || '');
      setCinemaAvatar(selectedCinema.avatar || '');
      setLongitude(String(selectedCinema.location.coordinates[0] || ''));
      setLatitude(String(selectedCinema.location.coordinates[1] || ''));
    }
  }, [selectedCinema]);

  const handleAfterUpdate = () => {
    setCinemaName(cinemaName);
    setCinemaPhone(cinemaPhone);
    setCity(city);
    setDistrict(district);
    setStreet(street);
    setWard(ward);
    setCinemaAvatar(cinemaAvatar);
    setLongitude(longitude);
    setLatitude(latitude);
    setSelectedCinema(null);
    setModalCinemaVisible(false);
  };

  const handleUpdateCinema = async () => {
    if (!cinemaName || !cinemaPhone
      || !street || !ward || !district || !city
      || !longitude || !latitude
    ) {
      Alert.alert("Vui lòng nhập đủ thông tin");
      return;
    }

    try {
      const response = await axiosClient.patch(`${API.updateCinema}/${id}`, JSON.stringify(
        {
          name: cinemaName,
          phone: cinemaPhone,
          address: {
            street,
            ward,
            district,
            city,
            full: `${street}, ${ward}, ${district}, ${city}`
          },
          location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          avatar: cinemaAvatar
        }
      ));
      if (response.status !== 200) {
        Alert.alert("Có lỗi xảy ra khi cập nhật rạp phim");
        return;
      }
      const updatedCinema: Cinema = {
        id: selectedCinema?.id || '',
        name: cinemaName,
        phone: cinemaPhone,
        address: {
          street,
          ward,
          district,
          city,
          full: `${street}, ${ward}, ${district}, ${city}`
        },
        location: {
          type: LocationType.Point,
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        avatar: cinemaAvatar
      };

      const updatedCinemaList = cinemaList.map(cinema =>
        cinema.id === selectedCinema?.id ? updatedCinema : cinema
      );
      setCinemaList(updatedCinemaList);
      handleAfterUpdate();

    } catch (error) {
      console.error("Error updating cinema:", error);
      Alert.alert("Có lỗi xảy ra khi cập nhật rạp phim");
    }

  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalCinemaVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalCinemaVisible(false);
      }}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Update Cinema</Text>
            <Pressable onPress={() => setModalCinemaVisible(false)}>
              <AntDesign name="closecircleo" size={24} color="#555" />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.body}>
            {/* Các ô nhập giống CreateModalCinema */}
            {[{
              label: "🎬 Cinema Name",
              value: cinemaName,
              setValue: setCinemaName,
              placeholder: "Enter cinema name"
            }, {
              label: "📞 Phone Number",
              value: cinemaPhone,
              setValue: setCinemaPhone,
              placeholder: "Enter phone number",
              keyboardType: "phone-pad"
            }, {
              label: "🏠 Street",
              value: street,
              setValue: setStreet,
              placeholder: "e.g., 123 Trường Chinh"
            }, {
              label: "🏘️ Ward",
              value: ward,
              setValue: setWard,
              placeholder: "e.g., Phương Liệt"
            }, {
              label: "🏙️ District",
              value: district,
              setValue: setDistrict,
              placeholder: "e.g., Thanh Xuân"
            }, {
              label: "🌆 City",
              value: city,
              setValue: setCity,
              placeholder: "e.g., Hà Nội"
            }, {
              label: "🌐 Longitude",
              value: longitude,
              setValue: setLongitude,
              placeholder: "105.807",
              keyboardType: "numeric"
            }, {
              label: "🌐 Latitude",
              value: latitude,
              setValue: setLatitude,
              placeholder: "21.002",
              keyboardType: "numeric"
            }, {
              label: "🖼️ Cinema Avatar URL",
              value: cinemaAvatar,
              setValue: setCinemaAvatar,
              placeholder: "Enter cinema avatar URL"
            }].map((input, i) => (
              <View style={styles.inputGroup} key={i}>
                <Text style={styles.label}>{input.label}</Text>
                <TextInput
                  value={input.value}
                  onChangeText={input.setValue}
                  style={styles.textInput}
                  placeholder={input.placeholder}
                  placeholderTextColor="#888"
                  keyboardType={input.keyboardType as any}
                />
              </View>
            ))}

            
          </ScrollView>

          {/* Footer */}
          <TouchableOpacity style={styles.createButton} onPress={handleUpdateCinema}>
            <Text style={styles.createButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  body: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#f0ad4e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UpdateModalCinema;
