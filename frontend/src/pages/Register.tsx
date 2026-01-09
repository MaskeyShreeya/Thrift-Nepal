import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import API from '../api/api'; // axios instance with baseURL: http://10.0.2.2:3000/api/v1

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

      // Navigate back to login after successful signup
      navigation.replace('Login');
    } catch (err: any) {
      setLoading(false);
      console.log(err.response?.data || err.message);
      Alert.alert(
        'Registration Failed',
        err.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your new account</Text>
      <Text style={styles.subtitle}>
        Create an account to start looking for what you need
      </Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#555"
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator color="#111" />
        ) : (
          <Text style={styles.registerText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#111',
    fontWeight: 'bold',
  },
  signInText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Register;
