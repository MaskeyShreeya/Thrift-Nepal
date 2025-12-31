import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // after successful login
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login to your account.</Text>
      <Text style={styles.subheading}>Please sign in to your account</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>
          Don’t have an account? <Text style={styles.registerLink}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B181F',
    padding: 20,
  },
  heading: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 70,
  },
  subheading: {
    fontSize: 16,
    color: '#878787',
    marginTop: 15,
  },
  label: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    marginTop: 40,
  },
  inputBox: {
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
  },
  forgotText: {
    color: '#aaa',
    textAlign: 'right',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
  },
  registerLink: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default Login;
