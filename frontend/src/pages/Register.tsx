import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import API from '../api/api';

const Register = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/user/signup', {
        email,
        userName: username,
        password,
      });

      setLoading(false);
      Alert.alert('Success', res.data.message || 'Registered successfully!');
      navigation.replace('Login');
    } catch (err: any) {
      setLoading(false);
      Alert.alert(
        'Registration Failed',
        err.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          {/* Heading */}
          <Text style={styles.heading}>Create your new account.</Text>
          <Text style={styles.subheading}>
            Create an account to start looking for what you need
          </Text>

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Username */}
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter your username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    
  },
  heading: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 1,
  },
  subheading: {
    fontSize: 16,
    color: '#878787',
    marginTop: 15,
    marginBottom: 1,
  },
  label: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    marginTop: 30,
  },
  inputBox: {
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  signInLink: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default Register;
