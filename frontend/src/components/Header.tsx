// components/Header.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.searchBar}>
        <Text style={styles.emoji}>🔍</Text>
        <TextInput 
          placeholder="Search for something special"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>
      <TouchableOpacity style={styles.profileBtn}>
        <Text style={{ fontSize: 20 }}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#121212' },
  searchBar: { flex: 1, backgroundColor: '#262626', borderRadius: 25, flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', height: 45 },
  emoji: { marginRight: 10 },
  searchInput: { color: 'white', flex: 1 },
  profileBtn: { marginLeft: 10, backgroundColor: '#262626', borderRadius: 25, padding: 8 },
});

export default Header;
