import ChatHeader from "@/Components/Headers/ChatHeader";
import { API } from "@/constants/api";
import axiosClient from "@/constants/axiosClient";
import { Message, mockMessages } from "@/constants/chat";
import { imagesUrl } from "@/constants/image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const chatDetail = () => {

    const { id, userId, userName, userAvatar } = useLocalSearchParams();
    const navigation = useNavigation();

    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = async () => {
        try {
            const response = await axiosClient.post(API.sendMessage, JSON.stringify({
                conversationId: id,
                text: newMessage
            }))

            console.log('Message sent:', response.data);


            if (!newMessage.trim()) return;
            const newMsg: Message = {
                id: response.data.id, // Assuming the API returns the new message ID
                conversationId: id as string,
                sender: 'admin',
                text: newMessage
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message. Please try again later.');
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {

            try {
                // Simulate fetching messages from an API
                // Replace with actual API call if needed
                const response = await axiosClient.get(`${API.getAllMessage}/${id}`);
                console.log('Fetched messages:', response.data);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }

        fetchMessages();
        navigation.setOptions({
            header: () => {
                return (
                    <ChatHeader
                        name={userName as string}
                        avatar={userAvatar as string}
                    />
                )
            }
        });

    }, [id]);

    return (
        <>
            <SafeAreaView style={styles.safe}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {/* Header */}


                    {/* Messages */}
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.chatContainer}
                        renderItem={({ item }) => {
                            const isAdmin = item.sender === 'admin';
                            return (
                                <View
                                    style={[
                                        { flexDirection: isAdmin ? 'row-reverse' : 'row', alignItems: 'flex-end', marginBottom: 12 },
                                    ]}
                                >
                                    <Image
                                        source={{ uri: isAdmin ? (userAvatar as string) : imagesUrl.default }}
                                        style={[
                                            styles.avatar,
                                            isAdmin ? { marginLeft: 8 } : { marginRight: 8 },
                                        ]}
                                    />
                                    <View
                                        style={[
                                            styles.messageBubble,
                                            isAdmin ? styles.userBubble : styles.adminBubble,
                                        ]}
                                    >
                                        <Text style={styles.messageText}>{item.text}</Text>
                                    </View>
                                </View>
                            );
                        }}
                    />

                    {/* Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tin nhắn..."
                            placeholderTextColor="#999"
                            value={newMessage}
                            onChangeText={setNewMessage}
                        />
                        <TouchableOpacity onPress={handleSend}>
                            <LinearGradient
                                colors={['#1e6fa8', '#70c6e5']}
                                style={styles.sendButton}
                            >
                                <Ionicons name="send" size={20} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        paddingTop: Platform.OS === 'android' ? 20 : 0, // Adjust for Android status bar
    },
    safe: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    chatContainer: {
        padding: 16,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    messageBubble: {
        maxWidth: '75%',
        padding: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    userBubble: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    adminBubble: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 15,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 24,
        marginRight: 10,
    },
    sendButton: {
        padding: 10,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default chatDetail;