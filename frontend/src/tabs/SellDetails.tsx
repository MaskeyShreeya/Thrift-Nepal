import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/back.png';

const SellDetails = ({ route, navigation }: any) => {
  const { formData } = route.params;
  const [description, setDescription] = useState(formData.description || '');

  const handleContinue = () => {
    if (!description.trim()) return alert('Please add description');
    navigation.navigate('SellPricing', { formData: { ...formData, description } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Describe item</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput style={styles.descriptionInput} placeholder="Add all product or service specification" placeholderTextColor="#666" multiline textAlignVertical="top" value={description} onChangeText={setDescription} />
        </ScrollView>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backIcon: {
    width: 12,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for continue button
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 8,
  },
  descriptionInput: {
    backgroundColor: '#1c1c1e',
    color: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 12,
    fontSize: 16,
    height: 200, // Tall input as in screenshot
    textAlignVertical: 'top',
  },
  continueButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default SellDetails;