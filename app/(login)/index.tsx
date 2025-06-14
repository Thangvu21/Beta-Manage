
import { useAuthContext } from '@/Components/Context/AuthProvider';
import { useUser } from '@/Components/Context/UserProvider';
import { API } from '@/constants/api';
import axiosClient from '@/constants/axiosClient';
import { images, imagesUrl } from '@/constants/image';
import { UserRole } from '@/constants/user';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';


const SignIn = () => {

    const  { login } = useAuthContext();
    const { user, setUser } = useUser();

    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Please enter valid credentials");
            return;
        }

        try {

            const res = await axios.post(API.login, {
                email: username,
                password,
            });

            const { accessToken, refreshToken } = res.data.data;

            setUser({
                name: res.data.data.name,
                email: '',
                password: '',
                phone: '',
                role: UserRole.ADMIN,
                profilePictureUrl: imagesUrl.avtAdmin
            });
            
            if (res.status === 200 || res.status === 201) {
                await login(accessToken, refreshToken);
                router.replace('/(authenticated)/(tabs)');
            } 
            
            
        } catch (error) {
            Alert.alert("Mật khẩu hoặc tài khoản không đúng");
            console.log(error);
        }
    };

    // const handleLogin = () => {
    //     router.replace('/(authenticated)/(tabs)');
    // }


    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerClassName='h-full'>
                <>
                    <View className="flex-1 items-center justify-center px-6" style={{
                        backgroundColor: '#fff7e6',
                        borderRadius: 12,
                        padding: 16,
                        // backdropFilter: 'blur(10px)',

                    }}>
                        <Image source={images.betaAVT} className="rounded-full mb-3" style={{
                            width: 200, height: 200, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                        }} />
                        <Text style={{ fontSize: 24, fontWeight: 900, color: 'black' }}>Welcome Back!</Text>
                        <Text className="mb-6" style={{ color: "black", fontWeight: 700 }}>Sign in to your account</Text>

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'#DDDDDD'}
                            className="border w-[300] py-3 px-6 rounded-full mb-4"
                            style={{ borderColor: 'black', borderWidth: 1, color: 'black', fontSize: 20 }}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'#DDDDDD'}
                            textContentType='password'

                            secureTextEntry
                            className="border w-[300] py-3 px-6 rounded-full mb-4"
                            style={{ borderColor: 'black', borderWidth: 1, color: 'black', fontSize: 20 }}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <View className="flex-row justify-between w-full mb-4">
                            <View className="flex-row items-center">


                            </View>
                            <TouchableOpacity>

                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity className=" py-3 w-[160] rounded-2xl mb-4" style={{
                            backgroundColor: 'red',
                            paddingVertical: 12,
                            width: 160,
                            borderRadius: 16,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            elevation: 5,
                            marginBottom: 16,
                        }
                        }
                            onPress={handleLogin}

                        >
                            <Text className="text-white text-center font-semibold" >Sign In</Text>
                        </TouchableOpacity>

                        {/* <Text className="text-white my-2">or continue with</Text> */}

                        <View className="flex-row space-x-4">

                        </View>
                    </View>
                </>
            </ScrollView>
        </SafeAreaView>
    )

}

export default SignIn;