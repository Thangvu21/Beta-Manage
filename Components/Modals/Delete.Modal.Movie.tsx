import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmDeleteModal = () => {
  return (
    <Modal
      animationType="fade"
      transparent={true}

    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Xác nhận xoá</Text>
          <Text style={styles.message}>
            Bạn có chắc chắn muốn xoá <Text style={styles.highlight}>A</Text> không?
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} >
              <Text style={styles.cancelText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} >
              <Text style={styles.deleteText}>Xoá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 24,
      elevation: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 10,
      color: '#e53935',
    },
    message: {
      fontSize: 16,
      color: '#444',
      marginBottom: 20,
    },
    highlight: {
      fontWeight: 'bold',
      color: '#000',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    cancelButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: '#ccc',
    },
    deleteButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: '#e53935',
    },
    cancelText: {
      color: '#333',
      fontWeight: '500',
    },
    deleteText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
  
  export default ConfirmDeleteModal;