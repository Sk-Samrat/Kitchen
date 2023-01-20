import React, { useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";

import Header from "../common/components/headerAll";
import colors from "../common/components/colors";
import { useDispatch, useSelector } from "react-redux";
import { dummyData } from "../../data/data";
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyFoodItemData } from "../../data/data";
import { images } from "../../data/data";
import Slider from "../common/components/slider";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const heightHomeUpperContent = Dimensions.get('window').height / 4;
//const heightMiddleContent = Dimensions.get('window').height / 6;
const widthPopular = Dimensions.get('window').width / 2 - 60;

const { width, height } = Dimensions.get('window');

const Offer = ({ route, navigation }) => {

  const myOffer = useSelector((state) => state.offer);

  const offerId = route.params.item_id;

  const offerData = myOffer.filter(x => x.id === parseInt(offerId));
  const dummyOfferData = dummyData.filter(x => x.id === parseInt(offerId));

  useEffect(() => {
    console.log('My Offer', myOffer);
    console.log('My Offer Id: ', offerId);
    console.log('My Offer Data', offerData);
    console.log('My Offer Data URL', offerData[0].url);
    console.log('My Offer Data Title', offerData[0].title);
    // console.log('Dummy Data', dummyData);
    // console.log('Dummy Offer Data', dummyOfferData);
    // console.log('My Offer Data URL', dummyOfferData[0].url);
    // console.log('My Offer Data Title', dummyOfferData[0].title);
    console.log('Width: ', width);
    console.log('Height: ', height);
  }, []);

  const CardPopular = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('PopularFood', {
            item_category: item.product_category,
          });
        }}
      >
        <View style={styles.cardPopular}>
          <View
            style={{
              // height: 100,
              // height: height / 4,
              // height: responsiveHeight(15),
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row'
            }}>
            <Image
              //source={{uri: 'http://140.238.246.162/media/20220720-153940.png'}}
              // source={{ uri: `http://140.238.246.162/${item.main_image}` }}
              // source={require('../assets/images/food-1.png')}
              source={images.imageObject[item.product_code]}
              style={styles.iconPopular}
            //style={{ flex: 1, resizeMode: 'contain' }}
            />
            <View style={{ alignSelf: 'flex-start' }}>
              <Icon name="heart-outline" size={responsiveWidth(5)} color='#694fad' />
            </View>
          </View>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 15, color: colors.black, }}>
              {item.product_name}
            </Text>
            <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 15, color: colors.black, }}>
              {'\u20B9'}{item.product_price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.shadow }}>
      <Header
        title="Offer"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView>
        <Slider />
        {/* <View style={styles.cardView}>
        <Image
          style={styles.image}
          source={{ uri: offerData[0].url }}
        />
      </View>
      <View style={{ marginHorizontal: 20, height: height - 640, }}>
        <View>
          <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 20, color: colors.black }}>{offerData[0].title}</Text>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 20, color: colors.black, }}>{'\u20B9'}{offerData[0].price}</Text>
          <View style={{ flexDirection: 'row', backgroundColor: colors.violet, borderRadius: 5, padding: 5 }}>
            <Icon name="remove-outline" size={20} color={colors.white} />
            <Text style={{ color: colors.white, marginHorizontal: 10 }}>1</Text>
            <Icon name="add-outline" size={20} color={colors.white} />
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontFamily: 'FredokaOne-Regular', marginBottom: 2, fontSize: 18, color: colors.black }}>Description</Text>
          <Text style={{ fontWeight: '500', marginBottom: 5, fontSize: 16, color: colors.black }}>{offerData[0].description}</Text>
        </View>
      </View> */}
        <View style={{ flex: 1 }}>
          <Text style={{ marginHorizontal: 20, fontFamily: 'FredokaOne-Regular', fontSize: 18, color: colors.black, marginTop: 10 }}>Recommended Sides</Text>
          <FlatList
            // columnWrapperStyle={{ justifyContent: 'space-between' }}
            // showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            //vertical
            horizontal
            contentContainerStyle={{
              marginTop: 10,
              marginHorizontal: 20,
              // backgroundColor: '#000',
              // paddingBottom: 10,
              //flex:0,
            }}
            // numColumns={3}
            data={dummyFoodItemData}
            renderItem={({ item }) => {
              return <CardPopular item={item} />;
            }}
          />
        </View>
      </ScrollView>
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
  cardView: {
    // flex: 1,
    width: width,
    height: height / 3,
    backgroundColor: colors.shadow,
    marginBottom: 10,
    // marginHorizontal: 15,
    // borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    // paddingVertical:10,
  },
  image: {
    width: width,
    height: height / 3 - 10,
    marginTop: 5,
    // borderRadius: 10
  },
  cardPopular: {
    // height: 160,
    // flex: 1,
    height: responsiveHeight(30),
    width: responsiveWidth(40),
    backgroundColor: colors.white,
    // width: widthPopular,
    marginHorizontal: 5,
    borderRadius: 5,
    // borderBottomEndRadius: 50,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    // marginBottom: 2,
    // paddingTop: 5,
    // paddingHorizontal: 30,
    padding: 15,
    // shadowColor: colors.black,
    elevation: 10,
  },
  iconPopular: {
    flex: 1,
    width: widthPopular,
    resizeMode: "contain",
  },
});

export default Offer;