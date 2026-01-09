// pages/Dashboard.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import HomeTab from '../tabs/HomeTab';
import DiscoverTab from '../tabs/DiscoverTab';
import FavoriteTab from '../tabs/FavoriteTab';
import CartTab from '../tabs/CartTab';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Import images from assets
import HomeIcon from '../assets/home.png';
import DiscoverIcon from '../assets/discover.png';
import FavoriteIcon from '../assets/favorite.png';
import CartIcon from '../assets/cart.png';
import SellIcon from '../assets/sell.png';

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

  const tabs = ['Home', 'Discover', 'Sell', 'Favorite', 'Cart'];

  const icons: Record<string, any> = {
    Home: HomeIcon,
    Discover: DiscoverIcon,
    Favorite: FavoriteIcon,
    Cart: CartIcon,
    Sell: SellIcon,
  };

  const iconStyles: Record<string, any> = {
    Home: styles.homeIcon,
    Discover: styles.discoverIcon,
    Favorite: styles.favoriteIcon,
    Cart: styles.cartIcon,
    Sell: styles.sellIcon,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <Header />
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
                  setActiveTab(tab as any);
                }
              }}
            >
              <Image
                source={icons[tab]}
                style={[
                  iconStyles[tab],
                  !isSell && isActive ? styles.navIconActive : null,
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
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-around',
     marginBottom:-15,
  },
  navItem: { flex: 1, alignItems: 'center' },

  // Individual icon styles
  homeIcon: {
    width: 50,
    height: 80,
   
  },
  discoverIcon: {
    width: 60,
    height: 80,
  },
  favoriteIcon: {
    width: 82,
    height: 92,
    resizeMode: 'contain',
    marginBottom:-15,
    
  },
  cartIcon: {
    width: 82,
    height: 82,
    resizeMode: 'contain',
     marginBottom:-15,
  },
  sellIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: -1, // pop slightly above navbar
  },

  navIconActive: {
    tintColor: '#FFF',
  },
});

export default Dashboard;
