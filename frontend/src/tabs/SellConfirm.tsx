import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import API from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from '../assets/back.png';

const SellConfirm = ({ route, navigation }: any) => {
  const data = route?.params?.formData;

  // If no formData is passed, show alert and go back
  if (!data) {
    Alert.alert('Error', 'No data provided for confirmation');
    navigation.goBack();
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Map condition to readable text
  const conditionText = {
    new: 'New',
    like_new: 'Like New',
    good: 'Used',
    fair: 'Fair',
  }[data?.condition] || data?.condition || 'Used';

  useEffect(() => {
    const getToken = async () => {
      try {
        const t = await AsyncStorage.getItem('token');
        if (!t) {
          Alert.alert('Error', 'You must log in first');
          navigation.navigate('Login');
        } else setToken(t);
      } catch (e) {
        Alert.alert('Error', 'Failed to read token');
      }
    };
    getToken();
  }, []);

  const handleUpload = async () => {
    if (!token) return Alert.alert('Error', 'You must log in first');

    const { title, description, category, price, location, deliveryOption, photo } = data;

    if (!title || !description || !category || !price || !location) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('deliveryOption', deliveryOption || 'pick-up');
      formData.append('location', JSON.stringify({ address: location }));

      if (photo && photo.uri) {
        formData.append('image', {
          uri: photo.uri,
          type: photo.type || 'image/jpeg',
          name: photo.fileName || `photo_${Date.now()}.jpg`,
        } as any);
      }

      await API.post('/listing', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Your listing has been uploaded successfully!');
      
      // Reset navigation to Dashboard safely
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (err: any) {
      console.log('UPLOAD ERROR:', err?.response?.data || err?.message);
      Alert.alert('Error', err?.response?.data?.error || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Please review your listing:</Text>

        <View style={styles.previewCard}>
          <View style={styles.imagePlaceholder}>
            {data?.photo?.uri ? (
              <Image source={{ uri: data.photo.uri }} style={styles.previewImage} />
            ) : (
              <View style={styles.emptyImage} />
            )}
          </View>

          <View style={styles.detailsContainer}>
            {data?.title && <Text style={styles.itemTitle}>{data.title}</Text>}
            {data?.description && <Text style={styles.itemDescription}>{data.description}</Text>}
            {data?.category && <Text style={styles.detailText}>Category: {data.category}</Text>}
            {data?.condition && <Text style={styles.detailText}>Condition: {conditionText}</Text>}
            {data?.location && <Text style={styles.detailText}>Location: {data.location}</Text>}
            {data?.deliveryOption && <Text style={styles.detailText}>Delivery: {data.deliveryOption}</Text>}
            {data?.price && (
              <Text style={styles.detailText}>
                Price: NPR {data.price} {data?.negotiable === 'negotiable' ? '(Negotiable)' : ''}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload} disabled={loading}>
        {loading ? <ActivityIndicator color="black" /> : <Text style={styles.uploadButtonText}>Upload Ad Post</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121214' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
  backIcon: { width: 12, height: 20, resizeMode: 'contain', tintColor: 'white' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '600', marginLeft: 20 },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  subtitle: { color: '#aaa', fontSize: 16, marginVertical: 20, textAlign: 'center' },
  previewCard: { flexDirection: 'row', backgroundColor: '#1c1c1e', borderRadius: 16, padding: 16, borderWidth: 2, borderColor: '#333', borderStyle: 'dashed' },
  imagePlaceholder: { width: 100, height: 100, borderRadius: 12, backgroundColor: '#2c2c2e', overflow: 'hidden', marginRight: 16 },
  emptyImage: { flex: 1, backgroundColor: '#333' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  detailsContainer: { flex: 1, justifyContent: 'space-between' },
  itemTitle: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 4 },
  itemDescription: { color: '#ccc', fontSize: 14, marginBottom: 6 },
  detailText: { color: 'white', fontSize: 14, marginBottom: 4 },
  uploadButton: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: 'white', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  uploadButtonText: { color: 'black', fontSize: 17, fontWeight: '600' },
});

export default SellConfirm;
