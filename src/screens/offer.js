import React, { useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import Header from "../common/components/headerAll";
import colors from "../common/components/colors";
import { useDispatch, useSelector } from "react-redux";
import { dummyData } from "../../data/data";
import Icon from 'react-native-vector-icons/Ionicons';
import { dummyFoodItemData } from "../../data/data";
import { images } from "../../data/data";
import Slider from "../common/components/slider";
import globalStyle from "../common/components/globalStyle";
import { CardPopular } from "../common/uiComponent";

//const heightHomeUpperContent = Dimensions.get('window').height / 4;
//const heightMiddleContent = Dimensions.get('window').height / 6;
//const widthPopular = Dimensions.get('window').width / 2 - 60;

const { width, height } = Dimensions.get('window');

const Offer = ({ route, navigation }) => {

  const myOffer = useSelector((state) => state.offer);

  const offerId = route.params.item_id;

  const offerData = myOffer.filter(x => x.id === parseInt(offerId));
  const dummyOfferData = dummyData.filter(x => x.id === parseInt(offerId));

  useEffect(() => {
    // console.log('My Offer', myOffer);
    // console.log('My Offer Id: ', offerId);
    // console.log('My Offer Data', offerData);
    // console.log('My Offer Data URL', offerData[0].url);
    // console.log('My Offer Data Title', offerData[0].title);
    // console.log('Dummy Data', dummyData);
    // console.log('Dummy Offer Data', dummyOfferData);
    // console.log('My Offer Data URL', dummyOfferData[0].url);
    // console.log('My Offer Data Title', dummyOfferData[0].title);
    console.log('Width: ', width);
    console.log('Height: ', height);
  }, []);

  const onPressCardPopular = (item) => {
    navigation.navigate('PopularFood', {
      item_category: item.product_category,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.shadow }}>
      <Header
        title="Offer"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView>
        <Slider />
        <View style={{ flex: 1 }}>
          <Text style={{ marginHorizontal: 20, fontFamily: 'FredokaOne-Regular', fontSize: responsiveFontSize(1.5), color: colors.black, marginTop: 10 }}>Recommended Sides</Text>
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
              return <CardPopular item={item} onPressItem={onPressCardPopular} />;
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Offer;