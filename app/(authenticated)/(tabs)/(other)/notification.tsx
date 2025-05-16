import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Notification, sampleNotifications, NotificationType } from '@/constants/notification';
import { LinearGradient } from 'expo-linear-gradient';

const getIcon = (type: string) => {
  switch (type) {
    case NotificationType.BOOKING:
      return <MaterialIcons name="movie" size={24} color="#3b82f6" />;
    case NotificationType.PROMOTION:
      return <MaterialIcons name="local-offer" size={24} color="#10b981" />;
    case NotificationType.REMINDER:
      return <Ionicons name="alarm-outline" size={24} color="#f59e0b" />;
    case NotificationType.SYSTEM:
    default:
      return <Ionicons name="settings-outline" size={24} color="#6b7280" />;
  }
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const handleAdd = () => {

  };

  const handleEdit = (id: string) => {

  };

  const handleDelete = (id: string) => {

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.fabButton}>
          <Ionicons name="add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconContainer}>{getIcon(item.type)}</View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => handleEdit(item.id)}>
                  <Feather name="edit" size={18} color="#0ea5e9" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Feather name="trash-2" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
    marginBottom: 8,
  },
  separator: {
    height: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
