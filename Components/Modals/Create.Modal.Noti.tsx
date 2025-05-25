import {
  Alert, Modal, Pressable, ScrollView, StyleSheet,
  Text, TextInput, View, TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Notification, NotificationType } from "@/constants/notification";
import axiosClient from "@/constants/axiosClient";
import { API, API_URL } from "@/constants/api";
import { Picker } from '@react-native-picker/picker';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setNotificationList: (notifs: Notification[]) => void;
  notificationList: Notification[];
}

const CreateModalNotification = ({
  modalVisible,
  setModalVisible,
  setNotificationList,
  notificationList
}: Props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<NotificationType>(NotificationType.BOOKING);
  const [data, setData] = useState({});
  const [cinemaId, setCinemaId] = useState('');
  const [filmId, setFilmId] = useState('');
  const [showTime, setShowTime] = useState('');

  const handleAfterUpdate = () => {
    // Handle any actions after updating the notification
    setTitle('');
    setDescription('');
    setType(NotificationType.BOOKING);
    setCinemaId('');
    setFilmId('');
    setShowTime('');
    setModalVisible(false);
  }

  const handleCreateNotification = async () => {
    if (!title || !description || !type ) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      const response = await axiosClient.post(`${API.createNotification}`, JSON.stringify({
        title,
        description,
        type,
        data
      }))

      console.log("Notification created successfully:", response.data);

      const newNotification : Notification = {
        id: response.data.id,
        title,
        description,
        type,
        data
      }
      setNotificationList([...notificationList, newNotification]);



    } catch (error) {
      Alert.alert("Error creating notification");
      console.error(error);
    }
    handleAfterUpdate();

  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Notification</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <AntDesign name="closecircleo" size={24} color="#555" />
            </Pressable>
          </View>

          <ScrollView>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>📌 Title</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.textInput}
                placeholder="Enter title"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>📝 Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.textInput}
                placeholder="Enter description"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>📂 Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={type}
                  onValueChange={(itemValue) => setType(itemValue as NotificationType)}
                  style={styles.picker}
                >
                  {Object.values(NotificationType).map((value) => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
              </View>
            </View>

          </ScrollView>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateNotification}>
            <Text style={styles.createButtonText}>Create</Text>
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
    padding: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: '#f9f9f9',
  },
  createButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
});

export default CreateModalNotification;
