import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import BackIcon from '../assets/back.png';
import UploadIcon from '../assets/upload.png';
import TakePhotoIcon from '../assets/take.png';
import DownIcon from '../assets/down.png';

const SellListing = ({ navigation }: any) => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    condition: '',
    location: '',
    deliveryOption: '',
  });
  const [photo, setPhoto] = useState<any>(null);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const pickPhoto = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets?.length) setPhoto(result.assets[0]);
  };

  const takePhoto = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    if (result.assets?.length) setPhoto(result.assets[0]);
  };

  const handleContinue = () => {
    const { title, category, condition, location, deliveryOption } = form;
    if (!title || !category || !condition || !location || !deliveryOption) {
      return Alert.alert('Error', 'Please fill in all required fields');
    }
    navigation.navigate('SellDetails', { formData: { ...form, photo } });
  };

  const renderPicker = (selectedValue: string, onValueChange: (val: string) => void, items: { label: string; value: string }[]) => (
    <View style={styles.pickerWrapper}>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
        {items.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      <Image source={DownIcon} style={styles.downIcon} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create a Listing</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <TouchableOpacity style={styles.photoButton} onPress={pickPhoto}>
          <Text style={styles.photoButtonText}>Upload photos</Text>
          <Image source={UploadIcon} style={styles.photoIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <Text style={styles.photoButtonText}>Take photos</Text>
          <Image source={TakePhotoIcon} style={styles.photoIcon} />
        </TouchableOpacity>
        {photo && <Image source={{ uri: photo.uri }} style={styles.imagePreview} />}

        <Text style={styles.sectionTitle}>Title</Text>
        <TextInput style={styles.input} placeholder="Provide a descriptive title" placeholderTextColor="#666" value={form.title} onChangeText={text => handleChange('title', text)} />

        <Text style={styles.sectionTitle}>Category</Text>
        {renderPicker(form.category, val => handleChange('category', val), [
          { label: 'Select category', value: '' },
          { label: 'Electronics', value: 'electronics' },
          { label: 'Fashion', value: 'fashion' },
          { label: 'Home & Garden', value: 'home' },
          { label: 'Books', value: 'books' },
          { label: 'Other', value: 'other' },
        ])}

        <Text style={styles.sectionTitle}>Condition</Text>
        {renderPicker(form.condition, val => handleChange('condition', val), [
          { label: 'Select condition', value: '' },
          { label: 'New', value: 'new' },
          { label: 'Like New', value: 'like_new' },
          { label: 'Good', value: 'good' },
          { label: 'Fair', value: 'fair' },
        ])}

        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput style={styles.input} placeholder="Location" placeholderTextColor="#666" value={form.location} onChangeText={text => handleChange('location', text)} />

        <Text style={styles.sectionTitle}>Delivery</Text>
        {renderPicker(form.deliveryOption, val => handleChange('deliveryOption', val), [
          { label: 'Select delivery option', value: '' },
          { label: 'Pick-up', value: 'pick-up' },
          { label: 'Courier', value: 'courier' },
        ])}
      </ScrollView>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backIcon: { width: 12, height: 20, resizeMode: 'contain', tintColor: 'white' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '600', marginLeft: 100 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionTitle: { color: '#aaa', fontSize: 14, marginTop: 24, marginBottom: 8 },
  photoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  photoButtonText: { color: 'white', fontSize: 16 },
  photoIcon: { width: 24, height: 24, resizeMode: 'contain' },
  imagePreview: { width: '100%', height: 250, borderRadius: 12, marginTop: 12, marginBottom: 12 },
  input: {
    backgroundColor: '#1c1c1e',
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  pickerWrapper: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
    justifyContent: 'center',
  },
  picker: {
    color: 'white',
    ...Platform.select({
      android: { paddingHorizontal: 16, paddingVertical: 8 },
      ios: { paddingHorizontal: 16, paddingVertical: 12 },
    }),
  },
  downIcon: { position: 'absolute', right: 16, width: 20, height: 20, tintColor: '#888', resizeMode: 'contain', pointerEvents: 'none' },
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
  continueButtonText: { color: 'black', fontSize: 17, fontWeight: '600' },
});

export default SellListing;
