// tabs/DiscoverTab.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const DiscoverTab = () => {
  return (
    <View style={styles.container}>
       <Header />
      <Text style={styles.text}>Discover Page Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 1 },
  text: { color: 'white', fontSize: 18 },
});

export default DiscoverTab;
