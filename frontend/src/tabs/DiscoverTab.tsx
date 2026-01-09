// tabs/DiscoverTab.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiscoverTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Discover Page Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { color: 'white', fontSize: 18 },
});

export default DiscoverTab;
