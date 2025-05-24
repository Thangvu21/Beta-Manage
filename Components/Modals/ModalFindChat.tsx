import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

interface props {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    users: { id: string; name: string }[];
    onSelectUser: (user: { id: string; name: string }) => void;
}

export default function ModalFindChat({
    modalVisible,
    setModalVisible,
    users,
    onSelectUser,
} : props) {

    const [searchText, setSearchText] = useState<string>("");
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSelectUser = (user: { id: string; name: string }) => {
        onSelectUser(user);
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
                {/* Nút đóng */}
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#333" />
                </TouchableOpacity>

                {/* Ô tìm kiếm */}
                <TextInput
                    placeholder="Tìm người dùng..."
                    value={searchText}
                    onChangeText={setSearchText}
                    style={{ borderBottomWidth: 1, padding: 10, marginTop: 20 }}
                />

                {/* Gợi ý tìm kiếm */}
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectUser(item)}>
                            <View style={{ padding: 12, borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </Modal>

    )
}