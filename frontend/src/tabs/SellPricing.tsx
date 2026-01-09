import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import BackIcon from '../assets/back.png';
import DownIcon from '../assets/down.png';

const SellPricing = ({ route, navigation }: any) => {
  const { formData } = route.params;
  const [price, setPrice] = useState(formData.price || '');
  const [negotiableOption, setNegotiableOption] = useState<'negotiable' | 'non-negotiable'>(formData.negotiable || 'non-negotiable');

  const handleContinue = () => {
    if (!price.trim()) return alert('Please enter a price');
    navigation.navigate('SellConfirm', { formData: { ...formData, price, negotiable: negotiableOption } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set pricing</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Price</Text>

          <View style={styles.priceBoxContainer}>
            <View style={styles.priceSection}>
              <Text style={styles.currencyText}>NPR</Text>
              <TextInput style={styles.priceInput} placeholder="500" placeholderTextColor="#666" keyboardType="numeric" value={price} onChangeText={setPrice} />
            </View>

            <View style={styles.divider} />

            <View style={styles.negotiableSection}>
              <Picker selectedValue={negotiableOption} onValueChange={(val) => setNegotiableOption(val)} style={styles.hiddenPicker} dropdownIconColor="transparent">
                <Picker.Item label="Non-negotiable" value="non-negotiable" />
                <Picker.Item label="Negotiable" value="negotiable" />
              </Picker>
              <Text style={styles.selectedText}>{negotiableOption === 'negotiable' ? 'Negotiable' : 'Non-negotiable'}</Text>
              <Image source={DownIcon} style={styles.downIcon} />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
  backIcon: { width: 12, height: 20, resizeMode: 'contain', tintColor: 'white' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '600', marginLeft: 20 },

  content: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { color: '#aaa', fontSize: 14, marginTop: 10, marginBottom: 8 },

  priceBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  priceSection: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  currencyText: { color: '#4CD964', fontSize: 18, fontWeight: '600', marginRight: 12 },
  priceInput: { flex: 1, color: 'white', fontSize: 18, paddingVertical: 0 },

  divider: { width: 1, height: '70%', backgroundColor: '#444', marginHorizontal: 16 },

  negotiableSection: { position: 'relative', minWidth: 140, justifyContent: 'center' },
  hiddenPicker: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, opacity: 0 },
  selectedText: { color: 'white', fontSize: 16, paddingRight: 30 },
  downIcon: { position: 'absolute', right: 0, width: 18, height: 18, tintColor: '#888', pointerEvents: 'none' },

  continueButton: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: 'white', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  continueButtonText: { color: 'black', fontSize: 17, fontWeight: '600' },
});

export default SellPricing;
