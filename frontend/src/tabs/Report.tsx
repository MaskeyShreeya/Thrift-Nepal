import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import API from "../api/api";

const REPORT_OPTIONS = [
  'Misleading information',
  'Wrong price / scam',
  'Inappropriate content',
  'Harassment or suspicious behaviour',
  'Duplicate listing',
  'Other',
];

const Report = () => {
  const [selectedOption, setSelectedOption] = useState('Wrong price / scam');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const listingId = route.params?.listingId;

  const handleSubmit = async () => {
    if (!listingId) {
      alert("Listing not found");
      return;
    }

    // Require additional info if "Other" is selected
    if (selectedOption === "Other" && !additionalInfo.trim()) {
      alert("Please provide details for 'Other'");
      return;
    }

    try {
      await API.post("/reports", {
        listingId,
        reason: selectedOption,
        additionalInfo: selectedOption === "Other" ? additionalInfo : "",
      });

      alert("Report submitted successfully");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Failed to submit report");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Image source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Ad</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.questionText}>Why are you reporting this ad?</Text>

        {REPORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionCard,
              selectedOption === option && styles.selectedOptionCard,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
            <View style={styles.radioOuter}>
              {selectedOption === option && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        {/* Show text input only if "Other" is selected */}
        {selectedOption === "Other" && (
          <TextInput
            style={styles.textArea}
            placeholder="Please describe your issue"
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
          />
        )}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121217' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    marginTop: 30,
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  scrollContent: { padding: 20 },
  questionText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 20, letterSpacing: 0.5 },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A282C',
    padding: 18,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C9C7C7',
  },
  optionText: { color: '#BBB', fontSize: 14 },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#FFF' },
  textArea: {
    backgroundColor: '#161B22',
    borderRadius: 8,
    padding: 15,
    color: '#FFF',
    fontSize: 14,
    marginTop: 10,
    height: 150,
    borderWidth: 1,
    borderColor: '#2D2D35',
  },
  footer: { padding: 20, paddingBottom: 30 },
  submitButton: { backgroundColor: '#FFF', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  submitButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  back: { width: 24, height: 24, resizeMode: "contain" },
});

export default Report;
