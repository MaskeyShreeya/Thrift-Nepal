import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import API from '../api/api';

const SellTab = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'electronics',
    price: '',
    location: '',
    deliveryOption: 'pick-up',
  });
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const t = await AsyncStorage.getItem('token');
      if (!t) Alert.alert('Error', 'You must log in first');
      else setToken(t);
    };
    getToken();
  }, []);

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

  const handleSubmit = async () => {
    if (!token) return Alert.alert("Error", "You must log in first");

    const { title, description, category, price, location, deliveryOption } = form;
    if (!title || !description || !category || !price || !location) {
      return Alert.alert("Error", "Please fill all fields");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("deliveryOption", deliveryOption);
      formData.append("location", JSON.stringify({ address: location }));

      if (photo) {
        formData.append("image", {
          uri: photo.uri,
          type: photo.type || "image/jpeg",
          name: photo.fileName || `photo_${Date.now()}.jpg`,
        } as any);
      }

      await API.post("/listing", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Listing created successfully");

      setForm({
        title: "",
        description: "",
        category: "electronics",
        price: "",
        location: "",
        deliveryOption: "pick-up",
      });
      setPhoto(null);
    } catch (err: any) {
      console.log("UPLOAD ERROR:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Photos</Text>

        <TouchableOpacity style={styles.photoButton} onPress={pickPhoto}>
          <Text style={styles.photoButtonText}>Upload from gallery</Text>
          <MaterialCommunityIcons name="tray-arrow-up" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <Text style={styles.photoButtonText}>Take a photo</Text>
          <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
        </TouchableOpacity>

        {photo && <Image source={{ uri: photo.uri }} style={styles.imagePreview} />}

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={text => handleChange('title', text)}
          placeholder="Title"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={form.description}
          onChangeText={text => handleChange('description', text)}
          placeholder="Description"
          placeholderTextColor="#888"
          multiline
        />

        <Text style={styles.label}>Category</Text>
        <View style={[styles.input, { padding: 0 }]}>
          <Picker
            selectedValue={form.category}
            onValueChange={value => handleChange('category', value)}
            style={{ color: 'white' }}
          >
            <Picker.Item label="Electronics" value="electronics" />
            <Picker.Item label="Fashion" value="fashion" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Books" value="books" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={form.price}
          onChangeText={text => handleChange('price', text)}
          placeholder="Price"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={form.location}
          onChangeText={text => handleChange('location', text)}
          placeholder="Location"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Delivery Option</Text>
        <View style={[styles.input, { padding: 0 }]}>
          <Picker
            selectedValue={form.deliveryOption}
            onValueChange={value => handleChange('deliveryOption', value)}
            style={{ color: 'white' }}
          >
            <Picker.Item label="Pick-up" value="pick-up" />
            <Picker.Item label="Courier" value="courier" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text style={styles.continueButtonText}>Create Listing</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121214' },
  container: { padding: 20 },
  label: { color: 'white', fontSize: 16, marginTop: 20 },
  photoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    marginTop: 10,
  },
  photoButtonText: { color: 'white' },
  input: {
    backgroundColor: '#1c1c1e',
    color: 'white',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  imagePreview: { width: '100%', height: 200, marginTop: 10, borderRadius: 10 },
  continueButton: { backgroundColor: 'white', padding: 15, borderRadius: 30, marginTop: 30, alignItems: 'center' },
  continueButtonText: { color: 'black', fontWeight: 'bold', fontSize: 16 },
});

export default SellTab;
