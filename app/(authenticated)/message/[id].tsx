import ChatHeader from "@/Components/Headers/ChatHeader";
import { Message, mockMessages } from "@/constants/chat";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const chatDetail = () => {

    const { conversationId, userId } = useLocalSearchParams();
    const navigation = useNavigation();

    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const newMsg: Message = {
            id: Math.random().toString(36).substring(7), // Generate a random ID for the message
            conversation: conversationId as string,
            sender: 'user',
            text: newMessage
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    useEffect(() => {
        // You can use conversationId and userId to fetch chat details or perform other actions

        navigation.setOptions({
            header: () => {
                return (
                    <ChatHeader
                        name="Nguyễn Văn A"
                        avatar="https://files.betacorp.vn/media%2fimages%2f2025%2f05%2f18%2fbeta%2D400x633%2D192849%2D180525%2D39.png"
                    />
                )
            }
        });

    }, [conversationId, userId]);

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
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.chatContainer}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    styles.messageBubble,
                                    item.sender === 'user' ? styles.userBubble : styles.adminBubble
                                ]}
                            >
                                <Text style={styles.messageText}>{item.text}</Text>
                            </View>
                        )}
                    />

                    {/* Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tin nhắn..."
                            value={newMessage}
                            onChangeText={setNewMessage}
                        />
                        <LinearGradient
                            colors={['#1e6fa8', '#70c6e5']}
                            style={styles.sendButton}>
                            <TouchableOpacity onPress={handleSend}>
                                <Ionicons name="send" size={20} color="white" />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12
    },
    chatContainer: {
        padding: 16,
        flexGrow: 1
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        marginBottom: 10,
        borderRadius: 16
    },
    userBubble: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end'
    },
    adminBubble: {
        backgroundColor: '#eee',
        alignSelf: 'flex-start'
    },
    messageText: {
        fontSize: 15,
        color: '#333'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default chatDetail;