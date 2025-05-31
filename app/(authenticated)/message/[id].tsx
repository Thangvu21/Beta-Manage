import ChatHeader from "@/Components/Headers/ChatHeader";
import { API } from "@/constants/api";
import axiosClient from "@/constants/axiosClient";
import { Message, mockMessages } from "@/constants/chat";
import { imagesUrl } from "@/constants/image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, InteractionManager, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import socketIOClient from "socket.io-client";

const chatDetail = () => {

    const { id, userName, userAvatar } = useLocalSearchParams();
    const navigation = useNavigation();
    const socketRef = useRef<any>(null);

    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    // để lưu thông tin khi socket nhận được không rerender lại nhiều lần
    const messageRef = useRef<Message[]>([]);

    // để đặt thanh scoll về cuối khi lần đầu tiên hay chỉ kéo xuống 1 tí
    const [isFirstRender, setIsFirstRender] = useState(true);

    // scroll 
    const flatListRef = useRef<FlatList>(null);
    // tránh fetch nhiều lần khi kéo lên
    const [loadingMore, setLoadingMore] = useState(false);


    const handleScroll = ({ nativeEvent }: any) => {
        if (nativeEvent.contentOffset.y < 20 || loadingMore) return;
        if (!loadingMore) {
            setLoadingMore(true);
            fetchMessages(messageRef.current.length).then(() => {
                setLoadingMore(false);
            });
        }
    };

    const fetchMessages = async (offset = 0) => {

        try {
            // Simulate fetching messages from an API
            // Replace with actual API call if needed
            const response = await axiosClient.get(`${API.getAllMessage}/${id}`, {
                params: {
                    offset
                }
            });
            const messagesFetch = response.data.reverse();
            // console.log('Fetched messages:', response.data);
            messageRef.current = [...messagesFetch, ...messageRef.current]

            setMessages([...messageRef.current]);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    const handleSend = async () => {
        try {
            const response = await axiosClient.post(API.sendMessage, JSON.stringify({
                conversationId: id,
                text: newMessage
            }))

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message. Please try again later.');
        }
    };

    const connectSocket = () => {
        console.log("connectSocket called");
        try {
            // id là conversationId
            const channelId = id;

            socketRef.current = socketIOClient(API.host, {
                query: { channelId },
            });

            socketRef.current.on("connect", () => {
                socketRef.current.emit("join", channelId);
            });

            // Xử lý sự kiện ngắt kết nối
            socketRef.current.on("disconnect", () => {
                console.log("Disconnected from server");
            });

            // Xử lý sự kiện kết nối lại thất bại
            socketRef.current.on("reconnect_failed", () => {
                console.log("Failed to reconnect to server");
            });

        }
        catch (error) {
            console.error('Error connecting to chat service:', error);
        }
    }

    // hiển thị lần đầu
    useEffect(() => {
        connectSocket();
        fetchMessages().then(() => {
            if (isFirstRender && messages.length > 0) {
                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: false });
                    setIsFirstRender(false);
                }, 100); // Delay 1 chút để đảm bảo FlatList đã render
            }
        });
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
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        }
    }, [id]);

    // lắng nghe thằng khác nó gửi tin nhắn đến

    useEffect(() => {
        if (!socketRef.current) return;

        const socket = socketRef.current;

        const handleNewMessage = (message: Message) => {
            console.log('New message received:', message);
            if (messageRef.current.some(msg => msg.id === message.id)) return;
            messageRef.current.push(message);
            setMessages([...messageRef.current]);
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socketRef.current]);

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
                        ref={flatListRef}
                        onScroll={handleScroll}
                        onContentSizeChange={() => {
                            if (isFirstRender) {
                                flatListRef.current?.scrollToEnd({ animated: false });
                                setIsFirstRender(false);
                            }
                        }}
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