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
    // console.log(cart.length);
    // console.log(apidata);
    // setFilteredDataSource(dummyFoodItemData);
    // console.log(setFilteredDataSource);
    // setFilteredDataSource(apidata);
    // console.log('filteredDataSource ', filteredDataSource);
    // console.log('added products', myProducts);
    // alert(JSON.stringify(filteredDataSource));
    // getData();
  }, []);

  useEffect(() => {
    dispatch(getTotals());
    // console.log('cart items: ', cart);
    setFilteredDataSource(myProducts);
  }, [cart, dispatch]);

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

  const Card = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
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
        }}
      >
        {item.product_category === itemCategory ? (
          <View style={styles.cardWithImage}>
            <View
              style={{
                // height: 120,
                alignItems: 'flex-start',
                flexDirection: "row",
                // flexDirection: "column",
                // backgroundColor: '#ff0',
                // width: width,
                // borderRadius: 10,
              }}>
              <View style={{ flex: 0.8, flexDirection: "column", alignItems: 'center', padding: 5, }}>
                <View style={{ elevation: 10, shadowColor: colors.black, }}>
                  <Image
                    //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
                    // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
                    // source={require('../assets/images/food-1.png')}
                    source={images.imageObject[item.product_code]}
                    style={styles.icon}
                  //style={{ flex: 1, resizeMode: 'contain' }}
                  />
                </View>
                {item.product_quantity == 0
                  ? (<View style={{ backgroundColor: colors.lightGreyWhite, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginTop: -25, elevation: 10, shadowColor: colors.black, }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        // dispatch(addToCart(item));
                        //dispatch(addToCart([item,quantity]))
                        dispatch(addToCart({ item: item, itemQuantity: quantity }));
                        dispatch(getTotals());
                        dispatch(increaseQty(item.product_code))
                        // setFilteredDataSource(myProducts);
                        // console.log('my products food item: ', myProducts);
                      }}
                    >
                      <Text style={{ fontSize: 17, color: colors.deepBlue, fontFamily: 'Roboto-Regular' }}>Add</Text>
                    </TouchableOpacity>
                  </View>)
                  : (<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightGreyWhite, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, marginTop: -25, elevation: 10, shadowColor: colors.black, }}>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          // dispatch(addToCart(item));
                          //dispatch(addToCart([item,quantity]))
                          // dispatch(addToCart({ item: item, itemQuantity: quantity }));
                          // dispatch(getTotals());
                          dispatch(decreaseQty(item.product_code))
                          if (item.product_quantity === 1) {
                            // console.log('item', item);
                            dispatch(removeFromCartItem(item));
                            return;
                          }
                          dispatch(decreaseCartItem(item))
                          // setFilteredDataSource(myProducts);
                          // console.log('my products food item: ', myProducts);
                        }}
                      >
                        <Icon name="remove-outline" size={20} color={colors.deepBlue} />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={{ fontWeight: '500', color: colors.deepBlue }}>{item.product_quantity}</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          // dispatch(addToCart(item));
                          //dispatch(addToCart([item,quantity]))
                          // dispatch(addToCart({ item: item, itemQuantity: quantity }));
                          // dispatch(getTotals());
                          dispatch(increaseCartItem(item));
                          dispatch(increaseQty(item.product_code))
                          // setFilteredDataSource(myProducts);
                          // console.log('my products food item: ', myProducts);
                        }}
                      >
                        <Icon name="add-outline" size={20} color={colors.deepBlue} />
                      </TouchableOpacity>
                    </View>
                  </View>)}
              </View>
              <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, }}>
                <Text style={{ fontWeight: '500', fontSize: 20, marginTop: 10, fontFamily: 'Roboto-Medium', color: '#000', }}>
                  {item.product_name}
                </Text>
                <Text style={{ fontWeight: '400', fontSize: 17, fontFamily: 'Roboto-Regular', }}>
                  {item.product_uom}
                </Text>
                <Text style={{ color: colors.deepBlue, fontWeight: '400', fontSize: 17, fontFamily: 'Roboto-Regular', }}>
                  {'\u20B9'}{item.product_price}
                </Text>
              </View>
            </View>
          </View>
        ) : null
        }
      </TouchableOpacity >
    );
  };

  return (
    // <View style={styles.center}>
    //   <Text>This is the food Item screen</Text>
    // </View>
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <Header /> */}
      {/* <ScrollView style={{ paddingHorizontal: 20, }}> */}
      <View style={{ flex: 1, paddingHorizontal: 20, }}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => navigation.navigate('FoodItemDetails', item)}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back-outline" size={30} style={{ marginLeft: 20 }} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={searchItem}
            placeholder="Search for food item you want"
            // underlineColorAndroid={transparent}
            onChangeText={(text) => searchFilter(text)}
          />
          {searchItem === '' ?
            (<Icon name="search-outline" size={25} style={{ marginRight: 20 }} />)
            : (<TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => navigation.navigate('FoodItemDetails', item)}
              // onPress={() => setSearchItem('')}
              onPress={onPressHandler}
            >
              <Icon name="close-outline" size={30} style={{ marginRight: 20 }} />
            </TouchableOpacity>)
          }
        </View>
        {/* <Text style={{ fontWeight: '300', fontSize: 17, fontFamily: 'Roboto-Regular', }}>
            item Category: {route.params.item_category}
          item Name: {route.params.item_name}
            item Category: {itemCategory}
            item Name: {itemName}
          </Text> */}
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
              return <Card item={item} />;
            }}
          />
        </View>
      </View>
      {/* </ScrollView> */}
      {cart.length > 0 ?
        (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.deepBlue, bottom: 5, width: width - 10, padding: 10, borderRadius: 10, marginHorizontal: 5, }}>
          <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 15, fontFamily: 'Roboto-Medium', color: colors.white, }}>{'Added items' + '(' + cart.length + ') | Total' + ' : ' + getTotal()}</Text>
            {/* <Text style={{ fontWeight: '500', fontSize: 17, fontFamily: 'Roboto-Medium', color: colors.white, }}>{'Total' + ':' + getTotal()}</Text> */}
          </View>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Cart')}
            >
              <View style={{ backgroundColor: colors.green, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', borderRadius: 10, }}>
                <Text style={{ fontWeight: '500', fontSize: 17, fontFamily: 'Roboto-Medium', color: colors.white, }}>View Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  searchContainer: {
    // height: 60,
    backgroundColor: colors.green,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    borderColor: colors.black,
    // borderWidth: 0.8,
    // shadowColor: '#000',
    // shadowOffset: { width: 0.5, height: 0.5 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 5,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: heightHomeUpperContent,
    marginVertical: 10,
    elevation: 10,
  },
  input: {
    fontSize: 17,
    fontWeight: '500',
    flex: 1,
    color: colors.black,
    // backgroundColor: colors.light,
    marginLeft: 10,
  },
  card: {
    // height: 85,
    backgroundColor: colors.lightGreyWhite,
    // width,
    // marginHorizontal: 2,
    borderRadius: 25,
    // borderBottomEndRadius: 50,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    marginBottom: 5,
    paddingTop: 5,
    // paddingHorizontal: 30,
    // padding: 15,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  cardWithImage: {
    // height: 85,
    backgroundColor: colors.lightGreyWhite,
    // width: widthIcon,
    // marginHorizontal: 2,
    borderRadius: 10,
    // borderBottomEndRadius: 50,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    marginBottom: 5,
    paddingTop: 5,
    // paddingHorizontal: 30,
    // padding: 15,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    flex: 1,
    elevation: 1,
    shadowColor: colors.black,
  },
  icon: {
    // flex: 0.5,
    width: widthIcon,
    height: 100,
    resizeMode: "contain",
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.lightGreyWhite,
  },
  iconBtn: {
    padding: 10,
    backgroundColor: colors.smoke,
    borderRadius: 10,
    shadowColor: colors.black,
    elevation: 10,
  },
});

export default FoodItem;