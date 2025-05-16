import { Tabs } from "expo-router";
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { images } from "@/constants/image";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient";
import { FONT_FAMILY } from "@/constants/font";
import { BottomTabBarProps } from "@/types/bottomTabBarProps";
import { useRouter } from "expo-router";
import { UserProvider } from "@/Components/Context/UserProvider";

const CustomTabBarButton = ({ children, onPress }: BottomTabBarProps) => {
    const router = useRouter();

    return (
        <>
            <View style={styles.fabWrapper}>
                <TouchableOpacity
                    style={styles.fabContainer}
                    onPress={() => router.push('/(authenticated)/scanner')}
                    activeOpacity={0.9}
                >
                    <View style={styles.fab}>
                        {children}
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
}


const _Layout = () => {


    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 20,
                    right: 20,
                    backgroundColor: '#70c6e5',
                    //   borderRadius: 15,

                    height: 60,
                    ...styles.shadow,
                }
            }}>

            <Tabs.Screen
                name="(analyst)"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="analytics" size={30} color={color} />
                }}
            />

            <Tabs.Screen
                name="index"
                options={{
                    title: "Home", headerShown: false,
                    tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name="movie-open-check-outline" size={30} color={color} />
                }}
            />

            <Tabs.Screen
                name="scan"
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="control-camera" size={30} color={'white'} />,
                    tabBarButton: (props) => <CustomTabBarButton children={props.children} onPress={props.onPress} />, // tự custom FAB bấm
                }}
            />


            <Tabs.Screen
                name="(other)"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <MaterialIcons name="fastfood" size={30} color={color} />
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile", headerShown: false
                    , tabBarIcon: ({ color }) => <AntDesign name="profile" size={30} color={color} />
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    fabWrapper: {
        position: 'absolute',
        top: -25,
        height: 70,
        width: 70,
        borderRadius: 40,
        backgroundColor: '#fff', // màu nền che phần xanh khi bấm
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    fabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#337ab7',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
        elevation: 5,
        shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        overflow: 'hidden',
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 2.5,
        elevation: 5,
    },
});

export default _Layout;