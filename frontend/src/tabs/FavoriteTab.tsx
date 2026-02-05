import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import API from '../api/api';
import { useNavigation } from '@react-navigation/native';

const FavoriteTab = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await API.get('/favorites');
        setFavorites(res.data.items || []);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => navigation.navigate('ItemDetails', { listingId: item.productId._id })}
    >
      {item.productId.imageUrl && (
        <Image
          source={{ uri: `http://10.0.2.2:3000${item.productId.imageUrl}` }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{item.productId.title}</Text>
      <Text style={styles.price}>NPR {item.productId.price}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
        <View style={styles.headerLine} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.text}>You haven’t favorited anything yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContent}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingTop: 1, paddingBottom: 10, alignItems: 'center' },
  headerText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  headerLine: { height: 1, backgroundColor: '#fff', width: '90%', marginTop: 5 },
  listContent: { padding: 15 },
  cardWrapper: { flex: 1, marginBottom: 20, marginRight: 10 },
  image: { width: '100%', height: 150, borderRadius: 12, backgroundColor: '#2c2c2c' },
  title: { color: '#FFF', fontSize: 14, marginTop: 5 },
  price: { color: '#A3B18A', fontSize: 14, fontWeight: '600', marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#AAA', fontSize: 16 },
});

export default FavoriteTab;
