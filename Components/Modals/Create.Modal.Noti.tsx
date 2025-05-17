import {
  Alert, Modal, Pressable, ScrollView, StyleSheet,
  Text, TextInput, View, TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Notification, NotificationType } from "@/constants/notification";


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
  const [cinemaId, setCinemaId] = useState('');
  const [filmId, setFilmId] = useState('');
  const [showTime, setShowTime] = useState('');

  const handleCreateNotification = () => {
    if (!title || !description || !type) {
      Alert.alert("Please fill all fields");
      return;
    }

    const newNotification = {
      id: `notif-${Math.random().toString(36).substring(2, 10)}`,
      title,
      description,
      type,
      data: {
        ...(type === NotificationType.BOOKING && {
          cinemaId,
          filmId,
          showTime
        }),
      }
    };

    setNotificationList([...notificationList, newNotification]);

    setTitle('');
    setDescription('');
    setType(NotificationType.BOOKING);
    setCinemaId('');
    setFilmId('');
    setShowTime('');
    setModalVisible(false);
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
              <TextInput
                value={type}
                onChangeText={(text) => setType(text as NotificationType)}
                style={styles.textInput}
                placeholder="BOOKING | SYSTEM | PROMOTION"
              />
            </View>

            {type === NotificationType.BOOKING && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>🏢 Cinema ID</Text>
                  <TextInput
                    value={cinemaId}
                    onChangeText={setCinemaId}
                    style={styles.textInput}
                    placeholder="cinema-001"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>🎞️ Film ID</Text>
                  <TextInput
                    value={filmId}
                    onChangeText={setFilmId}
                    style={styles.textInput}
                    placeholder="film-001"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>🕒 Show Time</Text>
                  <TextInput
                    value={showTime}
                    onChangeText={setShowTime}
                    style={styles.textInput}
                    placeholder="e.g., 2025-05-18T19:00:00Z"
                  />
                </View>
              </>
            )}
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
});

export default CreateModalNotification;
