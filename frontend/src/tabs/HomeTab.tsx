import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import API from "../api/api"; // your axios instance

const { width } = Dimensions.get("window");

const HomeTab = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await API.get("/listing"); // GET all listings
        setListings(res.data.listings || []);
      } catch (err) {
        console.error("Fetch listings error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={listings}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.listingCard}>
          {item.imageUrl && (
            <Image
              source={{ uri: `http://10.0.2.2:3000${item.imageUrl}` }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.price}>NPR {item.price}</Text>
          </View>
        </View>
      )}
      ListHeaderComponent={
        <View>
          <View style={styles.banner}>
            <Image
              source={require("../assets/Banner.png")}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.sectionTitle}>Inspiration at your fingertips</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  listContent: { padding: 15 },
  columnWrapper: { justifyContent: "space-between" },
  sectionTitle: { color: "white", fontSize: 18, fontFamily: "monospace", marginBottom: 15 },
  banner: { width: "100%", height: 160, borderRadius: 20, overflow: "hidden", marginBottom: 25 },
  bannerImage: { width: "100%", height: "100%" },
  listingCard: { width: "48%", marginBottom: 20, borderRadius: 15, overflow: "hidden" },
  image: { width: "100%", height: 200, borderRadius: 15, backgroundColor: "#2c2c2c" },
  infoContainer: { paddingVertical: 8, paddingHorizontal: 2 },
  title: { color: "#FFFFFF", fontSize: 14, fontWeight: "400" },
  price: { color: "#A3B18A", fontSize: 14, fontWeight: "600", marginTop: 2 },
});

export default HomeTab;
