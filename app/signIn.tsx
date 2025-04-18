
import { images } from '@/constants/image';
import { SafeAreaView, View, Text, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const SignIn = () => {

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView contentContainerClassName='h-full'>
                <ImageBackground source={images.background} className="flex-1" resizeMode="cover" style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', flex: 1}}>
                    <View className="flex-1 items-center justify-center px-6" style={{
                        backgroundColor: 'rgba(200,200,200,0.3)',
                        borderRadius: 12,
                        padding: 16,
                        backdropFilter: 'blur(10px)',
                        
                    }}>
                        <Image source={images.betaAVT} className="rounded-full mb-3" style={{
                            width: 200, height: 200, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                        }} />
                        <Text style={{ fontSize: 24, fontWeight: 900, color: 'white'}}>Welcome Back!</Text>
                        <Text className="mb-6" style={{ color: "#fff", fontWeight: 700 }}>Sign in to your account</Text>

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'#DDDDDD'}
                            className="border w-[250] py-2 px-4 rounded-full mb-4"
                            style={{borderColor: '#FFF', borderWidth: 2}}    
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'#DDDDDD'}
                            secureTextEntry
                            className="border w-[250] py-2 px-4 rounded-full mb-4"
                            style={{borderColor: '#FFF', borderWidth: 2}}
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

                         }}>
                            <Text className="text-white text-center font-semibold" >Sign In</Text>
                        </TouchableOpacity>

                        {/* <Text className="text-white my-2">or continue with</Text> */}

                        <View className="flex-row space-x-4">

                        </View>

                        <View className="flex-row mt-14">
                            <Text style={{color: '#fff', fontSize: 20, fontWeight: 900}}>Don't have an account?</Text>
                            <TouchableOpacity>
                                <Text className="ml-1" style={{color: 'white', fontSize: 20, fontWeight: 500}}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )

}

export default SignIn;