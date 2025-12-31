import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Register = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log({ email, username, password });
    navigation.replace('Login'); // back to login after register
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your new account</Text>
      <Text style={styles.subtitle}>
        Create an account to start looking for what you need
      </Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
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
