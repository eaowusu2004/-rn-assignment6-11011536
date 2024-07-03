import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'; // Import Alert
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };
    fetchCartItems();
  }, []); 

  const handleRemoveFromCart = async (productId) => { // Pass productId, not item
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart = cart.filter(item => item.id !== productId); 

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(cart); 
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const renderCartItem = ({ item }) => {
    const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

    return (
      <View style={styles.cartItem}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{color: '#545454'}}>{item.type}</Text>
          <Text style={{color: '#dd8560'}}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => handleRemoveFromCart(item.id)}>
           <Image source={require("../assets/remove.png")} style={styles.addToCartIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={require('../assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
          </View>
      </View>
      <Text style= {{fontWeight: 'bold', alignSelf: 'center', fontSize: 20, letterSpacing: 6}}> CHECKOUT</Text>
      <View style= {{width: 151, alignSelf: 'center', marginLeft: 10}}>
      <View style={styles.CheckoutLine}>
      <View style={styles.line} />
      <View style={styles.diamond} />
      <View style={styles.line} />
      </View>
    </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'white'
  },
  addToCartButton: {
    alignSelf: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 40,
    marginLeft: 140,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 140,
  },

  CheckoutLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjust margin as needed
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc', // Or your preferred line color
  },
  diamond: {
    width: 12, // Adjust diamond size as needed
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }], // Rotate to create the diamond
  },
});

export default Checkout;
