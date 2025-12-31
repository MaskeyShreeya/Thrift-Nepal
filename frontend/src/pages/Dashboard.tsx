import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  StatusBar
} from 'react-native';
// 1. Change the import for SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40) / 2;

const Welcome = () => {
  const products = [
    { id: '1', title: 'White aesthetic hoodie', price: 'NPR 900', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },
    { id: '2', title: 'Adidas Shoes', price: 'NPR 1200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
    { id: '3', title: 'Tan Leather Bag', price: 'NPR 1500', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
    { id: '4', title: 'iPhone 12 Pro', price: 'NPR 85000', img: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400' },
  ];

  return (
    // SafeAreaView now comes from the new library
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>THRIFT NEPAL</Text>
            <Text style={styles.bannerSubtitle}>From Gadgets to Garments</Text>
          </View>
          <View style={styles.bagIcon}>
            <Text style={{ fontSize: 24 }}>🛍️</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Inspiration at your fingertips</Text>

        <View style={styles.grid}>
          {products.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.image} />
              <TouchableOpacity style={styles.heart}>
                <Text>❤️</Text>
              </TouchableOpacity>
              <Text style={styles.pName}>{item.title}</Text>
              <Text style={styles.pPrice}>{item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        <View style={styles.navItem}><Text style={styles.navIcon}>🏠</Text><Text style={styles.navLabelActive}>Home</Text></View>
        <View style={styles.navItem}><Text style={styles.navIcon}>🧭</Text><Text style={styles.navLabel}>Discover</Text></View>
        <View style={styles.navItem}><Text style={styles.navIcon}>➕</Text><Text style={styles.navLabel}>Sell</Text></View>
        <View style={styles.navItem}><Text style={styles.navIcon}>❤️</Text><Text style={styles.navLabel}>Favorite</Text></View>
        <View style={styles.navItem}><Text style={styles.navIcon}>🛒</Text><Text style={styles.navLabel}>Cart</Text></View>
      </View>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  searchBar: { flex: 1, backgroundColor: '#262626', borderRadius: 25, flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', height: 45 },
  emoji: { marginRight: 10 },
  searchInput: { color: 'white', flex: 1 },
  profileBtn: { marginLeft: 10, backgroundColor: '#262626', borderRadius: 25, padding: 8 },
  banner: { backgroundColor: '#D4C5B0', margin: 15, borderRadius: 20, padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerTitle: { fontSize: 22, fontWeight: 'bold', color: '#121212' },
  bannerSubtitle: { fontSize: 12, fontStyle: 'italic', color: '#121212' },
  bagIcon: { backgroundColor: '#121212', padding: 10, borderRadius: 25 },
  sectionTitle: { color: 'white', marginHorizontal: 15, fontSize: 17, fontWeight: '600', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingBottom: 100 },
  card: { width: COLUMN_WIDTH, margin: 5, marginBottom: 20 },
  image: { width: '100%', height: 210, borderRadius: 20 },
  heart: { position: 'absolute', right: 10, top: 10, backgroundColor: 'white', borderRadius: 20, padding: 5 },
  pName: { color: 'white', marginTop: 10, fontSize: 14 },
  pPrice: { color: '#8FBC8F', fontWeight: 'bold', marginTop: 2 },
  navBar: { position: 'absolute', bottom: 0, flexDirection: 'row', backgroundColor: '#181818', paddingVertical: 10, width: '100%', borderTopWidth: 0.5, borderTopColor: '#333' },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { fontSize: 18 },
  navLabel: { color: '#888', fontSize: 10, marginTop: 4 },
  navLabelActive: { color: '#FFF', fontSize: 10, marginTop: 4 }
});

export default Welcome;