import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const CustomDrawer = props => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#694fad' }}>
        <ImageBackground
          //   source={require('../assets/images/menu-bg.jpeg')}
          source={require('../../assets/images/menu-bg.jpeg')}
          style={{ padding: responsiveWidth(2) }}>
          <Image
            // source={require('../assets/images/user-profile.jpg')}
            source={require('../../assets/images/user-profile.jpg')}
            style={{ height: responsiveHeight(8), width: responsiveWidth(12), borderRadius: responsiveWidth(4), marginBottom: responsiveWidth(1) }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(1.8),
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            Sk Samrat
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: responsiveWidth(5),
                fontSize: responsiveFontSize(1.1)
              }}>
              280 Coins
            </Text>
            <FontAwesome5 name="coins" size={responsiveFontSize(1.4)} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: responsiveWidth(1) }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: responsiveWidth(2), borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: responsiveWidth(1.5) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={responsiveFontSize(2.2)} />
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontFamily: 'Roboto-Medium',
                marginLeft: responsiveWidth(5),
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: responsiveWidth(1.5) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={responsiveFontSize(2.2)} />
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontFamily: 'Roboto-Medium',
                marginLeft: responsiveWidth(5),
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;