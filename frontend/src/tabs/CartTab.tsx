// tabs/CartTab.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CartTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart Page Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { color: 'white', fontSize: 18 },
});

export default CartTab;
