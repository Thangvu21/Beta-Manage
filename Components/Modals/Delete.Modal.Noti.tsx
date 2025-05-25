import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Notification } from '@/constants/notification';
import axios from 'axios';
import axiosClient from '@/constants/axiosClient';
import { API } from '@/constants/api';

const { width } = Dimensions.get('window');

interface Props {
  modalDeleteVisible: boolean;
  setModalDeleteVisible: (visible: boolean) => void;
  notification: Notification | null;
  notificationList: Notification[];
  setNotificationList: (list: Notification[]) => void;
}

const DeleteModalNotification = ({
  modalDeleteVisible,
  setModalDeleteVisible,
  notification,
  notificationList,
  setNotificationList,
}: Props) => {

  const handleDelete = async () => {
    if (!notification) return;

    try {
      const response = await axiosClient.delete(`${API.deleteNotification}/${notification.id}`);
      console.log('Delete response:', response.data);
      const updatedList = notificationList.filter((item) => item.id !== notification.id);
      setNotificationList(updatedList);
      Alert.alert('Notification deleted successfully');
      setModalDeleteVisible(false);
    } catch (error) {
      console.error('Error deleting notification:', error);
      Alert.alert('Error', 'Failed to delete notification');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalDeleteVisible}
      onRequestClose={() => setModalDeleteVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Xóa thông báo</Text>
          <Text style={styles.modalText}>
            Bạn có chắc chắn muốn xóa thông báo{' '}
            <Text style={{ fontWeight: 'bold' }}>{notification?.title}</Text> không?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalDeleteVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteModalNotification;
