import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dashboardOptions = [
  { title: 'Báo cáo doanh thu', icon: 'bar-chart-outline', screen: 'revenue', color: '#e0f2fe' },
  { title: 'Thống kê người dùng', icon: 'person-circle-outline', screen: 'users', color: '#ede9fe' },
  { title: 'Đơn hàng', icon: 'receipt-outline', screen: 'orders', color: '#fef9c3' },
  { title: 'Phân tích sản phẩm', icon: 'analytics-outline', screen: 'products', color: '#dcfce7' },
];

export default function Dashboard() {
  const router = useRouter();

  return (
     <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.container}>

        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#e0f2fe' }]}
            onPress={() => router.push('/statistics')}
          >
            <Ionicons name="bar-chart-outline" size={32} color="#1f2937" />
            <Text style={styles.cardText}>Báo cáo doanh thu</Text>
          </TouchableOpacity>
          {/* Dữ liệu động múa tí động hơn tĩnh */}
          
          {/* <TouchableOpacity
            style={[styles.card, { backgroundColor: '#ede9fe' }]}
            onPress={() => router.push('/users')}
          >
            <Ionicons name="person-circle-outline" size={32} color="#1f2937" />
            <Text style={styles.cardText}>Thống kê người dùng</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={[styles.card, { backgroundColor: '#fef9c3' }]}
            onPress={() => router.push('/orders')}
          >
            <Ionicons name="receipt-outline" size={32} color="#1f2937" />
            <Text style={styles.cardText}>Đơn hàng</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={[styles.card, { backgroundColor: '#dcfce7' }]}
            onPress={() => router.push('/products')}
          >
            <Ionicons name="analytics-outline" size={32} color="#1f2937" />
            <Text style={styles.cardText}>Phân tích sản phẩm</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1f2937',
  },
});
