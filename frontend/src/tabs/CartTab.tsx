import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
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

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCart();
    }, [])
  );

  const removeItem = async (productId: string) => {
    let isMounted = true;
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch("http://10.0.2.2:3000/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (res.ok) {
        if (isMounted) Alert.alert("Success", "Item removed from cart");
        fetchCart();
      } else {
        if (isMounted) Alert.alert("Error", data.message || "Failed to remove item");
      }
    } catch (err) {
      console.log("Remove item error:", err);
    }

    return () => { isMounted = false; };
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
        <View style={styles.headerLine} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.center}>
          <Image
            source={require("../assets/Empty.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>No items selected</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 12 }}
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

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeItem(item.productId._id)}
              >
                <Image
                  source={require("../assets/delete.png")}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  header: { paddingTop:1, paddingBottom: 10, alignItems: "center" },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  headerLine: { height: 1, backgroundColor: "#fff", width: "90%", marginTop: 5 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#2A282C",
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  emptyImage: { width: 200, height: 200, marginBottom: 20 },
  emptyText: { color: "#fff", fontSize: 24, fontWeight: "600" },
  itemImage: { width: 80, height: 80, borderRadius: 10, backgroundColor: "#444" },
  itemTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  itemPrice: { color: "#4caf50", fontSize: 15, marginTop: 4 },
  itemQuantity: { color: "#fff", fontSize: 14, marginTop: 2 },
  deleteButton: { position: "absolute", bottom: 9, right: 10 },
  deleteIcon: { width: 24, height: 24 },
});

export default CartTab;
