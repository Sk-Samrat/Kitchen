import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import { addToCart, getTotals, increaseCartItem, decreaseCartItem, removeFromCartItem } from '../../reducers/cartItems';
import { increaseQty, decreaseQty } from '../../reducers/MyProductSlice';
import { useDispatch, useSelector } from "react-redux";

import colors from "../common/components/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyFoodItemData } from "../../data/data";
import Header from "../common/components/headerBar";
import { images } from "../../data/data";
import { CardItem } from '../common/uiComponent';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import globalStyle from '../common/components/globalStyle';

const width = Dimensions.get('window').width;
const heightHomeUpperContent = Dimensions.get('window').height / 14;
const widthIcon = Dimensions.get('window').width / 2;

let apidata = dummyFoodItemData;

const FoodItem = ({ route, navigation }) => {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItems);
  const myProducts = useSelector((state) => state.product);

  const itemCategory = route.params.item_category;
  const itemName = route.params.item_name;

  const apiItemData = myProducts.filter(x => x.product_category === itemCategory);
  // const apiItemData = apidata.filter(x => x.product_category === itemCategory);

  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState(apiItemData);
  const [masterDataSource, setMasterDataSource] = useState(apiItemData);
  const [searchItem, setSearchItem] = useState('');

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log(itemCategory);
    // console.log(cart.length);
    // console.log(apidata);
    // setFilteredDataSource(dummyFoodItemData);
    // console.log(setFilteredDataSource);
    // setFilteredDataSource(apidata);
    console.log('filteredDataSource ', filteredDataSource);
    console.log('added products', myProducts);
    // alert(JSON.stringify(filteredDataSource));
    // getData();
  }, []);

  useEffect(() => {
    dispatch(getTotals());
    // console.log('cart items: ', cart);
    setFilteredDataSource(myProducts);
  }, [cart, dispatch, myProducts]);

  const onPressHandler = () => {
    setFilteredDataSource(masterDataSource);
    setSearchItem('');
  }

  const getTotal = () => {
    let total = 0;
    cart.map(item => {
      total = total + item.itemQuantity * item.item.product_price;
    });
    return total;
  }

  const searchFilter = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.product_name
          ? item.product_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchItem(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearchItem(text);
    }
  }

  const onPressCardItem = (item) => {
    navigation.navigate('FoodItemDetails', {
      // item_category: item.product_category,
      // item_id: item.product_id,
      item: item,
      item_name: item.product_name,
      item_code: item.product_code,
      item_price: item.product_price,
      item_desc: item.product_description,
      item_qty: item.product_quantity,
      // item_price: 250,
      // item_uom: item.product_uom,
      // item_image: item.main_image,
      // item_name: 'fish',
    });
  }

  const onPressAddToCart = (item) => {
    dispatch(addToCart({ item: item, itemQuantity: quantity }));
    dispatch(getTotals());
    dispatch(increaseQty(item.product_id));
  }

  const onPressRemoveFromCart = (item) => {
    dispatch(decreaseQty(item.product_id));
    if (item.product_quantity === 1) {
      // console.log('item', item);
      dispatch(removeFromCartItem(item));
      return;
    }
    dispatch(decreaseCartItem(item));
  }

  const onPressIncreaseCart = (item) => {
    dispatch(increaseCartItem(item));
    dispatch(increaseQty(item.product_id));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <Header /> */}
      {/* <ScrollView style={{ paddingHorizontal: 20, }}> */}
      <View style={{ flex: 1, paddingHorizontal: 20, }}>
        <View style={globalStyle.searchContainerItem}>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => navigation.navigate('FoodItemDetails', item)}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back-outline" size={responsiveWidth(5)} style={{ marginLeft: 20 }} />
          </TouchableOpacity>
          <TextInput
            style={globalStyle.inputItem}
            value={searchItem}
            placeholder="Search for food item you want"
            // underlineColorAndroid={transparent}
            onChangeText={(text) => searchFilter(text)}
          />
          {searchItem === '' ?
            (<Icon name="search-outline" size={responsiveWidth(5)} style={{ marginRight: 20 }} />)
            : (<TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => navigation.navigate('FoodItemDetails', item)}
              // onPress={() => setSearchItem('')}
              onPress={onPressHandler}
            >
              <Icon name="close-outline" size={responsiveWidth(5)} style={{ marginRight: 20 }} />
            </TouchableOpacity>)
          }
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            // columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            vertical
            contentContainerStyle={{
              marginTop: 10,
              // backgroundColor: '#000',
              paddingBottom: 20,
              //flex:0,
            }}
            // numColumns={3}
            data={filteredDataSource}
            renderItem={({ item }) => {
              return <CardItem item={item}
                itemCategory={itemCategory}
                onPressItem={() => onPressCardItem(item)}
                onPressAdd={() => onPressAddToCart(item)}
                onPressRemove={() => onPressRemoveFromCart(item)}
                onPressIncrease={() => onPressIncreaseCart(item)}
              />;
            }}
          />
        </View>
      </View>
      {/* </ScrollView> */}
      {cart.length > 0 ?
        (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.deepBlue, bottom: 5, width: width - 10, padding: responsiveWidth(3), borderRadius: 10, marginHorizontal: 5, }}>
          <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(1.2), fontFamily: 'Roboto-Medium', color: colors.white, }}>{'Added items' + '(' + cart.length + ') | Total' + ' : ' + getTotal()}</Text>
            {/* <Text style={{ fontWeight: '500', fontSize: 17, fontFamily: 'Roboto-Medium', color: colors.white, }}>{'Total' + ':' + getTotal()}</Text> */}
          </View>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Cart')}
            >
              <View style={{ backgroundColor: colors.green, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveWidth(2), alignItems: 'center', borderRadius: 10, }}>
                <Text style={{ fontWeight: '800', fontSize: responsiveFontSize(1.2), fontFamily: 'Roboto-Medium', color: colors.white, }}>View Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>) : null}
    </SafeAreaView>
  );
};

export default FoodItem;