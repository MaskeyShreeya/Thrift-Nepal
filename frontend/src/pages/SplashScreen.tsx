import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  
  useEffect(() => {
    // Navigate to Login after 3000ms (3 seconds)
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000);

    // Cleanup timer if the user closes the app before 3 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.logoWrapper}>
        <View style={styles.logoBox}>
          {/* Replace this Text with an Image component if you have a logo file */}
          <Text style={styles.logoIcon}>🛍️</Text>
        </View>
        <Text style={styles.brandText}>Thrift Nepal</Text>
      </View>
      
      {/* Decorative loading bar matching your screenshot */}
      <View style={styles.loadingBar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoBox: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    padding: 25,
    borderRadius: 18,
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 60,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loadingBar: {
    position: 'absolute',
    bottom: 50,
    width: width * 0.3,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    opacity: 0.8,
  }
});

export default SplashScreen;