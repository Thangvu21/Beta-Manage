
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Modal, Alert } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useUser } from '@/Components/Context/UserProvider';
import { Conversation, sampleConversations } from '@/constants/conversation';
import ModalFindChat from '@/Components/Modals/ModalFindChat';
import { imagesUrl } from '@/constants/image';
import axiosClient from '@/constants/axiosClient';
import { API } from '@/constants/api';

interface User {
    id: string;
    name: string;
    avatar: string;
}

export default function Other() {

    const { user, setUser } = useUser();

    const router = useRouter();

    // Sau thay bằng user trên
    const [imageUri, setImageUri] = useState<string>(user.profilePictureUrl || imagesUrl.default);

    const [listConver, setListConver] = useState<Conversation[]>([])

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            const fetchConversations = async () => {
                try {
                    const response = await axiosClient.get(API.getAllConver);
                    setListConver(response.data);
                } catch (error) {
                    Alert.alert('Error', 'Failed to load conversations. Please try again later.');
                }
            };
            fetchConversations();
        }, [])
    );

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
                            onPress={() => {
                                setSelectedUser(item.user);
                                router.push({
                                    pathname: '/message/[id]',
                                    params: { id: item.id, userName: item.user.name, userAvatar: (item.user.avatar && item.user.avatar !== 'http://localhost:9000/user/default.png') ? item.user.avatar : imagesUrl.avtAdmin }
                                })
                            }}
                        >
                            {/* để mặc định */}
                            <Image source={{ uri: (item.user.avatar && item.user.avatar !== 'http://localhost:9000/user/default.png') ? item.user.avatar : imagesUrl.avtAdmin }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
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
                users={listConver.map(conversation => { return { idConver: conversation.id, name: conversation.user.name, avatar: conversation.user.avatar } })}
                onSelectUser={(user) => {
                    // Handle user selection
                    router.push({
                        pathname: '/message/[id]',
                        params: { id: user.idConver, userName: user.name, userAvatar: imagesUrl.default }
                    })
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