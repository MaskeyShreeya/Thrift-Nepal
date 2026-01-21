import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSearch } from '../context/SearchContext';
import { useNavigation } from '@react-navigation/native'; // Import navigation

const Header = () => {
  const { searchText, setSearchText } = useSearch();
  const navigation = useNavigation<any>(); // Hook for navigation

  return (
    <View style={styles.header}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Image source={require('../assets/search.png')} style={styles.search} />
        <TextInput
          placeholder="Search for something special"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Profile button */}
      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => navigation.navigate('Profile')} // Navigate to Profile
      >
        <Image source={require('../assets/profile.png')} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};

// Styles stay the same
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#262626',
    borderRadius: 25,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 45,
  },
  searchInput: {
    color: 'white',
    flex: 1,
    marginLeft: 9,
  },
  profileBtn: {
    marginLeft: 10,
    backgroundColor: '#262626',
    borderRadius: 25,
    padding: 8,
  },
  profile: { width: 30, height: 30 },
  search: { width: 20, height: 20 },
});

export default Header;
