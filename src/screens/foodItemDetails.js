import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, TextInput } from "react-native";
import { addToCart, decreaseCart, increaseCart, removeFromCart, getTotals, increaseCartItem, removeFromCartItem } from '../../reducers/cartItems';
import { increaseQty, decreaseQty } from '../../reducers/MyProductSlice';
import { useDispatch, useSelector } from "react-redux";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import colors from "../common/components/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyFoodItemData } from "../../data/data";
import { images } from "../../data/data";
import globalStyle from "../common/components/globalStyle";

const widthImageIcon = Dimensions.get('window').width - 40;

const widthCard = Dimensions.get('window').width;

// const widthItem = Dimensions.get('window').width - 60;
const widthItem = Dimensions.get('window').width - responsiveWidth(6);

const FoodItemDetails = ({ route, navigation }) => {

  const item = route.params.item;
  const itemName = route.params.item_name;
  const itemCode = route.params.item_code;
  const itemPrice = route.params.item_price;
  const itemDesc = route.params.item_desc;
  const itemQty = route.params.item_qty;

  const [itemQuantity, setItemQuantity] = useState(itemQty);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [cart, dispatch]);

  useEffect(() => {
    // console.log('Product Quantity: ',item.product_quaantity);
    // setFilteredDataSource(dummyFoodItemData);
    // console.log(setFilteredDataSource);
    // setFilteredDataSource(apidata);
    // console.log(filteredDataSource);
    // alert(JSON.stringify(filteredDataSource));
    // getData();
  }, [cart, dispatch]);

  const onPressIncrement = () => {

    // setItemQuantity(item.product_quaantity);
    // alert(itemQuantity);
    dispatch(increaseCart({ item, itemQuantity: itemQuantity + 1 }));
    // dispatch(increaseCartItem(item));
    dispatch(increaseQty(item.product_code));
    setItemQuantity(itemQuantity + 1);
  }

  const onPressDecrement = () => {
    setItemQuantity(itemQuantity - 1);
    // alert(itemQuantity);
    dispatch(decreaseQty(item.product_code));
    // if (item.product_quantity === 1) {
    if (itemQuantity === 1) {
      dispatch(removeFromCartItem(item));
      return;
    }
    dispatch(decreaseCart({ item }));
    setItemQuantity(itemQuantity - 1);
  }

  return (
    <SafeAreaView style={globalStyle.center}>
      {/* <ScrollView> */}
      <View style={globalStyle.backBtn}>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => navigation.navigate('FoodItemDetails', item)}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-outline" size={responsiveWidth(5)} style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: responsiveFontSize(2), color: '#2B4C74', fontFamily: 'FredokaOne-Regular' }}>Details</Text>
        <TouchableOpacity
          activeOpacity={0.8}
        // onPress={() => navigation.navigate('FoodItemDetails', item)}
        // onPress={() => navigation.goBack()}
        >
          <Icon name="heart-outline" size={responsiveWidth(5)} style={globalStyle.iconBtn} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          // height: 600,
          alignItems: 'center',
          marginBottom: 20,
          // flexDirection: "row",
          // backgroundColor: '#ff0',
          // width: width,
          // borderRadius: 50,
          // width: widthImageIcon,
        }}>
        <Image
          //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
          // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
          // source={require('../assets/images/fastfood-2-removebg.png')}
          source={images.imageObject[itemCode]}
          // source={itemImage}
          style={globalStyle.imageIcon}
        />
        <View
          style={globalStyle.cardItemDetails}
        >
          <View style={{ flexDirection: 'row', width: widthItem, justifyContent: 'space-between' }}>
            <View>
              <Text style={{ alignItems: 'flex-start', marginTop: 10, fontSize: responsiveFontSize(1.8), color: 'black', fontFamily: 'FredokaOne-Regular' }}>{itemName}</Text>
            </View>
            <View style={{ backgroundColor: colors.smoke, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressDecrement}
              // onPress={() => {
              //   if (item.itemQuantity === 1) {
              //     dispatch(removeFromCart({item}));
              //     return;
              //   }
              //   dispatch(decreaseCart({item}));
              // }}
              >
                <View>
                  <Icon name="remove-outline" size={responsiveWidth(5)} color={colors.deepBlue} style={globalStyle.iconBtn} />
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: responsiveFontSize(1.8), color: colors.deepBlue, fontFamily: 'Roboto-Medium', marginHorizontal: 10, alignSelf: 'center' }}>{itemQuantity}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressIncrement}
              >
                <View>
                  <Icon name="add-outline" size={responsiveWidth(5)} color={colors.deepBlue} style={globalStyle.iconBtn} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignSelf: 'flex-start', marginHorizontal: 20 }}>
            <Text style={{ color: '#2B4C74', fontSize: responsiveFontSize(1.5), fontFamily: 'FredokaOne-Regular' }}>{'\u20B9'}{itemPrice}</Text>
            <Text style={{ color: colors.darkGrey, marginTop: 30, fontSize: responsiveFontSize(1.4), fontFamily: 'Roboto-Medium' }}>{itemDesc}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FoodItemDetails;