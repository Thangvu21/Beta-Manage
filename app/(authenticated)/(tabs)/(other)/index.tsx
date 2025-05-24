
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const options = [
    { title: 'Rạp phim Beta', icon: 'film', screen: 'cinema', color: '#d6f3f3' },
    { title: 'Thông báo', icon: 'notifications', screen: 'notification', color: '#ffe7d9' },
];

export default function Other() {

    const router = useRouter();


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
            <View style={styles.container}>
                <View style={styles.grid}>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#d6f3f3' }]}
                        onPress={() => router.push('/cinema')}
                    >
                        <Ionicons name="film-outline" size={32} color="#333" />
                        <Text style={styles.cardText}>Rạp phim Beta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#ffe7d9' }]}
                        onPress={() => router.push('/notification')}
                    >
                        <Ionicons name="notifications-outline" size={32} color="#333" />
                        <Text style={styles.cardText}>Thông báo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#ffe7d9' }]}
                        onPress={() => router.push('/food')}
                    >
                        <Ionicons name="pizza-outline" size={32} color="#333" />
                        <Text style={styles.cardText}>Đồ ăn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#ffe7d9' }]}
                        onPress={() => router.push('/profile')}
                    >
                        <Ionicons name="person-circle-outline" size={32} color="#333" />
                        <Text style={styles.cardText}>Hồ sơ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#ffe7d9' }]}
                        onPress={() => router.push('/createAccountAdmin')}
                    >
                        <Ionicons name="add-circle-outline" size={32} color="#333" />
                        <Text style={styles.cardText}>Tạo tài khoản admin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff', marginTop: 20, paddingTop: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    card: {
        width: '47%',
        aspectRatio: 1,
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    cardText: { marginTop: 8, fontSize: 14, textAlign: 'center', color: '#333' },
});