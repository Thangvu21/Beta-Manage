import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants/image';
import { FONT_FAMILY } from '@/constants/font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import './global.css';

SplashScreen.preventAutoHideAsync();
export default function Welcome() {
  const router = useRouter();

  const [loaded, error] = useFonts({
      [FONT_FAMILY]: require('@/assets/fonts/Oswald-Regular.ttf'),
    });
  
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      return null;
    }
  

  return (
    <ImageBackground 
      source={images.background} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image 
          source={images.betaAVT} 
          style={styles.logo}
        />
        
        <Text style={styles.title}>Welcome to MovieApp</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(login)')}
          >
            <LinearGradient
              colors={['#36D1DC', '#5B86E5']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: FONT_FAMILY,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: FONT_FAMILY,
  },
  buttonContainer: {
    width: '80%',
    maxWidth: 300,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
  }
});