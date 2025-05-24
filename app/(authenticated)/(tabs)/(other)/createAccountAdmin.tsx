import { API } from "@/constants/api";
import axiosClient from "@/constants/axiosClient";
import { colors } from "@/constants/color";
import { useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


export default function createAccountAdmin() {

    const [form, setForm] = useState({
        email: '',
        phone: '',
        password: '',
        name: '',
        role: ''
    });

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const formData = new URLSearchParams();
        for (const key in form) {
            formData.append('email', form.email);
            formData.append('phone', form.phone);
            formData.append('password', form.password);
            formData.append('name', form.name);
            formData.append('role', form.role);
        }
        // Gửi form đến backend tại đây
        try {
            const response = await axiosClient.post(API.createAdmin, formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            console.log('Tạo tài khoản admin thành công:', response.data);
            Alert.alert('Thành công', 'Tài khoản admin đã được tạo thành công.');
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản admin:', error);
            // Xử lý lỗi nếu cần
            Alert.alert('Lỗi', 'Không thể tạo tài khoản admin. Vui lòng thử lại sau.');
        }
        setForm({
            email: '',
            phone: '',
            password: '',
            name: '',
            role: ''
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Tạo tài khoản Admin</Text>

                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={form.email}
                        onChangeText={(text) => handleChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Số điện thoại"
                        style={styles.input}
                        value={form.phone}
                        onChangeText={(text) => handleChange('phone', text)}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        placeholder="Mật khẩu"
                        style={styles.input}
                        value={form.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="Họ tên"
                        style={styles.input}
                        value={form.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                    <TextInput
                        placeholder="Vai trò (vd: admin)"
                        style={styles.input}
                        value={form.role}
                        onChangeText={(text) => handleChange('role', text)}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    scrollContent: {
        padding: 20,
        paddingTop: 40,
        alignItems: 'stretch'
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600'
    }
});
