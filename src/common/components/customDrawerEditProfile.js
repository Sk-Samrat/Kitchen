import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';

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
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.closeDrawer(); }}
                >
                    <Ionicons name="arrow-back-outline" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        //height: 50,
                        // borderRadius: 10,
                        //borderWidth: 0.5,
                        alignSelf: 'center',
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.darkGrey,
                        paddingBottom: 20,
                        // paddingLeft: 15,
                        // paddingRight: 15,
                        // backgroundColor:colors.badRed
                    }}
                    onPress={() => {
                        setClicked(!clicked);
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', }}>
                            My Account
                        </Text>
                        <Text style={{ marginTop: 3, fontSize: 13, fontFamily: 'Roboto-Regular' }}>
                            Favourites & Settings
                        </Text>
                    </View>
                    {clicked ? (
                        <Ionicons name="chevron-up-outline" size={25} />
                    ) : (
                        <Ionicons name="chevron-down-outline" size={25} />
                    )}
                </TouchableOpacity>
                {clicked ?
                    (<View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.darkGrey, width: '100%', }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={()=>{navigation.navigate('FavouriteItems')}}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name="heart-outline" size={25} />
                                    <Text style={{ marginLeft: 15 }}>Favourites</Text>
                                </View>
                                <View>
                                    <Ionicons name="chevron-forward-outline" size={25} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons name="settings-outline" size={25} />
                                <Text style={{ marginLeft: 15 }}>Settings</Text>
                            </View>
                            <View>
                                <Ionicons name="chevron-forward-outline" size={25} />
                            </View>
                        </View>
                    </View>) : null}
            </View>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
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