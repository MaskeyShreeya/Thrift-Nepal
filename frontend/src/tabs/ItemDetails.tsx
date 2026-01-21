// ItemDetails.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import API from "../api/api";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

interface RouteParams {
  listingId: string;
}

interface Listing {
  _id: string;
  title: string;
  price: number;
  description: string;
  condition: string;
  location: { address: string };
  isNegotiable: boolean;
  imageUrl: string;
  owner: { userName: string; email: string };
  deliveryOption: string;
}

const ItemDetails = () => {
  const route = useRoute();
  const { listingId } = route.params as RouteParams;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listing/${listingId}`);
        setListing(res.data.listing);
      } catch (err) {
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  if (!listing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
        <Text style={{ color: "#fff" }}>Item not found</Text>
      </View>
    );
  }

  return (
 <ScrollView 
  style={styles.container} 
  contentContainerStyle={{ paddingBottom: 30 }} // extra 30px space at the bottom
>
<View style={styles.head}>
  <TouchableOpacity 
    style={styles.back} 
    onPress={() => navigation.navigate("Dashboard")}
  >
    <Image source={require("../assets/back.png")} />
  </TouchableOpacity>

  <TouchableOpacity 
    style={styles.report} 
    onPress={() => console.log("Report pressed")}
  >
    <Image source={require("../assets/report.png")} />
  </TouchableOpacity>
</View>

    

    {/* Thin white line under back button */}
    <View style={styles.backLine} />

    {/* Item Image */}
    <Image
      source={{ uri: `http://10.0.2.2:3000${listing.imageUrl}` }}
      style={styles.mainImage}
      resizeMode="cover"
    />
    <View style ={styles.view}>
      <Image
      source={{ uri: `http://10.0.2.2:3000${listing.imageUrl}` }}
      style={styles.smallImage}
      resizeMode="cover"
    />
       {/* Title & Price */}
       <View>
      <Text style={styles.price}>NPR {listing.price}</Text>
      <Text style={styles.condition}>{listing.condition}</Text>
      </View>
      </View>

     <View style={styles.backLine} />

      {/* Seller info and price */}
      <View style={styles.sellerRow}>
        <Image
          source={require("../assets/profile.png")} // fallback avatar
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.sellerName}>{listing.owner.userName}</Text>
          <Text style={styles.sellerContact}>{listing.owner.email}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{listing.title}</Text>
         <View style={styles.backLine} />
      {/* Description */}
      <View style={styles.slider}>
        <View>
            <View>
        <Text style={styles.sectionTitle}>Description</Text>
        <View style ={styles.line}></View>
        </View>
        <Text style={styles.sectionText}>{listing.description}</Text>
        </View>
        <View>
        <Text style={styles.chat}>Chat</Text>
        <View style ={styles.chatline}></View>
        </View>
        <View>
        <Text style={styles.review}>Review</Text>
        <View style ={styles.reviewline}></View>
        </View>
      </View>

     {/* General info */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>General</Text>
  <View style={styles.generalCard}>
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>AD ID</Text>
      <Text style={styles.specValue}>{listing._id}</Text>
    </View>
    <View style={styles.lineDivider} />
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>Location</Text>
      <Text style={styles.specValue}>{listing.location.address}</Text>
    </View>
    <View style={styles.lineDivider} />
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>Delivery</Text>
      <Text style={styles.specValue}>{listing.deliveryOption}</Text>
    </View>
    <View style={styles.lineDivider} />
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>Negotiable</Text>
      <Text style={styles.specValue}>{listing.isNegotiable ? "Yes" : "No"}</Text>
    </View>
    <View style={styles.lineDivider} />
  </View>
</View>

{/* Specification */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Specification</Text>
  <View style={styles.generalCard}>
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>Delivery Charge</Text>
      <Text style={styles.specValue}>150</Text>
    </View>
    <View style={styles.lineDivider} />
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>Type</Text>
      <Text style={styles.specValue}>{listing.title}</Text>
    </View>
    <View style={styles.lineDivider} />
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>Size</Text>
      <Text style={styles.specValue}>Free Size</Text>
    </View>
    <View style={styles.lineDivider} />
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>Color</Text>
      <Text style={styles.specValue}>White</Text>
    </View>
    <View style={styles.lineDivider} />
  </View>
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 12 },
head: {
  flexDirection: "row",           // horizontal row
  justifyContent: "space-between",// left icon to start, right icon to end
  alignItems: "center",           // vertically center
  marginTop: 35,                  // spacing from top
  marginBottom: 10,               // spacing below header
  paddingHorizontal: 12,          // space from edges
},

back: {
  // optional: size for touch area
  width: 30,
  height: 30,
},

report: {
  width: 30,
  height: 30,
},

  backLine: {
  height: 0.4,
  backgroundColor: "#fff",
  width: "100%",
  marginBottom: 15, 
},
  mainImage: { width: "100%", height: 300, borderRadius: 15, marginBottom: 12 },
  smallImage:{width:50, height:50,borderRadius: 15,marginBottom:12,},
  view:{flexDirection: 'row', justifyContent:'space-between'},
  sellerRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: "#444" },
  sellerName: { color: "#fff", fontWeight: "600", fontSize: 15 },
  sellerContact: { color: "#aaa", fontSize: 13 },
  addToCartBtn: { backgroundColor: "#D9D9D9", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 30 },
  addToCartText: { color: "black", fontWeight: "600", fontSize: 15 },
  title: { color: "#fff", fontSize: 15, fontWeight: "600", marginBottom: 10 },
  price: { color: "#4caf50", fontSize: 15, fontWeight: "600", marginBottom: 2 },
  slider:{flexDirection:'row',justifyContent:'space-between',},
  chat:{fontSize: 15,color: "#fff", fontWeight: "600",marginRight:60,},
  review:{fontSize: 15,color: "#fff", fontWeight: "600",marginRight:30,},
  condition: { color: "#fff", fontSize: 15, fontWeight: "500", marginBottom: 8 },
  section: { marginTop: 12, marginBottom: 12, },
  sectionTitle: { color: "#fff", fontSize: 15, fontWeight: "600", marginBottom: 4 },
  sectionText: { color: "#ccc", fontSize: 15, lineHeight: 20 },
  specRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,   // spacing between row and line
},

  specLabel: { color: "#fff", fontSize: 15,marginLeft:20, },
  specValue: { color: "#fff", fontSize: 15,marginRight:20, },
  line:{height: 0.4,
  backgroundColor: "#fff",
  width: "70%",
  marginTop: 5,
marginBottom:10, },
reviewline:{height: 0.75,
  backgroundColor: "#fff",
  width: "100%",
  marginTop: 5,
  marginLeft:-15,
marginBottom:10,},
chatline:{height: 0.75,
  backgroundColor: "#fff",
  width: "100%",
  marginTop: 5,
  marginLeft:-20,
marginBottom:10,},
generalCard:{
    backgroundColor:"#2A282C",
    borderRadius:10,
    marginTop:10,
    padding: 10,       // keeps space on all sides
    paddingTop: 15,

},
lineDivider: {
  height: 0.4,
  backgroundColor: "#fff",
  width: "90%",     // full width of card
  marginBottom: 10,  
  marginLeft:17,    // small spacing above line
},


});

export default ItemDetails;
