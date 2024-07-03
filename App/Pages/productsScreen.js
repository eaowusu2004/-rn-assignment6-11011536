import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productList from '../components/product'; 

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productList);
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Added to cart:', product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/Menu.png')} style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={require('../assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ourStory}>
        <Text style={styles.ourStoryText}>OUR STORY</Text>
        <View style={styles.filterIcons}>
          <TouchableOpacity>
            <View style={styles.filterButton}>
              <Image source={require('../assets/Listview.png')} style={styles.filterIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.filterButton}>
              <Image source={require('../assets/Filter.png')} style={styles.filterIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.productListContent}
      renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.productImage} />
            <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
              <Image source={require("../assets/add_circle.png")} style={styles.addToCartIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productType}>{item.type}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        </View>
      )}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingTop: 30,
    backgroundColor: 'white'
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
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  ourStory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ourStoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterIcons: {
    flexDirection: 'row',
  },
  filterButton: { 
    width: 44, 
    height: 44,
    borderRadius: 22, 
    backgroundColor: '#f9f9f9', 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
 productListContent: {
    paddingHorizontal: 1,
    paddingTop: 3,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%' ,
    height: 240,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productType: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dd8560',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    borderRadius: 50,
    shadowRadius: 5,
    elevation: 2,
  },
  addToCartIcon: {
    width: 24,
    height: 24,
  },
})

export default ProductsScreen;