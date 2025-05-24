
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Modal } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@/Components/Context/UserProvider';
import { Conversation, sampleConversations } from '@/constants/conversation';
import ModalFindChat from '@/Components/Modals/ModalFindChat';

export default function Other() {

    const { user, setUser } = useUser();

    const router = useRouter();

    // Sau thay bằng user trên
    const [imageUri, setImageUri] = useState<string>(user.profilePictureUrl || '');

    const [listConver, setListConver] = useState<Conversation[]>(sampleConversations)

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                    <Image source={{ uri: imageUri }} style={{ width: 50, height: 50, marginBottom: 10, borderRadius: 120 }} />
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="search-outline" size={30} color="#555" />
                    </TouchableOpacity>
                </View>
                <View>
                    {listConver.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' }}
                            onPress={() => router.push({
                                pathname: '/message/[id]',
                                params: { conversationId: item.id, userId: item.user.id }
                            })}
                        >
                            <Image source={{ uri: item.user.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.user.name}</Text>
                                <Text style={{ color: '#666' }}>Last message here...</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <ModalFindChat 
            
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                users={sampleConversations.map(conversation => conversation.user)}
                onSelectUser={(user) => {
                    // Handle user selection
                    console.log('Selected user:', user);
                    setModalVisible(false);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff', marginTop: 10, paddingTop: 10 },
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