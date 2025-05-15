import { API } from '@/constants/api';
import axiosClient from '@/constants/axiosClient';
import { MovieData } from '@/constants/film';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Props {
  modalDeleteVisible: boolean;
  setModalDeleteVisible: (visible: boolean) => void;
  movie: MovieData | undefined;
  listMovie: MovieData[];
  setListMovie: (listMovie: MovieData[]) => void;
}

const ConfirmDeleteModal = ({modalDeleteVisible, setListMovie, movie, listMovie, setModalDeleteVisible}: Props) => {


  const handleDeleteMovie = async () => {
      // Xóa phim

      try {
        const res = await axiosClient.delete(`${API.deleteFilm}/${movie?.id}`);
    
        console.log("Phản hồi từ server:", res.data);
        // Xử lý UI nếu cần, ví dụ: Alert.alert("Thành công", "Phim đã được xoá!");
      } catch (error: any) {
        console.error("Lỗi khi xoá phim:", error);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi xoá phim. Vui lòng thử lại.");
      }
      const updatedListMovie = listMovie.filter(item => item.id !== movie?.id);
      setListMovie(updatedListMovie);
      setModalDeleteVisible(false);
    }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalDeleteVisible}
      onRequestClose={() => {
        setModalDeleteVisible(!modalDeleteVisible);
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Xác nhận xoá</Text>
          <Text style={styles.message}>
            Bạn có chắc chắn muốn xoá Phim <Text style={styles.highlight}>{movie?.title}</Text> không?
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalDeleteVisible(false) }}>
              <Text style={styles.cancelText}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} 
              onPress={handleDeleteMovie}>
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