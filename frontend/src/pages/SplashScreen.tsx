import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  StatusBar,
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // make sure Login is in your navigator
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.logoWrapper}>
        <Image 
          source={require('../assets/logo.png')} // CLI-friendly import
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.brandText}>Thrift Nepal</Text>
      </View>
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
  
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoImage: {
    width: 300,  // fixed number works in CLI
    height: 300,
    marginTop: "50%",
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: -30,
 
  },

});

export default SplashScreen;
