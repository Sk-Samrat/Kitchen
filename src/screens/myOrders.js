import { View, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getallOrder } from '../../data/apiData';
import { getData } from "../action/action";
import localKey from '../utils/localStorage';
import colors from '../common/components/colors';
import { OrderItem } from '../common/uiComponent';
import Header from "../common/components/headerBar";

const MyOrders = ({ navigation }) => {

    const [apiOrderData, setApiOrderData] = useState('');

    useEffect(() => {
        getallOrder();

        setallOrder();
    }, [])

    const setallOrder = async () => {
        try {
            const jsonValue = await getData(localKey.ORDER_All);
            //alert(jsonValue);
            const myOrders = JSON.parse(jsonValue);
            console.log('My Orders: ', myOrders);
            setApiOrderData(myOrders);
        } catch (e) {
            console.log(e);
        }
    }

    const onPressCardItem = (item) => {
        navigation.navigate('OrderDetails', {
            item_order_id: item.order_id,
            item_total_price: item.total_price,
            item_order_date: item.order_date,
            item_seller: item.seller_name,

            // item: item,
            // item_name: item.product_name,
            // item_code: item.product_code,
            // item_price: item.product_price,
            // item_desc: item.product_description,
            // item_qty: item.product_quantity,
            // item_price: 250,
            // item_uom: item.product_uom,
            // item_image: item.main_image,
            // item_name: 'fish',
        });
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
            <SafeAreaView>
                <Header title="My Orders"
                    onPressMenu={() => navigation.getParent('LeftDrawer').openDrawer()}
                />
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
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
                        data={apiOrderData}
                        renderItem={({ item }) => {
                            return <OrderItem item={item}
                                onPressItem={() => onPressCardItem(item)}
                            />;
                        }}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default MyOrders;