import {
  Alert, Modal, Pressable, ScrollView, StyleSheet,
  Text, TextInput, View, TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Notification, NotificationType } from "@/constants/notification";

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setNotificationList: (notifs: Notification[]) => void;
  notificationList: Notification[];
  notificationToEdit: Notification | null;
}

const UpdateModalNotification = ({
  modalVisible,
  setModalVisible,
  setNotificationList,
  notificationList,
  notificationToEdit,
}: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<NotificationType>(NotificationType.BOOKING);

  useEffect(() => {
    if (notificationToEdit) {
      setTitle(notificationToEdit.title);
      setDescription(notificationToEdit.description);
      setType(notificationToEdit.type);
      
    }
  }, [notificationToEdit]);

  const handleUpdateNotification = () => {
    if (!notificationToEdit) return;

    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Update Notification</Text>
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
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>📝 Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.textInput}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>📂 Type</Text>
              <TextInput
                value={type}
                onChangeText={(text) => setType(text as NotificationType)}
                style={styles.textInput}
              />
            </View>

            {/* {type === NotificationType.BOOKING && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>🏢 Cinema ID</Text>
                  <TextInput
                    value={cinemaId}
                    onChangeText={setCinemaId}
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>🎞️ Film ID</Text>
                  <TextInput
                    value={filmId}
                    onChangeText={setFilmId}
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>🕒 Show Time</Text>
                  <TextInput
                    value={showTime}
                    onChangeText={setShowTime}
                    style={styles.textInput}
                  />
                </View>
              </>
            )} */}
          </ScrollView>

          <TouchableOpacity style={styles.createButton} onPress={handleUpdateNotification}>
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
    backgroundColor: '#0275d8',
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

export default UpdateModalNotification;
