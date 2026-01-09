// pages/Search.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <Header />  {/* 🔹 Same search bar */}
      <ScrollView>
        <Text style={{ color: 'white', margin: 15 }}>This is the Search Page</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
