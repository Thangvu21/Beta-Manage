import { FONT_FAMILY } from '@/constants/font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

const Layout = () => {

    return (
        <Stack>
            <Stack.Screen
                name='[id]'
                options={{
                    headerShown: true,
                }}
                
            />
        </Stack>
    )

}

export default Layout;