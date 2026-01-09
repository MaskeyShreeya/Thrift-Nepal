// pages/Dashboard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import HomeTab from '../tabs/HomeTab';
import DiscoverTab from '../tabs/DiscoverTab';
import FavoriteTab from '../tabs/FavoriteTab';
import CartTab from '../tabs/CartTab';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Discover' | 'Favorite' | 'Cart'>('Home');
  const navigation = useNavigation<any>();

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeTab />;
      case 'Discover':
        return <DiscoverTab />;
      case 'Favorite':
        return <FavoriteTab />;
      case 'Cart':
        return <CartTab />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <Header />

      {/* Removed ScrollView */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      <View style={styles.navBar}>
        {['Home', 'Discover', 'Favorite', 'Cart'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={styles.navIcon}>
              {tab === 'Home' ? '🏠' :
               tab === 'Discover' ? '🧭' :
               tab === 'Favorite' ? '❤️' :
               '🛒'}  
            </Text>
            <Text style={activeTab === tab ? styles.navLabelActive : styles.navLabel}>{tab}</Text>
          </TouchableOpacity>
        ))}

        {/* Sell button */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('SellTab')}
        >
          <Text style={styles.navIcon}>➕</Text>
          <Text style={styles.navLabel}>Sell</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { fontSize: 18 },
  navLabel: { color: '#888', fontSize: 10, marginTop: 4 },
  navLabelActive: { color: '#FFF', fontSize: 10, marginTop: 4 },
});

export default Dashboard;
