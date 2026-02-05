// pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import HomeTab from '../tabs/HomeTab';
import DiscoverTab from '../tabs/DiscoverTab';
import FavoriteTab from '../tabs/FavoriteTab';
import CartTab from '../tabs/CartTab';

import HomeIcon from '../assets/home.png';
import DiscoverIcon from '../assets/discover.png';
import FavoriteIcon from '../assets/favorite.png';
import CartIcon from '../assets/cart.png';
import SellIcon from '../assets/sell.png';

type TabType = 'Home' | 'Discover' | 'Favorite' | 'Cart';

const Dashboard = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // ✅ READ TAB FROM NAVIGATION PARAMS
  const [activeTab, setActiveTab] = useState<TabType>('Home');

  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params?.tab]);

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
      default:
        return <HomeTab />;
    }
  };

  const tabs: (TabType | 'Sell')[] = ['Home', 'Discover', 'Sell', 'Favorite', 'Cart'];

  const icons: Record<string, any> = {
    Home: HomeIcon,
    Discover: DiscoverIcon,
    Favorite: FavoriteIcon,
    Cart: CartIcon,
    Sell: SellIcon,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>{renderContent()}</View>

      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isSell = tab === 'Sell';
          const isActive = activeTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              style={styles.navItem}
              onPress={() => {
                if (isSell) {
                  navigation.navigate('SellListing');
                } else {
                  setActiveTab(tab as TabType);
                }
              }}
            >
              <Image
                source={icons[tab]}
                style={[
                  styles.icon,
                  isActive && !isSell && { tintColor: '#fff' },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  navBar: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
    justifyContent: 'space-around',
    marginBottom: -15,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
  },

  homeIcon: { width: 50, height: 80 },
  discoverIcon: { width: 60, height: 80 },
  favoriteIcon: { width: 82, height: 92, resizeMode: 'contain', marginBottom: -15 },
  cartIcon: { width: 82, height: 92, resizeMode: 'contain', marginBottom: -15 },
  sellIcon: { width: 80, height: 75, resizeMode: 'contain', marginTop: -1 },

  navIconActive: { tintColor: '#FFF' },
});

export default Dashboard;
