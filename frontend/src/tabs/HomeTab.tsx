import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import API from "../api/api";
import { useNavigation } from "@react-navigation/native";
import Header from '../components/Header';

const { width } = Dimensions.get("window");

const HomeTab = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await API.get("/listing");
        setListings(res.data.listings || []);
      } catch (err) {
        console.error("Fetch listings error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(item =>
    item.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardWrapper} // Flex wrapper for proper spacing
      onPress={() =>
        navigation.navigate("ItemDetails", { listingId: item._id })
      }
    >
      <View style={styles.listingCard}>
        {item.imageUrl && (
          <Image
            source={{ uri: `http://10.0.2.2:3000${item.imageUrl}` }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.price}>NPR {item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
       <Header />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <FlatList
          data={filteredListings}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
         
          contentContainerStyle={styles.listContent}
        columnWrapperStyle={{ justifyContent: "space-between" }}
numColumns={2}

          ListHeaderComponent={
            <View>
              <View style={styles.banner}>
                <Image
                  source={require("../assets/Banner.png")}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.sectionTitle}>
                Inspiration at your fingertips
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  listContent: { padding: 15 },
  columnWrapper: { justifyContent: "space-between" },
  sectionTitle: { color: "white", fontSize: 18, fontFamily: "monospace", marginBottom: 15 },
  banner: { width: "100%", height: 160, borderRadius: 20, overflow: "hidden", marginBottom: 25 },
  bannerImage: { width: "100%", height: "100%" },
  cardWrapper: { flex: 1, marginBottom: 20, marginRight: 10 }, // Flex wrapper
 listingCard: {
  flex: 1,           
  marginBottom: 20,
  borderRadius: 15,
  overflow: "hidden",
},

  image: { width: "100%", height: 200, borderRadius: 15, backgroundColor: "#2c2c2c" },
  infoContainer: { paddingVertical: 8, paddingHorizontal: 2 },
  title: { color: "#FFFFFF", fontSize: 14, fontWeight: "400" },
  price: { color: "#A3B18A", fontSize: 14, fontWeight: "600", marginTop: 2 },
});

export default HomeTab;
