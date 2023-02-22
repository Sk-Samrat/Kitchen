import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

import colors from './colors';

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawerEditProfile = ({ props, navigation }) => {

    const [selectedCountry, setSelectedCountry] = useState('');
    const [clicked, setClicked] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            {/* <DrawerContentScrollView
                {...props}
            //contentContainerStyle={{ backgroundColor: '#694fad' }}
            >
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView> */}
            <View style={{ paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveWidth(1) }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.closeDrawer(); }}
                >
                    <Ionicons name="arrow-back-outline" size={responsiveFontSize(2.2)} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        //height: 50,
                        // borderRadius: 10,
                        //borderWidth: 0.5,
                        alignSelf: 'center',
                        marginTop: responsiveWidth(1),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.darkGrey,
                        paddingBottom: responsiveWidth(2),
                        // paddingLeft: 15,
                        // paddingRight: 15,
                        // backgroundColor:colors.badRed
                    }}
                    onPress={() => {
                        setClicked(!clicked);
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: responsiveFontSize(1.8), fontFamily: 'Roboto-Medium', }}>
                            My Account
                        </Text>
                        <Text style={{ marginTop: responsiveWidth(3), fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Regular' }}>
                            Favourites & Settings
                        </Text>
                    </View>
                    {clicked ? (
                        <Ionicons name="chevron-up-outline" size={responsiveFontSize(2.2)} />
                    ) : (
                        <Ionicons name="chevron-down-outline" size={responsiveFontSize(2.2)} />
                    )}
                </TouchableOpacity>
                {clicked ?
                    (<View style={{ paddingVertical: responsiveWidth(1), borderBottomWidth: 1, borderBottomColor: colors.darkGrey, width: '100%', }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={()=>{navigation.navigate('FavouriteItems')}}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name="heart-outline" size={responsiveFontSize(2.2)} />
                                    <Text style={{ marginLeft: responsiveWidth(1.5),fontSize: responsiveFontSize(1.5) }}>Favourites</Text>
                                </View>
                                <View>
                                    <Ionicons name="chevron-forward-outline" size={responsiveFontSize(2.2)} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveWidth(2) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons name="settings-outline" size={responsiveFontSize(2.2)} />
                                <Text style={{ marginLeft: responsiveWidth(1.5), fontSize: responsiveFontSize(1.5) }}>Settings</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-forward-outline" size={responsiveFontSize(2.2)} />
                            </View>
                        </View>
                    </View>) : null}
            </View>
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

export default CustomDrawerEditProfile;