// tabs/CartTab.tsx
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

const CartTab = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch("http://10.0.2.2:3000/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.log("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refresh cart whenever Cart tab is focused
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCart();
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#121212" }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image
              source={{ uri: `http://10.0.2.2:3000${item.productId.imageUrl}` }}
              style={styles.itemImage}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemTitle}>{item.productId.title}</Text>
              <Text style={styles.itemPrice}>NPR {item.productId.price}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#2A282C",
    borderRadius: 10,
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#444",
  },
  itemTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  itemPrice: { color: "#4caf50", fontSize: 15, marginTop: 4 },
  itemQuantity: { color: "#fff", fontSize: 14, marginTop: 2 },
});

export default CartTab;
