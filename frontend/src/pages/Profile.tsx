import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();

  // Handle individual row clicks
  const handlePress = (screenName: string) => {
    console.log(`Go to: ${screenName}`);
    // Example: navigation.navigate(screenName as never);
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      // Remove the saved token
      await AsyncStorage.removeItem('token');
      // Optional: remove everything
      // await AsyncStorage.clear();

      // Reset navigation stack to Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        })
      );

      console.log('Signed out successfully');
    } catch (err) {
      console.log('Error signing out:', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with back arrow + title */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.replace('Dashboard' as never) // go back to Dashboard without freezing
          }
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>You</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.row} onPress={() => handlePress('Profile')}>
          <Text style={styles.rowTextThin}>Profile</Text>
          <Image
            source={require('../assets/profile.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('Messages')}>
          <Text style={styles.rowTextThin}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('KYC Verification')}>
          <Text style={styles.rowTextThin}>KYC Verification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('Purchases')}>
          <Text style={styles.rowTextThin}>Purchases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('Reviews')}>
          <Text style={styles.rowTextThin}>Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('Setting')}>
          <Text style={styles.rowTextThin}>Setting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handlePress('Help & Support')}>
          <Text style={styles.rowTextThin}>Help & Support</Text>
        </TouchableOpacity>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutRow} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  backArrow: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '300',
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 40,
    color: '#ffffff',
    marginRight: 20,
  },
  scrollView: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  rowTextThin: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#8e8e93',
  },
  signOutRow: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  signOutText: {
    color: '#ff3b30',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default Profile;
