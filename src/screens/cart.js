import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import { decreaseCart, increaseCart, removeFromCart, getTotals } from '../../reducers/cartItems';
import { increaseQty, decreaseQty, removeQty } from "../../reducers/MyProductSlice";
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { images } from "../../data/data";

function CartItemsContainer() {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <FlatList
      data={cart}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.cartItem}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.cartItemImg}
              //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
              //source={item.main_image}
              // source={{ uri: `http://140.238.246.162/${item.item.main_image}` }}
              source={images.imageObject[item.item.product_code]}
            // width={200}
            // height={150}
            />
            {/* <Text style={styles.cartItemTitle}>{item.cartQuantity}</Text> */}
            {/* <Text style={styles.cartItemTitle}>{item.item.product_name}</Text> */}
            {/* <Text style={styles.cartItemTitle}>{item.item.main_image}</Text> */}
          </View>
          <View style={{ backgroundColor: "white", flex: 2 }}>
            <Text style={styles.cartItemTitle}>{item.item.product_name}</Text>
            <Text style={styles.cartItemPrice}>${item.item.product_price}</Text>
            <View style={styles.cartItemAmount}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(decreaseQty(item.item.product_code));
                  if (item.itemQuantity === 1) {
                    // console.log('item', item);
                    dispatch(removeFromCart(item));
                    
                    return;
                  }
                  dispatch(decreaseCart(item));
                }}
              >
                <Icon name="md-remove" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.cartItemAmountText}>{item.itemQuantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(increaseCart(item));
                  dispatch(increaseQty(item.item.product_code));
                }}
              >
                <Icon name="md-add" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.cartItemRemove}>
              <TouchableOpacity
                onPress={() => {
                  // console.log('remove', item);
                  dispatch(removeFromCart(item));
                  dispatch(removeQty(item.item.product_code));
                }}
                style={styles.cartItemRemoveButton}
              >
                <Icon name="md-trash" size={15} color="black" />
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
            <Text style={[{ marginTop: 10, fontSize: 18 }, styles.cartItemPrice]}>Price : ${item.item.product_price * item.itemQuantity}</Text>
          </View>
        </View>
      )} />
  );
};

export default CartItemsContainer;

const styles = StyleSheet.create({
  cartItem: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  cartItemImg: {
    width: 80,
    height: 80,
    resizeMode: "stretch",
    //backgroundColor: "white",
  },
  cartItemTitle: {
    fontSize: 18,
    marginVertical: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "coral",
    fontWeight: "bold",
  },
  cartItemAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemAmountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartItemRemove: {
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemRemoveButton: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});