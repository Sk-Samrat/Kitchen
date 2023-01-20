import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, TextInput } from "react-native";
import { addToCart, decreaseCart, increaseCart, removeFromCart, getTotals, increaseCartItem, removeFromCartItem } from '../../reducers/cartItems';
import { increaseQty, decreaseQty } from '../../reducers/MyProductSlice';
import { useDispatch, useSelector } from "react-redux";

import colors from "../common/components/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyFoodItemData } from "../../data/data";
import { images } from "../../data/data";

const widthImageIcon = Dimensions.get('window').width - 40;

const widthCard = Dimensions.get('window').width;

const widthItem = Dimensions.get('window').width - 60;

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
    <SafeAreaView style={styles.center}>
      {/* <ScrollView> */}
      <View style={styles.backBtn}>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => navigation.navigate('FoodItemDetails', item)}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-outline" size={25} style={styles.icon} />
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 25, color: '#2B4C74', fontFamily: 'FredokaOne-Regular' }}>Details</Text>
        <TouchableOpacity
          activeOpacity={0.8}
        // onPress={() => navigation.navigate('FoodItemDetails', item)}
        // onPress={() => navigation.goBack()}
        >
          <Icon name="heart-outline" size={25} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          height: 600,
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
          style={styles.imageIcon}
        />
        <View
          style={styles.cardItemDetails}
        >
          <View style={{ flexDirection: 'row', width: widthItem, justifyContent: 'space-between' }}>
            <View>
              <Text style={{ alignItems: 'flex-start', marginTop: 10, fontSize: 25, fontWeight: '500', color: 'black', fontFamily: 'FredokaOne-Regular' }}>{itemName}</Text>
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
                  <Icon name="remove-outline" size={20} color={colors.deepBlue} style={styles.icon} />
                </View>
              </TouchableOpacity>
              <Text style={{ marginTop: 5, fontSize: 20, color: colors.deepBlue, fontFamily: 'Roboto-Medium', marginHorizontal: 10, }}>{itemQuantity}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressIncrement}
              >
                <View>
                  <Icon name="add-outline" size={20} color={colors.deepBlue} style={styles.icon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignSelf: 'flex-start', marginHorizontal:20 }}>
            <Text style={{ color: '#2B4C74', fontSize: 17, fontFamily: 'FredokaOne-Regular' }}>{'\u20B9'}{itemPrice}</Text>
            <Text style={{ color: colors.darkGrey, marginTop: 30, fontSize: 17, fontFamily: 'Roboto-Medium', }}>{itemDesc}</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.iconCart}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // dispatch(addToCart(item));
            //dispatch(addToCart([item,quantity]))
            dispatch(addToCart({ item: item, itemQuantity: itemQuantity }));
            dispatch(getTotals());
          }}
        >
          <Text style={{ fontSize: 17, color: colors.white, fontFamily: 'FredokaOne-Regular' }}>Add to Cart</Text>
        </TouchableOpacity>
      </View> */}
      {/* </ScrollView> */}
      {/* <Text>This is the Food Item Details screen</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
    backgroundColor: colors.lightGreyWhite,
    paddingHorizontal: 20,
    // marginHorizontal:20,
  },
  backBtn: {
    // backgroundColor: colors.smoke,
    padding: 5,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  icon: {
    padding: 10,
    backgroundColor: colors.smoke,
    borderRadius: 10,
    shadowColor: colors.black,
    elevation: 10,
  },
  cardItemDetails: {
    flex: 1,
    backgroundColor: colors.white,
    // backgroundColor: '#EAF2F8',
    // backgroundColor: '#EAECEE',
    alignItems: 'center',
    width: widthCard,
    padding: 10,
    borderRadius: 40,
    elevation: 10,
  },
  imageIcon: {
    flex: 0.6,
    resizeMode: 'contain',
    // backgroundColor: '#EAF2F8',
    // height: 400,
    width: widthImageIcon,
    // borderRadius: 50,
    // borderBottomRightRadius: 750,
    // borderBottomLeftRadius: 250,
    // borderTopLeftRadius: 250,
    // borderTopRightRadius: 350,
  },
  iconCart: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    // backgroundColor: colors.smoke,
    borderRadius: 10,
    shadowColor: colors.black,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#2B4C74',
    // elevation: 5,
    // shadowColor: colors.black,
    // color: colors.white,
  },
  input: {
    fontSize: 17,
    fontWeight: '500',
    // flex: 1,
    width: 30,
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.white,
    // marginLeft: 10,
    // elevation: 10,
  },
});

export default FoodItemDetails;