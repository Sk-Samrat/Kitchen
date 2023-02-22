import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import Header from "../common/components/headerAll";
import colors from '../common/components/colors';
import { getOrderDetails } from '../../data/apiData';
import localKey from "../utils/localStorage";
import { getData } from "../action/action";
import { OrderList } from '../common/uiComponent';

const OrderDetails = ({ route, navigation }) => {

    const itemOrderId = route.params.item_order_id;
    const itemOrderPrice = route.params.item_total_price;
    const itemOrderDate = route.params.item_order_date;
    const itemSeller = route.params.item_seller;

    const [apiOrderDetails, setApiOrderDetails] = useState('');

    useEffect(() => {
        console.log('Order ID: ', itemOrderId);
        console.log('Order Price: ', itemOrderPrice);
        console.log('Order Date: ', itemOrderDate);
        console.log('Seller: ', itemSeller);
        getOrderDetails();
        setOrderDetails();
    }, [])

    const setOrderDetails = async () => {
        try {
            const jsonValue = await getData(localKey.ORDER_DETAILS);
            //alert(jsonValue);
            const orderlist = JSON.parse(jsonValue);
            //console.log('Order List: ', orderlist);
            const apiOrderData = orderlist.filter(x => x.order_id === itemOrderId);
            //console.log('apiOrderData :', apiOrderData);
            setApiOrderDetails(apiOrderData);
            console.log('apiOrderDetails :', apiOrderDetails);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
            <SafeAreaView>
                <Header title="Order Details"
                    //onPressMenu={() => navigation.getParent('LeftDrawer').openDrawer()}
                    onPressBack={() => navigation.goBack()}
                />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(1.5), marginTop: 10, fontFamily: 'Roboto-Medium', color: '#000', }}>
                                Order ID: {itemOrderId}
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(1.5), marginTop: 10, fontFamily: 'Roboto-Medium', color: '#000', }}>
                                Order Date: {itemOrderDate}
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: responsiveFontSize(1.5), marginTop: 10, fontFamily: 'Roboto-Medium', color: '#000', }}>
                                Seller: {itemSeller}
                            </Text>
                        </View>
                        <Text style={{ color: colors.deepBlue, fontWeight: '500', fontSize: responsiveFontSize(1.5), fontFamily: 'Roboto-Medium', }}>
                            Total Price: {'\u20B9'}{itemOrderPrice}
                        </Text>
                    </View>
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
                        data={apiOrderDetails}
                        renderItem={({ item }) => {
                            return <OrderList item={item}
                            // onPressItem={() => onPressCardItem(item)}
                            />;
                        }}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default OrderDetails;