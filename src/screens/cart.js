import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import { decreaseCart, increaseCart, removeFromCart, getTotals } from '../../reducers/cartItems';
import { increaseQty, decreaseQty, removeQty } from "../../reducers/MyProductSlice";
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import { images } from "../../data/data";
import colors from "../common/components/colors";
import globalStyle from "../common/components/globalStyle";

function CartItemsContainer() {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItems);

  const myProducts = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <FlatList
      data={cart}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={globalStyle.cartItem}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={globalStyle.cartItemImg}
              //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
              //source={item.main_image}
              source={{ uri: `http://10.0.2.2:8000/${item.item.main_image}` }}
              // source={images.imageObject[item.item.product_code]}
            // width={200}
            // height={150}
            />
          </View>
          <View style={{ backgroundColor: colors.white, flex: 2 }}>
            <Text style={globalStyle.cartItemTitle}>{item.item.product_name}</Text>
            <Text style={globalStyle.cartItemPrice}>${item.item.product_price}</Text>
            <View style={globalStyle.cartItemAmount}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(decreaseQty(item.item.product_id));
                  if (item.itemQuantity === 1) {
                    // console.log('item', item);
                    dispatch(removeFromCart(item));

                    return;
                  }
                  dispatch(decreaseCart(item));
                }}
              >
                <Icon name="md-remove" size={responsiveWidth(4)} color="black" />
              </TouchableOpacity>
              <Text style={globalStyle.cartItemAmountText}>{item.itemQuantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(increaseCart(item));
                  dispatch(increaseQty(item.item.product_id));
                }}
              >
                <Icon name="md-add" size={responsiveWidth(4)} color="black" />
              </TouchableOpacity>
            </View>
            <View style={globalStyle.cartItemRemove}>
              <TouchableOpacity
                onPress={() => {
                  // console.log('remove', item);
                  dispatch(removeFromCart(item));
                  dispatch(removeQty(item.item.product_id));
                  console.log('Remove Quantity from My Products: ', myProducts);
                }}
                style={globalStyle.cartItemRemoveButton}
              >
                <Icon name="md-trash" size={responsiveWidth(4)} color={colors.red} />
                <Text style={{color:colors.red,fontSize: responsiveFontSize(1)}}>Remove</Text>
              </TouchableOpacity>
            </View>
            <Text style={[{ marginTop: 10, fontSize: responsiveFontSize(1.5) }, globalStyle.cartItemPrice]}>Price : ${item.item.product_price * item.itemQuantity}</Text>
          </View>
        </View>
      )} />
  );
};

export default CartItemsContainer;